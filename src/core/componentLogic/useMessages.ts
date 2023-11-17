import { Message } from '@/type'
import { ref } from 'vue'
import {
  getReceivedMessages,
  getSentMessages,
} from '../services/APIMessageRequests'

const receivedMessages = ref<Array<Message>>([])
const countUnread = ref<number>(0)

const sentMessages = ref<Array<Message>>([])

const replyEmail = ref<string>('')
const replySubject = ref<string>('')

export function useMessages() {
  async function setReceivedMessages(userId: number) {
    try {
      const response = await getReceivedMessages(userId)
      receivedMessages.value = []
      countUnread.value = 0
      response.data.forEach((message: Message) => {
        receivedMessages.value.push(message)
        if (!message.isRead) {
          countUnread.value++
        }
      })
      if (response.status === 400) {
        receivedMessages.value = []
      }
    } catch (error) {
      receivedMessages.value = []
    }
  }

  async function setSentMessages(userId: number) {
    try {
      const response = await getSentMessages(userId)
      sentMessages.value = []
      response.data.forEach((message: Message) => {
        sentMessages.value.push(message)
      })
      if (response.status === 400) {
        receivedMessages.value = []
      }
    } catch (error) {}
  }

  return {
    sentMessages,
    receivedMessages,
    countUnread,
    replyEmail,
    replySubject,
    setReceivedMessages,
    setSentMessages,
  }
}
