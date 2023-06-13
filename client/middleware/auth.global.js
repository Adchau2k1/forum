// import { createPinia } from 'pinia'
import { useJwt } from '@vueuse/integrations/useJwt'
// import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
    // const pinia = createPinia()
    const userStore = useUserStore()
    console.log(userStore.userInfo)
    // const path = to.path
    // if (path === 'login' || path === 'register') return abortNavigation()
    // else {
    //     const token = useCookie('token')
    //     if (token.value) {
    //         const { payload } = useJwt(token)
    //         if (Date.now() / 1000 < payload.value.exp) {
    //             // userStore.authenticated = true
    //         } else {
    //             // userStore.authenticated = false
    //         }
    //     }
    // if (!userStore.authenticated)
    // return navigateTo('/login')
    // }
})
