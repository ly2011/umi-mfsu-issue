import store from 'store2'

export default {
  state: {
    currLocale: store.get('locale') || 'zh_CN',
    localeLoad: false,
    collapsed: false,
    notices: [],
    lastUrl: '' // 上一个页面的路由(为了清除缓存)
  },
  subscriptions: {
    setup () {}
  },
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *changeLocale ({ payload }, { put }) {
      // const params = {
      //   currentLocale: payload,
      // }
      yield put({
        type: 'save',
        payload: {
          currLocale: payload,
          localeLoad: true
        }
      })
      store.set('locale', payload)
    },
    *changeLayoutCollapsed ({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          collapsed: payload
        }
      })
    },
    *changeLastUrl ({ payload }, { put }) {
      // console.log('changeLastUrl - payload: ', payload)
      yield put({
        type: 'save',
        payload: {
          lastUrl: payload
        }
      })
    }
  }
}
