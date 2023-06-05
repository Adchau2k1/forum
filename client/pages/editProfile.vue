<script setup>
import Message from '~/components/Message.vue'

const route = useRoute()
const form = ref(null)
const file = ref(null)
const avatar = ref('/img/avatar.png')
const email = ref('email@example.com')
const fullName = ref('')
const phone = ref('')
const showMessage = ref(false)

let oldUrl = ''
const username = route.query.username

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
        if (oldUrl) URL.revokeObjectURL(oldUrl)

        const value = file.value[0]
        avatar.value = URL.createObjectURL(value)
        oldUrl = avatar.value
    }
}

const onSubmit = () => {
    if (!form.value) return

    showMessage.value = true

    setTimeout(() => (loading.value = false), 2000)
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
                v-model="showMessage"
                message="Chỉnh sửa thành công thành công"
                @onClickClose="showMessage = false"
            />

            <h2 class="uppercase">Thông tin cá nhân</h2>
            <span>Chỉnh sửa thông tin cá nhân</span>
            <div class="mt-8">
                <div class="relative mx-auto w-fit">
                    <NuxtImg :src="avatar" alt="avatar" class="w-24 h-24 rounded-full object-cover" />
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
                    <v-form v-model="form" @submit.prevent="onSubmit">
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
                                    v-model="email"
                                    label="Nhập tài khoản"
                                    variant="solo"
                                    bg-color="rgba(22,24,35,.06)"
                                    class="!rounded-xl"
                                ></v-text-field> </v-col
                        ></v-row>
                        <v-row>
                            <v-col cols="12" class="-mt-4">
                                <v-text-field
                                    v-model="fullName"
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
                                    v-model="phone"
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
