<template>
  
  <section class="cabecera-opcion">
    <img src="@/assets/images/reminders-calendar.png">
    <span>REMINDERS CALENDAR</span>
    <div id="titular-barra"><img src="@/assets/images/Titular barra.png"></div>
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
    font-size: 15px;
}

.cabecera-opcion > img{
    height: 30px;
    width: auto;
    margin: 5px;
    margin-left:30px;
}

#titular-barra{
       display: none;
       margin: auto;
       margin-right: 10%;
   }

   @media only screen and (min-width: 1024px) {

    .cabecera-opcion{
    font-size: 20px;
}
   
    #titular-barra{
       display: flex;
   }
 
}   

</style>