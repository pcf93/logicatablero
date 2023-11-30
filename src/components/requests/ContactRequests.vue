<template>
    <div class="request-box" v-if="friendRequestList.length == 0">
        <p>De moment no tens cap sol·licitud d'amistat pendent.</p>
    </div>
    <ContactRequestTemplate v-for="contact in friendRequestList" :key="contact.friendRequestId" :contact="contact"></ContactRequestTemplate>
</template>



<script setup lang="ts">
import ContactRequestTemplate from '@/components/requests/ContactRequestTemplate.vue'
import { useContacts } from '@/core/componentLogic/useContacts'

const { friendRequestList } = useContacts()

</script>



<style lang="scss">
.request-box{
    width: 90%;
    border: 1px solid black;
    height: 10vh;
    background-color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    margin-top: 0;
    margin-left: 5%;
}

.request-box > p {
    margin: auto;
}
</style>