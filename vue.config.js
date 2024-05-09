const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,  // 不需要生成 map 文件 
  transpileDependencies: true,
  // 关闭 eslint 严格校验检查
  lintOnSave: false,
  devServer: {
      proxy: {
          '/api': {
              target: 'http://127.0.0.1:3007',  // 最新接口地址
          }
      }
  }
})