import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'

const { BASE_API, LOGIN_URL } = process.env

// axios默认配置
axios.defaults.baseURL = BASE_API // 接口地址
axios.defaults.loginUrl = LOGIN_URL
axios.defaults.timeout = 0 // 响应时间
axios.defaults.crossDomain = true
// axios.defaults.headers.common['If-Modified-Since'] = '0'
// axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 配置POST请求头
axios.defaults.headers.delete['Content-Type'] = 'application/json;charset=UTF-8' // 配置delete请求头
// axios.defaults.withCredentials = true // 是否允许设置cookie

const request = axios.create({
  xsrfCookieName: 'xsrf-token'
})

request.interceptors.response.use(
  res => res,
  err => {
    const errMessage = err.message
    if (errMessage) {
      let errMsg = ''
      if (errMessage.includes('timeout')) errMsg = '请求超时!'
      if (errMessage.includes('Network Error')) errMsg = '网络错误!'
      errMsg && message.error(errMsg)
      return Promise.reject(err)
    }
    const errInfo = err.response
    if (errInfo) {
      switch (errInfo.status) {
        case 403: // 返回 403 清除登录标识 信息并跳转到登录页面
          message.error('登录超时，请重新登录')
          // setTimeout(() => (window.location.href = err.config.loginUrl), 500)
          // query: { redirect: router.currentRoute.fullPath }
          break
        case 404:
          message.error('接口没有找到（代码 404），请联系管理员')
          break
        case 401:
          message.error('您尚未登录系统')
          break
        case 400:
          message.error(errInfo.statusText)
          break
        case 500:
          message.error('服务器错误')
          break
        case 654:
          console.log('请求超时!')
          break
        default:
          break
      }
    }
    return Promise.reject(err)
  }
)
export default request
