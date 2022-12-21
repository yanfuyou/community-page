const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: 'localhost',
    port: 8099,
    open: true
  },
})
