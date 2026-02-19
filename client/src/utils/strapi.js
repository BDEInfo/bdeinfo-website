import { strapi } from '@strapi/client'
import baseURL from '@config/connection'

const client = strapi({
    baseURL: baseURL + '/api'
})

export default client
