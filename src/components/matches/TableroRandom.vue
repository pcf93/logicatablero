<template>
    <IniciarPartidaHeaderVue></IniciarPartidaHeaderVue>
    
    <RouterLink to="/home">
    <button class="btn btn-primary">Tornar al menu</button>
    </RouterLink>
    <div class="tauler-previ">
        <table>
            <tbody>
                <tr v-for="(fila, rowIndex) in tabla" :key="rowIndex">
                    <td v-for="(clase, colIndex) in fila" :key="colIndex" :class="clase">
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="button-container">
            <button class="btn btn-success" @click="cercaMatchmaking()">Partida VS rival aleatori</button>
            <button class="btn btn-success">Partida VS amic</button>
            <button class="btn btn-warning" @click="reiniciarTablero()">Canviar tauler</button>
        </div>
    </div>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="..." class="rounded mr-2" alt="...">
    <strong class="mr-auto">Bootstrap</strong>
    <small>11 mins ago</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">
    Hello, world! This is a toast message.
  </div>
</div>

</template>
  
<script setup lang="ts">

import { ref, reactive } from 'vue'
import { useLogin } from '@/core/componentLogic/useLogin';
import HomeOptions from '@/components/home/HomeOptions.vue'
import IniciarPartidaHeaderVue from '@/components/section_headers/IniciarPartidaHeader.vue';
import { findMatchmakingMatch, createMatchmakingMatch, joinMatchmakingMatch } from '@/core/services/APIMatchRequests'
import { SearchMatchmaking } from '@/type'
import HomeFooter from '../home/HomeFooter.vue';

interface IndexInfo {
    rowIndex: number;
    colIndex: number;
    direction: string;
    size: number;
}

const { userId, userName, isLogged, selectedOptionMobile, parseJwt, getCookie } = useLogin()
userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
userId.value = parseInt(Object.values(parseJwt(getCookie('JWT')))[2] as string)

const tabla = ref(Array.from({ length: 10 }, () => Array(10).fill('')))

const arrayIndex = ref<IndexInfo[]>([])
const matchData: SearchMatchmaking = reactive({
    playerId: userId.value,
    arrayPlayer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
})

const generarCuadros = (cantidad: number): void => {
    const cuadros: { rowIndex: number, colIndex: number, direction: string, size: number }[] = [];
    while (cuadros.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 1

        if (verificaIndices(rowIndex, colIndex, arrayIndex.value)) {
            cuadros.push({ rowIndex, colIndex, direction, size })
            arrayIndex.value.push({ rowIndex, colIndex, direction, size })
            matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
        }
    }
}

const generarFiguras2 = (cantidad: number): void => {
    const figuras: { rowIndex: number, colIndex: number, direction: string, size: number }[] = [];
    while (figuras.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);

        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 2;

        if (direction == "right") {
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 9);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 1, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 9);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex + 1, colIndex, arrayIndex.value)
        }

        if (verificaLado) {


            figuras.push({ rowIndex, colIndex, direction, size })
            arrayIndex.value.push({ rowIndex, colIndex, direction, size })
            matchData.arrayPlayer[10 * rowIndex + colIndex] = 1

            if (direction === "right") {
                colIndex++;

                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            } else {
                rowIndex++;

                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            }
        }
    }
}

const generarFiguras3 = (cantidad: number): void => {
    const figuras: { rowIndex: number, colIndex: number, direction: string, size: number }[] = [];
    while (figuras.length < cantidad) {
        var rowIndex;
        var colIndex;

        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 3;

        if (direction == "right") {
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 8);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 1, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 2, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 8);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex + 1, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex + 2, colIndex, arrayIndex.value)
        }

        if (verificaLado) {

            figuras.push({ rowIndex, colIndex, direction, size })
            arrayIndex.value.push({ rowIndex, colIndex, direction, size })
            matchData.arrayPlayer[10 * rowIndex + colIndex] = 1

            if (direction === "right") {
                colIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                colIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            } else {
                rowIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                rowIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            }

        }
    }
}

