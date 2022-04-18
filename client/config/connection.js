const apiURL = {
    development: 'https://api-website.bdeinfo.org',
    production: 'https://api-website.bdeinfo.org' // docker -> http://bdeinfo-server:1337
}

export default apiURL[process.env.NODE_ENV]