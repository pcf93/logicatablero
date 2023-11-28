<template>
  <div class="message-bar" @click="toggleDetalle()">
    <input type="checkbox" />
    <span :class="{ read: isRead || section == 'sent' }" class="dot"></span>
    <div class="message-username">
      <p>{{ fullName }}</p>
    </div>
    <div class="message-subject">
      <p>{{ message.messageSubject }}</p>
    </div>
    <div class="message-date">
      <p>{{ message.messageDate.substring(0, 10) }}</p>
    </div>
  </div>
  <div :class="{ abierto: isOpened }" class="message-content">
    <p class="show-message-subject">{{ message.messageSubject }}</p>
    <p class="show-message-content">{{ message.messageContent }}</p>
    <div class="button-box">
      <button class="reply" @click="respondeMensaje()" v-if="props.section == 'inbox' ">REPLY</button>
      <button class="delete" @click="borraMensaje()" v-if="props.section == 'inbox' ">DELETE</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMessages } from '@/core/componentLogic/useMessages'
  import {
    changeStatus,
    deleteMessage,
  } from '@/core/services/APIMessageRequests'
  import { getUser } from '@/core/services/APIUserRequests'
  import { Message } from '@/type'
  import { PropType, defineProps, ref } from 'vue'

  const props = defineProps({
    message: { type: Object as PropType<Message>, required: true },
    section: { type: String, required: true },
  })

  const emit = defineEmits([
    'replyEmail',
    'replySubject',
    'cambiaOpcion',
    'deleteMessage',
  ])

  const { receivedMessages, countUnread, replyEmail, replySubject } =
    useMessages()

  const fullName = ref<string>('')
  const emailReplySender = ref<string>('')
  const emailReplySubject = ref<string>('')

  const getFullName = () => {
    if (props.section == 'inbox') {
      getUser(props.message.messageSenderId)
        .then((response) => {
          emailReplySender.value = response.data.userName
          emailReplySubject.value = props.message.messageSubject
          fullName.value =
            response.data.userName
        })
        .catch((error) => {
          console.log(error)
        })
    }
    if (props.section == 'sent') {
      getUser(props.message.messageReceiverId)
        .then((response) => {
          fullName.value =
            response.data.userName
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  getFullName()

  var isOpened = ref<boolean>(false)
  var isRead = ref<boolean>(props.message.isRead)

  const toggleDetalle = () => {
    
    if (props.section == "inbox"){
      changeStatus(props.message.messageId)
    receivedMessages.value.forEach((message) => {
      if (message.messageId == props.message.messageId) {
        if (!message.isRead) {
          message.isRead = true
          countUnread.value--
        }
      }
    })
    isRead.value = true

    }
    
    
    isOpened.value = !isOpened.value
  }

  const respondeMensaje = () => {
    console.log(emailReplySender.value)

    emit('cambiaOpcion', 1)
    replyEmail.value = emailReplySender.value
    replySubject.value = 'RE: ' + emailReplySubject.value
    console.log(replySubject.value)
  }

  const borraMensaje = () => {
    deleteMessage(props.message.messageId)
      .then((response) => {
        console.log(response)

        const index = receivedMessages.value.indexOf(props.message)
        if (index > -1) {
          receivedMessages.value.splice(index, 1)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
</script>

<style scope lang="scss">
  .message-bar,
  .message-footer {
    display: flex;
    height: 40px;
    text-align: center;
    align-items: center;
    margin-left: 5px;
  }

  .message-bar {
    cursor: pointer;
  }

  .message-footer {
    justify-content: flex-end;
  }

  .dot {
    height: 15px;
    width: 15px;
    background-color: orangered;
    border-radius: 50%;
    margin-left: 5px;
    display: inline-block;
  }

  .dot.read {
    height: 15px;
    width: 15px;
    background-color: grey;
    border-radius: 50%;
    margin-left: 5px;
    display: inline-block;
  }

  .message-username {
    font-weight: bold;
    margin-left: 5px;
    width: 30%;
    text-align: left;
    font-size: 0.7em;
  }

  .message-subject {
    width: 30%;
    text-align: left;
    font-size: 0.7em;
    margin-left: 5%;
  }

  .message-date {
    width: 50%;
    text-align: right;
    margin-right: min(5px);
    font-size: 0.7em;
  }

  .message-content {
    background-color: #f9f9f9;
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
  }
  .message-content.abierto {
    height: 200px;
  }
  .show-message-subject {
    margin-left: 30px;
    font-size: 1.2em;
  }

  .show-message-content {
    margin-left: 30px;
    margin-right: 30px;
    font-size: 0.7em;
    padding-bottom: 10px;
  }

  .button-box {
    text-align: right;
    margin-right: 50px;
    padding-bottom: 30px;
  }

  .reply {
    width: 80px;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 800;
    border: none;
  }

  .delete {
    width: 80px;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 800;
    margin-left: 20px;
    border: none;
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .message-username {
      font-size: 0.8em;
    }

    .message-subject {
      font-size: 0.8em;
    }

    .message-date {
      font-size: 0.8em;
    }

    .message-content {
      background-color: #f9f9f9;
    }

    .show-message-subject {
      font-size: 1.2em;
    }

    .show-message-content {
      font-size: 0.8em;
    }
  }

  @media only screen and (min-width: 1024px) {
    .message-bar-header {
      height: 50px;
    }

    .pendiente-inbox {
      left: 230px;
    }

    .new-message {
      width: 150px;
      height: 50px;
      font-size: 1em;
    }

    .inbox {
      font-size: 1em;
      height: 50px;
      width: 80px;
    }

    .sent {
      font-size: 1em;
      width: 80px;
      height: 50px;
    }

    .message-bar-header > input {
      width: 100px;
    }

    .message-username {
      font-size: 0.8em;
    }

    .message-subject {
      font-size: 0.8em;
    }

    .message-date {
      font-size: 0.8em;
    }

    .message-content {
      background-color: #f9f9f9;
    }

    .show-message-subject {
      font-size: 1.2em;
    }

    .show-message-content {
      font-size: 0.8em;
    }
  }
</style>
