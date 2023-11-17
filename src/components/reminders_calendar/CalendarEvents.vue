<template>
  <div class="calendar">
    <div class="month-selector">
      <button id="previous-month" @click="mesAnterior">
        <img src="@/assets/images/left-arrow.png" />
      </button>
      <div class="calendar-text">
        <span class="calendar-headers">{{ month }} {{ year }}</span>
      </div>
      <button id="next-month" @click="mesSiguiente">
        <img src="@/assets/images/right-arrow.png" />
      </button>
    </div>
    <div class="selected-calendar">
      <table id="calendario">
        <thead>
          <th>S</th>
          <th>M</th>
          <th>T</th>
          <th>W</th>
          <th>T</th>
          <th>F</th>
          <th>S</th>
        </thead>

        <tr v-for="(fila, rowIndex) in $props.arrayProp" :key="rowIndex">
          <td
            v-for="(elemento, colIndex) in fila"
            :key="colIndex"
            @click="muestraEventos"
          >
            <div class="circle-select"></div>
            <div
              class="default"
              @click="selectDay"
              :class="{ hasEvents: $props.arrayHasEvents[rowIndex][colIndex] }"
            >
              <span>{{ elemento }}</span>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: [
      'day',
      'month',
      'numberMonth',
      'year',
      'fullDay',
      'arrayCalendario',
      'setCalendar',
      'arrayProp',
      'diaSeleccionado',
      'mesSeleccionado',
      'muestraEventosDia',
      'arrayHasEvents',
    ],
    data() {
      let arrS: boolean[][] = []
      return {
        arraySelect: arrS,
      }
    },
    methods: {
      mesAnterior() {
        const tabla = document.getElementById('calendario')
        const celdas = tabla?.getElementsByClassName('circle-selected')

        for (let i = 0; i < celdas!.length; i++) {
          celdas![i].classList.replace('circle-selected', 'default')
        }

        this.$emit('mesAnterior', this.fullDay.getMonth())
        this.setCalendar()
      },
      mesSiguiente() {
        const tabla = document.getElementById('calendario')
        const celdas = tabla?.getElementsByClassName('circle-selected')

        for (let i = 0; i < celdas!.length; i++) {
          celdas![i].classList.replace('circle-selected', 'default')
        }

        this.$emit('mesSiguiente', this.fullDay.getMonth())
        this.setCalendar()
      },
      muestraEventos(e: Event) {
        let valor = (e.currentTarget as HTMLElement).textContent
        if (valor === '') {
          valor = '1'
        }
        this.$emit('verDia', valor, this.fullDay.getMonth())
        this.muestraEventosDia(valor, this.fullDay.getMonth())
      },
      selectDay(e: Event) {
        const element = e.currentTarget as HTMLElement
        const tabla = document.getElementById('calendario')
        const celdas = tabla?.getElementsByClassName('circle-selected')

        for (let i = 0; i < celdas!.length; i++) {
          celdas![i].classList.replace('circle-selected', 'default')
        }

        let currentClass = element.classList[0]
        console.log(currentClass)
        if (currentClass === 'default' || currentClass === 'hasEvents') {
          element.classList.replace(currentClass, 'circle-selected')
        } else {
          element.classList.replace(currentClass, 'default')
        }
      },
    },
  }
</script>
<style scoped lang="scss">
  .calendar-headers {
    color: grey;
    font-weight: 800;
    text-align: center;
  }

  .calendar-text {
    width: 100px;
    margin: 20px;
    text-align: center;
  }

  .calendar {
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: nowrap;
    flex-direction: column;
  }

  .month-selector {
    display: flex;
    gap: 10%;
    justify-content: center;
  }

  #previous-month,
  #next-month {
    border: none;
    background-color: white;
    cursor: pointer;
  }

  button > img {
    width: 20px;
  }

  .selected-calendar {
    height: 100%;
    text-align: center;
  }

  .selected-calendar > table {
    width: 250px;
    text-align: center;
  }

  thead {
    height: 30px;
    background-color: #28a893;
    border-left: 1px solid #28a893;
    border-right: 1px solid #28a893;
  }

  td {
    position: relative;
    height: 30px;
    z-index: 1;
    cursor: pointer;
  }

  .hasEvents {
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: -1;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: #ff9b77;
    text-align: center;
    color: white;
    font-weight: bold;
  }

  .hasEvents > span {
    position: relative;
    top: 4px;
  }
  .circle-selected {
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: -1;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: orangered;
    color: white;
    font-weight: bold;
  }

  .circle-selected > span {
    position: relative;
    top: 4px;
  }
  .number-selected {
    font-weight: bold;
    color: white;
  }

  .number-not-selected {
    font-weight: bold;
    color: white;
  }

  $breakpoint-mobile: 640px;
  $breakpoint-tablet: 1024px;

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .calendar {
      display: flex;
      width: 40%;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .month-selector {
      display: flex;
      padding: 20px;
      gap: 30%;
      justify-content: center;
    }
  }

  @media only screen and (min-width: 1024px) {
    .calendar {
      display: flex;
      width: 50%;
      align-items: center;
      flex-wrap: nowrap;
      flex-direction: column;
    }

    .month-selector {
      display: flex;
      padding: 20px;
      gap: 50%;
      justify-content: center;
    }
  }
</style>
