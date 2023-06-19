import { useJwt } from '@vueuse/integrations/useJwt'
import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
    const paths = to.path.split('/')
    const accessToken = useCookie('accessToken')
    const userStore = useUserStore()

    // Bỏ check
    if (['login', 'register'].includes(paths[1])) return

    if (accessToken.value) {
        const { payload } = useJwt(accessToken.value)
        // Check token đã hết hạn chưa
        if (Date.now() / 1000 >= payload.value.exp) {
            userStore.logOut()
            return navigateTo('/login')
        }

        // Check có phải admin
        if (paths[1] === 'admin') {
            // userStore chưa có giá trị khi server side
            if (process.client) {
                if (userStore.userInfo.role === 'admin') return
                return navigateTo('/403')
            }
        }
        return
    } else {
        userStore.logOut()
        return navigateTo('/login')
    }
})
