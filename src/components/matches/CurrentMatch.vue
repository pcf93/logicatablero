<template>

<h1>Partida cargada con éxito. Esta es la partida: {{ match?.matchId }}</h1>
<div class="tableros">
<PlayerBoard :array="tuArray!"></PlayerBoard>
<RivalBoard></RivalBoard>
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

const setArrays = () => {
    if (userId.value == matchData?.player1Id){
        tuArray.value = matchData.arrayPlayer1
        arrayRival.value = matchData.arrayPlayer2
    } else {
        tuArray.value = matchData?.arrayPlayer2
        arrayRival.value = matchData?.arrayPlayer1
    }
}

setArrays()

console.log(tuArray.value)
console.log(arrayRival.value)
console.log(userId.value as number)



</script>

<style lang="scss">

    .tableros{
        display: flex;
        flex-wrap: wrap;
    }
</style>