<template>
  <AlertsMessagesHeader></AlertsMessagesHeader>
  <RouterLink to="/home">
    <button class="btn btn-primary">Tornar al menu</button>
  </RouterLink>
  <section class="alerts" v-if="isLogged">
    <MessagesHeader
      @cambiar-opcion="(n) => (currentOption = n)"
      :noLeidos="noLeidos"
    />
    <NewMessage
      @cambiar-opcion="(n) => (currentOption = n)"
      v-if="currentOption == 1"
    />
    <InboxMessages
      @cambia-opcion="(n) => (currentOption = n)"
      :inboxMessages="receivedMessagesFiltered"
      v-if="currentOption == 2"
    />
    <SentMessages
      :sentMessages="sentMessagesFiltered"
      v-if="currentOption == 3"
    />
  </section>
</template>

<script setup lang="ts">
  import { useLogin } from '@/core/componentLogic/useLogin'
  import { useMessages } from '@/core/componentLogic/useMessages'
  import { Message } from '@/type'
  import { computed, ref } from 'vue'
  import HomeOptions from '../home/HomeOptions.vue'
  import InboxMessages from './InboxMessages.vue'
  import MessagesHeader from './MessagesHeader.vue'
  import AlertsMessagesHeader from '@/components/section_headers/AlertsMessagesHeader.vue'
  import NewMessage from './NewMessage.vue'
  import SentMessages from './SentMessages.vue'

  var currentOption = ref<number>(1)
  var noLeidos = ref<number>(3)
  var search = ref<string>('')
  var { isLogged } = useLogin()
  const { userId, userName, parseJwt, getCookie } = useLogin()

  userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
  userId.value = parseInt(
          Object.values(parseJwt(getCookie('JWT')))[2] as string
        )

  const { receivedMessages, sentMessages } = useMessages()

  const receivedMessagesFiltered = computed(() =>
    receivedMessages.value.filter(
      (message) =>
        message.messageSubject
          .toLowerCase()
          .includes(search.value.toLowerCase()) ||
        message.username.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  const sentMessagesFiltered = computed(() =>
    sentMessages.value.filter(
      (message) =>
        message.messageSubject
          .toLowerCase()
          .includes(search.value.toLowerCase()) ||
        message.username.toLowerCase().includes(search.value.toLowerCase())
    )
  )

  function showMessage(message: Message) {
    message.isRead = !message.isRead
  }
  /* addSentMessage(message: Message) {
                  const newMessage: Message = {
                    id: message.id,
                    username: message.username,
                    subject: message.subject,
                    date: message.date,
                    read: message.read,
                    content: message.content,
                  }
                  this.MessagesSentOriginal.push(newMessage)
                },
                filteredSent(search: string) {
                  console.log(this.MessagesSentOriginal)
                  const result = this.MessagesSentOriginal.filter(
                    (MessagesSent: Message) =>
                      MessagesSent.username
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      MessagesSent.subject.toLowerCase().includes(search.toLowerCase()) ||
                      MessagesSent.content.toLowerCase().includes(search.toLowerCase())
                  )

                  this.MessagesSentFiltered = result
                },
                filteredInbox(search: string) {
                  const result = this.MessagesInboxOriginal.filter(
                    (MessagesInbox: Message) =>
                      MessagesInbox.username
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      MessagesInbox.subject
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      MessagesInbox.content.toLowerCase().includes(search.toLowerCase())
                  )
                  this.MessagesInboxFiltered = result
                  console.log(this.MessagesInboxFiltered)
                },
                deleteMessage(id: number) {
                  this.MessagesInboxFiltered.splice(id, 1)
                },
                changeStatus(id: number) {
                  this.MessagesInboxFiltered[id].read = true

                  let contador = 0

                  this.MessagesInboxOriginal.forEach((element) => {
                    if (!element.read) contador++
                  })
                  this.noLeidos = contador + 1

                  this.noLeidos--

                  return contador
                },
           {
                },
       {
    ,
            }*/
</script>

<style scoped lang="scss">
  .alerts {
    position: absolute;
    top: 30vh;
    left: 5vw;
    display: flex;
    flex-direction: column;
    justify-content:left;

    margin-top: 50px;
    margin-bottom: 50px;
    margin: auto;
    border: 1px solid gray;
    background-color: white;
    width: 90%;
  }

  @media only screen and (min-width: 1024px) {

    .alerts {
      width: 50%;
      margin: auto;
    }
  }

</style>
