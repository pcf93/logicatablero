<template>
    <div class="contact-box">
        <p>{{ friendString }}</p>
        <img src="@/assets/images/challenge.png">
        <img src="@/assets/images/cancel.png">
    </div>
</template>



<script setup lang="ts">
import { PropType, ref } from 'vue';
import { FriendRequest } from '@/type';
import { useLogin } from '@/core/componentLogic/useLogin';
import { getUser } from '@/core/services/APIUserRequests';

const { userId } = useLogin()

const props = defineProps({
    contact: { type: Object as PropType<FriendRequest>, required: true },
  })

var friend = ref<number>(0)
var friendString = ref<string>("")

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



</script>



<style lang="scss">

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

</style>