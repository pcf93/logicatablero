<template>
    <h1>Sol·licituds de contacte</h1>
    <ContactRequestTemplate v-for="contact in friendRequestList" :key="contact.friendRequestId" :contact="contact"></ContactRequestTemplate>
</template>



<script setup lang="ts">
import ContactRequestTemplate from '@/components/requests/ContactRequestTemplate.vue'
import { useContacts } from '@/core/componentLogic/useContacts'

const { friendRequestList } = useContacts()

</script>



<style lang="scss">

</style>