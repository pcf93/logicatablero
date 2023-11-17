<template>
  <div class="appointment">
    <div class="appointment-header" @click="toggleDetalle">
      <p class="appointment-title">{{ title }}</p>
      <p class="appointment-summary">{{ summary }}</p>
    </div>
    <div :class="{ abierto: isVisible }" class="appointment-details">
      <span class="appointment-date"
        >{{ day }} {{ $data.months[month] }} {{ year }} / </span
      ><span class="appointment-hour">{{ hour }}</span>
      <p class="appointment-description">
        {{ description }}
      </p>
      <div class="appointment-buttons">
        <button class="delete" @click="$emit('deleteAppointment')">
          DELETE
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: {
      title: { type: String, required: true },
      summary: { type: String, required: true },
      day: { type: Number, required: true },
      month: { type: Number, required: true },
      year: { type: Number, required: true },
      hour: { type: String, required: true },
      description: { type: String, required: true },
    },
    data: () => ({
      isVisible: false,
      months: [
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
      ],
    }),
    methods: {
      toggleDetalle() {
        this.isVisible = !this.isVisible
      },
    },
  }
</script>
<style scoped lang="scss">
  .appointment {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .appointment-header {
    height: 50px;
    width: 100%;
    flex-wrap: nowrap;
    text-align: left;
    line-height: 0.25em;
    background-color: orangered;
    color: white;
    cursor: pointer;
  }

  p.appointment-title {
    font-weight: bold;
  }

  .appointment-header > p {
    padding-left: 20px;
  }

  .appointment-details {
    text-align: left;
    background-color: lightgrey;
    text-align: left;
    transition: all 0.3s;
    overflow: hidden;
    height: 0;
    width: 100%;
  }

  .appointment-details.abierto {
    height: 150px;
    font-size: 0.9em;
  }

  .appointment-details.abierto > p,
  .appointment-date,
  .appointment-hour {
    padding: 10px;
    margin-top: 10px;
  }

  .message-content {
    background-color: #f9f9f9;
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
  }
  .message-content.abierto {
    height: 200px;
  }
  .appointment-buttons {
    text-align: center;
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .appointment {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .appointment-header {
      height: 50px;
      width: 100%;
      flex-wrap: nowrap;
      text-align: left;
      line-height: 0.25em;
      background-color: orangered;
      color: white;
    }

    p.appointment-title {
      font-weight: bold;
    }

    .appointment-header > p {
      padding-left: 20px;
    }

    .appointment-details {
      text-align: left;
      background-color: lightgrey;
      text-align: left;
      transition: all 0.3s;
      overflow: hidden;
      height: 0;
      width: 100%;
    }

    .appointment-details.abierto {
      height: 150px;
      font-size: 0.9em;
    }

    .appointment-details.abierto > p,
    .appointment-date,
    .appointment-hour {
      padding: 10px;
      margin-top: 10px;
    }

    .message-content {
      background-color: #f9f9f9;
      height: 0;
      transition: all 0.3s;
      overflow: hidden;
    }
    .message-content.abierto {
      height: 200px;
    }
    .appointment-buttons {
      text-align: center;
    }
  }

  @media only screen and (min-width: 1024px) {
    .appointment {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .appointment-header {
      height: 50px;
      width: 100%;
      flex-wrap: nowrap;
      text-align: left;
      line-height: 0.25em;
      background-color: orangered;
      color: white;
    }

    p.appointment-title {
      font-weight: bold;
    }

    .appointment-header > p {
      padding-left: 20px;
    }

    .appointment-details {
      text-align: left;
      background-color: lightgrey;
      text-align: left;
      transition: all 0.3s;
      overflow: hidden;
      height: 0;
      width: 100%;
    }

    .appointment-details.abierto {
      height: 150px;
      font-size: 0.9em;
    }

    .appointment-details.abierto > p,
    .appointment-date,
    .appointment-hour {
      padding: 10px;
      margin-top: 10px;
    }

    .message-content {
      background-color: #f9f9f9;
      height: 0;
      transition: all 0.3s;
      overflow: hidden;
    }
    .message-content.abierto {
      height: 200px;
    }
    .appointment-buttons {
      text-align: center;
    }
  }
</style>
