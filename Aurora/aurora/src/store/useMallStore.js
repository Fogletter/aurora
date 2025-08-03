import {
    create
} from 'zustand'
import {
    getmalls
} from '@/api/mall'

export const useMallStore = create((set) => ({
    products: [],
    fetchMall: async () => {
        const mall = await getmalls()
        set({ products: mall.data })
    }
}))