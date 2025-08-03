import {
    create
} from 'zustand'
import {
    getArticles
} from '@/api/community'

export const useArticleStore = create((set, get) => ({
    articles: [],
    page: 1,
    loading: false,
    fetchMore: async () => {
        // 如果还在请求中，不再发起新的请求
        if (get().loading) {
            return
        }
        set({
            loading: true
        }) // 请求中
        const newArticles = await getArticles(get().page)
        // 之前的状态
        set((state) => ({
            articles: [...state.articles, ...newArticles.data],
            page: state.page + 1,
            loading: false
        }))
    }
}))
