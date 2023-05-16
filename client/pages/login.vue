<script setup>
const form = ref(null)
const username = ref('')
const password = ref('')
const loading = ref(false)

const snackConfig = ref({
    open: false,
    icon: '',
    text: '',
    color: '',
})

const rules = [(value) => !!value || 'Trường dữ liệu bắt buộc!']

const onSubmit = () => {
    if (!form.value) return

    loading.value = true

    setTimeout(() => {
        snackConfig.value = {
            open: true,
            icon: 'mdi-check-circle-outline',
            text: 'Đăng nhập thành công',
            color: 'success',
        }
    }, 2000)
}

definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-300 text-white p-4">
        <v-snackbar v-model="snackConfig.open" location="top center" :timeout="3000" :color="snackConfig.color">
            <div class="flex justify-between items-center">
                <div>
                    <span
                        ><v-icon>{{ snackConfig.icon }}</v-icon></span
                    >
                    <span class="ml-2">{{ snackConfig.text }}</span>
                </div>
                <button type="button" color="white" text @click="snackConfig.open = false">
                    <v-icon>mdi-close</v-icon>
                </button>
            </div>
        </v-snackbar>

        <div class="flex items-center justify-center w-70% h-70% p-8 rounded-md shadow-xl bg-white">
            <div class="w-1/2 mr-10">
                <NuxtLink to="/"><NuxtImg src="/img/logo-forum.png" width="400" height="400" /></NuxtLink>
            </div>
            <v-form v-model="form" @submit.prevent="onSubmit" class="w-1/2">
                <v-container>
                    <v-row
                        ><v-col cols="12"><h2 class="text-center font-600">Đăng nhập vào diễn đàn</h2></v-col></v-row
                    >
                    <v-row>
                        <v-col cols="12" class="mt-8">
                            <v-text-field
                                v-model="username"
                                :rules="rules"
                                label="Nhập tài khoản"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="password"
                                :rules="rules"
                                type="password"
                                variant="solo"
                                label="Mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        ><v-col cols="12"
                            ><v-btn type="submit" class="w-full !h-50px rounded-lg text-white !bg-primary"
                                >Đăng nhập</v-btn
                            ></v-col
                        >
                        <v-col cols="12" class="text-center"
                            >Bạn chưa có tài khoản?
                            <NuxtLink to="/register" class="font-500 !text-primary no-underline"
                                >Đăng ký</NuxtLink
                            ></v-col
                        >
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<style scoped></style>
