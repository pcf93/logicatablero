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

  #app {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #78aad7;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

</style>
