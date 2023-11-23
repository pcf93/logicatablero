<template>
    <div class="tauler-previ">
        <table>

            <tbody>

                <tr v-for="(fila, rowIndex) in tabla" :key="rowIndex">
                    <td v-for="(clase, colIndex) in fila" :key="colIndex" :class="clase"
                        @click="ensayoClic(rowIndex, colIndex)">
                    </td>
                </tr>

            </tbody>

        </table>
    </div>
</template>
  
<script setup lang="ts">
import { table } from 'console';
import { ref, reactive } from 'vue'
import { useLogin } from '@/core/componentLogic/useLogin'
import { useMatches } from '@/core/componentLogic/useMatches'
import { shootCoordinate } from '@/core/services/APIMatchRequests'
import { ShootCoordinate } from '@/type'

const tabla = ref(Array.from({ length: 10 }, () => Array(10).fill('')))
const { userId } = useLogin()
const { match } = useMatches()


const transcription = ref<string>('')
let recognition: SpeechRecognition | null = null;

const props = defineProps({
    array: { type: Array<number>, required: true },
    turn: { type: Number, required: true},
    match: { type: Number, required: true},
    rival: { type: Number, required: true},
})

const rival = ref<number>(props.rival)

recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
        const results = event.results;
        const frase = results[results.length - 1][0].transcript;
        console.log(frase)
    }

    recognition.onerror = (event: Event) => {
        console.error('Error en el reconocimiento de voz', (event as SpeechRecognitionErrorEvent).error);
    }

    // mirate este video, puede ayudarte https://www.youtube.com/watch?v=jIUW1_fzDAE

const beforeUnmount = (): void => {
    if (recognition){
        recognition.stop()
    }
}



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

</script>
  
<style scoped lang="scss">
/* Estilos para la tabla */

.tauler-previ {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

table {
    width: 90%;
    border-collapse: collapse;
    margin: auto;
}

/* Estilos para las celdas de la tabla */
td {
    position: relative;
    border: 1px solid #dddddd;
    width: 9vw;
    height: 9vw;
    background-color: #295e8d;
}

.ocupado {
    background-color: #959595;
}

.agua {
    background-color: rgb(16, 237, 237);
}

.tocado {
    background-color: #ff0000;
}

.cuadro-arrastrable {
    position: absolute;
    background-color: #66ccff;
    user-select: none;
}

.button-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

.button-container>button {
    width: 100%;
    height: 3vh;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

@media only screen and (max-width: 768px) and (orientation: landscape){
    .tauler-previ{
        width: 40vw;
    }

    td{
        width: 3vw;
        height: 3vw;
    }
}

@media only screen and (min-width: 1024px) {

    .tauler-previ {
        display: flex;
        align-items: center;
    }

    table {
        width: 90%;
        margin: 0;
        margin-left: 10%;
    }

    td {
        position: relative;
        border: 1px solid #dddddd;
        width: 3vw;
        height: 3vw;
        background-color: #295e8d;
    }

    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 40%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 15vh;
    }

    .button-container>button {
        width: 100%;
        height: 3vh;
        margin-top: 1vh;
        border-radius: 2vh;
        background-color: rgb(160, 22, 22);
        color: white;
        font-weight: bolder;
        font-size: 1.4em
    }
}
</style>
  