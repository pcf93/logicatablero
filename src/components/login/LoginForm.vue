<template>
  <div class="login" v-if="!isLogged">
    <form @submit.prevent="loginUser()" class="login-form">
      <div class="login-field">
        <label for="email">Nom d'usuari</label>
        <input type="text" id="email" name="email" v-model="userName" /><br />
      </div>
      <div class="login-field">
        <label for="password">Contrasenya</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="userPassword"
        /><br />
      </div>

      <div class="button-box">
        <button type="submit" class="send">LOGIN</button>

          <button class="cancel" @click="aRegistre">REGISTRE</button>

      </div>
    </form>
    <div class="alert alert-danger" v-if="errorMessage.length > 0">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useLogin } from '@/core/componentLogic/useLogin'
import router from '@/router';
  import { ref, inject } from 'vue'
  import HomeFooter from '../home/HomeFooter.vue';

  const userPassword = ref<string>('')
  const userName = ref<string>('')
  const { isLogged, errorMessage } = useLogin()

  if (isLogged.value){
    router.push("/home")
  }

  async function loginUser() {
    await useLogin().login(userName.value, userPassword.value)
  }

  function aRegistre(){
    errorMessage.value = ''
    router.push('/registre')
  }
</script>

<style scoped lang="scss">
  
  @media only screen and (orientation: portrait){

    .login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 97vw;
    border: 1px solid grey;
    padding: 10px;
    padding-bottom: 5px;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
  }

  .login-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    
  }

  .login-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 2%;
    font-size: 0.8em;
    width: 100%;
  }

  label {
    width: 10%;
    margin-right: auto;
  }

  input,
  textarea {
    width: 70%;
  }

  .button-box {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .send {
    width: 40vw;
    height: 5vh;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    margin-right: 5vw;
    border: none;
    cursor: pointer;
  }

  .cancel {
    width: 40vw;
    height: 5vh;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    margin-left:5vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    border: none;
    cursor: pointer;
  }

  .alert-danger{
    width: 90vw;
    font-size: 0.8em;
  }
  }



  @media only screen and (max-width: $mobile-landscape-width) and (orientation: landscape){
  
    .login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 60vw;
    border: 1px solid grey;
    padding: 10px;
    padding-bottom: 5px;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
  }

  .login-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    
  }

  .login-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 2%;
    font-size: 0.8em;
    width: 100%;
  }

  label {
    width: 10%;
    margin-right: auto;
  }

  input,
  textarea {
    width: 70%;
  }

  .button-box {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .send {
    width: 20vw;
    height: 10vh;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    margin-right: 2vw;
    border: none;
    cursor: pointer;
  }

  .cancel {
    width: 20vw;
    height: 10vh;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    margin-left:2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    border: none;
    cursor: pointer;
  }

  .alert-danger{
    width: 90vw;
    font-size: 0.8em;
  }

  }

  @media only screen and (min-width: 1024px) {
    .login {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 30vw;
    border: 1px solid grey;
    padding: 10px;
    padding-bottom: 5px;
    margin-top: 5vh;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
  }

  .login-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    
  }

  .login-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 2%;
    font-size: 0.8em;
    width: 100%;
  }

  label {
    width: 10%;
    margin-right: auto;
  }

  input,
  textarea {
    width: 70%;
  }

  .button-box {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .send {
    width: 10vw;
    height: 5vh;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    margin-right: 2vw;
    border: none;
    cursor: pointer;
  }

  .cancel {
    width: 10vw;
    height: 5vh;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    margin-left:2vw;
    margin-top: 2vh;
    margin-bottom: 2vh;
    border: none;
    cursor: pointer;
  }

  .alert-danger{
    width: 90vw;
    font-size: 0.8em;
  }

  }
  
</style>
