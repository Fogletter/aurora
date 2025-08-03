import {
    create
} from 'zustand'
import { getDetail } from '../api/detail'

const useDetailStore = create((set) => ({
    detail: {
        title: '',
        images: [
            {
                alt: '',
                url: 'https://ts1.tc.mm.bing.net/th/id/OIP-C.G76suOVh7VytHbKYP7HlZAHaG7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
            }
        ],
        price: '',
        desc: ''
    },
    loading: false,
    setDetail: async () => {
        set({ loading: true })
        const res = await getDetail()
        set({
            detail: res.data,
            loading: false
        })
    }
}))

export default useDetailStore