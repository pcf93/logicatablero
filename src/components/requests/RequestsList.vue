<template>
    <RequestsHeader></RequestsHeader>
    <RouterLink to="/home">
        <button class="btn btn-primary">Tornar al menu</button>
    </RouterLink>
    <ContactRequests></ContactRequests>
</template>



<script setup lang="ts">
import RequestsHeader from '../section_headers/RequestsHeader.vue'
import HomeOptions from '../home/HomeOptions.vue'
import ContactTemplate from '@/components/contacts/ContactTemplate.vue'
import ContactRequests from './ContactRequests.vue'
import MatchRequests from './MatchRequests.vue'
import { useLogin } from '@/core/componentLogic/useLogin'
import { useContacts } from '@/core/componentLogic/useContacts'
import {FriendRequest} from '@/type'
import { setgroups } from 'process'

var { isLogged } = useLogin()
const { friends, setContactRequests } = useContacts()

const { userId, userName, parseJwt, getCookie } = useLogin()

  userName.value = Object.values(parseJwt(getCookie('JWT')))[1] as string
  userId.value = parseInt(
          Object.values(parseJwt(getCookie('JWT')))[2] as string
        )

console.log(friends.value)

</script>



<style lang="scss">

.search-box{
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

.search-box > input {
    width: 40%;
}

.search-box > img {
    width: 5vh;
    cursor: pointer;
}

</style>