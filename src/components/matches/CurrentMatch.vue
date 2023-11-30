<template>
<div class="pantalla-partida">
    <div class="vides">
            <div id="torn-jugador" class="marcador-torn" :class="{desactivat: userId == match?.playerTurnId}">
            <div class="vides-logo">
                <img src="@/assets/images/heart.png">
                <div class="vides-contador-jugador">
                <span :class="{unNumero:match.vidasPlayer1 < 10}" v-if="userId == match?.player1Id">{{ match?.vidasPlayer1 }}</span>
                <span :class="{unNumero:match.vidasPlayer2 < 10}" v-if="userId == match?.player2Id">{{ match?.vidasPlayer2 }}</span>
            </div>
            </div> 
            
            <p class="info">{{ userName }}</p>
            </div>
            <p class="info"> VS </p>
            <div id="torn-rival" class="marcador-torn" :class="{desactivat: userId != match?.playerTurnId}">
            <p class="info">{{ rivalName }}</p>
            
            <div class="vides-logo">
                <div class="vides-contador-rival">
                
                <span :class="{unNumero:match.vidasPlayer1 < 10}" v-if="userId == match?.player2Id">{{ match?.vidasPlayer1 }}</span>
                <span :class="{unNumero:match.vidasPlayer2 < 10}" v-if="userId == match?.player1Id">{{ match?.vidasPlayer2 }}</span>
            </div>
                <img src="@/assets/images/heart.png">
            </div>
        </div>
    </div>
    <div class="tableros">
        <PlayerBoard :array="tuArray!"></PlayerBoard>
        <RivalBoard :recognition="recognition" :match="matchData?.matchId!" :array="arrayRival!" :turn="matchData?.playerTurnId!" :rival="idRival!"></RivalBoard>
    </div>
</div>
<div class="button-container">
    <button class="attack-button" v-if="width <= 1024" @click="recognition?.start()">ATACAR</button>
    <button class="attack-button" v-if="width > 1024" @click="recognition?.start()">ATACAR</button>
    <div class="message-menu">
        <input class="message-text" v-model="message.matchMessageContent">
        <button class="send-button" @click="enviaMissatge">
          ENVIAR
        </button>
        <button class="record-button">
           GRABAR
        </button>
    </div>
    </div>
    <div class="message-notification" :class="{tancat: closedMessage}" v-if="ultimoMensaje != null">
        <div class="close-message" @click="closedMessage = true">X</div>
        <p> {{  ultimoMensaje.matchMessageContent }}</p>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Match, MatchMessage, NewMatchMessage } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useWindowSize } from '@vueuse/core';
import { useMatches } from '@/core/componentLogic/useMatches'
import { getUser } from '@/core/services/APIUserRequests';
import { getMatch } from '@/core/services/APIMatchRequests'
import { getMatchMessages, getLastReceivedMatchMessage, sendMatchMessage} from '@/core/services/APIMatchMessageRequests'
import { Console } from 'console';
import PlayerBoard from './PlayerBoard.vue';
import RivalBoard from './RivalBoard.vue';
import { refDebounced } from '@vueuse/core';

const { userId } = useLogin()
const { match, jugadorActual, rivalActual, ultimoMensaje, ultimoMensajeCerrado } = useMatches()
const { width } = useWindowSize()

const matchData = ref<Match | null | undefined>(match.value)
const tuArray = ref<number[]>()
const arrayRival = ref<number[]>()
const tusVidas = ref<number>()
const vidasRival = ref<number>()
const idRival = ref<number>()
const userName = ref<string>('')
const rivalName = ref<string>('')
const pollData = ref<NodeJS.Timer>()

const message: NewMatchMessage = reactive({
    messageSenderId: userId.value as number,
    matchId: match.value?.matchId as number,
    matchMessageContent: '',
  })

const closedMessage = ref(false)

const setArrays = () => {
    if (userId.value == matchData?.value!.player1Id){
        tuArray.value = matchData.value!.arrayPlayer1
        arrayRival.value = matchData.value!.arrayPlayer2
        tusVidas.value = matchData.value!.vidasPlayer1
        vidasRival.value = matchData.value!.vidasPlayer2
        idRival.value = matchData.value!.player2Id
    } else {
        tuArray.value = matchData?.value!.arrayPlayer2
        arrayRival.value = matchData?.value!.arrayPlayer1
        tusVidas.value = matchData?.value!.vidasPlayer2
        vidasRival.value = matchData?.value!.vidasPlayer1
        idRival.value = matchData?.value!.player1Id
    }
}
setArrays();
setInterval(function(){setArrays()}, 2000)

let recognition: SpeechRecognition | null= null;

recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false; 

onMounted(() => {


    
    dameUltimoMensaje();
    
    pollData.value = setInterval(function(){ 
        getMatch(match.value?.matchId!)
        .then((response) => {
            match.value = response.data
            matchData.value = response.data
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })

        compruebaUltimoMensaje();

    }, 3000)

    setUsers()
})

onBeforeUnmount(()=>{
    clearInterval(pollData.value)
})

async function setUsers(){

    await getUser(match.value?.player1Id!)
    .then((response) => {
        if (userId.value == match.value?.player1Id!){
            userName.value = response.data.userName
        }
        if (userId.value != match.value?.player1Id!){
            rivalName.value = response.data.userName
        }
        })
    .catch((error) => {
        console.log(error)
    })

    await getUser(match.value?.player2Id!)
    .then((response) => {
        if (userId.value == match.value?.player2Id!){
            userName.value = response.data.userName
        }
        if (userId.value != match.value?.player2Id!){
            rivalName.value = response.data.userName
        }
        })
    .catch((error) => {
        console.log(error)
    })
}

