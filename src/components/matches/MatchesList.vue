<template>
    <HomeOptions v-if="isLogged && activeMatchId == 0" />
    <MatchesHeader v-if=" activeMatchId == 0"></MatchesHeader>
    <button class="tornar" v-if="activeMatchId != 0" @click="activeMatchId = 0">Torna a llista de partides</button>
    <div v-if="activeMatchId == 0">
        <MatchItemTemplate v-for="match in activeMatchesList" :key="match.matchId" :match="match"></MatchItemTemplate>
    </div>
    <div class="contact-box" v-if="activeMatchesList.length == 0">
        <p>De moment no tens partides començades</p>
    </div>
    <CurrentMatch v-if="activeMatchId != 0"></CurrentMatch>

</template>

<script setup lang="ts">
import MatchesHeader from '../section_headers/MatchesHeader.vue'
import HomeOptions from '../home/HomeOptions.vue'
import MatchItemTemplate from '@/components/matches/MatchItemTemplate.vue'
import CurrentMatch from './CurrentMatch.vue'
import { useLogin } from '@/core/componentLogic/useLogin'
import { useMatches } from '@/core/componentLogic/useMatches'
import {FriendRequest, NewRequest} from '@/type'
import { setgroups } from 'process'
import { ref, reactive } from 'vue'
import { getIdByName } from '@/core/services/APIUserRequests'
import { sendContactRequest } from '@/core/services/APIContactRequests'
import { Axios, AxiosError } from 'axios'


var { isLogged } = useLogin()
const { activeMatchesList, activeMatchId, match } = useMatches()

const { userId, userName, parseJwt, getCookie } = useLogin()

const requestReceiver = ref<string>('')
const errorRequest = ref<string[]>([])
const matchSelected = ref(false)

  userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
  userId.value = parseInt(
          Object.values(parseJwt(getCookie('JWT')))[2] as string
        )



</script>



<style lang="scss">

.search-box{
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    border: 1px solid black;
    height: 20vh;
    margin: auto;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5vh;
}

.box-menu{
   display: flex;
   justify-content: space-around;
}

.box-menu > input {
    width: 40%;
}

.box-menu > img {
    width: 5vh;
    cursor: pointer;
}

.tornar{
    width: 40%;
    height: 10%;
    background-color: blue;
}

</style>