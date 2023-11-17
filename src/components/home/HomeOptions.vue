<template>
  <section class="menu">
    <div class="option">
      <RouterLink to="/alerts-and-messaging">
        <div class="box" @click="$emit('cambiarOpcion', 1)">
          <img src="@/assets/images/Rectangle1.png" />
          <div class="layer2">
            <img src="@/assets/images/Layer2.png" />
          </div>
          <div class="iconos">
            <img src="@/assets/images/warnings-off2.png" />
          </div>
          <div class="layer3">
            <img src="@/assets/images/Layer3.png" />
          </div>
          <div class="pendiente" v-if="countUnread > 0">
            <img src="@/assets/images/Ellipse1.png" />
            <p class="contador">{{ countUnread }}</p>
          </div>
          <p class="option-text">ALERTS AND MESSAGING</p>
        </div>
      </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/reminders-calendar">
        <div class="box" @click="$emit('cambiarOpcion', 2)">
          <img src="@/assets/images/Rectangle1.png" />
          <div class="layer2">
            <img src="@/assets/images/Layer2.png" />
          </div>
          <div class="iconos">
            <img src="@/assets/images/reminders-calendar.png" />
          </div>
          <div class="layer3">
            <img src="@/assets/images/Layer3.png" />
          </div>
          <div class="pendiente">
            <img src="@/assets/images/Ellipse1.png" />
            <p class="contador">1</p>
          </div>
          <p class="option-text">REMINDERS CALENDAR</p>
        </div>
      </RouterLink>
    </div>
    <div class="option">
      <div class="box" @click="$emit('cambiarOpcion', 3)">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/ties2.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <div class="pendiente">
          <img src="@/assets/images/Ellipse1.png" />
          <p class="contador">2</p>
        </div>
        <p class="option-text">CIRCLE OF CARE</p>
      </div>
    </div>
    <div class="option">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/daily-care-o-gram.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <div class="pendiente">
          <img src="@/assets/images/Ellipse1.png" />
          <p class="contador">1</p>
        </div>
        <p class="option-text">DAILY CARE-O-GRAM</p>
      </div>
    </div>
    <div class="option">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/casemanager.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <p class="option-text">REPOSITORY</p>
      </div>
    </div>
    <div class="option">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/my-health-reports.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <p class="option-text">REPORTS</p>
      </div>
    </div>
    <div class="option">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/my-health-reports.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <div class="rectanglePoints">
          <img src="@/assets/images/Rectangle2.png" />
          <p class="totalPoints">Total Points 725</p>
        </div>
        <p class="option-text">MY POINTS</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps({
    currentOption: Number,
  })

  const emit = defineEmits(['cambiarOpcion'])

  import { useLogin } from '@/core/componentLogic/useLogin'
  import { useMessages } from '@/core/componentLogic/useMessages'

  const { userInfo } = useLogin()
  const { setReceivedMessages, setSentMessages, countUnread } = useMessages()

  console.log(userInfo.value)

  setReceivedMessages(userInfo.value?.userId as number)
  setSentMessages(userInfo.value?.userId as number)
</script>

<style scoped lang="scss">
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 50px;
    margin-top: 0px;
  }

  .box {
    position: relative;
    width: auto;
    height: auto;
    margin: 10px;
    z-index: 2;
    cursor: pointer;
  }

  .layer2 {
    position: absolute;
    top: 5px;
    left: 5px;
  }

  .layer3 {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .iconos {
    position: absolute;
    top: 20px;
    left: 20px;
  }

  .pendiente {
    position: absolute;
    top: 6px;
    right: 6px;
  }

  .contador {
    position: absolute;
    top: -10px;
    right: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }

  .pendiente-user {
    position: absolute;
    top: 0px;
    left: 50px;
  }

  .contador-user {
    position: absolute;
    top: -10px;
    left: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }

  .pendiente-inbox {
    position: absolute;
    top: -10px;
    left: 270px;
  }

  .contador-inbox {
    position: absolute;
    top: -10px;
    left: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }

  .rectanglePoints {
    display: flex;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .totalPoints {
    position: absolute;
    top: -8px;
    right: 15px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;
  }

  .option-text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    max-width: 150px;
    font-weight: bold;
    text-align: right;
    color: grey;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .iconos > img {
    height: 100px;
    width: auto;
  }
</style>
