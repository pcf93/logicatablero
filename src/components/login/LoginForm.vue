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
        <RouterLink to="/registre">
          <button class="cancel">REGISTER</button>
        </RouterLink>
      </div>
    </form>
    <div class="alert alert-danger" v-if="errorMessage.length > 0">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useLogin } from '@/core/componentLogic/useLogin'
import router from '@/router';
  import { ref } from 'vue'
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
</script>

<style scoped lang="scss">
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
  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .login {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 30px;
    }

    .login-field {
      font-size: 1em;
      margin-left: auto;
      margin-right: auto;
    }

    form {
      text-align: center;
    }

    label {
      padding-right: 10px;
      width: 10%;
      margin-right: 10px;
      margin-left: 20%;
    }
    input,
    textarea {
      width: 40%;
      margin-left: 10%;
    }

    .button-box {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }

  @media only screen and (min-width: 1024px) {
    .login {
      width: 20%;
      margin-left: auto;
      margin-right: auto;
    }

    form {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
    }

    .login-field {
      font-size: 1em;
    }

    label {
      padding-right: 10px;
      width: 10%;
    }
    input,
    textarea {
      width: 60%;
    }
  }
</style>
