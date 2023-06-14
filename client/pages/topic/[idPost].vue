<script setup>
import { useUserStore } from '~/stores/userStore'

const userStore = useUserStore()
const { restAPI } = useApi()
const route = useRoute()
const { idPost } = route.params
const inputComment = ref('')
const { data: resPost, refresh: refreshPost } = await restAPI.user.getPostById(idPost)
const postData = ref(resPost.value?.data)

// console.log(toRaw(postData.value))

const isInvalid = ref(false)
const errorMessage = ref('')

// Kiểm tra quy tắc khi người dùng nhập liệu
const validate = () => {
    if (inputComment.value) {
        if (inputComment.value.length >= 9) {
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
                    ...postData.value?.comments?.data,
                    {
                        _id: postData.value.comments.total + 1,
                        imageUrl: userStore.userInfo.imageUrl,
                        username: userStore.userInfo.username,
                        commentBy: userStore.userInfo.fullName,
                        content: inputComment.value,
                        userPosts: userStore.userInfo.userPosts,
                        totalLikes: userStore.userInfo.totalLikes,
                    },
                ],
            },
        }

        const { data } = await restAPI.user.updatePost({
            body: newData,
        })
        try {
            if (data.value?.success) {
                inputComment.value = ''
                postData.value = newData
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const handleLike = (_id) => {}
</script>

<template>
    <NuxtLayout
        ><div>
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
                                    <div class="text-sm">{{ postData.userPosts }}</div>
                                </div>
                                <div class="text-center">
                                    <v-icon size="18">mdi-thumb-up</v-icon>
                                    <div class="text-sm">{{ postData.userLikes }}</div>
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
                        <div class="">
                            {{ postData.content }}
                        </div>
                        <div class="flex justify-end mt-1 min-h-10">
                            <div class="flex items-center gap-2">
                                <button>
                                    <span><v-icon class="mr-1" size="20">mdi-reply-circle</v-icon></span>
                                </button>
                                <button>
                                    <span class="flex items-center text-sm"
                                        ><v-icon class="mr-1" size="20">mdi-thumb-up</v-icon>{{ postData.likes }}</span
                                    >
                                </button>
                            </div>
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
                                        <div class="text-sm">{{ c.userPosts?.toString() }}</div>
                                    </div>
                                    <div class="text-center">
                                        <v-icon size="18">mdi-thumb-up</v-icon>
                                        <div class="text-sm">{{ c.totalLikes?.toString() }}</div>
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
                                <div class="flex items-center gap-2">
                                    <button>
                                        <span><v-icon class="mr-1" size="20">mdi-reply-circle</v-icon></span>
                                    </button>
                                    <button>
                                        <span class="flex items-center text-sm"
                                            ><v-icon class="mr-1" size="20">mdi-thumb-up</v-icon>{{ c.likes }}</span
                                        >
                                    </button>
                                </div>
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
