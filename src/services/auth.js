import request from 'utils/request'
import { userObj } from 'APP_ROOT/mock/auth'

/**
 * 获取菜单数据
 * @param {String} userName
 */
export async function getMenu (userName) {
  if (process.env.NODE_ENV !== 'development') {
    return { data: userObj }
  }
  return request.get(`/api/menu/${userName}`)
}
