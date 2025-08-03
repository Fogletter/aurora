import axios from './config'

export const getArticles = (page) => {
    return axios.get('/articles', {
        params: {
            page
        }
    })
}