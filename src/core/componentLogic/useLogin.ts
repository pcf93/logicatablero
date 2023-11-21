import { useMessages } from '@/core/componentLogic/useMessages'
import { getIdByName, loginUser } from '@/core/services/APIUserRequests'
import router from '@/router'
import { ref } from 'vue'

const isLogged = ref(sessionStorage.getItem('isLogged') === 'true')
const errorMessage = ref<string>('')

const userJWT = ref<string | null>('')

const userId = ref<number>(0)
const userName = ref<string | null>('')

const newInterval = ref<number>()

const { receivedMessages, sentMessages, countUnread} =
  useMessages()



  export function useLogin() {
  async function login(name: string, password: string) {
    await getIdByName(name)
      .then((response) => {
        userId.value = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    
    await loginUser(name, password)
      .then((response) => {
        setCookie('JWT', response.data, 1)
        userJWT.value = response.data
        isLogged.value = true;
        sessionStorage.setItem('isLogged', 'true')
        errorMessage.value = ''
        userName.value = Object.values(parseJwt(userJWT.value))[1] as string
        userId.value = parseInt(
          Object.values(parseJwt(userJWT.value))[2] as string
        )
        
        router.push("/home")
      })
      .catch((error) => {
        errorMessage.value = error.response.data
      })
  }

  function logout() {
    isLogged.value = false
    sessionStorage.setItem('isLogged', 'false')
    receivedMessages.value = []
    sentMessages.value = []
    countUnread.value = 0

    clearInterval(newInterval.value)

    document.cookie = 'JWT=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push("/login")

  }

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
  
  function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  return { isLogged, errorMessage, newInterval, userJWT, userId, userName, login, logout, setCookie, getCookie, parseJwt }
}
