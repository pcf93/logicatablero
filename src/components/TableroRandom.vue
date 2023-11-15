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

    const generarCuadros = (cantidad: number): {rowIndex: number, colIndex: number, direction: string, size: number}[] => {
    const cuadros: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (cuadros.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 1

        if (verificaIndices(rowIndex, colIndex, arrayIndex.value)){
            cuadros.push({rowIndex, colIndex, direction, size})
            arrayIndex.value.push({rowIndex, colIndex, direction, size})
        }
    }
    return cuadros;
}

    console.log(arrayIndex.value)

    const generarFiguras2 = (cantidad: number): {rowIndex: number, colIndex: number, direction: string, size: number}[] => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (figuras.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 2;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 9);
            var verificaLado: boolean = verificaIndices(rowIndex, colIndex+1, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 9);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean = verificaIndices(rowIndex +1, colIndex, arrayIndex.value)
        }
        
        if (verificaIndices(rowIndex, colIndex, arrayIndex.value) || verificaLado){

            arrayIndex.value.push({rowIndex, colIndex, direction, size})
            figuras.push({rowIndex, colIndex, direction, size})

            if (direction === "right"){
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            } else {
                rowIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            }
        
    }}
    return figuras;
}

const generarFiguras3 = (cantidad: number): {rowIndex: number, colIndex: number, direction: string, size: number}[] => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (figuras.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 3;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 8);
            
            const celda1 = verificaIndices(rowIndex, colIndex+1, arrayIndex.value)
            const celda2 = verificaIndices(rowIndex, colIndex+2, arrayIndex.value)
            
            var verificaLado: boolean = 
            celda1 && celda2
        } else {
            rowIndex = Math.floor(Math.random() * 8);
            colIndex = Math.floor(Math.random() * 10);
            
            const celda1 = verificaIndices(rowIndex+1, colIndex, arrayIndex.value)
            const celda2 = verificaIndices(rowIndex+2, colIndex+2, arrayIndex.value)

            var verificaLado: boolean = 
            verificaIndices(rowIndex+1, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+2, colIndex, arrayIndex.value)
        }
        
        if (verificaIndices(rowIndex, colIndex, arrayIndex.value) || verificaLado){

            arrayIndex.value.push({rowIndex, colIndex, direction, size})
            figuras.push({rowIndex, colIndex, direction, size})

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
    return figuras;
}

const generarFiguras4 = (cantidad: number): {rowIndex: number, colIndex: number, direction: string, size: number}[] => {
    const figuras: {rowIndex: number, colIndex: number, direction: string, size: number}[] = [];
    while (figuras.length < cantidad) {
        var rowIndex = Math.floor(Math.random() * 10);
        var colIndex = Math.floor(Math.random() * 10);
        
        const direction = Math.random() < 0.5 ? "right" : "down";
        const size = 4;

        if (direction == "right"){
            rowIndex = Math.floor(Math.random() * 10);
            colIndex = Math.floor(Math.random() * 7);
            var verificaLado: boolean = 
            verificaIndices(rowIndex, colIndex+1, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+2, arrayIndex.value) &&
            verificaIndices(rowIndex, colIndex+3, arrayIndex.value)
        } else {
            rowIndex = Math.floor(Math.random() * 7);
            colIndex = Math.floor(Math.random() * 10);
            var verificaLado: boolean = 
            verificaIndices(rowIndex+1, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+2, colIndex, arrayIndex.value) &&
            verificaIndices(rowIndex+3, colIndex, arrayIndex.value)
        }
        
        if (verificaIndices(rowIndex, colIndex, arrayIndex.value) || verificaLado){

            arrayIndex.value.push({rowIndex, colIndex, direction, size})
            figuras.push({rowIndex, colIndex, direction, size})

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
                colIndex++;
                arrayIndex.value.push({rowIndex, colIndex, direction, size})
            }
        
    }}
    return figuras;
}

const verificaIndices = (rowIndexTest: number, colIndexTest: number, arrayIndex: IndexInfo[] ): boolean => {
        
        var esValido: boolean = true

        for (const index of arrayIndex){
            if ( (index.colIndex === colIndexTest && index.rowIndex === rowIndexTest) ||
                 (index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1 && index.rowIndex === rowIndexTest) ||
                 ((index.colIndex === colIndexTest + 1 || index.colIndex === colIndexTest - 1) && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1)) ||
                 (index.colIndex === colIndexTest && (index.rowIndex === rowIndexTest + 1 || index.rowIndex === rowIndexTest - 1)) ){
                    esValido = false
                    break;
                 }
        }
        console.log(esValido)
        return esValido
        
    }

const asignarClaseOcupado = () => {
    
    const figuras3 = generarFiguras3(2);
    const figuras = generarFiguras2(3);
    const cuadros = generarCuadros(4);

    const elementos = figuras3.concat(figuras.concat(cuadros));

    elementos.forEach(elemento => {
        const {rowIndex, colIndex, direction, size} = elemento;
        if (direction){
            tabla.value[rowIndex][colIndex] = "ocupado";
            if (direction === "right" && size === 2){
                tabla.value[rowIndex][colIndex + 1] = "ocupado";
            } 
            if (direction === "down" && size === 2) {
                tabla.value[rowIndex + 1][colIndex] = "ocupado";
            }
            if (direction === "right" && size === 3){
                tabla.value[rowIndex][colIndex + 1] = "ocupado";
                tabla.value[rowIndex][colIndex + 2] = "ocupado";
            } 
            if (direction === "down" && size === 3) {
                tabla.value[rowIndex + 1][colIndex] = "ocupado";
                tabla.value[rowIndex + 2][colIndex] = "ocupado";
            }
            if (direction === "right" && size === 4){
                tabla.value[rowIndex][colIndex + 1] = "ocupado";
                tabla.value[rowIndex][colIndex + 2] = "ocupado";
                tabla.value[rowIndex][colIndex + 3] = "ocupado";
            } 
            if (direction === "down" && size === 4) {
                tabla.value[rowIndex + 1][colIndex] = "ocupado";
                tabla.value[rowIndex + 2][colIndex] = "ocupado";
                tabla.value[rowIndex + 2][colIndex] = "ocupado";
            }
        }
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
  