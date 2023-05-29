<script setup>
import Search from '~/components/Search.vue'

useHead({
    title: 'Diễn đàn sinh viên',
    meta: [
        {
            name: 'description',
            content:
                'Diễn đàn Sinh viên là cộng đồng trực tuyến năng động và sôi động, dành riêng cho sinh viên trên khắp nơi.',
        },
    ],
})
</script>

<template>
    <main>
        <!-- Header -->
        <header
            class="z-10 fixed inset-0 grid grid-cols-3 justify-center items-center h-[66px] px-5 bg-white shadow-none border-b border-b-solid border-b-[#e8ebed]"
        >
            <div class="flex items-center">
                <NuxtImg src="/img/logo-forum.png" alt="My Image" height="50" width="50" />
                <span class="ml-2 text-lg font-medium">Diễn đàn sinh viên</span>
            </div>

            <Search />

            <div class="text-right">
                <NuxtLink
                    to="/login"
                    class="px-4 py-2 rounded-xl text-15px font-600 text-white !bg-primary no-underline"
                >
                    Đăng nhập
                </NuxtLink>
            </div>
        </header>

        <div class="mb-5">
            <!-- Nav -->
            <div class="z-10 fixed left-5 top-82px h-[calc(100vh-100px)] py-4 rounded-md shadow-pretty bg-white">
                <div class="flex flex-col items-center gap-4 p-1">
                    <button class="w-12 h-12 rounded-full bg-#22e1b9">
                        <v-icon class="!text-white">mdi-plus</v-icon>
                    </button>
                    <NuxtLink
                        to="/"
                        class="flex flex-col justify-center items-center hover:bg-gray-100 rounded-md w-full px-2 py-3 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-home</v-icon>
                        <span class="text-11px font-medium">Trang chủ</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/topic"
                        class="flex flex-col justify-center items-center rounded-md w-full px-2 py-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-newspaper</v-icon>
                        <span class="text-11px font-medium">Chuyên mục</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/utilities"
                        class="flex flex-col justify-center items-center rounded-md w-full px-2 py-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-tools</v-icon>
                        <span class="text-11px font-medium">Tiện ích</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/introduce"
                        class="flex flex-col justify-center items-center rounded-md w-full px-2 py-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-information </v-icon>
                        <span class="text-11px font-medium mt-1">Giới thiệu</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Content -->
            <!-- <div class="w-82px mr-4"></div> -->
            <div class="ml-65px min-h-screen mt-42px pt-11px pr-11px overflow-hidden">
                <slot />
            </div>
        </div>
    </main>
</template>

<style scoped>
.router-link-active {
    background-color: #ddd;
}
</style>
