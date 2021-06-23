/**
 * 不是真实的 webpack 配置，仅为兼容 webstorm 和 intellij idea 代码跳转
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      services: path.resolve(__dirname, 'src/services'),
      models: path.resolve(__dirname, 'src/models'),
      utils: path.resolve(__dirname, 'src/utils'),
      config: path.resolve(__dirname, 'src/config'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      assets: path.resolve(__dirname, 'src/assets'),
      APP_ROOT: path.resolve(__dirname)
    }
  }
}
