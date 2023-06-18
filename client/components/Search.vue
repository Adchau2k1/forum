<script setup>
import { Tippy } from 'vue-tippy'
import { debounce } from 'lodash'

const { restAPI } = useApi()
const searchValue = ref('')
const inputRef = ref(null)
const divRef = ref(null)
const data = ref([])

// Lấy độ rộng input search cho div kết quả
const handleSetWidth = () => {
    nextTick(() => {
        const width = inputRef.value.offsetWidth
        divRef.value.style.width = `${width}px`
    })
}

// Gọi api sau khi dừng gõ 1s
watch(
    searchValue,
    debounce(async (newValue) => {
        if (newValue) {
            try {
                const { data: searchData } = await restAPI.user.getSearchResults({
                    params: {
                        q: newValue,
                    },
                })

                data.value = searchData.value?.data
            } catch (err) {
                console.error(err)
            }
        } else data.value = []
    }, 1000),
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
                    @focus="handleSetWidth"
                    class="w-full pl-4 pr-12 h-full text-15px outline-none rounded-xl border caret-primary focus-within:!border-slate-400 bg-gray-100 text-textColor"
                />
                <v-icon class="!absolute top-1/2 -translate-y-1/2 right-4">mdi-magnify</v-icon>
            </div>

            <template #content>
                <div
                    v-show="data.data?.length > 0"
                    ref="divRef"
                    class="relative rounded-lg bg-white pt-12 pb-3 shadow-full"
                >
                    <h4
                        className="absolute left-0 top-0 right-0 leading-4 py-3 px-3 rounded-tl-lg rounded-tr-lg font-medium bg-gray-300"
                    >
                        Kết quả
                    </h4>
                    <div class="max-h-70vh overflow-y-auto">
                        <NuxtLink
                            v-for="(item, index) of data.data"
                            :to="`@${item.username}`"
                            :key="index"
                            class="flex items-center px-2 py-2 no-underline text-black hover:bg-gray-100"
                        >
                            <NuxtImg :src="item.imageUrl || '/img/avatar.png'" width="40" height="40" />
                            <div class="ml-3">
                                <h4 class="font-medium">
                                    {{ item.fullName }}
                                    <span v-if="item.checked"
                                        ><v-icon class="text-[rgb(255,133,98)]" size="18"
                                            >mdi-check-circle</v-icon
                                        ></span
                                    >
                                </h4>
                                <span class="">{{ item.email }}</span>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
        </Tippy>
    </div>
</template>

<style scoped></style>
