import axios from './config'

export const getmalls = () => {
    return axios.get('/mall')
}