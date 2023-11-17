<template>
  <div class="message-bar-header">
    <div
      id="new-message"
      :class="{ selected: newActive }"
      class="new-message"
      @click="changeOption(1)"
    >
      <p>New Message</p>
    </div>

    <div
      id="inbox"
      :class="{ selected: inboxActive }"
      class="inbox"
      @click="changeOption(2)"
    >
      <p>Inbox</p>
    </div>
    <div
      id="sent"
      :class="{ selected: sentActive }"
      class="sent"
      @click="changeOption(3)"
    >
      <p>Sent</p>
    </div>
    <input type="text" placeholder="Search.." checked="true" />
    <div class="pendiente-inbox" v-if="countUnread !== 0">
      <img src="@/assets/images/Ellipse1.png" />
      <p class="contador-inbox">{{ countUnread }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMessages } from '@/core/componentLogic/useMessages'
  import { ref } from 'vue'

  var newActive = ref<boolean>(true)
  var inboxActive = ref<boolean>(false)
  var sentActive = ref<boolean>(false)
  var mensajesNoLeidos = ref<number>(0)

  var replyEmail = ref<string>('')
  var replySubject = ref<string>('')

  const { receivedMessages, countUnread } = useMessages()

  const emits = defineEmits(['cambiarOpcion'])

  const changeOption = (option: number) => {
    emits('cambiarOpcion', option)

    let activo: number = option

    if (activo === 1) {
      newActive.value = true
      inboxActive.value = false
      sentActive.value = false
    } else if (activo === 2) {
      newActive.value = false
      inboxActive.value = true
      sentActive.value = false
    } else {
      newActive.value = false
      inboxActive.value = false
      sentActive.value = true
    }
  }
</script>

<style scoped lang="scss">
  .alerts {
    margin-top: 50px;
    margin-bottom: 50px;
    border: 1px solid gray;
  }

  .message-bar-header {
    display: flex;
    position: relative;
    height: 30px;
    text-align: center;
    border-bottom: 1px solid gray;
  }

  .pendiente-inbox {
    position: absolute;
    top: -20px;
    left: 160px;
  }

  .contador-inbox {
    position: absolute;
    top: -10px;
    left: 10px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: bold;
    color: white;
  }

  .new-message {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-left: 30px;
    width: 100px;
    height: 30px;
    font-size: 0.7em;
    background-color: lightgray;
    cursor: pointer;
  }
  .new-message.selected {
    background-color: orangered;
    color: white;
  }

  .inbox {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    font-size: 0.7em;
    height: 30px;
    width: 50px;
    cursor: pointer;
  }

  .inbox.selected {
    background-color: orangered;
    color: white;
  }
  .sent {
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: lightgray;
    font-size: 0.7em;
    width: 50px;
    height: 30px;
    cursor: pointer;
  }

  .sent.selected {
    background-color: orangered;
    color: white;
  }

  .message-bar-header > input {
    height: 50%;
    width: 15px;
    margin: auto;
    margin-right: 1%;
    padding-right: 30px;
  }

  @media only screen and (min-width: 640px) and (max-width: 1024px) {
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
  }
</style>
