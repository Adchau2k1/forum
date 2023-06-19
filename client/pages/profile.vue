<script setup>
import { useUserStore } from '~/stores/userStore'
import Post from '~/components/Post.vue'

const { restAPI } = useApi()
const userStore = useUserStore()
const route = useRoute()
const tab = ref(null)

const { data: resUserInfo } = await restAPI.user.getUserByUsername({
    username: route.params.username,
})
const viewUserInfo = ref(resUserInfo.value.data)

const { data: resPost } = await restAPI.user.getPostAllByFullName({
    postBy: viewUserInfo.value.fullName,
})
const postData = ref(resPost.value.data.data)
</script>

<template>
    <NuxtLayout>
        <div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <NuxtImg :src="viewUserInfo?.imageUrl || '/img/avatar.png'" alt="avatar" class="w-14 h-14" />
                    <div>
                        <h4 class="font-medium">
                            {{ viewUserInfo?.fullName }}
                            <span v-if="viewUserInfo?.checked"
                                ><v-icon class="text-[rgb(255,133,98)]" size="18">mdi-check-circle</v-icon></span
                            >
                        </h4>
                        <span>@{{ viewUserInfo?.username }}</span>
                    </div>
                </div>
                <div v-if="viewUserInfo?.username === userStore.userInfo.username">
                    <NuxtLink :to="`/edit-profile?username=${viewUserInfo?.username}`"
                        ><v-btn><v-icon size="28">mdi-account-edit</v-icon></v-btn></NuxtLink
                    >
                </div>
                <div v-else>
                    <v-btn class="w-10 h-10"><v-icon size="28">mdi-account-plus</v-icon></v-btn>
                </div>
            </div>
            <div class="mt-8">
                <v-card>
                    <v-tabs v-model="tab" color="#fff" bg-color="#213547">
                        <v-tab value="1" class="!text-12px text-white">Bài viết</v-tab>
                        <v-tab value="2" class="!text-12px text-white">Đang Theo dõi</v-tab>
                        <v-tab value="3" class="!text-12px text-white">Người Theo dõi</v-tab>
                        <v-tab value="4" class="!text-12px text-white">Khác</v-tab>
                    </v-tabs>

                    <v-card-text>
                        <v-window v-model="tab">
                            <v-window-item value="1">
                                <div class="mt-4">
                                    <div v-if="!postData.length" class="mb-4 text-center">Chưa có bài đăng nào cả</div>
                                    <div v-else>
                                        <div v-for="(item, idx) of postData" :class="{ 'mt-5': idx > 0 }">
                                            <Post v-bind="item" />
                                        </div>
                                    </div>
                                </div>
                            </v-window-item>
                            <v-window-item value="2" class="py-4">
                                <div class="text-center">Người dùng này chưa theo dõi bất kỳ ai</div>
                            </v-window-item>
                            <v-window-item value="3" class="py-4">
                                <div class="text-center">Người dùng này chưa có ai theo dõi</div>
                            </v-window-item>
                            <v-window-item value="4" class="py-4">
                                <div class="text-center">Không có gì ở đây cả</div>
                            </v-window-item>
                        </v-window>
                    </v-card-text>
                </v-card>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped></style>
