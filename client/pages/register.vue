<script setup>
const form = ref(null)
const username = ref('')
const email = ref('')
const password = ref('')
const rePassword = ref('')
const loading = ref(false)

const usernameRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 6 && v.length <= 12) || 'Tài khoản phải có từ 6 đến 12 ký tự!',
    (v) => /^[^0-9]/.test(v) || 'Tài khoản không được bắt đầu bằng số.',
    (v) => /^[a-zA-Z0-9]+$/.test(v) || 'Tài khoản không được chứa ký tự đặc biệt.',
]
const emailRules = [(v) => !!v || 'Trường dữ liệu bắt buộc!', (v) => /.+@.+\..+/.test(v) || 'Email không hợp lệ!']
const passwordRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 6) || 'Mật khẩu phải có ít nhất 6 ký tự!',
]
const rePasswordRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => v === password.value || 'Nhập lại mật khẩu không khớp!',
]

const onSubmit = () => {
    if (!form.value) return

    loading.value = true

    setTimeout(() => (loading.value = false), 2000)
}

definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-purple-300 text-white p-4">
        <div class="flex items-center justify-center w-70% 2xl:w-50% min-h-70% p-8 rounded-md shadow-xl bg-white">
            <div class="w-1/2 mr-10">
                <NuxtLink to="/"><NuxtImg src="/img/logo-forum.png" width="400" height="400" /></NuxtLink>
            </div>
            <v-form v-model="form" @submit.prevent="onSubmit" class="w-1/2">
                <v-container>
                    <v-row
                        ><v-col cols="12"><h2 class="text-center font-600">Đăng ký tài khoản</h2></v-col></v-row
                    >
                    <v-row>
                        <v-col cols="12" class="mt-8">
                            <v-text-field
                                v-model="username"
                                :rules="usernameRules"
                                label="Nhập tài khoản"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="Nhập email"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="password"
                                :rules="passwordRules"
                                type="password"
                                variant="solo"
                                label="Mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="rePassword"
                                :rules="rePasswordRules"
                                type="password"
                                variant="solo"
                                label="Nhập lại mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row
                        ><v-col cols="12"
                            ><v-btn type="submit" class="w-full !h-50px rounded-lg text-white !bg-primary"
                                >Đăng ký</v-btn
                            ></v-col
                        >
                        <v-col cols="12" class="text-center"
                            >Bạn đã có tài khoản?
                            <NuxtLink to="/login" class="font-500 text-primary no-underline">Đăng nhập</NuxtLink></v-col
                        >
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<style scoped></style>
