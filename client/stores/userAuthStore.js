import { defineStore } from 'pinia'

export const useAuthStore = defineStore('userAuth', {
    state: () => ({
        authenticated: false,
        loading: false,
    }),

    actions: {
        async authenticateUser({ username, password }) {
            const config = useRuntimeConfig()
            const { data, pending } = await useFetch(`${config.public.baseApi}/users/login`, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: {
                    username,
                    password,
                },
            })

            this.loading = pending

            const result = data?.value
            if (result.success) {
                const token = useCookie('token')
                token.value = result?.data?.token // set token to cookie

                if (token.value) {
                    this.authenticated = true
                    console.log(this.authenticated, 'auth')
                }
                return result
            }

            return result
        },

        logUserOut() {
            const token = useCookie('token')
            this.authenticated = false
            token.value = null // clear the token cookie
        },
    },
})
