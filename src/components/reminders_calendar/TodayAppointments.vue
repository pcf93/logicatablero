<template>
  <div class="appointments-box">
    <div class="today">
      <p class="calendar-headers">TODAY</p>
      <p class="calendar-today">
        {{ diaSeleccionado }} {{ month }} / {{ weekday }}
      </p>
    </div>
    <AppointmentTemplate
      v-for="(appointment, index) in $props.appointmentsFiltered"
      :key="`appointments_${index}`"
      v-bind="appointment"
      @deleteAppointment="deleteAppointment(index)"
    />
    <div class="today-buttons" @click="toggleNewAppointment">
      <button class="add">ADD EVENT</button>
    </div>
    <div class="addEventForm" :class="{ active: isActive }">
      <form>
        <div class="new-appointment-field">
          <label for="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            v-model="newAppointment.title"
            required
          /><br />
        </div>
        <div class="new-appointment-field">
          <label for="summary">Summary</label>
          <input
            type="text"
            id="summary"
            name="summary"
            v-model="newAppointment.summary"
            required
          /><br />
        </div>
        <div class="new-appointment-field">
          <label for="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            v-model="newAppointment.description"
            required
          />
        </div>
        <div class="new-appointment-field">
          <label for="time">Time</label>
          <input
            type="text"
            id="time"
            name="time"
            v-model="newAppointment.hour"
            required
          />

          <button type="button" class="addNow" @click="sendAppointment">
            +
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
  import AppointmentTemplate from './AppointmentTemplate.vue'
  export default {
    props: [
      'appointments',
      'appointmentsFiltered',
      'diaSeleccionado',
      'month',
      'numberMonth',
      'year',
      'weekday',
      'fullDay',
      'deleteAppointment',
    ],
    components: {
      AppointmentTemplate,
    },

    data: () => ({
      isActive: false,
      newAppointment: {
        id: 0,
        title: '',
        summary: '',
        day: '',
        month: '',
        year: '',
        hour: '',
        description: '',
      },
      appointmentCounter: 4,
    }),

    methods: {
      toggleNewAppointment() {
        this.isActive = !this.isActive
      },
      sendAppointment() {
        this.newAppointment.day = this.fullDay.getDate()
        this.newAppointment.month = this.fullDay.getMonth()
        this.newAppointment.year = this.fullDay.getFullYear()
        this.newAppointment.id = this.appointmentCounter + 1

        this.$emit('sendAppointment', this.newAppointment)
        this.newAppointment.title = ''
        this.newAppointment.summary = ''
        this.newAppointment.description = ''
        this.newAppointment.hour = ''
      },
    },
  }
</script>
<style scoped lang="scss">
  .appointments-box {
    width: 90%;
  }

  .today {
    text-align: center;
  }

  .add {
    width: 100%;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 800;
    border: none;
    cursor: pointer;
  }

  .addEventForm {
    border: 1px solid black;
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
  }

  .addNow {
    width: 20%;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 800;
    border: none;
    cursor: pointer;
  }

  .addEventForm.active {
    height: 200px;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
  }

  .new-appointment-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 10px;
    font-size: 0.8em;
    width: 100%;
  }

  label {
    padding-right: 10px;
    width: 10%;
    margin-right: auto;
  }

  input,
  textarea {
    width: 60%;
  }

  #time {
    width: 40px;
  }

  @media only screen and (min-width: 640px) {
    .appointments-box {
      width: 40%;
    }
  }
</style>
