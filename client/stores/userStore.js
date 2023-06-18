import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userInfo: {},
    }),

    actions: {
        setUserInfo(value) {
            this.userInfo = value
            const accessToken = useCookie('accessToken')
            accessToken.value = value?.accessToken
            if (process.client) localStorage.setItem('userInfo', JSON.stringify(value))
        },

        logOut() {
            this.userInfo = {}
            const accessToken = useCookie('accessToken')
            accessToken.value = null // clear the token cookie
            if (process.client) localStorage.removeItem('userInfo')
        },
    },
})
