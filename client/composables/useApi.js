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

        if (process.client) {
            const userStore = useUserStore()
            this.accessToken = `Bearer ${userStore.userInfo.accessToken}`
        } else {
            const accessToken = useCookie('accessToken')
            this.accessToken = `Bearer ${accessToken?.value}`
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

    // User
    async login(data) {
        return this.request.post(API_ENDPOINTS.LOGIN, data)
    }

    async getUserByUsername(data) {
        return this.request.get(`${API_ENDPOINTS.USER}/${data.username}`)
    }

    async createUser(data) {
        return this.request.post(API_ENDPOINTS.REGISTER, data)
    }

    async updateUser(data) {
        return this.request.put(API_ENDPOINTS.USER, data)
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
    async getPostById(_id) {
        return this.request.get(`${API_ENDPOINTS.POST}/${_id}`)
    }

    async createPost(data) {
        return this.request.post(API_ENDPOINTS.POST, data)
    }

    async updatePost(data) {
        return this.request.put(API_ENDPOINTS.POST, data)
    }

    async getPostAllByFullName(data) {
        return this.request.get(`${API_ENDPOINTS.USER_POSTS}/${data.postBy}`)
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
