<template>
<div class="tableros">
    <div class="tableroJugador">
        <div class="vides">
            <div class="vides-logo">
                <img src="@/assets/images/heart.png">
            </div> 
            <div class="vides-contador-jugador">
                <span :class="{unNumero:match.vidasPlayer1 < 10}" v-if="userId == match?.player1Id">{{ match?.vidasPlayer1 }}</span>
                <span :class="{unNumero:match.vidasPlayer2 < 10}" v-if="userId == match?.player2Id">{{ match?.vidasPlayer2 }}</span>
                
            </div>
            <p class="info">{{ userName }}</p>
            <p class="info"> VS </p>
            <p class="info">{{ rivalName }}</p>
            <div class="vides-contador-rival">
                
                <span :class="{unNumero:match.vidasPlayer1 < 10}" v-if="userId == match?.player2Id">{{ match?.vidasPlayer1 }}</span>
                <span :class="{unNumero:match.vidasPlayer2 < 10}" v-if="userId == match?.player1Id">{{ match?.vidasPlayer2 }}</span>
            </div>
            <div class="vides-logo">
                <img src="@/assets/images/heart.png">
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

@media only screen and (max-width:768px) and (orientation: portrait){

    .vides{
        display: flex;
        width: 100vw;
        height: 5vh;
        flex-direction: row;
        justify-content: space-around;
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

    .vides-logo > img {
        height: 5vh;
        width: 5vh;
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

    .vides-contador-jugador{
        top: 18.5vh;
        left: 7vw;
    }

    .vides-contador-rival{
        top: 18.5vh;
        right: 7vw;
    }

    .videsRival, .videsRival > img {
        height: 12vw;
        width: 12vw;
    }

    .videsRival > span {
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
    }

}

@media only screen and (max-width:768px) and (orientation: landscape){

    .tableros{
        display: flex;
        

    }

    .tablero{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    h2 {
        height: 10vh;
    }

}

@media only screen and (min-width:1024px){

.tableros{
    display: flex;
    

}

.tablero{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h2 {
    height: 10vh;
}

}  

</style>