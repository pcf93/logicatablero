<template>
    <div class="contact-box">
        <p>{{ player1 + ' VS ' + player2 }}</p>
        <img src="@/assets/images/challenge.png" @click=" setMatch() ">
    </div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { Match } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useContacts } from '@/core/componentLogic/useContacts';
import { useMatches } from '@/core/componentLogic/useMatches';
import { getUser } from '@/core/services/APIUserRequests';
import { getMatch } from '@/core/services/APIMatchRequests';


const player1 = ref<string>('')
const player2 = ref<string>('')

const { userId } = useLogin()
const { friends } = useContacts()
const {  match, activeMatchId, jugadorActual, rivalActual } = useMatches()
const props = defineProps({
    match: { type: Object as PropType<Match>, required: true },
  })

async function setUser(){
    await getUser(props.match.player1Id)
    .then((response) => {
        player1.value = response.data.userName
    })
    .catch((error) => {
        console.log(error)
    })

    await getUser(props.match.player2Id)
    .then((response) => {
        player2.value = response.data.userName
    })
    .catch((error)=> {
        console.log(error)
    })
}

async function setMatch(){

    await getMatch(props.match.matchId)
    .then((response) => {
        match.value = response.data
    })
    .catch((error) => {
        console.log(error)
    })

    activeMatchId.value = props.match.matchId

}


setUser()

</script>



<style scoped lang="scss">

.contact-box{
    width: 90%;
    border: 1px solid black;
    height: 10vh;
    margin: auto;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5vh;
}

.contact-box > img {
    width: 5vh;
    cursor: pointer;
}

@media only screen and (max-width: $mobile-landscape-width) and (orientation: landscape){
 .contact-box{
    height: 20vh;
    justify-content: space-evenly;
 }   

 .contact-box > img {
    width: 10vh;
 }

}

 @media only screen and (min-width: $mobile-landscape-width){
    .contact-box{
    width: 40%;
    justify-content: space-evenly;
 }   

 .contact-box > img {
    width: 5vh;
 }
}


</style>