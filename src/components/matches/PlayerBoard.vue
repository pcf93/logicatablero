<template>

    <div class="tauler-previ">
    <table>

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
    import { ref } from 'vue'
    
    const props = defineProps({
    array: { type: Array<number>, required: true },
  })

    const tabla = ref(Array.from({ length: 10}, () => Array(10).fill('')))

    console.log(props.array)

    for(let i=0; i<100; i++){
        let row = 0
        let col = 0
        if(props.array[i] == 1){

            if (i <= 9){
                row = i
                col = 0
            } else {
                row = parseInt(i.toString().charAt(0))
                col = parseInt(i.toString().charAt(1))
            }

            tabla.value[row][col] = 'ocupado'

        }
    }

  </script>
  
  <style scoped lang="scss">
   
/* Estilos para la tabla */

table {
    width: 90%;
    border-collapse: collapse;
    margin: auto;
    margin-bottom: 5vh;
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
    .tauler-previ{
        width: 40vw;
    }

    td{
        width: 3vw;
        height: 3vw;
    }
}

@media only screen and (min-width: 1024px) {

    .tauler-previ{
    display: flex;
    align-items: center;
}
    
    table{
        width: 90%;
        margin: 0;
        margin-left: 10%;
    }

    td{
    position: relative;
    border: 1px solid #dddddd;
    width: 3vw;
    height: 3vw;
    background-color: #295e8d;
}
.button-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 40%;
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
    font-size: 1.4em
}
  }

  </style>
  