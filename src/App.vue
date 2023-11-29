<template>
  <HomeHeader/>
  
  <router-view />

</template>

<script setup lang="ts">
  import HomeHeader from './components/home/HomeHeader.vue'
  import HomeOptions from './components/home/HomeOptions.vue'
  import HomeFooter from './components/home/HomeFooter.vue'
  import { useLogin } from './core/componentLogic/useLogin'

  const { isLogged } = useLogin()

</script>
<style lang="scss">

  $mobile-width-landscape: 768px;

  #app {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #78aad7;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

  .btn-primary{
      margin-bottom: 2vh;
      margin-left: 5vw;
      margin-top: -3vh;
  }

  :root{
    --landscape-mobile-width: 768px;
  }

  @media only screen and (max-width: 1024px) and (orientation: landscape){
    #app {

    min-height: 135vh;
  }
  
  }

</style>
