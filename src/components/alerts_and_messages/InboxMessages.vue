<template>
  <MessageTemplate
    v-for="message in inboxMessages"
    :key="message.messageId"
    :message="message"
    :section="section"
    @cambia-opcion="$emit('cambiaOpcion', 1)"
  />
  <p v-if="inboxMessages.length == 0">Encara no tens missatges rebuts.</p>
</template>

<script setup lang="ts">
  import { Message } from '@/type'
  import { PropType } from 'vue'
  import MessageTemplate from './MessageTemplate.vue'

  defineProps({
    inboxMessages: { type: Array as PropType<Message[]>, required: true },
  })

  const section = 'inbox'

  const emit = defineEmits<{
    (e: 'showMessage', value: Message): void
    (e: 'cambiaOpcion', value: number): number
    (e: 'replyEmail', value: string): string
    (e: 'replySubject', value: string): string
  }>()

  function showMessageEmit(message: Message) {
    emit('showMessage', message)
  }
</script>

<style scope lang="scss">
  input {
    width: 25px;
  }

  .message-bar,
  .message-footer {
    display: flex;
    height: 40px;
    text-align: center;
    align-items: center;
    margin-left: 5px;
  }

  .message-footer {
    justify-content: flex-end;
  }

  .dot-new {
    height: 15px;
    width: 15px;
    background-color: orangered;
    border-radius: 50%;
    margin-left: 5px;
    display: inline-block;
  }

  .dot-read {
    height: 15px;
    width: 15px;
    background-color: grey;
    border-radius: 50%;
    margin-left: 5px;
    display: inline-block;
  }

  .message-sender {
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

  .reply,
  .change {
    width: 80px;
    height: 30px;
    background-color: #10d6a5;
    color: #006845;
    font-weight: 800;
    border: none;
    cursor: pointer;
  }

  .delete,
  .done {
    width: 80px;
    height: 30px;
    background-color: orangered;
    color: white;
    font-weight: 800;
    margin-left: 20px;
    border: none;
    cursor: pointer;
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
    .message-sender {
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

    .message-sender {
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

    #titular-barra {
      display: none;
      margin: auto;
      margin-right: 10%;
    }
  }
</style>
