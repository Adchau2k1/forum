<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import Message from '~/components/Message.vue'

const { restAPI } = useApi()
const dialogEdit = ref(false)
const dialogDelete = ref(false)
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Cập nhật thành công',
})
const form = ref(null)
const userInfo = reactive({
    _id: '',
    username: '',
    role: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
})
const selectedId = ref('')
const { data: resUsers, refresh: refreshDataUser } = await restAPI.user.getUsers({ params: { isAll: true } })
const dataUsers = computed(() => {
    const newData = resUsers.value?.data?.data.map((user, idx) => ({
        ...user,
        index: idx + 1,
    }))

    return newData
})

const headers = [
    {
        title: 'STT',
        align: 'center',
        key: 'index',
        sortable: false,
    },
    {
        title: 'Tên tài khoản',
        align: 'center',
        key: 'username',
    },
    {
        title: 'Cấp bậc',
        align: 'center',
        key: 'role',
        sortable: false,
    },
    {
        title: 'Tên hiển thị',
        align: 'center',
        key: 'fullName',
        sortable: false,
    },
    {
        title: 'Email',
        align: 'center',
        key: 'email',
        sortable: false,
    },
    {
        title: 'Số điện thoại',
        align: 'center',
        key: 'phone',
        sortable: false,
    },
    {
        title: 'Thao tác',
        align: 'center',
        key: 'actions',
        sortable: false,
    },
]

const roles = [
    {
        title: 'admin',
    },
    {
        title: 'member',
    },
]

const requireRules = [(v) => !!v || 'Trường dữ liệu bắt buộc!']

const handleEdit = (item) => {
    Object.assign(userInfo, { ...item })
    dialogEdit.value = true
}

const onSubmit = async () => {
    form.value.validate().then(async (res) => {
        if (res.valid) {
            try {
                const newUserInfo = { ...userInfo }
                if (!userInfo.password) delete newUserInfo.password

                const { data: resUpdate } = await restAPI.user.updateUser({
                    body: newUserInfo,
                })
                if (resUpdate.value?.success == true) {
                    messageOptions.type = 'success'
                    messageOptions.show = true
                    messageOptions.message = resUpdate.value?.message
                    Object.assign(userInfo, {})
                    userInfo.password = ''
                    dialogEdit.value = false
                    refreshDataUser()
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

const handleClickDelete = (item) => {
    dialogDelete.value = true
    selectedId.value = item._id
}

const handleDelete = async () => {
    try {
        const { data: resDelete } = await restAPI.user.deleteUser({
            body: {
                _id: selectedId.value,
            },
        })
        if (resDelete.value?.success == true) {
            messageOptions.type = 'success'
            messageOptions.show = true
            messageOptions.message = resDelete.value?.message
            dialogDelete.value = false
            refreshDataUser()
        } else {
            messageOptions.type = 'error'
            messageOptions.show = true
            messageOptions.message = resDelete.value?.message
        }
    } catch (err) {
        console.error(err)
    }
}

definePageMeta({
    layout: 'admin-layout',
})
</script>

<template>
    <div>
        <Message
            v-model="messageOptions.show"
            :type="messageOptions.type"
            :message="messageOptions.message"
            @onClickClose="messageOptions.show = false"
        />

        <h2>Danh sách thành viên</h2>
        <div class="mt-10">
            <VDataTable :headers="headers" :items="dataUsers" class="elevation-1">
                <template v-slot:top>
                    <v-dialog v-model="dialogEdit" transition="dialog-top-transition" width="70%" height="60%">
                        <v-card class="w-full h-full">
                            <v-card-text>
                                <div class="h-full">
                                    <h3 class="">Chỉnh sửa thành viên</h3>
                                    <v-form ref="form" @submit.prevent="onSubmit" class="mt-6">
                                        <v-container>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        size="10"
                                                        v-model="userInfo.username"
                                                        :rules="requireRules"
                                                        label="Tên tài khoản"
                                                        disabled
                                                        variant="solo"
                                                        bg-color="rgba(22,24,35,.06)"
                                                        input-size="small"
                                                        class="!rounded-xl"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-select
                                                        v-model="userInfo.role"
                                                        :items="roles"
                                                        :rules="requireRules"
                                                        variant="solo"
                                                        label="Chọn cấp bậc"
                                                        class="!rounded-xl"
                                                    ></v-select>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        size="10"
                                                        v-model="userInfo.fullName"
                                                        :rules="requireRules"
                                                        label="Nhập tên hiển thị"
                                                        variant="solo"
                                                        bg-color="rgba(22,24,35,.06)"
                                                        input-size="small"
                                                        class="!rounded-xl -mt-4"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="userInfo.email"
                                                        :rules="requireRules"
                                                        label="Nhập email"
                                                        variant="solo"
                                                        bg-color="rgba(22,24,35,.06)"
                                                        class="!rounded-xl -mt-4"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field
                                                        v-model="userInfo.phone"
                                                        :rules="requireRules"
                                                        label="Nhập số điện thoại"
                                                        variant="solo"
                                                        bg-color="rgba(22,24,35,.06)"
                                                        class="!rounded-xl -mt-4"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="6" class="">
                                                    <v-text-field
                                                        v-model="userInfo.password"
                                                        type="password"
                                                        variant="solo"
                                                        label="Mật khẩu"
                                                        bg-color="rgba(22,24,35,.06)"
                                                        class="!rounded-xl -mt-4"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-col cols="12"
                                                ><div class="-mx-4 float-right">
                                                    <v-btn
                                                        type="submit"
                                                        class="!h-50px rounded-lg text-white !bg-primary"
                                                        >Lưu</v-btn
                                                    >
                                                    <v-btn @click="dialogEdit = false" class="ml-4 !h-50px rounded-lg"
                                                        >Hủy</v-btn
                                                    >
                                                </div>
                                            </v-col>
                                        </v-container>
                                    </v-form>
                                </div>
                            </v-card-text>
                            <!-- <v-card-actions class="justify-end">
                                    <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
                                </v-card-actions> -->
                        </v-card>
                    </v-dialog>
                </template>
                <template v-slot:footer.prepend>
                    <v-dialog v-model="dialogDelete" width="400px" height="120px">
                        <v-card class="h-full pt-2">
                            <v-card-title> Xác nhận xóa tài khoản? </v-card-title>
                            <v-card-actions class="mt-3">
                                <v-spacer></v-spacer>
                                <v-btn class="bg-primary" @click="handleDelete"> Xóa </v-btn>
                                <v-btn @click="dialogDelete = false"> Hủy </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>

                <template v-slot:item.actions="{ item }">
                    <v-icon size="small" class="me-2" @click="handleEdit(item.raw)"> mdi-pencil </v-icon>
                    <v-icon size="small" @click="handleClickDelete(item.raw)"> mdi-delete </v-icon>
                </template>
            </VDataTable>
        </div>
    </div>
</template>

<style scoped></style>
