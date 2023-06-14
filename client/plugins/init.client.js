import { useUserStore } from '~/stores/userStore'

export default defineNuxtPlugin((nuxtApp) => {
    const userStore = useUserStore(nuxtApp.$pinia)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    if (Object.keys(userStore.userInfo).length > 0) {
        localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo))
    } else {
        if (userInfo) {
            userStore.setUserInfo(userInfo)
        }
    }
})
