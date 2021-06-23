// TODO: 已废弃，使用dva存储，当刷新页面时会导致页面死循环，改为unstated-next
export default {
  state: {
    tags: [],
    activeTagId: ''
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
    *setActiveTag ({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          activeTagId: payload
        }
      })
    },
    *addTag ({ payload }, { select, put }) {
      const tags = yield select(state => state.tabsView.tags)
      const prevTag = tags.find(tag => tag.path === payload.path)
      // console.log('addTag - ', payload.path, prevTag)
      if (!prevTag) tags.push(payload)
      yield put({
        type: 'save',
        payload: {
          tags,
          activeTagId: payload.path
        }
      })
    },
    *removeTag ({ payload }, { select, put }) {
      const tags = yield select(state => state.tabsView.tags)
      let activeTagId = yield select(state => state.tabsView.activeTagId)
      const targetKey = payload
      // 首页不能被关闭
      if (targetKey === tags[0].path) {
        return
      }
      let lastIndex = 0
      tags.forEach((tag, index) => {
        if (tag.path === targetKey) {
          lastIndex = index - 1
        }
      })
      const nextTags = tags.filter(tag => tag.path !== targetKey)
      if (nextTags.length && activeTagId === targetKey) {
        if (lastIndex >= 0) {
          activeTagId = nextTags[lastIndex].path
        } else {
          activeTagId = nextTags[0].path
        }
      }
      yield put({
        type: 'save',
        tags: nextTags,
        activeTagId
      })
    },
    *removeAllTag (_, { select, put }) {
      const tags = yield select(state => state.tabsView.tags)
      yield put({
        type: 'save',
        tags: [tags[0]],
        activeTagId: tags[0].path
      })
    },
    *removeOtherTag (_, { select, put }) {
      const tags = yield select(state => state.tabsView.tags)
      const activeTagId = yield select(state => state.tabsView.activeTagId)
      const activeTag = tags.find(tag => tag.path === activeTagId)
      const activeIsHome = activeTag.path === tags[0].path
      const nextTags = activeIsHome ? [tags[0]] : [tags[0], activeTag]
      yield put({
        tags: nextTags
      })
    }
  }
}
