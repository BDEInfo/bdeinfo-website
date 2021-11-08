import axios from 'axios'
import baseURL from '@config/connection'

const instance = axios.create({
    baseURL,
    headers: {
        'Authorization': `Bearer ${process.env.ADMIN_JWT_SECRET}`
    }
})

export default instance