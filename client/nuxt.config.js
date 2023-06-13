import { resolve } from 'path'

export default defineNuxtConfig({
    modules: ['@unocss/nuxt', '@nuxt/image-edge', '@pinia/nuxt'],

    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '~/assets/css/global.css'],

    build: {
        transpile: ['vuetify'],
    },

    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },

    // SPA page
    routeRules: {
        // One page
        '/test': { ssr: false },
        // All page
        '/allPage/**/': { ssr: false },
    },

    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_PUBLIC_API_URL,
        },
    },

    hooks: {
        'pages:extend'(pages) {
            pages.push({
                name: 'profile',
                path: '/@:username',
                file: resolve(__dirname, 'pages/profile.vue'),
            })
        },
    },
})
