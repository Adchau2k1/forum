<script setup>
const router = useRouter()
const form = ref(null)
const username = ref('')
const password = ref('')
const visible = ref(false)
const loading = ref(false)
const showMessage = ref(false)

const rules = [(value) => !!value || 'Trường dữ liệu bắt buộc!']

const onSubmit = () => {
    if (!form.value) return

    loading.value = true
    showMessage.value = true
    console.log(router)
    setTimeout(() => router.push('/'), 3000)
}

useHead({
    title: 'Đăng nhập tài khoản',
})
definePageMeta({
    layout: false,
})
</script>

<template>
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-purple-300 text-white p-4">
        <Message v-model="showMessage" message="Đăng nhập thành công" @onClickClose="showMessage = false" />

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
                                :type="visible ? 'text' : 'password'"
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                variant="solo"
                                label="Mật khẩu"
                                bg-color="rgba(22,24,35,.06)"
                                @click:append-inner="visible = !visible"
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
