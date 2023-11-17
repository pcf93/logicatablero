<template>
  <HomeHeader />
  <HomeOptions v-if="isLogged" />

  <router-view />
</template>

<script setup lang="ts">
  import HomeHeader from './components/home/HomeHeader.vue'
  import HomeOptions from './components/home/HomeOptions.vue'
  import { useLogin } from './core/componentLogic/useLogin'

  const { isLogged } = useLogin()
</script>
<style lang="scss">
  body {
    margin: 0px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #78aad7;
}


</style>
