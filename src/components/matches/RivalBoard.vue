<template>
    <div class="tauler-rival">
        <table id="tablaRival" :class="{turnoRival: userId != match?.playerTurnId}">

            <tbody>

                <tr v-for="(fila, rowIndex) in tabla" :key="rowIndex">
                    <td v-for="(clase, colIndex) in fila" :key="colIndex" :class="clase"
                        @click="ensayoClic(rowIndex, colIndex)">
                    </td>
                </tr>

            </tbody>

        </table>
        
    </div>
    <button v-if="width <= 768" @touchstart = "recognition?.start()" @touchend = "recognition?.stop">Atacar</button>
    <button v-if="width > 768" @mousedown = "recognition?.start()" @mouseup = "recognition?.stop">Atacar</button>
    <p> Resultado: {{ resultado }}</p>
</template>
  
<script setup lang="ts">
import { table } from 'console';
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useLogin } from '@/core/componentLogic/useLogin'
import { useMatches } from '@/core/componentLogic/useMatches'
import { shootCoordinate } from '@/core/services/APIMatchRequests'
import { ShootCoordinate } from '@/type'
import { useWindowSize } from '@vueuse/core';

const tabla = ref(Array.from({ length: 10 }, () => Array(10).fill('')))
const { userId } = useLogin()
const { match } = useMatches()
const { width } = useWindowSize()

const resultado = ref<string>('')


const transcription = ref<string>('')
let recognition: SpeechRecognition | null = null;

const props = defineProps({
    array: { type: Array<number>, required: true },
    turn: { type: Number, required: true},
    match: { type: Number, required: true},
    rival: { type: Number, required: true},
})

    

    // mirate este video, puede ayudarte https://www.youtube.com/watch?v=jIUW1_fzDAE

    onMounted(() => {

        recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const results = event.results;
            const frase = results[results.length - 1][0].transcript.replace(/\s/g,'').split('.').join("");
            console.log(frase)

            let letraFrase = frase.charAt(0).toUpperCase()
            let numeroFrase = frase.substring(1).toLowerCase().split('e').join('')

            

            console.log(letraFrase)
            console.log(numeroFrase)
            
            let letraNumero = 0
            let numeroNumero = 0

            switch(letraFrase){
                case 'A':
                    letraNumero = 0
                    break;
                case 'B':
                    letraNumero = 1
                    break;
                case 'C':
                    letraNumero = 2
                    break;       
                case 'D':
                    letraNumero = 3
                    break; 
                case 'E':
                    letraNumero = 4
                    break; 
                case 'F':
                    letraNumero = 5
                    break; 
                case 'G':
                    letraNumero = 6
                    break; 
                case 'H':
                    letraNumero = 7
                    break; 
                case 'I':
                case 'Y':
                    letraNumero = 8
                    break; 
                case 'J':
                    letraNumero = 9
                    break;
                }

                switch(numeroFrase){
                case 'uno':
                    numeroNumero = 0
                    break;
                case 'dos':
                    numeroNumero = 1
                    break;
                case 'tres':
                    numeroNumero = 2
                    break;       
                case 'cuatro':
                    numeroNumero = 3
                    break; 
                case 'cinco':
                    numeroNumero = 4
                    break; 
                case 'seis':
                    numeroNumero = 5
                    break; 
                case 'siete':
                    numeroNumero = 6
                    break; 
                case 'ocho':
                    numeroNumero = 7
                    break; 
                case 'nueve':
                    numeroNumero = 8
                    break; 
                case 'diez':
                    numeroNumero = 9
                    break;
                default:
                    numeroNumero = 999
                    break;
                }   
            
            if (numeroFrase.length >= 3){
                let coordenadaNumero = 10 * letraNumero + numeroNumero
                console.log(coordenadaNumero)
                ensayoVoz(coordenadaNumero)
            } else {
                if (parseInt(numeroFrase) > 0 && parseInt(numeroFrase) < 11){
                    let coordenadaNumero = 10 * letraNumero + parseInt(numeroFrase)-1
                    console.log(coordenadaNumero)
                    resultado.value = numeroACoordenada(coordenadaNumero);
                    ensayoVoz(coordenadaNumero)
                } else {
                    console.log("Coordenadas incorrectas")
                }
                
            }

        }

        recognition.onerror = (event: Event) => {
            console.error('Error en el reconocimiento de voz', (event as SpeechRecognitionErrorEvent).error);
        }

        //recognition.start()
    }
    )
    
    onBeforeUnmount(() => {
        if (recognition){
        recognition.stop()
    }
    })

