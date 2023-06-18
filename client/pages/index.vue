<script setup>
import Message from '~/components/Message.vue'
import Post from '~/components/Post.vue'

const { restAPI } = useApi()
const showMessage = ref(false)

const { data: resPosts } = await restAPI.user.getShowPosts({})
const dataShowPosts = ref(resPosts.value)

const { data: resTopPosts } = await restAPI.user.getTopPosts({})
const dataTopPosts = ref(resTopPosts.value)

const { data: resStatistics } = await restAPI.user.getForumStatistics({})
const dataStatistics = ref(resStatistics.value)
</script>

<template>
    <NuxtLayout>
        <div class="w-full">
            <Message v-model="showMessage" type="error" message="Có lỗi xảy ra!" @onClickClose="showMessage = false" />

            <div class="max-w-full flex gap-10">
                <div class="w-7/10">
                    <div class="flex justify-between items-center">
                        <h2 class="uppercase">Bài viết</h2>
                    </div>
                    <div class="mt-8">
                        <div v-for="item of dataShowPosts?.data" class="post-item">
                            <Post v-bind="item" />
                        </div>
                    </div>
                </div>

                <div class="w-3/10">
                    <h4 class="uppercase">Các chủ đề được dề xuất</h4>
                    <div class="min-h-90 mt-4 p-4 rounded-md bg-gradient-to-b to-purple-300 from-green-300">
                        <h3 class="mb-4 text-blue-700">Bài viết nổi bật</h3>
                        <div v-for="item of dataTopPosts?.data" :key="item.id" class="w-full post-top-item">
                            <NuxtLink :to="`/topic/${item._id}`" class="w-full mt-3 !no-underline font-500"
                                ><span>{{ item.title }}</span> - <span>[{{ item.postBy }}]</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="min-h-40 mt-4 p-4 rounded-md bg-gradient-to-b to-purple-300 from-green-300">
                        <h3 class="text-blue-700">Thống kê diễn đàn</h3>
                        <div class="mt-4 font-300">
                            <p class="flex justify-between">
                                <span class="opacity-95">Chuyên mục:</span
                                ><span class="font-500">{{ dataStatistics?.data?.topics }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Bài viết:</span
                                ><span class="font-500">{{ dataStatistics?.data?.posts }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Thành viên: </span
                                ><span class="font-500">{{ dataStatistics?.data?.members }}</span>
                            </p>
                            <p class="flex justify-between">
                                <span class="opacity-95">Lượt truy cập trung bình:</span
                                ><span class="font-500">{{ dataStatistics?.data?.aveVisit }}</span>
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
