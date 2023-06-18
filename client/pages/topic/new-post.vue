<script setup>
import { useUserStore } from '~/stores/userStore'

const { restAPI } = useApi()
const userStore = useUserStore()
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Cập nhật thành công',
})
const form = ref(null)
const { data: resTopic } = await restAPI.user.getTopics()
const topics = computed(() =>
    resTopic.value?.data?.map((topic) => ({
        _id: topic?._id,
        title: topic?.title,
        totalPosts: topic?.totalPosts,
    })),
)
const postValue = reactive({
    topic: '',
    title: '',
    content: '',
})

const topicRules = [(v) => !!v || 'Trường dữ liệu bắt buộc!']
const titleRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 6) || 'Tiêu đề phải có ít nhất 6 ký tự!',
]
const contentRules = [
    (v) => !!v || 'Trường dữ liệu bắt buộc!',
    (v) => (v && v.length >= 10) || 'Nội dung phải có ít nhất 10 ký tự!',
]

const onSubmit = () => {
    form.value.validate().then(async (res) => {
        if (res.valid) {
            const topic = topics.value.find((t) => t.title === postValue.topic)
            const postData = {
                topicId: topic._id,
                topicTitle: topic.title,
                imageUrl: userStore.userInfo.imageUrl,
                userPostId: userStore.userInfo._id,
                usernamePost: userStore.userInfo.username,
                userPostId: userStore.userInfo._id,
                postBy: userStore.userInfo.fullName,
                title: postValue.title,
                content: postValue.content,
                totalPosts: userStore.userInfo.totalPosts + 1,
                totalLikes: userStore.userInfo.totalLikes,
            }

            try {
                const { data: resPost } = await restAPI.user.createPost({
                    body: postData,
                })
                if (!resPost.value?.success) {
                    messageOptions.type = 'error'
                    messageOptions.show = true
                    messageOptions.message = resPost.value?.message
                    return
                }

                const userData = {
                    ...userStore.userInfo,
                    totalPosts: userStore.userInfo.totalPosts + 1,
                }
                const { data: resUser } = await restAPI.user.updateUser({
                    body: userData,
                })
                if (!resUser.value?.success) {
                    messageOptions.type = 'error'
                    messageOptions.show = true
                    messageOptions.message = resUser.value?.message
                    return
                }
                userStore.setUserInfo(userData)

                const topicData = {
                    _id: topic._id,
                    totalPosts: topic.totalPosts + 1,
                    postShow: {
                        _id: resPost.value?.data?._id,
                        imageUrl: postData.imageUrl,
                        username: postData.usernamePost,
                        postBy: postData.postBy,
                        title: postData.title,
                        createdAt: new Date(),
                    },
                }
                const { data: resTopic } = await restAPI.user.updateTopic({
                    body: topicData,
                })

                if (resTopic.value?.success == true) {
                    messageOptions.type = 'success'
                    messageOptions.show = true
                    messageOptions.message = resPost.value?.message

                    setTimeout(() => navigateTo('/'), 2000)
                } else {
                    messageOptions.type = 'error'
                    messageOptions.show = true
                    messageOptions.message = resTopic.value?.message
                }
            } catch (err) {
                console.error(err)
            }
        }
    })
}
</script>

<template>
    <NuxtLayout>
        <div>
            <Message
                v-model="messageOptions.show"
                :type="messageOptions.type"
                :message="messageOptions.message"
                @onClickClose="messageOptions.show = false"
            />
            <h2 class="uppercase">Bài viết mới</h2>
            <div class="mt-8 py-2 border border-gray-200">
                <v-form ref="form" @submit.prevent="onSubmit">
                    <v-container>
                        <v-row>
                            <v-col cols="6" class="-mt-4">
                                <h3>Chọn chuyên mục</h3>
                                <v-select
                                    v-model="postValue.topic"
                                    :items="topics"
                                    :rules="topicRules"
                                    variant="solo"
                                    label="Chọn chuyên mục"
                                    class="mt-2"
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6" class="-mt-6">
                                <h3>Tiêu đề</h3>
                                <v-text-field
                                    v-model="postValue.title"
                                    :rules="titleRules"
                                    placeholder="Nhập tiêu đề bài viết"
                                    variant="solo"
                                    class="!rounded-xl mt-2"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" class="-mt-4">
                                <h3>Nội dung</h3>
                                <v-textarea
                                    v-model="postValue.content"
                                    :rules="contentRules"
                                    variant="solo-inverted"
                                    class="mt-2"
                                ></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row
                            ><v-col cols="12"
                                ><v-btn
                                    type="submit"
                                    class="px-5 py-3 !h-40px !font-500 rounded-lg !text-xs text-white !bg-primary"
                                    >Đăng bài</v-btn
                                ></v-col
                            >
                        </v-row>
                    </v-container>
                </v-form>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
textarea {
    background-color: #fff !important;
}
</style>
