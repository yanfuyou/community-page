const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '192.168.3.7',
    port: 8099,
    open: true
  },
})