console.log(userId.value, match.value?.matchId)

async function dameUltimoMensaje(){
    await getLastReceivedMatchMessage(match.value?.matchId!, userId.value)
    .then((response) => {
        ultimoMensaje.value = response.data
        console.log(response.data)
        console.log(ultimoMensaje.value)
    })
    .catch((error) => {
        console.log(error)
        ultimoMensaje.value = null
    })
}

async function compruebaUltimoMensaje(){
    await getLastReceivedMatchMessage(match.value?.matchId!, userId.value)
    .then((response) => {
        if (ultimoMensaje.value == null){
            ultimoMensaje.value = response.data
            closedMessage.value = false
        }
        if (response.data.matchMessageId != ultimoMensaje.value.matchMessageId){
            ultimoMensaje.value = response.data
            closedMessage.value = false
            ultimoMensajeCerrado.value = false;
        }
    })
}

async function enviaMissatge(){
    await sendMatchMessage(message)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

</script>

<style scoped lang="scss">

@media only screen and (max-width:$mobile-landscape-width) and (orientation: portrait){

    .tableros{
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
    }
    
    .vides{
        display: flex;
        width: 100vw;
        height: 5vh;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 1vh;
    }

    .marcador-torn{
        display: flex;
        border-radius: 10vw;
    }

    .marcador-torn.desactivat{
        display: flex;
        border-radius: 10vw;
        border: 1px solid red;
    }

    .pantalla-partida{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .tableroJugador{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .vides-logo{
        position: relative;
    }
    
    .vides-logo > img {
        height: 5vh;
        width: 5vh;
        margin-left: 2vw;
        margin-right: 2vw;
    }

    .vides-logo > div.vides-contador-jugador, .vides-logo > div.vides-contador-rival{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .vides-contador-jugador, .vides-contador-rival{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    .vides-contador-jugador, .vides-contador-rival {
        position: absolute;
        color: white;
        font-weight: bold;
    }

    .tableroRival{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
    }

    .info{
        font-weight: bolder;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    .message-notification{
        width: 80vw;
        height: auto;
        background-color: white;
        opacity: 0.8;
        position: fixed;
        bottom: 10vh;
        right: 5vw;
        text-align: justify;
        font-weight: bold;
    }

    .message-notification.tancat{
        display: none;
    }

    .message-notification > p{
        margin-top: 5vh;
        margin-bottom: auto;
        margin-left: 5vw;
        margin-right: 5vw;
        opacity: 1;
    }

    .close-message{
        position: absolute;
        top: 0;
        right: 0;
        border: none;
        opacity: 0.8;
        background-color: transparent;
    }

    input{
        width: 100%;
    }

    .button-container{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

input{
    width: 20vw;
    margin-right: 5vw;
}

.attack-button, .send-button, .record-button {
    width: 20vw;
    height: 6vw;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

}

@media only screen and (max-width:$mobile-landscape-width) and (orientation: landscape){

    .tableros{
        display: flex;
        flex-direction: row;
        width: 100vw;
        justify-content: space-evenly;
    }

    .vides{
        display: flex;
        height: 10vh;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 1vh;
    }

    .marcador-torn{
        display: flex;
        border-radius: 10vw;
    }

    .marcador-torn.desactivat{
        display: flex;
        border-radius: 10vw;
        border: 1px solid red;
    }

    .pantalla-partida{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .tableroJugador{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .vides-logo{
        position: relative;
    }
    
    .vides-logo > img {
        height: 10vh;
        width: 10vh;
        margin-left: 2vw;
        margin-right: 2vw;
    }

    .vides-logo > div.vides-contador-jugador, .vides-logo > div.vides-contador-rival{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .vides-contador-jugador, .vides-contador-rival{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    .vides-contador-jugador, .vides-contador-rival {
        position: absolute;
        color: white;
        font-weight: bold;
    }

    .tableroRival{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
    }

    .info{
        font-weight: bolder;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    input{
        width: 100%;
    }

    .button-container{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

input{
    width: 20vw;
    margin-right: 5vw;
}

.attack-button, .send-button, .record-button {
    width: 10vw;
    height: 6vw;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

.button-container > button {
    width: 6vw;
    height: 6vw;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

}

@media only screen and (min-width:$mobile-landscape-width){

    .tableros{
        display: flex;
        flex-direction: row;
        width: 100vw;
        justify-content: center;
    }

    .vides{
        display: flex;
        height: 5vh;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 1vh;
    }

    .marcador-torn{
        display: flex;
        border-radius: 10vw;
    }

    .marcador-torn.desactivat{
        display: flex;
        border-radius: 10vw;
        border: 1px solid red;
    }

    .pantalla-partida{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    .tableroJugador{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .vides-logo{
        position: relative;
    }
    
    .vides-logo > img {
        height: 5vh;
        width: 5vh;
        margin-left: 2vw;
        margin-right: 2vw;
    }

    .vides-logo > div.vides-contador-jugador, .vides-logo > div.vides-contador-rival{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .vides-contador-jugador, .vides-contador-rival{
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    .vides-contador-jugador, .vides-contador-rival {
        position: absolute;
        color: white;
        font-weight: bold;
    }

    .tableroRival{
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: auto;
    }

    .info{
        font-weight: bolder;
        margin-left: 5vw;
        margin-right: 5vw;
    }

    .button-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

input{
        width: 100%;
    }

    .button-container{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15vh;
}

input{
    width: 20vw;
    margin-right: 5vw;
}

.attack-button, .send-button, .record-button {
    width: 20vw;
    height: 6vw;
    margin-top: 1vh;
    border-radius: 2vh;
    background-color: rgb(160, 22, 22);
    color: white;
    font-weight: bolder;
}

}

</style>