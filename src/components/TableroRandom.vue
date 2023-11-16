<template>
    
    <table>

        <tbody>

        <tr v-for="(fila, rowIndex) in tabla" :key="rowIndex">
            <td v-for="(clase, colIndex) in fila" :key="colIndex" :class="clase">
            </td>
        </tr>
            
        </tbody>

    </table>


</template>
  
  <script setup lang="ts">

    import { ref } from 'vue'

    interface IndexInfo {
  rowIndex: number;
  colIndex: number;
  direction: string;
  size: number;
}

    const tabla = ref(Array.from({ length: 10}, () => Array(10).fill('')))

    const arrayIndex = ref<IndexInfo[]>([])

    const generarCuadros = (cantidad: number): void => {
    const cuadros: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (cuadros.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 1

        console.log(arrayIndex.value)
        
        if (verificaIndices(rowIndex, colIndex, arrayIndex.value)){
            cuadros.push({rowIndex, colIndex, direction, size})
            arrayIndex.value.push({rowIndex, colIndex, direction, size})
        }
    }
}

    console.log(arrayIndex.value)

    const generarFiguras2 = (cantidad: number): void => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (figuras.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 2;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 9);
            console.log(rowIndex, colIndex)
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+1, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 9);
            colIndex = Math.floor(Math.random() * 10);
            console.log(rowIndex, colIndex)
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex +1, colIndex, arrayIndex.value)
        }
        
        console.log(verificaLado)
        
        if (verificaLado){

            
            figuras.push({rowIndex, colIndex, direction, size})
            arrayIndex.value.push({rowIndex, colIndex, direction, size})

            if (direction === "right"){
                colIndex++;
                
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            } else {
                rowIndex++;
                
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            }
        
    }}
}

const generarFiguras3 = (cantidad: number): void => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (figuras.length < cantidad) {
        var rowIndex;
        var colIndex;
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 3;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 8);
            console.log(rowIndex, colIndex)
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+1, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+2, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 8);
            colIndex = Math.floor(Math.random() * 10);
            console.log(rowIndex, colIndex)
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+1, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+2, colIndex, arrayIndex.value)
        }
        
        console.log(verificaLado)
        
        if (verificaLado){
            
            figuras.push({rowIndex, colIndex, direction, size})
            arrayIndex.value.push({rowIndex, colIndex, direction, size})

            if (direction === "right"){
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            } else {
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            }
        
    }}
}

const generarFiguras4 = (cantidad: number): void => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];

    while (figuras.length < cantidad) {
        var rowIndex;
        var colIndex;
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 4;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 7);
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+1, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+2, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+3, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 7);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex, arrayIndex.value)
            verificaIndices(rowIndex+1, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+2, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+3, colIndex, arrayIndex.value)
        }
        
        console.log(verificaLado)
        
        if (verificaLado){

            figuras.push({rowIndex, colIndex, direction, size})
            arrayIndex.value.push({rowIndex, colIndex, direction, size})

            if (direction === "right"){
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            } else {
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            }
        }}
}

const verificaIndices = (rowIndexTest: number, colIndexTest: number, arrayIndex: IndexInfo[] ): boolean => {
        
        var esValido: boolean = true

        for (const index of arrayIndex){
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

    console.log(arrayIndex.value)

    arrayIndex.value.forEach(elemento => {
        const {rowIndex, colIndex, direction, size} = elemento;

            tabla.value[rowIndex][colIndex] = "ocupado";

    })
}

asignarClaseOcupado();

  </script>
  
  <style scoped lang="scss">
   
/* Estilos para la tabla */
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

/* Estilos para las celdas de la tabla */
td{
    position: relative;
  border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    width: 60px;
    height: 60px;
}

.ocupado{
  background-color: #ffcc00;
}

.cuadro-arrastrable {
  position: absolute;
  background-color: #66ccff;
  user-select: none;
}

  </style>
  