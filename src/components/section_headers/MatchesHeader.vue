<template>
  
  <section class="cabecera-opcion">
    <img src="@/assets/images/joystick-2-xxl.png">
    <span>PARTIDES</span>
  </section>  

</template>

<script setup lang="ts"></script>

<style scope lang="scss">

.cabecera-opcion{
    display: flex;
    background-color: lightgray;
    align-items: center;
    gap: 30px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: gray;
    font-size: 20px;
    margin-bottom: 5vh;
}

.cabecera-opcion > img{
    height: 30px;
    width: auto;
    margin: 5px;
    margin-left:30px;
}

</style>