import { useUserStore } from '~/stores/userStore'

class UseApi {
    constructor() {
        this.baseURL = useRuntimeConfig().public.baseURL || 'http://localhost:8000'
        this.accessToken = ''

        if (process.server) {
            const userStore = useUserStore()
            this.accessToken = `Bearer ${userStore.userInfo.token}`
        } else {
            const token = useCookie('accessToken')
            this.accessToken = `Bearer ${token.value}`
        }
    }

    get(url, options, isPublic = false) {
        return useFetch(url, {
            ...options,
            method: 'GET',
            baseURL: this.baseURL,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: isPublic ? '' : this.accessToken,
            },
        })
    }

    post(url, options, isPublic = false) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: isPublic ? '' : this.accessToken,
            },
        })
    }

    put(url, options, isPublic = false) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: isPublic ? '' : this.accessToken,
            },
        })
    }

    delete(url, options, isPublic = false) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: isPublic ? '' : this.accessToken,
            },
        })
    }
}

export default new UseApi()
