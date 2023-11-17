import { useMessages } from '@/core/componentLogic/useMessages'
import { loginUser } from '@/core/services/APIUserRequests'
import { User } from '@/type'
import { ref } from 'vue'

const isLogged = ref<boolean>(false)
const userInfo = ref<User | null>(null)
const errorMessage = ref<string>('')

const { receivedMessages, sentMessages, setReceivedMessages, setSentMessages } =
  useMessages()

export function useLogin() {
  async function login(userEmail: string, userPassword: string) {
    await loginUser(userEmail, userPassword)
      .then((response) => {
        userInfo.value = response.data
        isLogged.value = true
        errorMessage.value = ''
      })
      .catch((error) => {
        errorMessage.value = error.response.data
      })
  }

  function logout() {
    isLogged.value = false
    receivedMessages.value = []
    sentMessages.value = []
  }
  return { isLogged, userInfo, errorMessage, login, logout }
}
