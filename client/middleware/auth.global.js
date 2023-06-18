import { useJwt } from '@vueuse/integrations/useJwt'
import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from, next) => {
    const userStore = useUserStore()
    const paths = to.path.split('/')

    if (process.client) {
        if (['login', 'register'].includes(paths[1])) {
            return next
        }

        // Check người dùng đã đăng nhập và token đã hết hạn chưa
        if (userStore.userInfo?.accessToken) {
            console.log('đã vào 1')
            const { payload } = useJwt(userStore.userInfo?.accessToken)
            if (Date.now() / 1000 >= payload.value.exp) {
                userStore.logOut()
                return navigateTo('/login')
            }
        } else {
            console.log('đã vào 2')
            userStore.logOut()
            return navigateTo('/login')
        }
    }

    // // Check role admin khi vào trang admin
    // if (paths[1] === 'admin') {
    //     if (userStore.userInfo?.role !== 'admin') {
    //         userStore.logOut()
    //         return navigateTo('/login')
    //     } else return next
    // } else return next
})
