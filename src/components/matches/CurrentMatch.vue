<template>
<div class="tableros">
    <div class="tablero">
        <div class="vides">
        <p v-if="userId == match?.player1Id">Tu: {{ match?.vidasPlayer1 }} vides</p>
        <p v-if="userId == match?.player2Id">Tu: {{ match?.vidasPlayer2 }} vides</p>
        </div>
     <PlayerBoard :array="tuArray!"></PlayerBoard>
    </div>
<div class="tablero">
    <div class="vides">
        <p v-if="userId == match?.player2Id">Rival: {{ match?.vidasPlayer1 }} vides</p>
        <p v-if="userId == match?.player1Id">Rival: {{ match?.vidasPlayer2 }} vides</p>
</div>
    <RivalBoard :match="matchData?.matchId!" :array="arrayRival!" :turn="matchData?.playerTurnId!" :rival="idRival!"></RivalBoard>
</div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Match } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useMatches } from '@/core/componentLogic/useMatches'
import { getMatch } from '@/core/services/APIMatchRequests'
import { Console } from 'console';
import PlayerBoard from './PlayerBoard.vue';
import RivalBoard from './RivalBoard.vue';

const { userId } = useLogin()
const { match } = useMatches()

const matchData = ref<Match | null | undefined>(match.value)
const tuArray = ref<number[]>()
const arrayRival = ref<number[]>()
const tusVidas = ref<number>()
const vidasRival = ref<number>()
const idRival = ref<number>()
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

onMounted(() => 
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
)

onBeforeUnmount(()=>{
    clearInterval(pollData.value)
})

</script>

<style lang="scss">

@media only screen and (max-width:768px) and (orientation: portrait){

    .tableros{
        display: flex;
        flex-wrap: wrap;

    }

    .tablero{
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .vides {
        height: 10vh;
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