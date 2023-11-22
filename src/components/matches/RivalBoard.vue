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
    
    const tabla = ref(Array.from({ length: 10}, () => Array(10).fill('')))

  </script>
  
  <style scoped lang="scss">
   
/* Estilos para la tabla */

.tauler-previ{
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

@media only screen and (min-width: 1024px) {

    .tauler-previ{
    display: flex;
    align-items: center;
}
    
    table{
        width: 30%;
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
  