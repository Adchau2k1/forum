<script setup>
definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="h-screen w-full flex items-center justify-center flex-col">
        <div><v-icon size="160" color="red-300">mdi-block-helper</v-icon></div>
        <h1 class="mt-2 text-80px">403 - Cấm</h1>
        <p class="mt-1">Bạn không có quyền truy cập trang này!</p>
        <NuxtLink to="/"
            ><v-btn variant="tonal" class="mt-6 !bg-primary text-white">Quay lại trang chủ</v-btn></NuxtLink
        >
    </div>
</template>

<style scoped></style>
