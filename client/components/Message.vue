<script setup>
defineProps([visible, text, color, timeout])
defineEmits(['update:visible'])
const icon = ref('')

if (color === 'success') icon.value = 'mdi-check-circle-outline'
</script>

<template>
    <v-snackbar v-model="visible" location="top center" :timeout="timeout" :color="color">
        <div class="flex justify-between items-center">
            <div>
                <span
                    ><v-icon>{{ icon }}</v-icon></span
                >
                <span class="ml-2">{{ text }}</span>
            </div>
            <button type="button" color="white" text @click="$emit('update:visible', false)">
                <v-icon>mdi-close</v-icon>
            </button>
        </div>
    </v-snackbar>
</template>
