const apiURL = {
    development: 'https://bdeinfo-api.barthofu.com',
    production: ''
}

export default apiURL[process.env.NODE_ENV]