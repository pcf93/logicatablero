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
      <button class="send" @click="enviarMensaje">Enviar</button>
      <button class="cancel" @click="$emit('cambiarOpcion', 2)">Cancelar</button>
    </div>
    <p style="text-align: center">{{ resultado }}</p>
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
        resultado.value = 'El mensaje se ha enviado con éxito'
        replySubject.value = ''
      })
      .catch((error: AxiosError) => {
        if (error.code == 'ERR_BAD_RESPONSE') {
          resultado.value = 'El usuario no existe'
        }
        console.log(error)
      })

    replyEmail.value = ''
    replySubject.value = ''
  }
</script>

<style scoped lang="scss">
  
  form {
    display: flex;
    flex-wrap: wrap;
    margin-left: 2vw;
  }

  .new-message-field {
    display: flex;
    flex-direction: flex-end;
    flex-wrap: wrap;
    margin: 10px;
    font-size: 0.8em;
    width: 100%;
    
  }

  label {
    padding-right: 10px;
    width: 10%;
    margin-right: auto;
  }

  input,
  textarea {
    width: 60%;
  }

  #content {
    height: 100px;
  }

  .button-box {
    text-align: center;
    margin-left: 16%;
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
    form {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
    }

    .new-message-field {
      font-size: 1em;
    }

    label {
      padding-right: 10px;
      width: 10%;
    }
    input,
    textarea {
      width: 85%;
    }

    #content {
      height: 100px;
    }

    .button-box {
      text-align: left;
      margin-left: 15%;
    }
  }

  @media only screen and (min-width: 1024px) {
    form {
      display: flex;
      flex-wrap: wrap;
      margin-left: 10px;
    }

    .new-message-field {
      font-size: 1em;
    }

    label {
      padding-right: 10px;
      width: 10%;
    }
    input,
    textarea {
      width: 85%;
    }

    #content {
      height: 100px;
    }

    .button-box {
      text-align: left;
      margin-left: 15%;
    }
  }
</style>
