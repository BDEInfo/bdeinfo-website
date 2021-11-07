import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Authorization': `Bearer ${process.env.ADMIN_JWT_SECRET}`
    }
})

export default instance