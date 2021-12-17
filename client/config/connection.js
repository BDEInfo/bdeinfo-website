const apiURL = {
    development: 'https://bdeinfo-api.barthofu.com',
    production: 'https://bdeinfo-api.barthofu.com'
}

export default apiURL[process.env.NODE_ENV]