import { strapi } from '@strapi/client'
import { internalURL } from '@config/connection'

const client = strapi({
    baseURL: internalURL + '/api',
    auth: process.env.STRAPI_API_TOKEN
})

export default client
