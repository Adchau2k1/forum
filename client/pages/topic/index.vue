<script setup>
const { restAPI } = useApi()

const { data: resTopic } = await restAPI.user.getTopics()
const topicData = computed(() => {
    const sortedTopics = resTopic.value?.data.reduce((acc, topic) => {
        const existingTopic = acc.find((t) => t.corner === topic.corner)
        if (existingTopic) {
            existingTopic.topics.push(topic)
        } else {
            acc.push({ corner: topic.corner, topics: [topic] })
        }
        return acc
    }, [])

    return sortedTopics
})
</script>

<template>
    <NuxtLayout>
        <div>
            <h2 class="uppercase">Chuyên mục</h2>

            <div v-for="(item, idx) of topicData" :key="idx">
                <div class="mt-8 rounded-md overflow-hidden bg-gray-100">
                    <h3 class="p-4 py-3 uppercase bg-#213547 text-white">{{ item.corner }}</h3>
                    <div v-if="item.topics">
                        <div v-for="(topic, idx) of item.topics" :key="idx" class="px-4 py-3">
                            <div class="top-item flex justify-between items-center gap-4">
                                <div class="w-50% flex items-center">
                                    <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                                    <div class="ml-3">
                                        <h4 class="text-blue-700">{{ topic?.title || '' }}</h4>
                                        <p>
                                            {{ topic?.desc }}
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-col justify-center items-center">
                                    <span class="min-w-100px text-center">Số bài viết</span>
                                    <span class="font-600">{{ topic?.totalPosts }}</span>
                                </div>
                                <div v-if="!Object.keys(topic?.postShow || {})?.length" class="ml-2 w-25% text-center">
                                    Chưa có bài viết nào
                                </div>
                                <div v-else class="w-25% flex items-center">
                                    <NuxtImg
                                        :src="topic?.postShow?.imageUrl || '/img/logo-forum.png'"
                                        alt="avatar"
                                        width="40"
                                        height="40"
                                    />
                                    <div class="ml-2 w-full">
                                        <NuxtLink
                                            :to="`/topic/${topic?.postShow?._id}`"
                                            class="no-underline text-primary"
                                        >
                                            {{ topic?.postShow?.title }}
                                        </NuxtLink>
                                        <div class="mt-2 flex justify-between opacity-50 text-sm">
                                            <span>{{ formatNormal(topic?.postShow?.createdAt) }}</span>
                                            <span>{{ topic?.postShow?.postBy }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="mt-6 rounded-md overflow-hidden bg-gray-100">
                <h3 class="p-4 py-3 uppercase bg-#213547 text-white">Góc việc làm</h3>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Kiến thức</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Chuyên ngành</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Tài liệu</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 rounded-md overflow-hidden bg-gray-100">
                <h3 class="p-4 py-3 uppercase bg-#213547 text-white">Góc giải trí</h3>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Kiến thức</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Chuyên ngành</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Tài liệu</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-6 rounded-md overflow-hidden bg-gray-100">
                <h3 class="p-4 py-3 uppercase bg-#213547 text-white">Góc góp ý, báo cáo</h3>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Kiến thức</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Chuyên ngành</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 py-3">
                    <div class="top-item flex justify-between items-center gap-4">
                        <div class="flex items-center">
                            <span class="text-30px"><v-icon>mdi-shape</v-icon></span>
                            <div class="ml-3">
                                <h4 class="text-blue-700">Tài liệu</h4>
                                <p>
                                    Hướng dẫn sử dụng các chức năng trên Kênh Sinh Viên và các thông báo hoạt động nội
                                    bộ
                                </p>
                            </div>
                        </div>
                        <div class="flex flex-col justify-center items-center">
                            <span class="min-w-100px text-center">Số bài viết</span>
                            <span class="font-600">125</span>
                        </div>
                        <div class="flex items-center">
                            <NuxtImg src="/img/logo-forum.png" alt="avatar" width="40" height="40" />
                            <div class="ml-2">
                                <NuxtLink to="#" class="no-underline text-primary">
                                    Học thiết kế 3D bắt đầu từ đâu?
                                </NuxtLink>
                                <div class="flex justify-between opacity-50 text-sm">
                                    <span>24/05/2023</span>
                                    <span>LongVu1911</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </NuxtLayout>
</template>
