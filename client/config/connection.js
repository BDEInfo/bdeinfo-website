const defaultURL = {
    development: 'http://localhost:1337', // docker -> http://bdeinfo-server:1337
    production: 'https://strapi.bdeinfo.org' // docker -> http://bdeinfo-server:1337
}

// Internal URL for server-side API calls (can be a Docker-internal hostname)
export const internalURL = process.env.API_URL || defaultURL[process.env.NODE_ENV] || defaultURL.production

// Public URL for asset/image URLs rendered in the browser
export const publicURL = process.env.NEXT_PUBLIC_API_URL || defaultURL[process.env.NODE_ENV] || defaultURL.production
