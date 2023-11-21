<template>
    <div class="contact-box" v-if="!acceptada">
        <p>{{ friendString }}</p>
        <img src="@/assets/images/confirm.png" v-if="userId != props.contact.friendRequestSenderId" @click="acceptRequest">
        <img src="@/assets/images/cancel.png" v-if="userId != props.contact.friendRequestSenderId">
        <span v-if="userId == props.contact.friendRequestSenderId">Pendent</span>
    </div>
</template>



<script setup lang="ts">
import { PropType, ref } from 'vue';
import { FriendRequest } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { useContacts } from '@/core/componentLogic/useContacts'
import { getUser } from '@/core/services/APIUserRequests';
import { acceptContactRequest } from '@/core/services/APIContactRequests';
const { userId  } = useLogin()
const { friendRequestList } = useContacts()

const props = defineProps({
    contact: { type: Object as PropType<FriendRequest>, required: true },
  })

var friend = ref<number>(0)
var friendString = ref<string>("")
var acceptada = ref(false)

const setUser = () => {
    if (userId.value == props.contact.friendRequestReceiverId){
    friend.value = props.contact.friendRequestSenderId
} else {
    friend.value = props.contact.friendRequestReceiverId
}
getUser(friend.value)
        .then((response) => {
          friendString.value =
            response.data.userName
        })
        .catch((error) => {
          console.log(error)
        })
}

setUser()

async function acceptRequest(){
    console.log(props.contact.friendRequestId)
    await acceptContactRequest(props.contact.friendRequestId)
    .then(() => {
        alert('Sol·licitud acceptada!')

        const index = friendRequestList.value.indexOf(props.contact)
        if (index > -1) {
          friendRequestList.value.splice(index, 1)
        }

    })
}



</script>



<style scope lang="scss">

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

.contact-box > span{
    color: orange;
    font-weight: bolder;
}

</style>