<script setup>
const { show, color, hideClose, message } = defineProps({
    show: Boolean,
    color: String,
    hideClose: Boolean,
    message: String,
})

definePageMeta({
    layout: false,
})

let icon = 'mdi-check-circle'
if (color === 'info') icon = mid
</script>

<template>
    <div>
        <v-alert
            v-if="true"
            border="start"
            border-color="black"
            :color="color"
            :icon="icon"
            icon=""
            :closable="true"
            max-width="300"
            max-height="70"
            class="!flex items-center"
            font-size="12px"
            density="comfortable"
        >
            Đăng nhập thành công
        </v-alert>
    </div>
</template>

<style scoped>
.v-alert__prepend > i {
    font-size: 20px !important;
}
</style>
