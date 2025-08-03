import {
    create
} from 'zustand'
import {
    doLogin
} from '@/api/user'

export const useUserStore = create((set) => ({
    user: null, // 用户信息
    isLogin: false, // 是否登录
    login: async ({username='',password=''}) => {
        try {
            const response = await doLogin({username, password})
            // 由于响应拦截器已经提取了data，这里直接使用response
            const {token, data: user} = response
            if (!token || !user) {
                throw new Error('登录失败')
            }
            localStorage.setItem('token', token)
            set({
                user,
                isLogin: true
            })
            return true
        } catch (error) {
            console.error('登录失败:', error)
            set({
                user: null,
                isLogin: false
            })
            throw error
        }
    },
    logout: () => {
        localStorage.removeItem('token')
        set({
            user: null,
            isLogin: false
        })
    },
}))