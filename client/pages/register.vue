<script setup>
import Message from '~/components/Message.vue'

const form = ref(null)
const userInfo = reactive({
    username: '',
    email: '',
    password: '',
    rePassword: '',
})
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Đăng nhập thành công',
})

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
    (v) => v === userInfo.password || 'Nhập lại mật khẩu không khớp!',
]

const onSubmit = async () => {
    form.value.validate().then(async (res) => {
        if (res.valid) {
            const { restAPI } = useApi()
            const { data: res } = await restAPI.user.createUser({
                body: userInfo,
            })

            try {
                if (res.value?.success) {
                    messageOptions.show = true
                    messageOptions.type = 'success'
                    messageOptions.message = res?.value?.message

                    setTimeout(() => navigateTo('/login'), 2000)
                } else {
                    messageOptions.show = true
                    messageOptions.type = 'error'
                    messageOptions.message = res?.value?.message
                }
            } catch (err) {
                console.log('error:', err)
            }
        }
    })
}

useHead({
    title: 'Đăng ký tài khoản',
})
definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-purple-300 text-white p-4">
        <Message
            v-model="messageOptions.show"
            :type="messageOptions.type"
            :message="messageOptions.message"
            @onClickClose="messageOptions.show = false"
        />

        <div class="flex items-center justify-center w-70% 2xl:w-50% min-h-70% p-8 rounded-md shadow-xl bg-white">
            <div class="w-1/2 mr-10 text-center">
                <NuxtLink to="/"><NuxtImg src="/img/logo-forum.png" width="300" height="300" /></NuxtLink>
            </div>
            <v-form ref="form" @submit.prevent="onSubmit" class="w-1/2">
                <v-container>
                    <v-row
                        ><v-col cols="12"><h2 class="text-center font-600">Đăng ký tài khoản</h2></v-col></v-row
                    >
                    <v-row>
                        <v-col cols="12" class="mt-8">
                            <v-text-field
                                v-model="userInfo.username"
                                :rules="usernameRules"
                                label="Nhập tài khoản"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="userInfo.email"
                                :rules="emailRules"
                                label="Nhập email"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="userInfo.password"
                                :rules="passwordRules"
                                type="password"
                                variant="solo"
                                label="Mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="userInfo.rePassword"
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
