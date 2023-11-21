import { FriendRequest } from '@/type'
import { ref } from 'vue'
import {
  sendContactRequest,
  getContacts
  ,
} from '../services/APIContactRequests'

const friends = ref<Array<FriendRequest>>([])
const friendRequest = ref<Array<FriendRequest>>([])

export function useContacts() {
  async function setContacts(userId: number) {
    try {
      const response = await getContacts(userId)
      friends.value = []
      response.data.forEach((friendRequest: FriendRequest) => {
        friends.value.push(friendRequest)
      })
      if (response.status === 400) {
        friends.value = []
      }
    } catch (error) {
      friends.value = []
    }
  }

  /*
  async function setFriendRequests(userId: number) {
    try {
      const response = await get(userId)
      sentMessages.value = []
      response.data.forEach((message: Message) => {
        sentMessages.value.push(message)
      })
      if (response.status === 400) {
        receivedMessages.value = []
      }
    } catch (error) {}
  }
*/
  return {
    friends,
    setContacts
  }
}
