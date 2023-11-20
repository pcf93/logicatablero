import { useMessages } from '@/core/componentLogic/useMessages'
import { loginUser } from '@/core/services/APIUserRequests'
import { User } from '@/type'
import { ref } from 'vue'

const isLogged = ref<boolean>(false)
const errorMessage = ref<string>('')

const userJWT = ref<string | null>('')

const userId = ref<number>(0)
const userName = ref<string | null>('')

const newInterval = ref<number>()

const { receivedMessages, sentMessages, countUnread} =
  useMessages()

function parseJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date()
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}



  export function useLogin() {
  async function login(name: string, password: string) {
    await loginUser(name, password)
      .then((response) => {
        userJWT.value = response.data
        isLogged.value = true
        errorMessage.value = ''
        userName.value = Object.values(parseJwt(userJWT.value))[1] as string
        userId.value = parseInt(
          Object.values(parseJwt(userJWT.value))[2] as string
        )
        setCookie('JWT', response.data, 1)

        console.log(parseJwt(userJWT.value))
      })
      .catch((error) => {
        errorMessage.value = error.response.data
      })
  }

  function logout() {
    isLogged.value = false
    receivedMessages.value = []
    sentMessages.value = []
    countUnread.value = 0

    clearInterval(newInterval.value)

  }
  return { isLogged, errorMessage, newInterval, userJWT, userId, userName, login, logout }
}
