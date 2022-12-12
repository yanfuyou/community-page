const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8099
  }
})
