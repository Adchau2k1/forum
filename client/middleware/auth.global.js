import { createPinia } from 'pinia'
import { useJwt } from '@vueuse/integrations/useJwt'
import { useAuthStore } from '~/stores/userAuthStore'

export default defineNuxtRouteMiddleware((to, from) => {
    const pinia = createPinia()
    const userStore = useAuthStore(pinia)

    const path = to.path
    if (path === '/login' || path === '/register') return abortNavigation()
    else {
        const token = useCookie('token')
        if (token.value) {
            const { payload } = useJwt(token)
            if (Date.now() / 1000 < payload.value.exp) {
                userStore.authenticated = true
            } else {
                userStore.authenticated = false
            }
        }

        if (!userStore.authenticated) return navigateTo('/login')
    }
})
