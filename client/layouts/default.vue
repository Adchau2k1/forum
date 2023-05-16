<script setup>
import { ref } from 'vue'

const search = ref('')

definePageMeta({
    // you can also pass a string or a computed property
    key: (route) => route.slug,
    transition: {
        name: 'news',
    },
    keepalive: {
        exclude: ['modal'],
    },
})
</script>

<template>
    <main>
        <!-- Header -->
        <div
            class="z-10 fixed inset-0 grid grid-cols-3 justify-center items-center h-[66px] px-5 bg-white shadow-none border-b border-b-solid border-b-[#e8ebed]"
        >
            <div class="flex items-center">
                <NuxtImg src="/img/logo-forum.png" alt="My Image" height="50" width="50" sizes="md:40 lg:100" />
                <span class="ml-2 text-lg font-medium">Diễn đàn sinh viên</span>
            </div>
            <div class="relative h-10 bg-gray-100 flex items-center justify-center border rounded-xl">
                <input
                    v-model="search"
                    placeholder="Tìm kiếm"
                    class="w-full pl-4 pr-12 h-full text-15px outline-none text-textColor"
                />
                <v-icon class="!absolute top-1/2 -translate-y-1/2 right-4">mdi-magnify</v-icon>
            </div>
            <div class="text-right">
                <NuxtLink
                    to="/login"
                    class="px-4 py-2 rounded-xl text-15px font-600 text-white !bg-primary no-underline"
                >
                    Đăng nhập
                </NuxtLink>
            </div>
        </div>

        <div>
            <!-- Nav -->
            <div class="z-10 fixed left-5 top-82px h-[calc(100vh-100px)] py-4 rounded-md shadow-pretty">
                <div class="flex flex-col items-center gap-4">
                    <button class="w-12 h-12 rounded-full bg-#22e1b9">
                        <v-icon class="!text-white">mdi-plus</v-icon>
                    </button>
                    <NuxtLink
                        to="/"
                        class="flex flex-col justify-center items-center hover:bg-gray-100 rounded-md w-full p-3 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-home</v-icon>
                        <span class="text-11px font-medium">Trang chủ</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/news"
                        class="flex flex-col justify-center items-center rounded-md w-full p-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-newspaper</v-icon>
                        <span class="text-11px font-medium">Tin tức</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/library"
                        class="flex flex-col justify-center items-center rounded-md w-full p-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-library</v-icon>
                        <span class="text-11px font-medium">Thư viện</span>
                    </NuxtLink>
                    <NuxtLink
                        to="/contact"
                        class="flex flex-col justify-center items-center rounded-md w-full p-3 hover:bg-gray-100 no-underline !text-black"
                    >
                        <v-icon size="30">mdi-contacts</v-icon>
                        <span class="text-11px font-medium mt-1">Liên hệ</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Content -->
            <div class="mt-82px ml-42px mr-4 px-4">
                <slot />
            </div>
        </div>
    </main>
</template>

<style scoped>
.router-link-active {
    background-color: #ddd;
    color: #fff;
}
</style>
