<script setup>
const props = defineProps({
    imgUrl: String,
    postBy: String,
    title: String,
    desc: String,
    topic: String,
    postAt: String,
    views: Number,
    likes: Number,
    comments: Number,
})

const timeRead = '2 phút đọc'
</script>

<template>
    <div class="border-2 border-solid border-#e8e8e8 rounded-lg p-4">
        <div class="w-full flex items-center justify-between">
            <div class="flex items-center">
                <NuxtImg :src="props.imgUrl || '/img/logo-forum.png'" width="40" height="40" />
                <span>{{ props.postBy }}</span>
            </div>
            <button class="-mr-13px p-1"><v-icon>mdi-dots-vertical</v-icon></button>
        </div>
        <div class="mt-3">
            <h3 class="truncate">
                {{ props.title }}
            </h3>
            <p class="mt-2 line-clamp-2">
                {{ props.desc }}
            </p>
        </div>
        <div class="mt-4 flex justify-between items-center text-sm">
            <div class="flex items-center gap-4">
                <h4 class="rounded-md p-2 bg-gray-100">{{ props.topic || 'Chuyên mục' }}</h4>
                <span>{{ props.postAt }}</span
                ><span>{{ timeRead }}</span>
            </div>
            <div class="flex items-center gap-4">
                <span><v-icon class="mr-1">mdi-eye</v-icon>{{ views }}</span>
                <span><v-icon class="mr-1">mdi-thumb-up</v-icon>{{ likes }}</span>
                <span><v-icon class="mr-1">mdi-comment</v-icon>{{ comments }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
