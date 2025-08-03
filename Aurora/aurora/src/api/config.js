import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

axios.interceptors.request.use((config) => {
    // token
    const token = localStorage.getItem('token') || ''
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// 响应拦截
axios.interceptors.response.use((data) => {
    return data.data
})

export default axios