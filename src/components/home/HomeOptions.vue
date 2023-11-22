<template>
  <section class="menu">
    <div class="option">
      <RouterLink to="/iniciar-partida">
      <div class="box" @click="$emit('cambiarOpcion', 3)">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/military-boat-xxl.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <p class="option-text">INICIAR PARTIDA</p>
      </div>
    </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/missatges">
        <div class="box" @click="$emit('cambiarOpcion', 1)">
          <img src="@/assets/images/Rectangle1.png" />
          <div class="layer2">
            <img src="@/assets/images/Layer2.png" />
          </div>
          <div class="iconos">
            <img src="@/assets/images/speech-bubble-2-xxl.png" />
          </div>
          <div class="layer3">
            <img src="@/assets/images/Layer3.png" />
          </div>
          <div class="pendiente" v-if="countUnread > 0">
            <img src="@/assets/images/Ellipse1.png" />
            <p class="contador">{{ countUnread }}</p>
          </div>
          <p class="option-text">MISSATGES</p>
        </div>
      </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/partides">
        <div class="box" @click="$emit('cambiarOpcion', 2)">
          <img src="@/assets/images/Rectangle1.png" />
          <div class="layer2">
            <img src="@/assets/images/Layer2.png" />
          </div>
          <div class="iconos">
            <img src="@/assets/images/joystick-2-xxl.png" />
          </div>
          <div class="layer3">
            <img src="@/assets/images/Layer3.png" />
          </div>
          <div class="pendiente">
            <img src="@/assets/images/Ellipse1.png" />
            <p class="contador">1</p>
          </div>
          <p class="option-text">PARTIDES INICIADES</p>
        </div>
      </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/contactes">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/contacts-xxl.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <div class="pendiente">
          <img src="@/assets/images/Ellipse1.png" />
          <p class="contador">1</p>
        </div>
        <p class="option-text">CONTACTES</p>
      </div>
    </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/solicituds">
      <div class="box">
        <img src="@/assets/images/Rectangle1.png" />
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/email-3-xxl.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <p class="option-text">SOL·LICITUTS</p>
      </div>
    </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLogin } from '@/core/componentLogic/useLogin'
import { useMessages } from '@/core/componentLogic/useMessages'
import { useContacts } from '@/core/componentLogic/useContacts'
import { useMatches } from '@/core/componentLogic/useMatches'

  const { userId, userName, parseJwt, getCookie } = useLogin()
  const { setReceivedMessages, setSentMessages, countUnread } = useMessages()
  const { setContacts, setContactRequests } = useContacts()
  const { setActiveMatches } = useMatches()

  userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
  userId.value = parseInt(
          Object.values(parseJwt(getCookie('JWT')))[2] as string
        )


  setReceivedMessages(userId.value)
  setSentMessages(userId.value)
  setContacts(userId.value)
  setContactRequests(userId.value)
  setActiveMatches(userId.value)

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
