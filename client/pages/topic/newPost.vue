<script setup>
const form = ref(null)
const categories = ref('California')
const title = ref('')
const content = ref('')
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']

const titleRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 6) || 'Tiêu đề phải có ít nhất 6 ký tự!',
]
const contentRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 10) || 'Nội dung phải có ít nhất 10 ký tự!',
]

const onSubmit = () => {
    console.log('Đăng bài thành công: ', form.value)
}
</script>

<template>
    <NuxtLayout>
        <div>
            <ClientOnly>
                <h2 class="uppercase">Bài viết mới</h2>
                <div class="mt-8 py-2 border border-gray-200">
                    <v-form v-model="form" @submit.prevent="onSubmit">
                        <v-container>
                            <v-row>
                                <v-col cols="6" class="-mt-4">
                                    <h3>Chọn chuyên mục</h3>
                                    <v-select
                                        v-model="categories"
                                        :items="items"
                                        variant="outlined"
                                        class="mt-2"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6" class="-mt-6">
                                    <h3>Tiêu đề</h3>
                                    <v-text-field
                                        v-model="title"
                                        :rules="titleRules"
                                        placeholder="Nhập tiêu đề bài viết"
                                        variant="solo"
                                        bg-color="rgba(22,24,35,.06)"
                                        class="!rounded-xl mt-2"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="-mt-4">
                                    <h3>Nội dung</h3>
                                    <v-textarea
                                        v-model="content"
                                        :rules="contentRules"
                                        variant="solo-inverted"
                                        class="!bg-white mt-2"
                                    ></v-textarea>
                                </v-col>
                            </v-row>

                            <v-row
                                ><v-col cols="12" class="text-center"
                                    ><v-btn
                                        type="submit"
                                        class="px-5 py-3 !h-40px !font-500 rounded-lg text-white !bg-primary"
                                        >Đăng bài</v-btn
                                    ></v-col
                                >
                            </v-row>
                        </v-container>
                    </v-form>
                </div>
            </ClientOnly>
        </div>
    </NuxtLayout>
</template>

<style scoped></style>
