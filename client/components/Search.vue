<script setup>
import { Tippy } from 'vue-tippy'

const searchValue = ref('')
const show = ref(false)
const inputRef = ref(null)
const divRef = ref(null)

const data = [
    {
        id: 1,
        imageUrl: '',
        postBy: 'admin',
        checked: true,
        desc: 'Bài viết mới nhất diễn đàn',
    },
    {
        id: 2,
        imageUrl: '',
        postBy: 'tester',
        checked: false,
        desc: 'Bài viết thứ 2 của diễn đàn',
    },
    {
        id: 3,
        imageUrl: '',
        postBy: 'sinhvienu80',
        checked: false,
        desc: 'Ví dụ cấu thành vi phạm pháp luật',
    },
    {
        id: 1,
        imageUrl: '',
        postBy: 'admin',
        checked: true,
        desc: 'Bài viết mới nhất diễn đàn',
    },
    {
        id: 2,
        imageUrl: '',
        postBy: 'tester',
        checked: false,
        desc: 'Bài viết thứ 2 của diễn đàn',
    },
    {
        id: 3,
        imageUrl: '',
        postBy: 'sinhvienu80',
        checked: false,
        desc: 'Ví dụ cấu thành vi phạm pháp luật',
    },
]

const handleSearch = () => {
    nextTick(() => {
        const width = inputRef.value.offsetWidth
        divRef.value.style.width = `${width}px`
    })

    setTimeout(() => {
        show.value = true
    }, 2000)
}

watch(
    () => searchValue.value,
    (newValue, oldValue) => {
        console.log(newValue)
    },
)
</script>

<template>
    <div>
        <Tippy :interactive="true" trigger="click" placement="bottom-start">
            <div class="relative h-10 flex items-center justify-center">
                <input
                    ref="inputRef"
                    v-model="searchValue"
                    placeholder="Tìm kiếm"
                    @click="handleSearch"
                    class="w-full pl-4 pr-12 h-full text-15px outline-none rounded-xl border caret-primary focus-within:!border-slate-400 bg-gray-100 text-textColor"
                />
                <v-icon class="!absolute top-1/2 -translate-y-1/2 right-4">mdi-magnify</v-icon>
            </div>

            <template #content>
                <div
                    ref="divRef"
                    class="relative rounded-lg bg-white pt-12 pb-3 shadow-full"
                    :class="{ hidden: !show }"
                >
                    <h4
                        className="absolute left-0 top-0 right-0 leading-4 py-3 px-3 rounded-tl-lg rounded-tr-lg font-medium bg-gray-300"
                    >
                        Kết quả
                    </h4>
                    <div class="max-h-70vh overflow-y-auto">
                        <NuxtLink
                            to="#"
                            v-for="(item, index) of data"
                            :key="index"
                            class="flex items-center px-1 no-underline text-black hover:bg-gray-100"
                            :class="{ '': index > 0 }"
                        >
                            <NuxtImg :src="item.imageUrl || '/img/logo-forum.png'" width="60" height="60" />
                            <div class="">
                                <h4 class="font-medium">
                                    {{ item.postBy }}
                                    <span v-if="item.checked"
                                        ><v-icon class="text-[rgb(255,133,98)]" size="18"
                                            >mdi-check-circle</v-icon
                                        ></span
                                    >
                                </h4>
                                <span class="">{{ item.desc }}</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
        </Tippy>
    </div>
</template>

<style scoped></style>
