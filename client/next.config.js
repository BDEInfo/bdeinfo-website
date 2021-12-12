const path = require('path')

const nextConfig = {
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'public/styles/')
        ]
    }
}

module.exports = nextConfig