<script setup>
const route = useRoute()
const inputComment = ref('')

const postData = {
    id: 23,
    usernamePost: 'Admin',
    postBy: 'Sinh viên GenZ',
    topic: 'Kiến thức',
    title: 'Tại sao nên học code VueJS ?',
    content: `Vue.js là gì? Gọi tắt là Vue (phát âm là /vjuː/, giống như view trong tiếng Anh), Vue.js là một
            framework linh động (nguyên bản tiếng Anh: progressive – tiệm tiến) dùng để xây dựng giao diện
            người dùng (user interfaces). Khác với các framework nguyên khối (monolithic), Vue được thiết kế
            từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát
            triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue,
            vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với
            những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp
            ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với
            độ phức tạp cao hơn nhiều. Nếu bạn muốn tìm hiểu thêm về Vue, chúng tôi đã tạo một video clip về
            những nguyên tắc cốt lõi và một dự án mẫu. Nếu bạn là một lập trình viên front-end giàu kinh
            nghiệm và muốn hiểu hơn về tương quan giữa Vue và các thư viện hay framework khác, hãy xem phần
            So sánh với các framework khác.`,
    postAt: '20/04/2023',
    userPost: 12,
    userLike: 45,
    likes: 220,
    data: {
        total: 2,
        comments: [
            {
                id: 4,
                imgUrl: '',
                usernameComment: 'test123',
                commentBy: 'Superman',
                content: 'Cảm ơn nội dung hay lắm nhé',
                userPost: 12,
                userLike: 45,
                likes: 0,
                commentAt: '20/04/2023',
            },
            {
                id: 2,
                imgUrl: '',
                usernameComment: 'dev2k1',
                commentBy: 'Bot',
                content: 'Bot đã xem',
                userPost: 12,
                userLike: 45,
                likes: 2,
                commentAt: '20/04/2023',
            },
        ],
    },
}
</script>

<template>
    <NuxtLayout
        ><div>
            <h4 class="px-4 py-2 font-normal text-white bg-#213547">
                Bài viết > <span class="font-semibold">{{ postData.topic }}</span>
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
                                    <div class="text-sm">{{ postData.userPost }}</div>
                                </div>
                                <div class="text-center">
                                    <v-icon size="18">mdi-thumb-up</v-icon>
                                    <div class="text-sm">{{ postData.userLike }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="post relative ml-4 flex-1 px-4 py-3 rounded-md bg-white">
                        <div class="flex justify-between text-sm">
                            <span class="font-bold">#1</span>
                            <div>{{ postData.postAt }}</div>
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
                <div class="">
                    <div class="flex mt-6" v-for="(c, idx) of postData.data.comments">
                        <div class="w-130px text-center">
                            <NuxtImg src="/img/avatar.png" alt="avatar" class="w-14 h-14" />
                            <div>
                                <NuxtLink :to="`/@${c.usernameComment}`" class="font-semibold no-underline text-sm">{{
                                    c.commentBy
                                }}</NuxtLink>
                                <!-- <span class="font-semibold text-sm">{{ c.commentBy }}</span> -->
                                <div class="flex justify-center gap-3">
                                    <div class="text-center">
                                        <v-icon size="18">mdi-newspaper-variant</v-icon>
                                        <div class="text-sm">{{ c.userPost }}</div>
                                    </div>
                                    <div class="text-center">
                                        <v-icon size="18">mdi-thumb-up</v-icon>
                                        <div class="text-sm">{{ c.userLike }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="post relative ml-4 flex-1 px-4 py-3 rounded-md bg-white">
                            <div class="flex justify-between text-sm">
                                <span class="font-bold">#{{ idx + 2 }}</span>
                                <div>{{ c.commentAt }}</div>
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
                <div class="flex mt-6">
                    <div class="w-130px"></div>
                    <div class="relative ml-4 h-full flex-1 p-3 bg-white">
                        <textarea
                            class="w-full px-3 py-2 rounded-md outline-slate-400 bg-gray-200"
                            v-model="inputComment"
                            rows="3"
                        />
                        <div class="mt-2 text-right">
                            <v-btn class="!text-xs !bg-primary">Bình luận</v-btn>
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
