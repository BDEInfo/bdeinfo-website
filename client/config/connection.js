const apiURL = {
    development: 'https://api-website.bdeinfo.org',
    production: 'https://api-website.bdeinfo.org'
}

export default apiURL[process.env.NODE_ENV]