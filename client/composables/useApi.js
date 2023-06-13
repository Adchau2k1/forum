import { useUserStore } from '~/stores/userStore'

const API_ENDPOINTS = {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
}

class Request {
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

    get(url, options) {
        return useFetch(url, {
            ...options,
            method: 'GET',
            baseURL: this.baseURL,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.accessToken,
            },
        })
    }

    post(url, options) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.accessToken,
            },
        })
    }

    put(url, options) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.accessToken,
            },
        })
    }

    delete(url, options) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.accessToken,
            },
        })
    }
}

class UserManager {
    constructor(request) {
        this.request = request
    }

    async login(data) {
        return this.request.post(API_ENDPOINTS.LOGIN, data)
    }
}

class RestAPI {
    constructor() {
        this.request = new Request()
        this.user = new UserManager(this.request)
    }
}

export default () => ({ restAPI: new RestAPI() })
