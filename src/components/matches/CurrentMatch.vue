<template>
<div class="tableros">
    <div class="tableroJugador">
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
        <PlayerBoard :array="tuArray!"></PlayerBoard>
    </div>
<div class="tableroRival">
    <RivalBoard :match="matchData?.matchId!" :array="arrayRival!" :turn="matchData?.playerTurnId!" :rival="idRival!"></RivalBoard>
</div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Match } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useMatches } from '@/core/componentLogic/useMatches'
import { getUser } from '@/core/services/APIUserRequests';
import { getMatch } from '@/core/services/APIMatchRequests'
import { Console } from 'console';
import PlayerBoard from './PlayerBoard.vue';
import RivalBoard from './RivalBoard.vue';
import { refDebounced } from '@vueuse/core';

const { userId } = useLogin()
const { match, jugadorActual, rivalActual } = useMatches()

const matchData = ref<Match | null | undefined>(match.value)
const tuArray = ref<number[]>()
const arrayRival = ref<number[]>()
const tusVidas = ref<number>()
const vidasRival = ref<number>()
const idRival = ref<number>()
const userName = ref<string>('')
const rivalName = ref<string>('')
const pollData = ref<NodeJS.Timer>()

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

onMounted(() => {
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

</script>

<style scoped lang="scss">

@media only screen and (max-width:$mobile-landscape-width) and (orientation: portrait){

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

    .tableros{
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

}

@media only screen and (max-width:$mobile-landscape-width) and (orientation: landscape){

    .vides{
        display: flex;
        position: absolute;
        top: 25vh;
        width: 50vw;
        height: 10vh;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 1vh;
        transform: translate(25vw, 2vw);
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

    .tableros{
        display: flex;
        flex-wrap: nowrap;
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

}

@media only screen and (min-width:$mobile-landscape-width){

.vides{
    display: flex;
    position: absolute;
    top: 15vh;
    width: 25vw;
    height: 5vh;
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 1vh;
    transform: translate(15vw, 2vw);
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

.tableros{
    display: flex;
    flex-wrap: nowrap;
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

}

</style>