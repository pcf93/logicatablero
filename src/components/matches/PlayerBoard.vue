<template>
    <div class="tauler-jugador">
        <table id="tablaJugador" :class="{turnoRival: userId == match?.playerTurnId}">

        <tbody>

        <tr v-for="(fila, rowIndex) in tabla" :key="rowIndex">
            <td v-for="(clase, colIndex) in fila" :key="colIndex" :class="clase">
            </td>
        </tr>
            
        </tbody>

    </table>
    </div>
</template>
  
  <script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import { useLogin } from '@/core/componentLogic/useLogin';
    import { useMatches} from '@/core/componentLogic/useMatches'

    const { userId } = useLogin()
    const { match } = useMatches()

    const props = defineProps({
    array: { type: Array<number>, required: true },
  })

    const tabla = ref(Array.from({ length: 10}, () => Array(10).fill('')))
    
    function pintaTablero(){

        for(let i=0; i<100; i++){
        let row = 0
        let col = 0
        
        if(props.array[i] == 1){

            if (i <= 9){
                row = i
                col = 0
            } else {
                col = parseInt(i.toString().charAt(0))
                row = parseInt(i.toString().charAt(1))
            }

            tabla.value[col][row] = 'ocupado'

        }

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

    }

    pintaTablero()



    setInterval(
        function(){
            pintaTablero()
        }, 1000)
    
onMounted(() => {
    const celdas = document.getElementById("tablaJugador")!.getElementsByTagName("td");

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

.tauler-jugador{
    display: flex;
    width: 75vw;
    height: 75vw;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3vh;
}

#tablaJugador {

    border-collapse: collapse;
    margin: auto;

}

#tablaJugador > tbody > tr > td {
    font-weight: bolder;
    color: white;
    font-size: 0.9em;
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
    width: 89%;
    font-weight: bolder;
    margin-bottom: 0;
    margin-left: 10%;
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
    height: 90%;
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
  