function sacaIndice(rowIndex: number, colIndex: number) {
    console.log(10 * rowIndex + colIndex)
}

async function ensayoClic(rowIndex: number, colIndex: number) {
    
    if (userId.value == match.value?.playerTurnId && (props.array[10 * rowIndex + colIndex] != 2 || props.array[10 * rowIndex + colIndex] != 3) ){
        
        console.log("te toca!!")

        await shootCoordinate({matchId: props.match,
            playerId: userId.value, 
            coordinate: 10 * rowIndex + colIndex})
            .then((response) => {
                if (response.data == 1){
                    tabla.value[rowIndex][colIndex] = 'agua'
                    match.value!.playerTurnId = props.rival
                    console.log(match.value?.playerTurnId)
                } else {
                    tabla.value[rowIndex][colIndex] = 'tocado'
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

async function ensayoVoz(coordenada: number) {
    
    if (userId.value == match.value?.playerTurnId && (props.array[coordenada] != 2 || props.array[coordenada] != 3) ){
        
        console.log("te toca!!")

        await shootCoordinate({matchId: props.match,
            playerId: userId.value, 
            coordinate: coordenada})
            .then((response) => {

                let row;
                let col;

                if (coordenada <= 9){
                    row = coordenada
                    col = 0
                } else {
                    col = parseInt(coordenada.toString().charAt(0))
                    row = parseInt(coordenada.toString().charAt(1))
            }

                if (response.data == 1){
                    tabla.value[col][row] = 'agua'
                    match.value!.playerTurnId = props.rival
                    console.log(match.value?.playerTurnId)
                } else {
                    tabla.value[col][row] = 'tocado'
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

for(let i=0; i<100; i++){
        let row = 0
        let col = 0
        if(props.array[i] == 2){

            if (i <= 9){
                row = i
                col = 0
            } else {
                col = parseInt(i.toString().charAt(0))
                row = parseInt(i.toString().charAt(1))
            }

            tabla.value[col][row] = 'agua'

        }
        if(props.array[i] == 3){

            if (i <= 9){
                row = i
                col = 0
            } else {
                col = parseInt(i.toString().charAt(0))
                row = parseInt(i.toString().charAt(1))
}

                tabla.value[col][row] = 'tocado'

}
    }

function numeroACoordenada(numero: number){
    const letraNumero = numero.toString().charAt(0)
    const numeroNumero = numero.toString().charAt(1)
    let letraLetra = ''
    let numeroLetra = ''

    switch (letraNumero){
        case '0':
            letraLetra = 'A'
            break;
        case '1':
            letraLetra = 'B'
            break;
        case '2':
            letraLetra = 'C'
            break;
        case '3':
            letraLetra = 'D'
            break;
        case '4':
            letraLetra = 'E'
            break;
        case '5':
            letraLetra = 'F'
            break;
        case '6':
            letraLetra = 'G'
            break;
        case '7':
            letraLetra = 'H'
            break;
        case '8':
            letraLetra = 'A'
            break;
        case '9':
            letraLetra = 'A'
            break;
    }

    numeroLetra = (parseInt(numeroNumero)+1).toString()

    return letraLetra + numeroLetra

}

onMounted(() => {
    const celdas = document.getElementById("tablaRival")!.getElementsByTagName("td");

    celdas[0].innerHTML = 'A/1'
    celdas[1].innerHTML = '2'
    celdas[2].innerHTML = '3'
    celdas[3].innerHTML = '4'
    celdas[4].innerHTML = '5'
    celdas[5].innerHTML = '6'
    celdas[6].innerHTML = '7'
    celdas[7].innerHTML = '8'
    celdas[8].innerHTML = '9'
    celdas[9].innerHTML = '10'

    celdas[10].innerHTML = 'B'
    celdas[20].innerHTML = 'C'
    celdas[30].innerHTML = 'D'
    celdas[40].innerHTML = 'E'
    celdas[50].innerHTML = 'F'
    celdas[60].innerHTML = 'G'
    celdas[70].innerHTML = 'H'
    celdas[80].innerHTML = 'I'
    celdas[90].innerHTML = 'J'

})

</script>
  
<style scoped lang="scss">
   
/* Estilos para la tabla */

.tauler-rival{
    display: flex;
    width: 75vw;
    height: 75vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8vh;
}

#tablaRival {

    border-collapse: collapse;
    margin: auto;

}

#tablaRival > tbody > tr > td {
    font-weight: bolder;
    color: white;
    font-size: 0.9em;
}

#tablaRival {
    border-collapse: collapse;
    margin: auto;
    margin-bottom: 1vh;
}
.turnoRival {

    width: 100%;
    border-collapse: collapse;
    margin: auto;
    margin-bottom: 5vh;
    opacity: 0.5;
}

/* Estilos para las celdas de la tabla */
td{
    position: relative;
    border: 1px solid #dddddd;
    width: 8vw;
    height: 7vw;
    background-color: #295e8d;
}

.ocupado{
  background-color: #959595;
}

.agua {
    background-color: #71a1ff;
}

.tocado {
    background-color: #e06666;
}

.cuadro-arrastrable {
  position: absolute;
  background-color: #66ccff;
  user-select: none;
}

.button-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

.button-container > button {
    width: 100%;
    height: 3vh;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

@media only screen and (max-width: 768px) and (orientation: landscape){
    .tauler-jugador{
        width: 40vw;
    }

    td{
        width: 3vw;
        height: 3vw;
    }

    table.taula-lletres{
        height: 95%;
        text-align: center;
    }

    table.taula-numeros{
        width: 65%;
        text-align: center;
        margin-right: 5vw;
    }
}

@media only screen and (max-width: 768px) and (orientation: portrait){

    table.taula-lletres{
        height: 94%;
        text-align: center;
    }

    table.taula-numeros{
        width: 90%;
        text-align: center;
        margin-left: 9vw;
    }
}
@media only screen and (min-width: 1024px) {
    .tauler-jugador{
    display: flex;
    margin-left: 5vw;
}

#tabla {

    border-collapse: collapse;
    margin: auto;
    margin-bottom: 5vh;
}

td{
    position: relative;
    border: 1px solid #dddddd;
    width: 3vw;
    height: 3vw;
    background-color: #295e8d;
}

table.taula-numeros{
    width: 78%;
    font-weight: bolder;
    margin-bottom: 0;
    margin-left: 22%;
}

.taula-numeros > tr, .taula-numeros > tr > td {
    border: hidden;
    background-color: #78aad7;
    font-weight:bolder;
    font-size: 1em;
}

table.taula-lletres{
    width: 3%;
    margin-left: 2%;
    height: 87%;
    text-align: center;
}

div > .taula-lletres > tr, div > .taula-lletres > tr > td {
    border: hidden;
    background-color: #78aad7;
    font-weight:bolder;
    font-size: 1;
}

.turnoRival {

    width: 90%;
    border-collapse: collapse;
    margin: auto;
    margin-bottom: 5vh;
    opacity: 0.5;
}
  }

  </style>
  