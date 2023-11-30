<template>
    <UserPanelHeader></UserPanelHeader>
    <RouterLink to="/home">
    <button class="btn btn-primary">Tornar al menu</button>
  </RouterLink>
    <div class="register">
    <div class="instruccions">
      <h2>Requisits formulari</h2>
      <ul>
        <li id="errorCorreu">El correu ha de tenir format vàlid, és a dir, el signe @, un nom davant i el domini darrere (exemple@gmail.com)</li>
        <li id="errorContrasenya">La contrasenya ha de tenir, al menys, una lletra minúscula, un caràcter especial i un número. La seva longitud ha de ser, al menys, de cinc caràcters.</li>
        <li id="errorNom">Els camps "Ciutat", "Data de naixament" i "Telefon" son opcionals.</li>
      </ul>
      </div>
      <form class="register-form">
        <div class="register-field">
          <label for="email">Nom d'usuari<span class="obligatori">&nbsp;*</span></label>
          <input
            type="text"
            id="email"
            name="email"
            required
            v-model="user.userNickname"
          /><br />
        </div>
        <div class="register-field">
          <label for="old-password">Antiga contrasenya<span class="obligatori">&nbsp;*</span></label>
          <input
            type="password"
            id="old-password"
            name="old-password"
            required
            v-model="user.userOldPassword"
          /><br />
        </div>
        <div class="register-field">
          <label for="new-password">Nova contrasenya<span class="obligatori">&nbsp;*</span></label>
          <input
            type="password"
            id="new-password"
            name="new-password"
            required
            v-model="user.userNewPassword"
          /><br />
        </div>
        <div class="register-field">
          <label for="name">Correu electrònic<span class="obligatori">&nbsp;*</span></label>
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
            v-model="user.userCity"
          /><br />
        </div>
        <div class="register-field">
          <label for="birthdate">Data de naixament</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            v-model="user.userBirthDate"
          /><br />
        </div>
        <div class="register-field">
          <label for="phonenumber">Telefon</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            v-model="user.userPhone"
          /><br />
        </div>
        <div class="register-box">
            <div class="buttons">
                <button type="submit" class="send" @click.prevent="modificaUsuari">CONFIRMAR</button>
                <button class="cancel" @click.prevent="toggleConfirmacio">BORRAR USUARI</button>
            </div>
            <div class="confirmar-borrar" v-if="clicaBorrar">
                <p>Segur que vols borrar l'usuari?</p>
                <button type="submit" class="remove" @click.prevent="borraUsuari">BORRAR</button>
            </div>
        </div>
        <div class="alert alert-danger" v-for="message in resultList" :key="message">
          {{ message }}
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
    import { getUser, updateUser, deleteUser } from '@/core/services/APIUserRequests'
    import router from '@/router'
    import { ChangeUser } from '@/type'
    import { reactive, ref, onMounted, provide } from 'vue'
    import UserPanelHeader from '../section_headers/UserPanelHeader.vue'
    import { useLogin } from '@/core/componentLogic/useLogin'
