<template>
    
    <table>

        <tbody>

            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            <tr>
                <td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>
            </tr>
            
        </tbody>

    </table>

    <div
      ref="cuadroArrastrable"
      class="cuadro-arrastrable"
      @mousedown="iniciarArrastre"
      @mousemove="moverCuadro"
      @mouseup="finalizarArrastre"
    >
    </div>
</template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  const celdas = ref<HTMLCollectionOf<HTMLTableCellElement> | null>(null)
  const tableRect = ref<DOMRect | undefined>(undefined)
  const cuadroArrastrable = ref<HTMLDivElement | null>(null) 
  let cuadroVisible = false
  let isArrastrando = false
  let offsetX = 0
  let offsetY = 0 
  let cuadroAlto = 0
  let cuadroAncho = 0
  let posInicialX = ref<number>(0)
  let posInicialY = ref<number>(0)
  

  onMounted(() => {
    celdas.value = document.getElementsByTagName('td')
    tableRect.value = document.querySelector('table')?.getBoundingClientRect();


    pintarYMostrarCuadro()
  })

  const pintarYMostrarCuadro = () => {
  if (celdas.value) {
    const indiceAleatorio = Math.floor(Math.random() * celdas.value.length);
    const celdaSeleccionada = celdas.value[indiceAleatorio];

    if (cuadroArrastrable.value) {
      // Obtener dimensiones de la celda
      const celdaRect = celdaSeleccionada.getBoundingClientRect();
      
      cuadroAncho = celdaRect.width;
      cuadroAlto = celdaRect.height;

      // Posicionar el cuadro sobre la celda seleccionada
      cuadroArrastrable.value.style.left = `${celdaRect.left}px`;
      cuadroArrastrable.value.style.top = `${celdaRect.top}px`;
      cuadroArrastrable.value.style.width = `${celdaRect.width}px`
      cuadroArrastrable.value.style.height = `${celdaRect.height}px`

      cuadroVisible = true;
    }
  }
};

const iniciarArrastre = (event: MouseEvent) => {
  if (cuadroArrastrable.value) {
    isArrastrando = true;
    const cuadroRect = cuadroArrastrable.value.getBoundingClientRect();
    offsetX = event.clientX - cuadroRect.left;
    offsetY = event.clientY - cuadroRect.top;
    posInicialX.value = cuadroRect.x
    posInicialY.value = cuadroRect.y
  }
};

const moverCuadro = (event: MouseEvent) => {
  if (isArrastrando && cuadroArrastrable.value && celdas.value) {
    const cuadroRect = cuadroArrastrable.value.getBoundingClientRect();

    // Verificar si el cuadro se está moviendo fuera de los límites de la tabla
    if (
      cuadroRect.left < tableRect.value!.left ||
      cuadroRect.right > tableRect.value!.right ||
      cuadroRect.top < tableRect.value!.top ||
      cuadroRect.bottom > tableRect.value!.bottom
    ) {
      // Ajustar la posición del cuadro para que permanezca dentro de los límites de la tabla
      const nuevaPosX = Math.min(
        Math.max(cuadroRect.left, tableRect.value!.left),
        tableRect.value!.right - cuadroRect.width
      );

      const nuevaPosY = Math.min(
        Math.max(cuadroRect.top, tableRect.value!.top),
        tableRect.value!.bottom - cuadroRect.height
      );

      cuadroArrastrable.value.style.left = `${nuevaPosX}px`;
      cuadroArrastrable.value.style.top = `${nuevaPosY}px`;
    } else {
      cuadroArrastrable.value.style.left = `${event.clientX - offsetX}px`;
      cuadroArrastrable.value.style.top = `${event.clientY - offsetY}px`;
    }
  }
};

const finalizarArrastre = () => {
  if (cuadroArrastrable.value && celdas.value) {
    const cuadroRect = cuadroArrastrable.value.getBoundingClientRect();

    const posFinalX = cuadroRect.x
    const posFinalY = cuadroRect.y

    console.log(posInicialX.value)
    console.log(posInicialY.value)
    console.log(posFinalX)
    console.log(posFinalY)

    for (const celda of celdas.value) {
      const celdaRect = celda.getBoundingClientRect();

      if (
        cuadroRect.left != celdaRect.left ||
        cuadroRect.right != celdaRect.right ||
        cuadroRect.top != celdaRect.top ||
        cuadroRect.bottom != celdaRect.bottom
      ) {

        // Posicionar el cuadro en el centro de la celda seleccionada
        const correccionX = (posFinalX - posInicialX.value) % celdaRect.width
        const correccionY = (posFinalY - posInicialY.value) % celdaRect.width


        console.log(posFinalX - posInicialX.value)
        console.log(posFinalY - posInicialY.value)
        console.log(correccionX)
        console.log(correccionY)

        cuadroArrastrable.value.style.left = `${cuadroRect.left - correccionX}px`;
        cuadroArrastrable.value.style.top = `${cuadroRect.top - correccionY}px`;

        break; // Romper el bucle una vez que se encuentra la celda
      }
    }
  }

  isArrastrando = false;
};

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
  cursor: grab;
  user-select: none;
}

  </style>
  