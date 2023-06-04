<template>
    <div>
        {{ name }}
    </div>
</template>

<script setup>
const name = ref('Chau')

definePageMeta({
    layout: false,
})
useHead({
    title: 'SPA page',
})
</script>

<style scoped></style>
