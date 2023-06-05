import { resolve } from 'path'

export default defineNuxtConfig({
    modules: ['@unocss/nuxt', '@nuxt/image-edge'],

    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css', '~/assets/css/global.css'],

    // plugins: [{ src: '~/plugins/quill-editor.js', ssr: false }],

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
