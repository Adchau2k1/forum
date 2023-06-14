<script setup>
import { useUserStore } from '~/stores/userStore'

const form = ref(null)
const visiblePassword = ref(false)
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Đăng nhập thành công',
})
const userInfo = reactive({
    username: '',
    password: '',
})

const rules = [(value) => !!value || 'Trường dữ liệu bắt buộc!']

const onSubmit = async () => {
    if (!form.value) return

    const { restAPI } = useApi()
    const { data: loginData } = await restAPI.user.login({ body: userInfo })
    try {
        if (loginData.value.success) {
            const data = loginData?.value?.data
            const userStore = useUserStore()
            const accessToken = useCookie('accessToken')

            userStore.setUserInfo(data)
            accessToken.value = data?.accessToken
            localStorage.setItem('userInfo', JSON.stringify(data))

            messageOptions.type = 'success'
            messageOptions.show = true
            messageOptions.message = loginData.value.message

            setTimeout(() => navigateTo('/'), 2000)
        } else {
            messageOptions.type = 'error'
            messageOptions.show = true
            messageOptions.message = loginData.value.message
        }
    } catch (err) {
        message.error('Error: ' + err)
    }
}

useHead({
    title: 'Đăng nhập',
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
                                v-model="userInfo.username"
                                :rules="rules"
                                label="Nhập tài khoản"
                                variant="solo"
                                bg-color="rgba(22,24,35,.06)"
                                class="!rounded-xl"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="-mt-4">
                            <v-text-field
                                v-model="userInfo.password"
                                :rules="rules"
                                :type="visiblePassword ? 'text' : 'password'"
                                :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                                variant="solo"
                                label="Mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                                @click:append-inner="visiblePassword = !visiblePassword"
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
                            <NuxtLink to="/register" class="font-500 text-primary no-underline"
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