const generarFiguras4 = (cantidad: number): void => {
    const figuras: { rowIndex: number, colIndex: number, direction: string, size: number }[] = [];

    while (figuras.length < cantidad) {
        var rowIndex;
        var colIndex;

        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 4;

        if (direction == "right") {
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 7);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 1, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 2, arrayIndex.value) &&
                verificaIndices(rowIndex, colIndex + 3, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 7);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean =
                verificaIndices(rowIndex, colIndex, arrayIndex.value)
            verificaIndices(rowIndex + 1, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex + 2, colIndex, arrayIndex.value) &&
                verificaIndices(rowIndex + 3, colIndex, arrayIndex.value)
        }

        if (verificaLado) {

            figuras.push({ rowIndex, colIndex, direction, size })
            arrayIndex.value.push({ rowIndex, colIndex, direction, size })
            matchData.arrayPlayer[10 * rowIndex + colIndex] = 1

            if (direction === "right") {
                colIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                colIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                colIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            } else {
                rowIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                rowIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
                rowIndex++;
                arrayIndex.value.push({ rowIndex, colIndex, direction, size })
                matchData.arrayPlayer[10 * rowIndex + colIndex] = 1
            }
        }
    }
}

const verificaIndices = (rowIndexTest: number, colIndexTest: number, arrayIndex: IndexInfo[]): boolean => {

    var esValido: boolean = true

    for (const index of arrayIndex) {
        if (
            (index.colIndex === colIndexTest && index.rowIndex === rowIndexTest) ||
            ((index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1) && index.rowIndex === rowIndexTest) ||
            (index.colIndex === colIndexTest && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1)) ||
            ((index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1) && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1))
        ) {
            esValido = false;
            break;
        }
    }

    return esValido

}

const asignarClaseOcupado = () => {

    generarFiguras4(1);
    generarFiguras3(2);
    generarFiguras2(3);
    generarCuadros(4);

    arrayIndex.value.forEach(elemento => {
        const { rowIndex, colIndex, direction, size } = elemento;

        tabla.value[rowIndex][colIndex] = "ocupado";

    })

}

function reiniciarTablero() {

    matchData.arrayPlayer = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]

    arrayIndex.value.forEach(elemento => {
        const { rowIndex, colIndex } = elemento;

        tabla.value[rowIndex][colIndex] = "";

    })
    arrayIndex.value = []

    asignarClaseOcupado()

}



asignarClaseOcupado();



async function cercaMatchmaking() {

    await findMatchmakingMatch()
        .then(() => {

            joinMatchmakingMatch(matchData)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                    console.log(matchData)
                })

        })
        .catch(() => {

            createMatchmakingMatch(matchData)
                .then((response) => {
                    console.log(response)

                })
                .catch((error) => {
                    console.log(error)
                    console.log(matchData)
                })

        })

}

</script>
  
<style scoped lang="scss">
/* Estilos para la tabla */

.button-container{
    display: flex;
    flex-direction: column;
}

.button-container > button {
    margin-top: 2vh;
}

@media only screen and (max-width: 768px) and (orientation: portrait){

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
}

@media only screen and (max-width: 768px) and (orientation: landscape){

.tauler-previ {
display: flex;
align-items: center;
flex-wrap: nowrap;
}

table {
width: 40%;
border-collapse: collapse;
margin: auto;
}

/* Estilos para las celdas de la tabla */
td {
position: relative;
border: 1px solid #dddddd;
width: 4vw;
height: 4vw;
background-color: #295e8d;
}

.ocupado {
background-color: #959595;
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
width: 40%;
margin-left: auto;
margin-right: auto;
margin-bottom: 15vh;
}

.button-container>button {
width: 100%;
height: 10vh;
margin-top: 1vh;
border-radius: 2vh;
background-color: rgb(160, 22, 22);
color: white;
font-weight: bolder;
}
}

@media only screen and (min-width: 1024px) {

    .tauler-previ {
        display: flex;
        align-items: center;
    }

    table {
        width: 30%;
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

    .ocupado {
    background-color: #959595;
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
  