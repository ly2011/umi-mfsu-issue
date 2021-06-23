import memoizeOne from 'memoize-one'
import isEqual from 'lodash/isEqual'
import { getMenu } from 'services/auth'

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  if (!menuData) {
    return {}
  }
  const routerMap = {}

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children)
      }
      // Reduce memory usage
      routerMap[menuItem.url] = menuItem
    })
  }
  flattenMenuData(menuData)
  return routerMap
}

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual)

export default {
  state: {
    menu: [], // 菜单
    breadcrumbNameMap: {} // 面包屑map
  },
  subscriptions: {
    setup () {}
  },
  reducers: {
    setMenu (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *getMenu ({ callback }, { put, call, select }) {
      try {
        const { name } = yield select(state => state.user.user)
        const { data } = yield call(getMenu, name)
        let menu = []
        if (data.code === 0) {
          menu = data.data
        }
        const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menu)
        yield put({
          type: 'setMenu',
          payload: { menu, breadcrumbNameMap }
        })
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    }
  }
}
