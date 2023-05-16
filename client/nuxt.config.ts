import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    modules: ['@unocss/nuxt', '@nuxt/image-edge',],

    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '@/css/global.css',],

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
})
