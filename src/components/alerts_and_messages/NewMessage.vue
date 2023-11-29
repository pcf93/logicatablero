<template>
  <div class="write-message">
    <form>
      <div class="new-message-field">
        <label for="username">Nom d'usuari</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="userNameReceiver"
        /><br />
      </div>
      <div class="new-message-field">
        <label for="subject">Assumpte</label>
        <input
          type="text"
          id="subject"
          name="subject"
          v-model="message.messageSubject"
        /><br />
      </div>
      <div class="new-message-field">
        <label for="content">Missatge</label>
        <textarea
          type="text"
          id="content"
          name="content"
          v-model="message.messageContent"
        />
      </div>
    </form>
    <div class="button-box">
      <button class="send" @click="enviarMensaje">ENVIAR</button>
      <button class="cancel" @click="$emit('cambiarOpcion', 2)">CANCELAR</button>
    </div>
    <div class="alert alert-warning" v-if="resultado.length > 0">{{ resultado }}</div>
  </div>
</template>

<script setup lang="ts">
  import { useLogin } from '@/core/componentLogic/useLogin'
  import { useMessages } from '@/core/componentLogic/useMessages'
  import { sendMessage } from '@/core/services/APIMessageRequests'
  import { getIdByName } from '@/core/services/APIUserRequests'
  import { NewMessage } from '@/type'
  import { AxiosError } from 'axios'
  import { reactive, ref } from 'vue'

  const { userId } = useLogin()
  const { replyEmail, replySubject, receivedMessages, sentMessages } =
    useMessages()
  const resultado = ref<string>('')

  const userNameReceiver = ref<string>(replyEmail.value)

  const message: NewMessage = reactive({
    messageSenderId: userId.value as number,
    messageReceiverId: 0,
    messageSubject: replySubject.value,
    messageContent: '',
  })

  async function enviarMensaje() {
    await getIdByName(userNameReceiver.value)
      .then((response) => {
        message.messageReceiverId = response.data
        console.log(response.data)
        console.log(userNameReceiver.value)

      })
      .catch((error: AxiosError) => {
        message.messageReceiverId = 0
        console.log(error)
      })

    await sendMessage(message)
      .then((response) => {
        console.log(response.data)
        sentMessages.value.push(response.data)
        resultado.value = "El missatge s'ha enviat amb èxit."
        replySubject.value = ''
      })
      .catch((error: AxiosError) => {
        if (error.code == 'ERR_BAD_RESPONSE') {
          resultado.value = "L'usuari no existeix."
        }
        if (error.code == 'ERR_NETWORK'){
          resultado.value = 'Només pots enviar un missatge cada 20 segons. Espera una mica.'
        }
        console.log(error)
      })

    replyEmail.value = ''
    replySubject.value = ''
  }
</script>

<style scoped lang="scss">
  
  .write-message{
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
  }
  
  form {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
  }

  .new-message-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 3vw;
    font-size: 0.8em;
    width: 100%;
    
  }

  label {
    width: 20vw;
    margin-right: auto;
  }

  input,
  textarea {
    width: 80vw;
  }

  #content {
    width: 80vw;
    height: 20vh;
  }

  .button-box {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .send {
    width: 30vw;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    margin-right: 5vw;
    margin-bottom: 2vh;
    border: none;
    cursor: pointer;
  }

  .cancel {
    width: 30vw;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
  }

  .alert-warning{
    width: 80vw;
    margin-left: 5vw;
    margin-top: 2vh;
  }

  @media only screen and (max-width: $mobile-landscape-width) and (orientation: landscape){
    .write-message{
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
  }
  
  form {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
  }

  .new-message-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 2vw;
    font-size: 0.8em;
    width: 80%;
    
  }

  label {
    width: 20vw;
    font-size: 0.8em;
    margin-right: auto;
  }

  input,
  textarea {
    max-width: 60vw;
  }

  #content {
    max-width: 60vw;
    max-height: 10vh;
  }

  .button-box {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  .send {
    width: 30vw;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
    margin-right: 5vw;
  }

  .cancel {
    width: 30vw;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
  }

  .alert-warning{
    width: 60vw;
    margin-left: 15vw;
    margin-top: 2vh;
  }
  }

  @media only screen and (min-width: $mobile-landscape-width){
    .write-message{
    width: 40vw;
    margin-left: auto;
    margin-right: auto;
  }
  
  form {
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
  }

  .new-message-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 2vw;
    margin-left: 10%;
    font-size: 0.8em;
    width: 80%;
    
  }

  label {
    width: 10vw;
    font-size: 1.2em;
    margin-right: auto;
  }

  input,
  textarea {
    max-width: 30vw;
  }

  #content {
    max-width: 30vw;
    max-height: 10vh;
  }

  .button-box {
    display: flex;
    justify-content: center;
    margin-left: 5%;
    padding: 0;
  }

  .send {
    width: 30vw;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 200;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
    margin-right: 5vw;
  }

  .cancel {
    width: 30vw;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 200;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
  }

  .alert-warning{
    width: 20vw;
    margin-left: 25%;
    margin-top: 2vh;
  }
  }
</style>
