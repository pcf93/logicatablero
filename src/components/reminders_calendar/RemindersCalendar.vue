<template>
  <section class="reminders">
    <div class="calendar-box">
      <TodayAppointments
        :appointments="appointments"
        :appointmentsFiltered="appointmentsFiltered"
        :diaSeleccionado="diaSeleccionado"
        :month="month"
        :numberMonth="numberMonth"
        :year="year"
        :weekday="weekday"
        :fullDay="fullDay"
        :deleteAppointment="deleteAppointment"
        @sendAppointment="sendAppointment"
      />
      <CalendarEvents
        :month="month"
        :numberMonth="numberMonth"
        :weekday="weekday"
        :year="year"
        :fullDay="fullDay"
        :arrayProp="arrayProp"
        :setCalendar="setCalendar"
        :diaSeleccionado="diaSeleccionado"
        :mesSeleccionado="mesSeleccionado"
        :muestraEventosDia="muestraEventosDia"
        :arrayHasEvents="arrayHasEvents"
        @mesAnterior="mesAnterior"
        @mesSiguiente="mesSiguiente"
        @verDia="actualizarDiaSeleccionado"
      />
    </div>
  </section>
</template>

<script lang="ts">
  import { Appointment } from '@/type'
  import CalendarEvents from './CalendarEvents.vue'
  import TodayAppointments from './TodayAppointments.vue'

  export default {
    data() {
      const months = [
        'JANUARY',
        'FEBRUARY',
        'MARCH',
        'APRIL',
        'MAY',
        'JUNE',
        'JULY',
        'AUGUST',
        'SEPTEMBER',
        'OCTOBER',
        'NOVEMBER',
        'DECEMBER',
      ]
      const wkD = [
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
      ]
      const appData: Appointment[] = [
        {
          id: 1,
          title: 'Dentista',
          summary: 'Dr. Mengueche',
          day: '13',
          month: '6',
          year: '2023',
          hour: '14:30',
          description: 'A comer una paellita con el dentista',
        },
        {
          id: 2,
          title: 'Padel surf',
          summary: 'Quedar con María',
          day: '18',
          month: '8',
          year: '2023',
          hour: '09:15',
          description: 'Cuidado con la mar que estará picada!',
        },
        {
          id: 3,
          title: 'Clase de pilates',
          summary: 'David el Gnomo',
          day: '11',
          month: '9',
          year: '2023',
          hour: '21:15',
          description: 'Menuda flexibilidad tiene el cabrón',
        },
        {
          id: 4,
          title: 'Vermouth y carreras',
          summary: 'Llamar a Fernando Alonso',
          day: '1',
          month: '7',
          year: '2023',
          hour: '13:00',
          description: 'Qué grande eres MAGIC!',
        },
      ]
      const today = new Date()
      return {
        monthsText: months as string[],
        fullDay: today as Date,
        weekdays: wkD as string[],
        weekday: wkD[today.getDay()] as string,
        month: months[today.getMonth()] as string,
        numberMonth: today.getMonth() as number,
        year: today.getFullYear() as number,
        arrayProp: [] as string[][],
        arrayHasEvents: [] as boolean[][],
        appointments: appData as Appointment[],
        appointmentsFiltered: appData as Appointment[],
        diaSeleccionado: today.getDate() as number,
        mesSeleccionado: 0 as number,
      }
    },
    components: {
      TodayAppointments,
      CalendarEvents,
    },
    methods: {
      setCalendar() {
        let firstDaySet = false
        let arrayDays: string[] = []
        let arrayMontado: string[][] = []
        let arrayHasEvents: boolean[] = []
        let arrayHasEventsMontado: boolean[][] = []

        const firstDay = new Date(
          this.fullDay.getFullYear(),
          this.fullDay.getMonth(),
          1
        )
        const lastDay = new Date(
          this.fullDay.getFullYear(),
          this.fullDay.getMonth() + 1,
          0
        )

        for (let i = 0; i < 42; i++) {
          if (!firstDaySet) {
            if (i === firstDay.getDay()) {
              firstDaySet = true
              arrayDays[i] = '1'
              arrayHasEvents[i] = this.hasEvents(
                arrayDays[i],
                firstDay.getMonth().toString()
              )
            } else {
              arrayDays[i] = ''
              arrayHasEvents[i] = this.hasEvents(
                arrayDays[i],
                firstDay.getMonth().toString()
              )
            }
          } else {
            if (i > lastDay.getDate() + firstDay.getDay() - 1) {
              arrayDays[i] = ''
              arrayHasEvents[i] = this.hasEvents(
                arrayDays[i],
                firstDay.getMonth().toString()
              )
            } else {
              arrayDays[i] = (i - firstDay.getDay() + 1).toString()
              arrayHasEvents[i] = this.hasEvents(
                arrayDays[i],
                firstDay.getMonth().toString()
              )
            }
          }
        }

        arrayMontado[0] = arrayDays.slice(0, 7)
        arrayMontado[1] = arrayDays.slice(7, 14)
        arrayMontado[2] = arrayDays.slice(14, 21)
        arrayMontado[3] = arrayDays.slice(21, 28)
        arrayMontado[4] = arrayDays.slice(28, 35)
        arrayMontado[5] = arrayDays.slice(35)

        arrayHasEventsMontado[0] = arrayHasEvents.slice(0, 7)
        arrayHasEventsMontado[1] = arrayHasEvents.slice(7, 14)
        arrayHasEventsMontado[2] = arrayHasEvents.slice(14, 21)
        arrayHasEventsMontado[3] = arrayHasEvents.slice(21, 28)
        arrayHasEventsMontado[4] = arrayHasEvents.slice(28, 35)
        arrayHasEventsMontado[5] = arrayHasEvents.slice(35)

        this.arrayProp = arrayMontado
        this.arrayHasEvents = arrayHasEventsMontado
      },
      mesAnterior(mes: number) {
        this.fullDay.setMonth(this.fullDay.getMonth() - 1)

        this.month = this.monthsText[this.fullDay.getMonth()]
        this.year = this.fullDay.getFullYear()
        this.mesSeleccionado = mes
      },
      mesSiguiente(mes: number) {
        this.fullDay.setMonth(this.fullDay.getMonth() + 1)

        this.month = this.monthsText[this.fullDay.getMonth()]
        this.year = this.fullDay.getFullYear()
        this.mesSeleccionado = mes
      },
      actualizarDiaSeleccionado(dia: number, mes: number) {
        this.diaSeleccionado = dia
        this.mesSeleccionado = mes
      },
      muestraEventosDia(dia: string, mes: string) {
        const eventosFiltrados: Appointment[] = []

        this.appointments.forEach((element) => {
          if (element.day == dia && element.month == mes) {
            eventosFiltrados.push(element)
          }
        })

        this.appointmentsFiltered = eventosFiltrados
        this.fullDay.setDate(parseInt(dia))
        this.fullDay.setMonth(parseInt(mes))
        this.weekday = this.weekdays[this.fullDay.getDay()]
      },
      hasEvents(dia: string, mes: string) {
        let arrayHasEvents: Appointment[] = []
        let hasEvents = false
        this.appointments.forEach((element) => {
          if (element.day == dia && element.month == mes) {
            arrayHasEvents.push(element)
          }
        })
        if (arrayHasEvents.length > 0) {
          hasEvents = true
        }
        return hasEvents
      },
      sendAppointment(appointment: Appointment) {
        const newAppointment: Appointment = {
          id: appointment.id,
          title: appointment.title,
          summary: appointment.summary,
          description: appointment.description,
          day: appointment.day,
          month: appointment.month,
          year: appointment.year,
          hour: appointment.hour,
        }

        this.appointments.push(newAppointment)
        console.log(this.appointments)
        this.setCalendar()
        this.muestraEventosDia(
          this.fullDay.getDate().toString(),
          this.fullDay.getMonth().toString()
        )
      },
      deleteAppointment(index: number) {
        const eliminarID: number = this.appointmentsFiltered[index].id

        console.log(eliminarID)
        console.log(index)
        this.appointmentsFiltered.splice(eliminarID - 1, 1)
        this.appointments.splice(eliminarID - 1, 1)

        console.log(this.appointments)
        this.setCalendar()
        this.muestraEventosDia(
          this.fullDay.getDate().toString(),
          this.fullDay.getMonth().toString()
        )
      },
    },
    mounted() {
      this.setCalendar()
      this.muestraEventosDia(
        this.fullDay.getDate().toString(),
        this.fullDay.getMonth().toString()
      )
    },
  }
</script>
<style scoped lang="scss">
  .calendar-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    border: 1px solid grey;
    padding: 10px;
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .calendar-box {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
    }

    .appointment-details {
      margin-left: 5%;
      margin-right: 5%;
      margin-top: -10px;
      padding: 10px;
      text-align: left;
      background-color: lightgrey;
      text-align: left;
    }

    .appointment-buttons {
      text-align: center;
    }

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

  @media only screen and (min-width: 1024px) {
    .today-appointments {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 50%;
    }

    .appointment {
      margin: 10px;
      margin-left: 5%;
      margin-right: 5%;
      text-align: left;
      line-height: 0.25em;
      background-color: orangered;
      color: white;
    }

    p.appointment-title {
      font-weight: bold;
    }

    .appointment > p {
      padding-left: 20px;
    }

    .appointment-clicked {
      display: flex;
      flex-direction: column;
      width: auto;
      height: auto;
    }

    .appointment-details {
      margin-left: 5%;
      margin-right: 5%;
      margin-top: -10px;
      padding: 10px;
      text-align: left;
      background-color: lightgrey;
      text-align: left;
    }

    .appointment-buttons {
      text-align: center;
    }

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
