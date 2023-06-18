<script setup>
import Message from '~/components/Message.vue'
import { useUserStore } from '~/stores/userStore'

const { restAPI } = useApi()
const route = useRoute()
const username = route.query.username
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Cập nhật thành công',
})
const form = ref(null)
const file = ref(null)
const { data: resUserInfo, refresh } = await restAPI.user.getUserByUsername({
    username: username,
})
const oldUrl = ref('')
const profile = reactive({
    _id: resUserInfo.value?.data?._id,
    imageUrl: resUserInfo.value?.data?.imageUrl || '/img/avatar.png',
    email: resUserInfo.value?.data?.email,
    fullName: resUserInfo.value?.data?.fullName,
    phone: resUserInfo.value?.data?.phone,
})

const fullNameRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.trim().length >= 6 && v.trim().length <= 24) || 'Tên hiển thị gồm có từ 6 đến 12 ký tự!',
    (v) => /^[^0-9]/.test(v.trim()) || 'Tên hiển thị không được bắt đầu bằng số.',
]
const phoneRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.trim().length === 10) || 'Số điện thoại bao gồm 10 chữ số',
    (v) => /^\d+$/.test(v) || 'Số điện thoại chỉ được chứa các chữ số',
]

const handleChangeImage = () => {
    if (file.value[0]) {
        // Xóa ảnh cũ khỏi bộ nhớ
        if (oldUrl.value) URL.revokeObjectURL(oldUrl.value)

        const value = file.value[0]
        profile.imageUrl = URL.createObjectURL(value)
        oldUrl.value = profile.imageUrl
    }
}

const onSubmit = async () => {
    form.value.validate().then(async (res) => {
        if (res.valid) {
            try {
                const userStore = useUserStore()
                const { data: resUpdate } = await restAPI.user.updateUser({
                    body: profile,
                })
                if (resUpdate.value?.success == true) {
                    userStore.userInfo = {
                        ...userStore.userInfo,
                        ...profile,
                    }
                    messageOptions.type = 'success'
                    messageOptions.show = true
                    messageOptions.message = resUpdate.value?.message
                    refresh()
                } else {
                    messageOptions.type = 'error'
                    messageOptions.show = true
                    messageOptions.message = resUpdate.value?.message
                }
            } catch (err) {
                console.error(err)
            }
        }
    })
}
const onCancel = () => window.history.back()

useHead({
    title: 'Thông tin cá nhân',
})
definePageMeta({
    layout: false,
})
</script>

<template>
    <NuxtLayout
        ><div class="max-w-900px m-5 lg:mx-auto p-4 border rounded-md">
            <Message
                v-model="messageOptions.show"
                :type="messageOptions.type"
                :message="messageOptions.message"
                @onClickClose="messageOptions.show = false"
            />

            <h2 class="uppercase">Thông tin cá nhân</h2>
            <span>Chỉnh sửa thông tin cá nhân</span>
            <div class="mt-8">
                <div class="relative mx-auto w-fit">
                    <NuxtImg :src="profile.imageUrl" alt="avatar" class="w-24 h-24 rounded-full object-cover" />
                    <label
                        for="inputAvatar"
                        class="absolute right-1 bottom-10px w-26px h-26px flex items-center justify-center bg-black opacity-70 rounded-full cursor-pointer"
                    >
                        <v-icon size="16">mdi-camera</v-icon>
                    </label>
                    <v-file-input
                        id="inputAvatar"
                        class="-z-1 opacity-0 w-0 h-0"
                        accept="image/png, image/jpeg, image/bmp"
                        v-model="file"
                        @change="handleChangeImage"
                    ></v-file-input>
                </div>

                <div class="mt-8">
                    <v-form ref="form" @submit.prevent="onSubmit">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    readonly
                                    v-model="username"
                                    label="Tên tài khoản"
                                    variant="solo"
                                    bg-color="rgba(22,24,35,.06)"
                                    class="!rounded-xl"
                                ></v-text-field> </v-col
                        ></v-row>
                        <v-row>
                            <v-col cols="12" class="-mt-4">
                                <v-text-field
                                    readonly
                                    v-model="profile.email"
                                    label="Nhập tài khoản"
                                    variant="solo"
                                    bg-color="rgba(22,24,35,.06)"
                                    class="!rounded-xl"
                                ></v-text-field> </v-col
                        ></v-row>
                        <v-row>
                            <v-col cols="12" class="-mt-4">
                                <v-text-field
                                    v-model="profile.fullName"
                                    :rules="fullNameRules"
                                    label="Nhập tên hiển thị"
                                    variant="solo"
                                    bg-color="rgba(22,24,35,.06)"
                                    class="!rounded-xl"
                                ></v-text-field> </v-col
                        ></v-row>
                        <v-row>
                            <v-col cols="12" class="-mt-4">
                                <v-text-field
                                    v-model="profile.phone"
                                    :rules="phoneRules"
                                    label="Nhập số điện thoại"
                                    variant="solo"
                                    bg-color="rgba(22,24,35,.06)"
                                    class="!rounded-xl"
                                ></v-text-field> </v-col
                        ></v-row>
                        <v-row class="mt-4">
                            <v-col class="flex justify-end gap-3">
                                <v-btn class="rounded-lg !text-xs" @click="onCancel">Hủy bỏ</v-btn>
                                <v-btn type="submit" class="rounded-lg !text-xs text-white !bg-primary">Cập nhật</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </div>
            </div>
        </div></NuxtLayout
    >
</template>

<style scoped></style>
