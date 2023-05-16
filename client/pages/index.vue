<script setup>
// import Message from '~/components/Message.vue'

const snackConfig = ref({
    visible: true,
    text: 'Đăng nhập thành công',
    color: 'success',
    timeout: 3000,
})
</script>

<template>
    <NuxtLayout>
        <div class="min-h-screen">
            <!-- <Message
                :visible="snackConfig.visible"
                :icon="snackConfig.icon"
                :text="snackConfig.text"
                :color="snackConfig.color"
                :timeout="snackConfig.timeout"
            /> -->
            <h3>Nội dung trang chủ</h3>
            <v-btn @click="snackConfig.visible = true">Click</v-btn>
        </div>
    </NuxtLayout>
</template>
