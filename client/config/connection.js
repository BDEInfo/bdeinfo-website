const apiURL = {
    development: 'http://localhost:1337', // docker -> http://bdeinfo-server:1337
    production: 'https://strapi.bdeinfo.org' // docker -> http://bdeinfo-server:1337
}

export default apiURL[process.env.NODE_ENV]
