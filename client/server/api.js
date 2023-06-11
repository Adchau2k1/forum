import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export const createUser = (params) => {
    return axios.post(`/users/register`, params)
}

export const loginUser = (params) => {
    return axios.post(`/users/login`, params)
}

export const getUsers = (query) => {
    const searchQuery = new URLSearchParams(query).toString()
    return axios.get(
        `/users?${searchQuery}`,
        // {
        // headers: {
        //     Authorization:
        //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY0ODVmYWNkMTNkZjA2OTBmODllYTc1YSIsInVzZXJuYW1lIjoiYWRtaW4yIiwiZW1haWwiOiIxMTFAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMDkkSDhoakouZmlvYmxVdEs3RUU3Qi4xLnBKZVI5ZnJDMFh2Y0FMQzN2dnZyandqOGNuQ0ZtdksiLCJwaG9uZSI6IiIsImNoZWNrZWQiOmZhbHNlLCJmdWxsTmFtZSI6ImFkbWluMiIsImltYWdlVXJsIjoiIiwidXNlclBvc3RzIjowLCJ1c2VyTGlrZXMiOjAsInRvdGFsTGlrZXMiOjB9LCJpYXQiOjE2ODY1MDIxMDksImV4cCI6MTY4NzM2NjEwOX0._TZ342odTvpnr_oneNbcp6rEA4hrkU0pmpEPgNCadLk',
        // },
        // }
    )
}
