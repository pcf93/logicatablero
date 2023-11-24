<template>
<table class="taula-numeros" cellspacing="0" cellpadding="0">
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
        </tr>
    </table>
    <div class="tauler-jugador">
        <table class="taula-lletres" cellspacing="0" cellpadding="0">
        <tr>
            <td>A</td>
        </tr>
        <tr>
            <td>B</td>
        </tr>
        <tr>
            <td>C</td>
        </tr>
        <tr>
            <td>D</td>
        </tr>
        <tr>
            <td>E</td>
        </tr>
        <tr>
            <td>F</td>
        </tr>
        <tr>
            <td>G</td>
        </tr>
        <tr>
            <td>H</td>
        </tr>
        <tr>
            <td>I</td>
        </tr>
        <tr>
            <td>J</td>
        </tr>
    </table>
        <table id="tabla" :class="{turnoRival: userId == match?.playerTurnId}">

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
    

    

  </script>
  
  <style scoped lang="scss">
   
/* Estilos para la tabla */

.tauler-jugador{
    display: flex;
}

#tabla {
    width: 90%;
    height: 80%;
    border-collapse: collapse;
    margin: auto;
    margin-bottom: 5vh;
}

table.taula-numeros{
    width: 90vw;
    font-weight: bolder;
    margin-bottom: 0;
    margin-left: 7.5vw;
}

.taula-numeros > tr, .taula-numeros > tr > td {
    border: hidden;
    background-color: #78aad7;
    font-weight:bolder;
    font-size: 1em;
}

table.taula-lletres{
    width: 7.5%;
    height: 88%;
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

/* Estilos para las celdas de la tabla */
td{
    position: relative;
    border: 1px solid #dddddd;
    width: 9vw;
    height: 9vw;
    background-color: #295e8d;
}

.ocupado{
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
  