<script setup>
const props = defineProps({
    _id: String,
    imgUrl: String,
    postBy: String,
    title: String,
    content: String,
    topicTitle: String,
    userPosts: Number,
    userLikes: Number,
    totalLikes: Number,
    comments: Object,
    createdAt: String,
})

const timeRead = Math.floor(Math.random() * 6 + 1) + ' phút đọc'
</script>

<template>
    <div class="border-2 border-solid border-#e8e8e8 rounded-lg p-4">
        <div class="w-full flex items-center justify-between">
            <div class="flex items-center">
                <NuxtImg :src="props.imgUrl || '/img/logo-forum.png'" width="40" height="40" />
                <span class="font-medium">{{ props.postBy }}</span>
            </div>
            <button class="-mr-13px p-1"><v-icon>mdi-dots-vertical</v-icon></button>
        </div>
        <div class="mt-3">
            <NuxtLink :to="`/topic/${props._id}`" class="truncate font-medium no-underline text-xl text-black">
                {{ props.title }}
            </NuxtLink>
            <p class="mt-2 line-clamp-2">
                {{ props.content }}
            </p>
        </div>
        <div class="mt-4 flex justify-between items-center text-sm">
            <div class="flex items-center gap-4">
                <h4 class="rounded-md p-2 bg-gray-100">{{ props.topicTitle || 'Chuyên mục' }}</h4>
                <span>{{ formatNormal(props.createdAt) }}</span
                ><span>{{ timeRead }}</span>
            </div>
            <div class="flex items-center gap-4">
                <span><v-icon class="mr-1">mdi-eye</v-icon>{{ props.userPosts }}</span>
                <span><v-icon class="mr-1">mdi-thumb-up</v-icon>{{ props.userLikes }}</span>
                <span><v-icon class="mr-1">mdi-comment</v-icon>{{ comments?.total }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
