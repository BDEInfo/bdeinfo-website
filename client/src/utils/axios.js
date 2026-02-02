import Axios from 'axios'
import qs from 'qs'
import baseURL from '@config/connection'

const instance = Axios.create({
    baseURL: baseURL + '/api',
    headers: {
        'Authorization': `Bearer ${process.env.ADMIN_API_TOKEN}`
    },
    paramsSerializer: params => qs.stringify(params, { encodeValuesOnly: true })
})

export default instance