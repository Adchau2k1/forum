<script setup>
import { ref } from 'vue'
import Message from '~/components/Message.vue'

const showMessage = ref(false)
</script>

<template>
    <NuxtLayout>
        <div class="min-h-screen">
            <Message v-model="showMessage" message="Đăng nhập thành công" @onClickClose="showMessage = false" />

            <h3>Nội dung trang chủ</h3>
            <v-btn @click="showMessage = true">Click</v-btn>
        </div>
    </NuxtLayout>
</template>
