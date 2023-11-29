<template>
    <ContactsHeader></ContactsHeader>
    <RouterLink to="/home">
        <button class="btn btn-primary">Tornar al menu</button>
    </RouterLink>
    <div class="contacts">
    <div class="search-box">
        <div class="box-menu">
        <input type="text" placeholder="Agrega contacte" v-model="requestReceiver">
        <img src="@/assets/images/send.png" @click="enviaSolicitudContacte">
        </div>
        
    </div>
    <div class="alert alert-warning" role="alert" v-if="resultatSolicitud=='error'">
        L'usuari no existeix
    </div>
    <div class="alert alert-warning" role="alert" v-if="resultatSolicitud=='pendent'">
        Ja tens una sol·licitud pendent o ja sou amics
    </div>
    <div class="alert alert-success" role="alert" v-if="resultatSolicitud=='ok'">
        Sol·licitud enviada exitosament
    </div>
    <div class="contact-box" v-if="friends.length == 0">
        <p>De moment no tens contactes</p>
    </div>
</div>
    

    <ContactTemplate v-for="contact in friends" :key="contact.friendRequestId" :contact="contact"></ContactTemplate>
    

</template>

<script setup lang="ts">
import ContactsHeader from '../section_headers/ContactsHeader.vue'
import HomeOptions from '../home/HomeOptions.vue'
import ContactTemplate from '@/components/contacts/ContactTemplate.vue'
import { useLogin } from '@/core/componentLogic/useLogin'
import { useContacts } from '@/core/componentLogic/useContacts'
import { useWindowSize } from '@vueuse/core'
import {FriendRequest, NewRequest} from '@/type'
import { setgroups } from 'process'
import { ref, reactive } from 'vue'
import { getIdByName } from '@/core/services/APIUserRequests'
import { sendContactRequest } from '@/core/services/APIContactRequests'
import { Axios, AxiosError } from 'axios'

var { isLogged } = useLogin()
const { friends, setContacts } = useContacts()
const { width, height } = useWindowSize()

const { userId, userName, parseJwt, getCookie } = useLogin()

const requestReceiver = ref<string>('')
const errorRequest = ref<string[]>([])
const resultatSolicitud = ref<string>('')

  userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
  userId.value = parseInt(
          Object.values(parseJwt(getCookie('JWT')))[2] as string
        )

const friendRequest: NewRequest = reactive({
    friendRequestSenderId: userId.value as number,
    friendRequestReceiverId: 0
    
})
async function enviaSolicitudContacte(){
    await getIdByName(requestReceiver.value)
      .then((response) => {
        errorRequest.value = []
        friendRequest.friendRequestReceiverId = response.data
        console.log(response.data)
        console.log(requestReceiver.value)
        

      })
      .catch((error: AxiosError) => {
        friendRequest.friendRequestReceiverId = 0
        console.log(error)
      })

    if (userId.value != friendRequest.friendRequestReceiverId){
        await sendContactRequest(friendRequest)
        .then((response) => {
            errorRequest.value = []
            console.log(response.data)
            errorRequest.value.push("Sol·licitud enviada exitosament")
            resultatSolicitud.value = 'ok'
        })
        .catch((error: AxiosError) => {
            if (error.code == 'ERR_BAD_REQUEST'){
                errorRequest.value = []
                console.log(error)
                errorRequest.value.push("Ja sou amics o hi ha una sol·licitud pendent")
                resultatSolicitud.value = 'pendent'
            } else {
                errorRequest.value = []
                console.log(error)
                errorRequest.value.push("L'usuari no existeix")
                resultatSolicitud.value = 'error'
            }
            
        })
    }
    
    
    console.log(friendRequest)
}

</script>



<style scoped lang="scss">

.search-box{
    width: 90%;
    border: 1px solid black;
    height: 10vh;
    margin: auto;
    background-color: white;
    display: flex;
    justify-content: space-around;
    margin-bottom: 5vh;
}

.alert-warning, .alert-success{
    width: 90vw;
    margin: auto;
    margin-top: -4vh;
    margin-bottom: 5vh;
}

.box-menu{
   display: flex;
   justify-content: space-around;
}

.box-menu > input {
    width: 80%;
}

.box-menu > img {
    width: 5vh;
    cursor: pointer;
}

@media only screen and (max-width: $mobile-landscape-width) and (orientation: landscape){
    .search-box{
    width: 90%;
    border: 1px solid black;
    height: 20vh;
    margin: auto;
    background-color: white;
    display: flex;
    justify-content: space-around;
    margin-bottom: 5vh;
}

.alert-warning, .alert-success{
    width: 90vw;
    margin: auto;
    margin-top: -4vh;
    margin-bottom: 5vh;
}

.box-menu{
   display: flex;
   justify-content: space-around;
}

.box-menu > input {
    width: 80%;
}

.box-menu > img {
    width: 5vh;
    cursor: pointer;
}
}

@media only screen and (min-width: $mobile-landscape-width){

.search-box{
    width: 30%;
}
}

.alert-warning, .alert-success{
    width: 30vw;
    margin: auto;
    margin-top: -4vh;
    margin-bottom: 5vh;
}

</style>