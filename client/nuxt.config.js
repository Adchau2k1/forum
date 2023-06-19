import { resolve } from 'path'

export default defineNuxtConfig({
    modules: ['@unocss/nuxt', '@nuxt/image-edge', '@pinia/nuxt', 'dayjs-nuxt'],

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
        '/admin/**/': { ssr: false },
        403: { ssr: false },
    },

    runtimeConfig: {
        public: {
            baseURL: process.env.NUXT_PUBLIC_BASE_URL,
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

    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
})
