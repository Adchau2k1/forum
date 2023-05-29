<script setup>
import Message from '~/components/Message.vue'
import Post from '~/components/Post.vue'

const showMessage = ref(false)
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
const postTop = [
    {
        id: 1,
        url: '#',
        title: 'Các bạn nghĩ sao về VueJS?',
        postBy: 'Văn Dũi',
    },
    {
        id: 2,
        url: '#',
        title: 'Lương của sinh viên mới ra trường',
        postBy: 'Dev Alo',
    },
]
const forumStatistics = {
    topics: 1376,
    posts: 22461,
    members: 3156,
    aveVisit: 210,
}
</script>

<template>
    <NuxtLayout>
        <div class="w-full">
            <Message v-model="showMessage" type="error" message="Có lỗi xảy ra!" @onClickClose="showMessage = false" />

            <div class="max-w-full flex gap-10">
                <div class="w-7/10">
                    <div class="flex justify-between items-center">
                        <h2 class="uppercase">Bài viết</h2>
                        <NuxtLink
                            to="/topic/newPost"
                            class="px-3 py-6px flex items-center rounded-lg font-500 text-15px no-underline text-white bg-[rgb(255,133,98)]"
                        >
                            <v-icon class="text-white mr-1" size="24px">mdi-note-edit-outline</v-icon>Đăng bài
                        </NuxtLink>
                    </div>
                    <div class="mt-8">
                        <div v-for="item of data" class="post-item">
                            <Post v-bind="item" />
                        </div>
                    </div>
                </div>

                <div class="w-3/10">
                    <h4 class="uppercase">Các chủ đề được dề xuất</h4>
                    <div class="min-h-90 mt-4 p-4 rounded-md bg-gradient-to-b to-purple-300 from-green-300">
                        <h3 class="mb-4 text-blue-700">Bài viết nổi bật</h3>
                        <div v-for="item of postTop" :key="item.id" class="w-full post-top-item">
                            <NuxtLink :to="item.url" class="w-full mt-3 !no-underline font-500"
                                ><span>{{ item.title }}</span> - <span>[{{ item.postBy }}]</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="min-h-40 mt-4 p-4 rounded-md bg-gradient-to-b to-purple-300 from-green-300">
                        <h3 class="text-blue-700">Thống kê diễn đàn</h3>
                        <div class="mt-4 font-300">
                            <p class="flex justify-between">
                                <span class="opacity-95">Chủ đề:</span
                                ><span class="font-500">{{ forumStatistics.topics }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Bài viết:</span
                                ><span class="font-500">{{ forumStatistics.posts }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Thành viên: </span
                                ><span class="font-500">{{ forumStatistics.members }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Lượt truy cập trung bình:</span
                                ><span class="font-500">{{ forumStatistics.aveVisit }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
.post-item + .post-item {
    margin-top: 20px;
}

.post-top-item + .post-top-item {
    margin-top: 12px;
}
</style>
