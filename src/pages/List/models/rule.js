import { queryRule, removeRule, addRule, updateRule } from '../services/api'

export default {
  namespace: 'rule',
  state: {
    data: {
      list: [],
      pagination: {}
    }
  },
  reducers: {
    save (state, { payload }) {
      return {
        ...state,
        data: payload
      }
    }
  },
  effects: {
    *fetch ({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(queryRule, payload)
        yield put({
          type: 'save',
          payload: data
        })
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    },
    *add ({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(addRule, payload)
        yield put({
          type: 'save',
          payload: data
        })
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    },
    *remove ({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(removeRule, payload)
        yield put({
          type: 'save',
          payload: data
        })
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    },
    *update ({ payload, callback }, { call, put }) {
      try {
        const { data } = yield call(updateRule, payload)
        yield put({
          type: 'save',
          payload: data
        })
        callback && callback(null)
      } catch (error) {
        callback && callback(error)
      }
    }
  }
}
