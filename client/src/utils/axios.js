import Axios from 'axios'
import baseURL from '@config/connection'

const instance = Axios.create({
    baseURL: baseURL + '/api',
    headers: {
        'Authorization': `Bearer ${process.env.ADMIN_API_TOKEN}`
    }
})

export default instance