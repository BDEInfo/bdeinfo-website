import { strapi } from '@strapi/client'
import baseURL from '@config/connection'

const client = strapi({
    baseURL: baseURL + '/api',
    auth: process.env.ADMIN_API_TOKEN
})

export default client
