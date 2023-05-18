<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    type: String,
    hideClose: Boolean,
    message: String,
    timeout: Number,
})

let icon = 'mdi-check-circle'
switch (props.type) {
    case 'info':
        icon = 'mdi-information-variant-circle'
        break
    case 'warning':
        icon = 'mdi-alert-octagon'
        break
    case 'error':
        icon = 'mdi-alert'
        break
}

const emit = defineEmits(['onClickClose'])
</script>

<template>
    <v-snackbar
        location="top center"
        :color="props.type || 'success'"
        :timeout="props.timeout || 3000"
        class="toast-message"
    >
        <div class="flex justify-between items-center">
            <div>
                <span
                    ><v-icon>{{ icon }}</v-icon></span
                >
                <span class="ml-2">{{ props.message }}</span>
            </div>
            <button v-if="!props.hideClose" type="button" color="white" @click="emit('onClickClose')">
                <v-icon>mdi-close</v-icon>
            </button>
        </div>
    </v-snackbar>
</template>

<style scoped>
.toast-message {
    animation: slideInDown ease-in 0.4s, fadeOut linear 0.4s 3s forwards;
    -webkit-animation: slideInDown ease-in 0.4s, fadeOut linear 0.4s 3s forwards;
}

@keyframes slideInDown {
    from {
        opacity: 0;
        transform: translateY(calc(-100% - 32px));
        -webkit-transform: translateY(calc(-100% - 50px));
    }

    to {
        opacity: 1;
        transform: translateY(0);
        -webkit-transform: translateY(0);
    }
}

@keyframes fadeOut {
    to {
        opacity: 0;
        transform: translateY(calc(-100% - 32px));
        -webkit-transform: translateY(calc(-100% - 50px));
    }
}
</style>
