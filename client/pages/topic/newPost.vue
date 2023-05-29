<script setup>
const title = ref('')
const categories = ref('California')
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']
</script>

<template>
    <NuxtLayout>
        <div>
            <ClientOnly>
                <h2 class="uppercase">Bài viết mới</h2>
                <div class="mt-8 py-2 border border-gray-200">
                    <form>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="-mt-4">
                                    <h3>Chọn chuyên mục</h3>
                                    <v-select
                                        v-model="categories"
                                        :items="items"
                                        variant="outlined"
                                        class="mt-2 w-1/2 h-10"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" class="">
                                    <v-text-field
                                        v-model="title"
                                        :rules="rules"
                                        placeholder="Nhập tiêu đề bài viết"
                                        variant="solo"
                                        bg-color="rgba(22,24,35,.06)"
                                        class="!rounded-xl"
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row
                                ><v-col cols="12"
                                    ><v-btn type="submit" class="w-full !h-50px rounded-lg text-white !bg-primary"
                                        >Đăng nhập</v-btn
                                    ></v-col
                                >
                            </v-row>
                        </v-container>
                    </form>
                </div>
            </ClientOnly>
        </div>
    </NuxtLayout>
</template>

<style scoped></style>
