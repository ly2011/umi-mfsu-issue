export default {
  state: {
    user: {
      name: '哆啦A梦',
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    }
  },
  subscriptions: {
    setup () {}
  },
  reducers: {
    setUser (state, { payload }) {
      return {
        ...state,
        user: payload
      }
    }
  },
  effects: {
    *login () {},
    *logout () {}
  }
}
