import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        isLogin: false,
        userInfo: {},
    }),

    actions: {
        setUserInfo(value) {
            this.userInfo = value
        },

        logOut() {
            const accessToken = useCookie('accessToken')
            this.isLogin = false
            accessToken.value = null // clear the token cookie
        },
    },
})
