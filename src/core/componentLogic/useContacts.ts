import { FriendRequest } from '@/type'
import { ref } from 'vue'
import {
  sendContactRequest,
  getContacts,
  getContactRequests
  ,
} from '../services/APIContactRequests'

const friends = ref<Array<FriendRequest>>([])
const friendRequestList = ref<Array<FriendRequest>>([])
const countContacts = ref<number>(0)

export function useContacts() {
  async function setContacts(userId: number) {
    try {
      const response = await getContacts(userId)
      friends.value = []
      countContacts.value = 0
      response.data.forEach((friendRequest: FriendRequest) => {
        friends.value.push(friendRequest)
        countContacts.value++
      })
      if (response.status === 400) {
        friends.value = []
      }
    } catch (error) {
      friends.value = []
    }
  }

  
  async function setContactRequests(userId: number) {
    try {
      const response = await getContactRequests(userId)
      friendRequestList.value = []
      response.data.forEach((friendRequest: FriendRequest) => {
        friendRequestList.value.push(friendRequest)
      })
      if (response.status === 400) {
        friendRequestList.value = []
      }
    } catch (error) {}
  }

  return {
    friends,
    friendRequestList,
    countContacts,
    setContacts,
    setContactRequests
  }
}
