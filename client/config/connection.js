const apiURL = {
    development: 'https://strapi.bdeinfo.org',
    production: 'https://strapi.bdeinfo.org' // docker -> http://bdeinfo-server:1337
}

export default apiURL[process.env.NODE_ENV]