import { provideLocal } from '@vueuse/core'

  
    var errorUpdateMessage = ref<string>('')
    var resultList = ref<string[]>([])
    const clicaBorrar = ref(false)

    const {userId, errorMessage, logout} = useLogin()
  
    var is2FAenabled = ref(false)
  
    const user: ChangeUser = reactive({
      userNickname: '',
      userOldPassword: '',
      userNewPassword: '',
      userEmail: '',
      userPhone: '',
      userBirthDate: '',
      userCity: '',
    })

    function toggleConfirmacio(){
        clicaBorrar.value = !clicaBorrar.value
    }

    async function borraUsuari(){
        await deleteUser(userId.value)
        .then(() => {
            logout()
            errorMessage.value = 'Usuari eliminat amb èxit.'
        })
    }

    onMounted(()=>{
        async function carregaUsuari(){
            await getUser(userId.value)
            .then((response) => {
                user.userNickname = response.data.userName
                user.userEmail = response.data.userEmail
                user.userCity = response.data.userCity
                user.userBirthDate = response.data.userBirthDate.substring(0, 10)
                user.userPhone = response.data.userPhone
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        carregaUsuari()
        
    })

    const modificaUsuari = () => {
    resultList.value = []
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[\d])(?=.*[^\d\w]).{5,}$/;

    if (
      emailPattern.test(user.userEmail) &&
      passwordPattern.test(user.userNewPassword)
    ) {
      updateUser(user, userId.value)
        .then((response) => {
          console.log(response.data)
          user.userNickname = response.data.userName
          user.userEmail = response.data.userEmail
          user.userCity = response.data.userCity
          user.userBirthDate = response.data.userBirthDate.substring(0, 10)
          user.userPhone = response.data.userPhone
          user.userOldPassword = ''
          user.userNewPassword = ''
          resultList.value.push('Dades actualitzades.')

        })
        .catch((error) => {
          resultList.value.push('Contrasenya incorrecta.')
          console.log(error)
        })
      return true;
    } else {
      if (!emailPattern.test(user.userEmail)) {
      errorUpdateMessage.value = 'El mail no es correcte'
      resultList.value.push(errorUpdateMessage.value)
      
    }
    if (!passwordPattern.test(user.userNewPassword)) {
      errorUpdateMessage.value = 'La contrasenya no es correcta'
      resultList.value.push(errorUpdateMessage.value)
      
    }

    return false;
    }
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
  
    .instruccions{
      text-align: justify;
      font-size: 0.8em;
      margin-left: 5vw;
      margin-right: 5vw;
      margin-top: 2vh;
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

    .cancel, .remove {
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
  
    span.obligatori{
      font-weight: bolder;
      color: red;
    }
  
    .alert-danger{
      width: 90vw;
      font-size: 0.8em;
    }
  
    @media only screen and (max-width: $mobile-landscape-width) and (orientation: landscape){
  
      .register {
      border: 1px solid gray;
      margin-top: 5vh;
      background-color: white;
      width: 90vw;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 5vh;
    }
  
    .instruccions{
      text-align: justify;
      font-size: 0.8em;
      margin-left: 5vw;
      margin-right: 5vw;
      margin-top: 2vh;
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
      margin-left: 10vh;
    }
  
    input,
    textarea {
      width: 60%;
      margin-right: 10vh;
    }
  
    .register-box {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      margin-bottom: 10px;
    }
  
    .send {
      width: 20vw;
      height: 10vh;
      background-color: #10d6a5;
      color: #006845;
      font-weight: 200;
      font-size: 0.8em;
      margin-right: 5vw;
      border: none;
      cursor: pointer;
    }
  
    .cancel, .remove {
      width: 20vw;
      height: 10vh;
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
  
    span.obligatori{
      font-weight: bolder;
      color: red;
    }
  
    .alert-danger{
      width: 70vw;
      font-size: 0.8em;
    }
  
    }
  
    @media only screen and (min-width: 1024px) {
      h2{
        text-align: center;
      }
  
      .instruccions{
      text-align: justify;
      font-size: 0.8em;
      margin-left: 1vw;
      margin-right: 1vw;
      margin-top: 2vh;
    }
      
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
        margin-left: 5%;
        text-align: left
      }
  
      input,
      textarea {
        width: 70%;
      }
  
      .register-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        height: 100%;
      }

      .confirmar-borrar{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
      }

      .buttons{
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
        align-content: center;
      }
  
      .send {
        width: 20%;
        height: 5vh;
        background-color: #10d6a5;
        color: #006845;
        font-weight: 200;
        border: none;
        cursor: pointer;
      }
  
      .cancel, .remove {
        width: 20%;
        height: 5vh;
        background-color: orangered;
        color: white;
        font-weight: 200;
        border: none;
        cursor: pointer;
      }
  
    }
  </style>
  