const path = require('path')

module.exports = {
    publicPath: '',
    outputDir: path.resolve(__dirname, "../" + "main/resources/static"),
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9200',
                ws: true,
                changeOrigin: true
            },
            '/companyInfo': {
                target: 'http://localhost:9200',
                ws: true,
                changeOrigin: true
            }
        }
  },
}