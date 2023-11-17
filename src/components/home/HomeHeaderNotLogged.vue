<template>
  <header>
    <div class="header-item" id="logo">
      <img src="@/assets/images/logo-easy-connect_SBS.png" />
    </div>
  </header>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
  header {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    height: 80px;
    margin-top: 20px;
  }

  #logo {
    margin-right: auto;
  }

  #logo > img {
    width: 200px;
    padding-left: 20px;
    z-index: -1;
  }

  #user {
    position: relative;
    display: flex;
    align-items: center;
    align-content: center;
    max-height: 40px;
    width: auto;
  }

  #user > img {
    max-height: 40px;
    width: auto;
    margin-right: 10px;
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
  }

  #settings > img,
  #dots > img,
  #logout > img {
    height: 30px;
  }

  #dots > img {
    display: none;
  }

  #settings > p,
  #logout > p {
    display: none;
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
