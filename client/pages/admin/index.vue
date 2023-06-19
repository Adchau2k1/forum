<script setup>
const { restAPI } = useApi()
const { data: resFormStatistics } = await restAPI.user.getForumStatistics({ params: { isAll: true } })
const data = computed(() => {
    const newData = [
        {
            key: 1,
            title: 'Tổng số chuyên mục',
            total: resFormStatistics.value?.data?.topics,
        },
        {
            key: 2,
            title: 'Tổng số bài viết',
            total: resFormStatistics.value?.data?.posts,
        },
        {
            key: 3,
            title: 'Tổng số thành viên',
            total: resFormStatistics.value?.data?.members,
        },
        {
            key: 4,
            title: 'Tổng số lượt truy cập trung bình',
            total: resFormStatistics.value?.data?.aveVisit,
        },
    ]

    return newData
})

definePageMeta({
    layout: 'admin-layout',
})
</script>

<template>
    <div>
        <h2>Thống kê diễn đàn</h2>
        <div class="mt-20 flex gap-8">
            <div
                v-for="item of data"
                :key="item.key"
                class="w-1/2 md:w-1/3 lg:w-1/4 h-60 p-4 rounded-lg bg-gradient-to-r from-#fc5c7d to-#6a82fb"
            >
                <h4 class="min-h-50px">{{ item.title }}</h4>
                <h1 class="mt-10 text-center text-white">{{ item.total }}</h1>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
