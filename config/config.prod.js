export default {
  define: {
    // 添加这个自定义的环境变量
    'process.env.UMI_ENV': process.env.UMI_ENV, // * 本地开发环境：local，uat环境：uat，生产环境prod
    'process.env.BASE_API': 'http://example.com',
    'process.env.LOGIN_URL': 'http://example.com'
  }
}
