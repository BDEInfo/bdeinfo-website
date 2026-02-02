const path = require('path')

const nextConfig = {
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
        loadPaths: [
            path.join(__dirname, 'src/styles')
        ]
    }
}

module.exports = nextConfig