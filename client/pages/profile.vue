<script setup>
import Post from '~/components/Post.vue'

const route = useRoute()
const tab = ref(null)

const username = route.params.username
const myInfo = {
    id: 1,
    username: 'Admin',
}
const data = [
    {
        id: 1,
        imgUrl: '',
        postBy: 'Văn Dev',
        title: 'Cảm thấy khó khăn khi chuyển sang học một ngôn ngữ mới ting',
        desc: 'Tôi làm chuyên môn về phân tích dữ liệu, chủ yếu là dùng phần mềm chuyên môn sâu và dùng rất nhiều SQL db, python. Hai món đó cũng là chủ yếu là dùng phần mềm chuyên môn sâu và dùng rất nhiều SQL db, python.',
        topic: 'Chuyên mục',
        postAt: '21/05/2023',
        views: 500,
        likes: 220,
        comments: 45,
    },
    {
        id: 2,
        imgUrl: '',
        postBy: 'Văn Dev',
        title: 'Cảm thấy khó khăn khi chuyển sang học một ngôn ngữ mới ting',
        desc: 'Tôi làm chuyên môn về phân tích dữ liệu, chủ yếu là dùng phần mềm chuyên môn sâu và dùng rất nhiều SQL db, python. Hai món đó cũng...',
        topic: 'Chuyên mục',
        postAt: '21/05/2023',
        views: 500,
        likes: 220,
        comments: 45,
    },
    {
        id: 3,
        imgUrl: '',
        postBy: 'Văn Dev',
        title: 'Cảm thấy khó khăn khi chuyển sang học một ngôn ngữ mới ting',
        desc: 'Tôi làm chuyên môn về phân tích dữ liệu, chủ yếu là dùng phần mềm chuyên môn sâu và dùng rất nhiều SQL db, python. Hai món đó cũng...',
        topic: 'Chuyên mục',
        postAt: '21/05/2023',
        views: 500,
        likes: 220,
        comments: 45,
    },
    {
        id: 4,
        imgUrl: '',
        postBy: 'Văn Dev',
        title: 'Cảm thấy khó khăn khi chuyển sang học một ngôn ngữ mới ting',
        desc: 'Tôi làm chuyên môn về phân tích dữ liệu, chủ yếu là dùng phần mềm chuyên môn sâu và dùng rất nhiều SQL db, python. Hai món đó cũng...',
        topic: 'Chuyên mục',
        postAt: '21/05/2023',
        views: 500,
        likes: 220,
        comments: 45,
    },
]
</script>

<template>
    <NuxtLayout>
        <div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <NuxtImg src="/img/avatar.png" alt="avatar" class="w-14 h-14" />
                    <div>
                        <h4 class="">Ad Châu</h4>
                        <span>@{{ username }}</span>
                    </div>
                </div>
                <div v-if="myInfo.username === username">
                    <NuxtLink :to="`/editProfile?username=${myInfo.username}`"
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
                                    <div v-for="(item, idx) of data" :class="{ 'mt-5': idx > 0 }">
                                        <Post v-bind="item" />
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
