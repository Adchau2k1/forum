import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        isLogin: false,
        userInfo: {},
    }),

    actions: {
        logOut() {
            const accessToken = useCookie('accessToken')
            this.isLogin = false
            accessToken.value = null // clear the token cookie
        },

        setUserInfo(value) {
            this.userInfo = value
        },
    },
})
