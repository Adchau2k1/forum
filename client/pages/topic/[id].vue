<script setup>
const route = useRoute()
console.log('Id ', route.path)

const postData = {
    id: 23,
    title: 'Tại sao nên học code vue',
}
</script>

<template>
    <NuxtLayout><div>Chi tiết bài viết</div></NuxtLayout>
</template>

<style scoped></style>
