<template>
<h1>Partida cargada con éxito. Esta es la partida: {{ match?.matchId }}</h1>
<div class="tableros">
    <div class="tablero">
        <div class="vides">
        <p>Tu: {{ match?.vidasPlayer1 }} vides</p>
        </div>
     <PlayerBoard :array="tuArray!"></PlayerBoard>
    </div>
<div class="tablero">
    <div class="vides">
    <p>Rival: {{ match?.vidasPlayer2 }} vides</p>
</div>
    <RivalBoard :array="arrayRival!"></RivalBoard>
</div>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Match } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useMatches } from '@/core/componentLogic/useMatches'
import { getMatch } from '@/core/services/APIMatchRequests'
import { Console } from 'console';
import PlayerBoard from './PlayerBoard.vue';
import RivalBoard from './RivalBoard.vue';

const { userId } = useLogin()
const { match } = useMatches()

const matchData: Match | null | undefined = match?.value
const tuArray = ref<number[]>()
const arrayRival = ref<number[]>()
const tusVidas = ref<number>()
const vidasRival = ref<number>()

const setArrays = () => {
    if (userId.value == matchData?.player1Id){
        tuArray.value = matchData.arrayPlayer1
        arrayRival.value = matchData.arrayPlayer2
        tusVidas.value = matchData.vidasPlayer1
        vidasRival.value = matchData.vidasPlayer2
    } else {
        tuArray.value = matchData?.arrayPlayer2
        arrayRival.value = matchData?.arrayPlayer1
        tusVidas.value = matchData?.vidasPlayer2
        vidasRival.value = matchData?.vidasPlayer1
    }
}

setArrays()

console.log(tuArray.value)
console.log(arrayRival.value)
console.log(userId.value as number)



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

    

</style>