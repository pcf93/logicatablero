<template>
    <MatchesHeader v-if=" activeMatchId == 0"></MatchesHeader>
    <RouterLink to="/home" v-if=" activeMatchId == 0">
    <button class="btn btn-primary">Tornar al menu</button>
  </RouterLink>
    <button class="btn btn-secondary" id="tornar" v-if="activeMatchId != 0" @click="activeMatchId = 0">Torna a llista de partides</button>
    
    <div v-if="activeMatchId == 0">
        <div class="contact-box" v-if="activeMatchesList.length == 0">
        <p>De moment no tens partides començades</p>
        </div>
        <MatchItemTemplate v-for="match in activeMatchesList" :key="match.matchId" :match="match"></MatchItemTemplate>
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
import { getMatch } from '@/core/services/APIMatchRequests'
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



<style scoped lang="scss">

.btn-secondary{
    width: 80vw;
    margin-top:1vh;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1vh;
}




</style>