const path = require('path')

module.exports = {
    sassOptions: {
        includePaths: [
            path.join(__dirname, 'public/styles/')
        ]
    }
}