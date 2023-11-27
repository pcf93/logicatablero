<template>
  <div class="register">
    <form class="register-form" @submit.prevent="register(user.userEmail, user.userPassword, robot)">
      <div class="register-field">
        <label for="email">Nom d'usuari</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          v-model="user.userName"
        /><br />
      </div>
      <div class="register-field">
        <label for="password">Contrasenya</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          v-model="user.userPassword"
        /><br />
      </div>
      <div class="register-field">
        <label for="name">Correu electrònic</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          v-model="user.userEmail"
        /><br />
      </div>
      <div class="register-field">
        <label for="country">Ciutat</label>
        <input
          type="text"
          id="country"
          name="country"
          required
          v-model="user.userCity"
        /><br />
      </div>
      <div class="register-field">
        <label for="birthdate">Data de naixament</label>
        <input
          type="date"
          id="birthdate"
          name="birthdate"
          required
          v-model="user.userBirthDate"
        /><br />
      </div>
      <div class="register-field">
        <label for="phonenumber">Telefon (opcional)</label>
        <input
          type="text"
          id="phonenumber"
          name="phonenumber"
          v-model="user.userPhone"
        /><br />
      </div>
      <div class="register-field">
        <label for="2FA">Autenticació dues passes?</label>
        <input
          type="checkbox"
          id="2FA"
          name="2FA"
          v-model="is2FAenabled"
          @change=" generaSecret"
        /><br />
      </div>

      <vue-recaptcha ref="recaptcha" @verify="onVerify" sitekey="6Ldx0w4pAAAAAGP2PLxsmQqBvoejhLbjQu6Dlytx"></vue-recaptcha>
      <div class="register-box">
        <button type="submit" class="send">REGISTRE USUARI</button>
        <RouterLink to="/login">
          <button class="cancel">TORNA A LOGIN</button></RouterLink
        >
      </div>
      <p v-for="message in errorMessageList" :key="message">
        {{ message }}
      </p>
    </form>
  </div>
  <HomeFooter></HomeFooter>
</template>

<script setup lang="ts">
  import { registerUser } from '@/core/services/APIUserRequests'
  import router from '@/router'
  import { RegisterUser } from '@/type'
  import { reactive, ref } from 'vue'
  import { VueRecaptcha } from 'vue-recaptcha'
  import { toDataURL } from 'qrcode'
  import HomeFooter from '../home/HomeFooter.vue'

  var errorMessage = ref<string>('')
  var errorMessageList = ref<string[]>([])

  var is2FAenabled = ref(false)

  const user: RegisterUser = reactive({
    userNickname: '',
    userPassword: '',
    userName: '',
    userLastName: '',
    userEmail: '',
    userPhone: '',
    userBirthDate: '',
    userCity: '',
    darkMode: false,
    userLanguageID: 1,
    userTypeID: 1,
    userPhoto: '',
  })

  const robot = ref(false)

  const onVerify = (response: boolean) =>{
    if (response) robot.value = true
  }

  const generaSecret = () => {
    
    if (is2FAenabled.value){
      console.log('Estado del check: ' + is2FAenabled.value)

    }
    
    
  }
  
   async function register( email: string, password: string, captchaChecked: boolean){
    errorMessageList.value = []
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const passwordPattern = /^(?=.*[a-z])(?=.*[\d])(?=.*[^\d\w]).{5,}$/;

    if (!emailPattern.test(email)) {
      errorMessage.value = 'El mail no es correcte'
      errorMessageList.value.push(errorMessage.value)
      return false;
    }
    if (!passwordPattern.test(password)) {
      errorMessage.value = 'La contrasenya no es correcta'
      errorMessageList.value.push(errorMessage.value)
      return false;
    }

    if (robot){
      errorMessage.value = 'No has marcat la casella del reCAPTCHA'
      errorMessageList.value.push(errorMessage.value)
      return false;
    }

    if (
      emailPattern.test(email) &&
      passwordPattern.test(password) && captchaChecked
    ) {
      await registerUser(user)
        .then((response) => {
          console.log(response.data)
          router.push('/login')
        })
        .catch((error) => {
          errorMessageList.value.push('Usuari i/o mail ja existeix.')
          console.log(user)
        })
      return true;
    }

    console.log(email, password, captchaChecked)
  }

</script>

<style scoped lang="scss">
  .register {
    border: 1px solid gray;
    margin-top: 5vh;
    background-color: white;
    width: 97vw;
    margin-left: auto;
    margin-right: auto;
  }

  .register-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
  }

  .register-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 1vh;
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

  .register-box {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-bottom: 10px;
  }

  .send {
    width: 80px;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    margin-right: 10px;
    border: none;
    cursor: pointer;
  }

  .cancel {
    width: 80px;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 200;
    margin-left: 10px;
    border: none;
    cursor: pointer;
  }
  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .register {
      width: 50%;
      margin-left: auto;
      margin-right: auto;
    }

    .register-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: auto;
      
    }

    .register-field {
      display: flex;
      flex-direction: flex-end;
      flex-wrap: wrap;
      margin: 1vh;
      font-size: 0.8em;
      width: 90%;
    }

    label {
      width: 10%;
      margin-right: auto;
    }

    input,
    textarea {
      width: 70%;
    }

    .register-box {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      margin-bottom: 10px;
    }

    .send {
      width: 80px;
      height: 30px;
      background-color: #10d6a5;
      color: #006845;
      font-weight: 200;
      margin-right: 10px;
      border: none;
      cursor: pointer;
    }

    .cancel {
      width: 80px;
      height: 30px;
      background-color: orangered;
      color: white;
      font-weight: 200;
      margin-left: 10px;
      border: none;
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 1024px) {
    .register {
      text-align: center;
      width: 30%;
      margin: 0 auto;
      margin-top: 5vh;
    }

    .register-form {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 auto;
      width: 100%;
    }

    .register-field {
      display: flex;
      flex-direction: flex-end;
      flex-wrap: wrap;
      margin: 1vh;
      font-size: 0.8em;
      width: 100%;
    }

    label {
      width: 20%;
      margin-right: auto;
    }

    input,
    textarea {
      width: 70%;
    }

    .register-box {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      margin-bottom: 10px;
    }

    .send {
      width: 80px;
      height: 30px;
      background-color: #10d6a5;
      color: #006845;
      font-weight: 200;
      margin-right: 10px;
      border: none;
      cursor: pointer;
    }

    .cancel {
      width: 80px;
      height: 30px;
      background-color: orangered;
      color: white;
      font-weight: 200;
      margin-left: 10px;
      border: none;
      cursor: pointer;
    }
  }
</style>
