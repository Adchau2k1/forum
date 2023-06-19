import { useJwt } from '@vueuse/integrations/useJwt'
import { useUserStore } from '~/stores/userStore'

const API_ENDPOINTS = {
    LOGIN: '/users/login',
    REGISTER: '/users/register',
    USER: '/users',
    USER_POSTS: '/posts/userPosts',
    SEARCH_RESULTS: '/home/search',
    SHOW_POSTS: '/home/showPosts',
    TOP_POSTS: '/home/topPosts',
    FORM_STATISTICS: '/home/forumStatistics',
    POST: '/posts',
    TOPIC: '/topics',
}

class Request {
    constructor() {
        this.baseURL = useRuntimeConfig().public.baseURL || 'http://localhost:8000'
        this.accessToken = ''

        const accessToken = useCookie('accessToken')
        if (accessToken.value) {
            this.accessToken = `Bearer ${accessToken.value}`
        }

        this.handleRequest = {
            // Check trước khi gọi api
            onRequest({ request, options }) {
                const userStore = useUserStore()
                const accessToken = options.headers.Authorization

                if (['/users/login', '/users/register'].includes(request)) return

                if (accessToken) {
                    const { payload } = useJwt(accessToken)
                    if (Date.now() / 1000 >= payload.value.exp) {
                        userStore.logOut()
                        return navigateTo('/login')
                    }
                } else {
                    userStore.logOut()
                    return navigateTo('/login')
                }
            },

            // onResponse({ request, response, options }) {
            //     // Process the response data
            //     localStorage.setItem('token', response._data.token)
            // },
        }
    }

    get(url, options) {
        return useFetch(url, {
            ...options,
            baseURL: this.baseURL,
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: this.accessToken,
            },
            ...this.handleRequest,
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
            ...this.handleRequest,
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
            ...this.handleRequest,
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
            ...this.handleRequest,
        })
    }
}

class UserManager {
    constructor(request) {
        this.request = request
    }

    // User
    async login(data) {
        return this.request.post(API_ENDPOINTS.LOGIN, data, true)
    }

    async createUser(data) {
        return this.request.post(API_ENDPOINTS.REGISTER, data, true)
    }

    async getUsers(data) {
        return this.request.get(API_ENDPOINTS.USER, data)
    }

    async getUserByUsername(data) {
        return this.request.get(`${API_ENDPOINTS.USER}/${data.username}`)
    }

    async updateUser(data) {
        return this.request.put(API_ENDPOINTS.USER, data)
    }

    async deleteUser(data) {
        return this.request.delete(API_ENDPOINTS.USER, data)
    }

    // Index
    async getSearchResults(data) {
        return this.request.get(API_ENDPOINTS.SEARCH_RESULTS, data)
    }

    async getShowPosts(data) {
        return this.request.get(API_ENDPOINTS.SHOW_POSTS, data)
    }

    async getTopPosts(data) {
        return this.request.get(API_ENDPOINTS.TOP_POSTS, data)
    }

    async getForumStatistics(data) {
        return this.request.get(API_ENDPOINTS.FORM_STATISTICS, data)
    }

    // Post
    async getPosts(data) {
        return this.request.get(API_ENDPOINTS.POST, data)
    }

    async getPostById(_id) {
        return this.request.get(`${API_ENDPOINTS.POST}/${_id}`)
    }

    async getPostAllByFullName(data) {
        return this.request.get(`${API_ENDPOINTS.USER_POSTS}/${data.postBy}`)
    }

    async createPost(data) {
        return this.request.post(API_ENDPOINTS.POST, data)
    }

    async updatePost(data) {
        return this.request.put(API_ENDPOINTS.POST, data)
    }

    async deletePost(data) {
        return this.request.delete(API_ENDPOINTS.POST, data)
    }

    // Topic
    async getTopics(data) {
        return this.request.get(API_ENDPOINTS.TOPIC, data)
    }

    async updateTopic(data) {
        return this.request.put(API_ENDPOINTS.TOPIC, data)
    }
}
class RestAPI {
    constructor() {
        this.request = new Request()
        this.user = new UserManager(this.request)
    }
}

export default () => ({ restAPI: new RestAPI() })
