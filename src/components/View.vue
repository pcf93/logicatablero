<script setup lang="ts">

defineProps<{
    element: string;
    ariaLabel?: string;
    isDisabled?: boolean;
}>();

</script>

<template>
    <component :is="element" :aria-label="ariaLabel" :disabled="isDisabled"></component>
    <slot></slot>
</template>