<template>
  <header>
    <div class="header-item" id="logo">
      <img src="@/assets/images/enfonsa-la-flota-logo.png" />
    </div>
    <div class="header-item" id="user" v-if="isLogged">
      <img src="@/assets/images/avatar.png" />
      <p>&nbsp;&nbsp;&nbsp;Hola, {{ userName }} </p>
    </div>
    <div class="header-item" id="logout" @click="logout()" v-if="isLogged">
      <RouterLink to="/login">
        <div class="logout-icon">
          <img src="@/assets/images/1419365876_on-off.png" />
        </div>
      </RouterLink>
      <p class="menu-text">LOGOUT</p>
    </div>
  </header>
</template>

<script setup lang="ts">
  import { useLogin } from '@/core/componentLogic/useLogin'

  const { isLogged, userId, userName, newInterval, logout } = useLogin()
</script>
<style scoped lang="scss">
  
  header {
    display: flex;
    background-color: #295e8d;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 10vh;
}

  #logo {
    margin-right: auto;

  }

  #logo > img {
    width: 50vw;
  }

  #logo {
    margin-right: auto;
  }

  #logo > img {
    width: 50vw;
    padding-left: 5vw;
    z-index: -1;
  }

  #user {
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    max-height: 40px;
    width: auto;
    margin-right: 5vw;
  }

  #user > img {
    max-height: 40px;
    width: auto;
    margin-right: 10px;
  }

  #user > p {
    display: none;
    color: white;
    font-weight: bolder;
  }

  #user > span {
    display: none;
  }

  #settings,
  #logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    text-align: center;
    margin-right: 2vw;
  }

  #logout-icon {
    width: 10px;
  }

  #settings > img,
  #dots > img,
  #logout > img {
    height: 60px;
  }

  #dots > img {
    display: none;
  }

  #settings > p,
  #logout > p {
    display: none;
    color: white;
    font-weight: bolder;
  }

  .menu-text {
    text-align: center;
  }

  #dots {
    display: none;
    height: 20px;
    width: auto;
    transform: translateY(30px);
  }

  @media only screen and (max-width: 768px) and (orientation: landscape){
    header {
    height: 15vh;
}

  #logo {
    margin-right: auto;
    height: 10vh;
    width: 10vw;
  }

  #logo > img {
    height: 10vh;
    width: 10vh;
    padding-left: 5vw;
  }

  #user {
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    height: 10vh;
    width: 10vh;
    margin-right: 5vw;
  }

  #user > img {
    height: 10vh;
    width: 10vh;
    margin-right: 10px;
  }

  #user > p {
    color: white;
    font-weight: bolder;
  }

  #user > span {
    display: none;
  }

  #settings,
  #logout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    text-align: center;
    margin-right: 2vw;
  }

  #logout-icon {
    width: 10px;
  }

  #settings > img,
  #dots > img,
  #logout > img {
    height: 60px;
  }

  #dots > img {
    display: none;
  }

  #settings > p,
  #logout > p {
    display: none;
    color: white;
    font-weight: bolder;
  }

  .menu-text {
    text-align: center;
  }

  #dots {
    display: none;
    height: 20px;
    width: auto;
    transform: translateY(30px);
  }

  .pendiente-user {
    position: absolute;
    top: -15px;
    left: 25px;
  }

  .contador-user {
    position: absolute;
    top: -10px;
    left: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    #logo > img {
      width: 400px;
    }

    #user {
      display: flex;
      align-items: center;
      max-height: 80px;
      width: auto;
    }

    #user > img {
      max-height: 80px;
      width: auto;
      margin-right: 5px;
    }

    #user > p {
    display: block;
  }

    #dots > img {
      display: flex;
      height: 20px;
      width: auto;
      margin: 0 auto;
    }

    #settings > img,
    #logout > img {
      height: 40px;
      width: 40px;
      margin: 0 auto;
    }

    .pendiente-user {
      position: absolute;
      top: -15px;
      left: 50px;
    }
  }

  @media only screen and (min-width: 1024px) {
    #logo > img {
      width: 400px;
    }

    #user {
      display: flex;
      align-items: center;
      max-height: 80px;
      width: auto;
      margin-right: 50px;
    }

    #user > img {
      max-height: 80px;
      width: auto;
      margin-right: 5px;
    }

    #user > p {
    display: block;
  }

    #dots > img {
      display: flex;
      height: 20px;
      width: auto;
      margin: 0 auto;
    }

    #settings,
    #dots,
    #logout {
      margin-left: 20px;
      margin-right: 20px;
      margin-top: 10px;
    }

    #settings > img,
    #logout > img {
      height: 40px;
      width: 40px;
      margin: 0 auto;
    }

    .pendiente-user {
      position: absolute;
      top: -15px;
      left: 50px;
    }

    #user > span {
      display: flex;
    }

    #dots > img {
      display: flex;
    }

    #settings > p,
    #logout > p {
      display: flex;
    }

    #dots {
      display: flex;
      height: 20px;
      width: auto;
      transform: translateY(30px);
    }
  }
</style>
