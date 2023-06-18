<script setup>
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()
const openMenu = ref(true)

const toggleMenu = () => {
    openMenu.value = !openMenu.value
}

const handleLogout = () => {
    userStore.logOut()
    navigateTo('/login')
}
</script>

<template>
    <v-layout ref="app" class="min-h-screen">
        <!-- Header -->
        <v-app-bar color="grey-lighten-4">
            <div class="px-5 flex justify-between items-center !w-full">
                <div class="flex items-center">
                    <NuxtLink to="/" class="flex items-center"
                        ><NuxtImg src="/img/logo-forum.png" alt="My Image" height="40" width="40"
                    /></NuxtLink>
                    <span class="ml-2 text-lg font-medium">Diễn đàn sinh viên</span>
                </div>
                <div class="text-right">
                    <div v-if="false">
                        <NuxtLink
                            to="/login"
                            class="non-active px-4 py-2 rounded-xl text-15px font-600 text-white !bg-primary no-underline"
                        >
                            Đăng nhập
                        </NuxtLink>
                    </div>
                    <div v-if="true">
                        <v-menu open-on-hover :close-on-content-click="false">
                            <template v-slot:activator="{ props }">
                                <button v-bind="props" class="">
                                    <template v-if="false">
                                        <NuxtImg
                                            :src="userStore.userInfo?.imageUrl || '/img/avatar.png'"
                                            alt="My Image"
                                            height="32"
                                            width="32"
                                        />
                                    </template>
                                    <template v-if="true">
                                        <v-icon size="36">mdi-account-circle-outline</v-icon>
                                    </template>
                                </button>
                            </template>

                            <v-list class="menu mt-2 relative min-w-200px">
                                <v-list-item>
                                    <button class="p-2 w-full text-left hover:bg-gray-100" @click="handleLogout">
                                        <v-icon class="mr-1">mdi-logout</v-icon> Đăng xuất
                                    </button>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </div>
            </div>
        </v-app-bar>

        <!-- Menu list -->
        <v-navigation-drawer v-model="openMenu" color="grey-darken-1" permanent name="drawer" class="relative">
            <v-list class="px-2">
                <NuxtLink to="/admin">
                    <v-btn class="flex justify-start items-center !h-12 w-full"
                        ><v-icon class="mr-1" size="24">mdi-view-dashboard</v-icon> Dashboard</v-btn
                    >
                </NuxtLink>
                <NuxtLink to="/admin/list-account">
                    <v-btn class="mt-2 flex justify-start items-center !h-12 w-full">
                        <v-icon class="mr-1" size="24">mdi-account</v-icon> Tài khoản
                    </v-btn>
                </NuxtLink>
                <NuxtLink to="/admin/list-post">
                    <v-btn class="mt-2 flex justify-start items-center !h-12 w-full">
                        <v-icon class="mr-1" size="24">mdi-table-edit</v-icon> Bài đăng
                    </v-btn>
                </NuxtLink>
                <NuxtLink to="/admin/list-category">
                    <v-btn class="mt-2 flex justify-start items-center !h-12 w-full">
                        <v-icon class="mr-1" size="24">mdi-format-list-bulleted-type</v-icon> Chuyên mục
                    </v-btn>
                </NuxtLink>
            </v-list>

            <!-- Menu toggle -->
            <div
                v-if="!openMenu"
                class="z-100 absolute top-1/2 -translate-y-[calc(100%+64px)] -right-13 rounded-full !bg-primary"
            >
                <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
            </div>
            <div v-else class="absolute bottom-2 left-1/2 -translate-x-1/2 text-white !bg-transparent">
                <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
            </div>
        </v-navigation-drawer>

        <!-- Content -->
        <v-main>
            <div class="p-5"><slot /></div>
        </v-main>
    </v-layout>
</template>

<style scoped></style>
