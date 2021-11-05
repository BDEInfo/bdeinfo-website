import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8082',
    headers: {
        'Authorization': `Bearer ${process.env.ADMIN_JWT_SECRET}`
    }
})

export default instance