module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://54.255.190.101:5000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

