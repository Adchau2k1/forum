import { useUserStore } from '~/stores/userStore'

class UseApi {
    constructor() {
        this.baseURL = useRuntimeConfig().public.baseURL || 'http://localhost:8080'
        this.accessToken = ''

        if (process.client) {
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

    post(url, options, isPublic = false) {
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
// export default () => {
//     return { useApi: new UseApi() }
// }

// class Request {
//     constructor() {
//         this.handler = {
//             onRequest({ request, options }) {
//                 // Set the request headers
//                 // options.headers = options.headers || {}
//                 // options.headers.authorization = "..."
//             },
//             onRequestError({ request, options, error }) {
//                 // console.log("🚀 ~ file: useApi.js:72 ~ Request ~ onRequestError ~ error:", error)
//             },
//             onResponse({ request, response, options }) {
//                 // console.log("🚀 ~ file: useApi.js:72 ~ Request ~ onResponseError ~ error:", response._data)
//                 return response._data
//             },
//             onResponseError({ request, response, options }) {
//                 // console.log("🚀 ~ file: useApi.js:72 ~ Request ~ onResponseError ~ error:", error)
//             },
//         }

//         if (process.client) {
//             const userStore = useAuthStore()
//             this.TOKEN = `Bearer ${userStore.token}`
//         } else {
//             const bearer = useCookie('Bearer')
//             this.TOKEN = `Bearer ${bearer.value}`
//         }
//     }

//     get(url, options) {
//         return useFetch(url, {
//             baseURL: useRuntimeConfig().public.baseURL,
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: this.TOKEN,
//             },
//             ...options,
//             ...this.handler,
//         })
//     }

//     post(url, options) {
//         return useFetch(url, {
//             baseURL: useRuntimeConfig().public.baseURL,
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: this.TOKEN,
//             },
//             ...options,
//             ...this.handler,
//         })
//     }

//     patch(url, options) {
//         return useFetch(url, {
//             baseURL: useRuntimeConfig().public.baseURL,
//             method: 'PATCH',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: this.TOKEN,
//             },
//             ...options,
//             ...this.handler,
//         })
//     }
//     put(url, options) {
//         return useFetch(url, {
//             baseURL: useRuntimeConfig().public.baseURL,
//             method: 'PUT',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: this.TOKEN,
//             },
//             ...options,
//             ...this.handler,
//         })
//     }
//     delete(url, options) {
//         return useFetch(url, {
//             baseURL: useRuntimeConfig().public.baseURL,
//             method: 'DELETE',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 Authorization: this.TOKEN,
//             },
//             ...options,
//             ...this.handler,
//         })
//     }
// }

// class RestApi {
//     constructor(docx_url) {
//         this.requester = new Request()
//         this.demo = new Demo(this.requester)
//     }

//     setToken(token) {
//         this.requester.defaults.headers.common['Authorization'] = `Bearer ${userStore.user.token}`
//     }

//     async login(user) {
//         return this.requester.post(ENDPOINTS.SIGN_IN, user, {
//             headers: {},
//         })
//     }
//     login_sso(data) {
//         return this.requester.post(ENDPOINTS.LOGIN_SSO, { body: data })
//     }

//     // luyentm todo not use right now
//     isTokenExpired(token) {
//         try {
//             return Date.now() >= JSON.parse(window.atob(token.split('.')[1])).exp * 1000
//         } catch (e) {
//             return false
//         }
//     }

//     // upload image
//     async get_url_upload(acl, content_encoding, content_type, key, platform) {
//         let data = { acl, content_encoding, content_type, key, platform }
//         return this.requester.put(ENDPOINTS.S3, { body: data })
//     }
//     async upload_s3(
//         key,
//         data,
//         { category_id, encoding, content_type, acl, bucket } = {
//             category_id: null,
//             encoding: 'base64',
//             content_type: 'image/jpeg',
//             acl: 'public-read',
//             bucket: 'mobiedu',
//         },
//         progress,
//     ) {
//         const { data: resp } = await this.get_url_upload(acl, encoding, content_type, key, bucket)
//         const url = resp.value?.url
//         const direct_url = resp.value?.direct_url
//         if (!url || !direct_url) throw Error('presigned error')
//         let buf
//         switch (encoding) {
//             case 'base64':
//                 buf = _base64ToArrayBuffer(data.replace(/^data:image\/\w+;base64,/, ''))
//                 break
//             case 'blob':
//                 buf = data
//                 break
//             default:
//                 throw new Error('Invalid encoding')
//         }
//         await useFetch(url, {
//             method: 'PUT',
//             headers: {
//                 Authorization: '',
//                 'x-amz-acl': acl || 'public-read',
//                 'Content-Encoding': encoding,
//                 'Content-Type': content_type,
//             },
//             body: buf,
//         })
//         return direct_url
//     }
// }

// class Demo {
//     constructor(requester) {
//         this.requester = requester
//     }

//     async get(query) {
//         return this.requester.get(ENDPOINTS.DEMO, {
//             params: query,
//         })
//     }

//     async details(query) {
//         return this.requester.get(ENDPOINTS.DEMO, {
//             params: query,
//         })
//     }
// }

// function _base64ToArrayBuffer(base64) {
//     var binary_string = window.atob(base64)
//     var len = binary_string.length
//     var bytes = new Uint8Array(len)
//     for (var i = 0; i < len; i++) {
//         bytes[i] = binary_string.charCodeAt(i)
//     }
//     return bytes.buffer
// }
// export default () => {
//     return { RestApi: new RestApi() }
// }
