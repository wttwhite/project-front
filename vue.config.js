const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name

// const target = 'https://192.168.2.20'
const target = 'https://192.168.2.40'
// const target = 'https://192.168.2.29'
// const target = 'https://172.31.10.154'

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV == 'production' ? `/other/xmgl` : './',
  filenameHashing: true,
  assetsDir: 'selfstatic',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/other': {
        target,
        changeOrigin: true,
      },
      '/devKey': {
        target,
        changeOrigin: true,
        pathRewrite: {
          '/devKey': '',
        },
      },
      '/app/holdasset-base': {
        target,
        changeOrigin: true,
        pathRewrite: {
          // '/app': '',
        },
      },
    },
    client: {
      overlay: false, // 编译错误时，取消全屏覆盖（建议关掉）
    },
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
    },
  },
})
