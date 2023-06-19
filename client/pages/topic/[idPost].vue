<script setup>
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()
const { restAPI } = useApi()
const route = useRoute()
const { idPost } = route.params
const messageOptions = reactive({
    show: false,
    type: 'success',
    message: 'Cập nhật thành công',
})
const inputComment = ref('')
const { data: resPost, refresh: refreshPost } = await restAPI.user.getPostById(idPost)
const postData = computed(() => resPost.value?.data)

// console.log(toRaw(postData.value))

const isInvalid = ref(false)
const errorMessage = ref('')

// Kiểm tra quy tắc khi người dùng nhập comment
const validate = () => {
    if (inputComment.value) {
        if (inputComment.value.length > 9) {
            isInvalid.value = false
            errorMessage.value = ''
        } else {
            isInvalid.value = true
            errorMessage.value = 'Vui lòng nhập ít nhất 10 ký tự!'
        }
    } else isInvalid.value = false
}

const handleComment = async () => {
    if (inputComment.value.length > 9) {
        const newData = {
            ...postData.value,
            comments: {
                total: postData.value.comments.total + 1,
                data: [
                    ...postData.value.comments.data,
                    {
                        _id: postData.value.comments.total + 1,
                        imageUrl: userStore.userInfo.imageUrl,
                        userCommentId: userStore.userInfo._id,
                        username: userStore.userInfo.username,
                        commentBy: userStore.userInfo.fullName,
                        content: inputComment.value,
                        totalPosts: userStore.userInfo.totalPosts,
                        totalLikes: userStore.userInfo.totalLikes,
                        likedList: [],
                    },
                ],
            },
        }

        try {
            const { data } = await restAPI.user.updatePost({
                body: newData,
            })
            if (data.value?.success) {
                inputComment.value = ''
                postData.value = newData
                refreshPost()
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const handleLike = async (commentId) => {
    // Cập nhật like người đăng
    if (!commentId) {
        try {
            const posterData = {
                _id: postData.value.userPostId,
                totalLikes: postData.value.totalLikes + 1,
            }
            const { data: resPoster } = await restAPI.user.updateUser({
                body: posterData,
            })
            if (!resPoster.value?.success) {
                messageOptions.type = 'error'
                messageOptions.show = true
                messageOptions.message = resPoster.value?.message
                return
            }
            userStore.setUserInfo({
                ...userStore.userInfo,
                totalLikes: posterData.totalLikes,
            })

            const { data } = await restAPI.user.updatePost({
                body: {
                    _id: postData.value._id,
                    totalLikes: postData.value.totalLikes + 1,
                    likedList: [...postData.value.likedList, userStore.userInfo._id],
                },
            })
            if (data.value?.success) {
                inputComment.value = ''
                refreshPost()
            }
        } catch (err) {
            console.error(err)
        }
    } else {
        try {
            const comment = postData.value.comments.data[Number.parseInt(commentId) - 1]
            const commenterData = {
                _id: comment.userCommentId,
                totalLikes: comment.totalLikes + 1,
            }
            const { data: commenter } = await restAPI.user.updateUser({
                body: commenterData,
            })
            if (!commenter.value?.success) {
                messageOptions.type = 'error'
                messageOptions.show = true
                messageOptions.message = commenter.value?.message
                return
            }
            const newComment = [...postData.value.comments.data]
            newComment[Number.parseInt(commentId) - 1] = {
                ...comment,
                totalLikes: comment.totalLikes + 1,
                likedList: [...comment.likedList, userStore.userInfo._id],
                updatedAt: new Date(),
            }
            const { data } = await restAPI.user.updatePost({
                body: {
                    _id: postData.value._id,
                    comments: {
                        total: postData.value.comments.total,
                        data: newComment,
                    },
                },
            })
            if (data.value?.success) {
                inputComment.value = ''
                refreshPost()
            }
        } catch (err) {
            console.error(err)
        }
    }
}
</script>

<template>
    <NuxtLayout
        ><div>
            <Message
                v-model="messageOptions.show"
                :type="messageOptions.type"
                :message="messageOptions.message"
                @onClickClose="messageOptions.show = false"
            />
            <h4 class="px-4 py-2 font-normal text-white bg-#213547">
                Bài viết > <span class="font-semibold">{{ postData.topicTitle }}</span>
            </h4>
            <h2 class="mt-3">{{ postData.title }}</h2>
            <div class="mt-4 p-3 bg-gray-100">
                <div class="flex">
                    <div class="w-130px text-center">
                        <NuxtImg src="/img/avatar.png" alt="avatar" class="w-14 h-14" />
                        <div>
                            <NuxtLink
                                :to="`/@${postData.usernamePost}`"
                                class="font-semibold no-underline !text-primary text-sm"
                                >{{ postData.postBy }}</NuxtLink
                            >
                            <div class="flex justify-center gap-3">
                                <div class="text-center">
                                    <v-icon size="18">mdi-newspaper-variant</v-icon>
                                    <div class="text-sm">{{ postData.totalPosts || 0 }}</div>
                                </div>
                                <div class="text-center">
                                    <v-icon size="18">mdi-thumb-up</v-icon>
                                    <div class="text-sm">{{ postData.totalLikes }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="post relative ml-4 flex-1 px-4 py-3 rounded-md bg-white">
                        <div class="flex justify-between text-sm">
                            <span class="font-bold">#1</span>
                            <div>{{ formatNormal(postData.createdAt) }}</div>
                        </div>
                        <v-divider class="mt-1 mb-3"></v-divider>
                        <div class="whitespace-pre-wrap">
                            {{ postData.content }}
                        </div>
                        <div class="flex justify-end mt-1 min-h-10">
                            <v-btn class="!shadow-none" @click="() => handleLike()">
                                <span class="flex items-center text-sm"
                                    ><v-icon class="mr-1" size="20">mdi-thumb-up</v-icon
                                    >{{ postData.likedList?.length }}</span
                                >
                            </v-btn>
                        </div>
                    </div>
                </div>

                <!-- Comment -->
                <div class="mt-14">
                    <div class="flex mt-10" v-for="(c, idx) of postData.comments.data" :key="idx">
                        <div class="w-130px text-center">
                            <NuxtImg :src="c.imageUrl || '/img/avatar.png'" alt="avatar" class="w-14 h-14" />
                            <div>
                                <NuxtLink :to="`/@${c.username}`" class="font-semibold no-underline text-sm">{{
                                    c.commentBy
                                }}</NuxtLink>
                                <!-- <span class="font-semibold text-sm">{{ c.commentBy }}</span> -->
                                <div class="flex justify-center gap-3">
                                    <div class="text-center">
                                        <v-icon size="18">mdi-newspaper-variant</v-icon>
                                        <div class="text-sm">{{ c.totalPosts }}</div>
                                    </div>
                                    <div class="text-center">
                                        <v-icon size="18">mdi-thumb-up</v-icon>
                                        <div class="text-sm">{{ c.totalLikes }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post relative ml-4 flex-1 px-4 py-3 rounded-md bg-white">
                            <div class="flex justify-between text-sm">
                                <span class="font-bold">#{{ idx + 2 }}</span>
                                <div>{{ formatNormal(c.createdAt) }}</div>
                            </div>
                            <v-divider class="mt-1 mb-3"></v-divider>
                            <div class="">
                                {{ c.content }}
                            </div>
                            <div class="flex justify-end mt-1 min-h-10">
                                <v-btn class="!shadow-none" @click="() => handleLike(c._id)">
                                    <span class="flex items-center text-sm"
                                        ><v-icon class="mr-1" size="20">mdi-thumb-up</v-icon
                                        >{{ c.likedList?.length || 0 }}</span
                                    >
                                </v-btn>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- New comment -->
                <div class="flex mt-10">
                    <div class="w-130px"></div>
                    <div class="relative ml-4 h-full flex-1 p-3 bg-white">
                        <textarea
                            class="w-full px-3 py-2 rounded-md outline-slate-400 bg-gray-200"
                            :class="{ '!outline-red-500': isInvalid }"
                            v-model="inputComment"
                            rows="3"
                            @input="validate"
                        />
                        <p v-if="isInvalid" class="text-red-500 text-sm">{{ errorMessage }}</p>
                        <div class="mt-2 text-right">
                            <v-btn class="!text-xs !bg-primary" @click="handleComment">Bình luận</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div></NuxtLayout
    >
</template>

<style scoped>
.post::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 35px;
    left: 0;
    margin-top: -10px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid #fff;
    transform: translateX(-100%);
}
</style>
