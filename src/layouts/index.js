import React, { useEffect } from 'react'
import { connect } from 'dva'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import BlankLayout from './BlankLayout'
import BasicLayout from './BasicLayout'

moment.locale('zh-cn')

const globalComponentConfig = {
  // autoInsertSpaceInButton: false,
  // componentSize: 'small',
  locale: zhCN
  // getPopupContainer: node => {
  //   if (node) {
  //     return node.parentNode
  //   }
  //   return document.body
  // }
}
function IndexLayout (props) {
  const {
    dispatch,
    location: { pathname }
  } = props

  /* eslint-disable */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'auth/getMenu'
      })
    }
  }, [])
  /* eslint-enable */

  /* eslint-disable */
  useEffect(() => {
    return () => {
      if (dispatch) {
        dispatch({
          type: 'global/changeLastUrl',
          payload: pathname
        })
      }
    }
  }, [pathname])
  /* eslint-enable */

  if (pathname === '/login') {
    return BlankLayout
  }
  return (
    <ConfigProvider {...globalComponentConfig}>
      <BasicLayout {...props} />
    </ConfigProvider>
  )
}

export default connect()(IndexLayout)
