<template>
  <section class="menu">
    <div class="option">
      <RouterLink to="/iniciar-partida">
      <div class="box" @click="$emit('cambiarOpcion', 3)">
        <div class="option-fondo"></div>
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
          <div class="option-fondo"></div>
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
          <div class="option-fondo"></div>
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
        <div class="option-fondo"></div>
        <div class="layer2">
          <img src="@/assets/images/Layer2.png" />
        </div>
        <div class="iconos">
          <img src="@/assets/images/contacts-xxl.png" />
        </div>
        <div class="layer3">
          <img src="@/assets/images/Layer3.png" />
        </div>
        <div class="pendiente" v-if="countContacts > 0">
          <img src="@/assets/images/Ellipse1.png" />
          <p class="contador">{{ countContacts }}</p>
        </div>
        <p class="option-text">CONTACTES</p>
      </div>
    </RouterLink>
    </div>
    <div class="option">
      <RouterLink to="/solicituds">
      <div class="box">
        <div class="option-fondo"></div>
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
  const { setContacts, setContactRequests, countContacts } = useContacts()
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
    margin-left: auto;
    margin-right: auto;
    margin-top: 5vh;
    margin-bottom: 5vh;
  }

  .box {
    position: relative;
    width: 90vw;
    margin-top: 1vh;
    z-index: 2;
    cursor: pointer;
  }

  .option-fondo{
    width: 90vw;
    height: 15vh;
    background-color: white;
  }

  .layer2 {
    position: absolute;
    top: 1vh;
    left: 2vw;
  }

  .layer3 {
    position: absolute;
    bottom: 0;
    right: 1vw;
  }

  .iconos {
    position: absolute;
    top: 3vh;
    left: 10vw;
  }

  .iconos > img {
    width: 20vw;
    height: 10vh;
  }

  .pendiente {
    position: absolute;
    top: 1vh;
    right: 2vw;
  }

  .contador {
    position: absolute;
    top: 0.5vh;
    right: 3vw;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }

  .option-text {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    max-width: 150px;
    font-weight: bold;
    text-align: right;
    font-size: 0.7em;
    color: grey;
    position: absolute;
    bottom: 3vh;
    right: 5vw;
  }
  
</style>
