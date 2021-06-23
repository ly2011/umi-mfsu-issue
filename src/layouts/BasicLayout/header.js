import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'dva'
import { Layout } from 'antd'
import { history } from 'umi'
import GlobalHeader from 'components/GlobalHeader'
import styles from './index.less'

const { Header } = Layout

const HeaderLayout = props => {
  const { dispatch, collapsed, handleMenuCollapse, isMobile = false, fixedHeader = false } = props
  const [width, setWidth] = useState(0)
  const getHeadWidth = useCallback(() => {
    if (isMobile || !fixedHeader) {
      return '100%'
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)'
  }, [isMobile, fixedHeader, collapsed])
  const handleMenuClick = ({ key }) => {
    const linkObj = {
      userCenter: '/account/center',
      userInfo: '/account/settings/base',
      triggerError: '/exception/trigger'
    }
    if (Object.keys(linkObj).includes(key)) {
      const linkUrl = linkObj[key]
      history.push(linkUrl)
    } else if (key === 'logout') {
      dispatch({
        type: 'login/logout'
      })
    }
  }
  useEffect(() => {
    const innerWidth = getHeadWidth()
    setWidth(innerWidth)
  }, [collapsed, getHeadWidth])

  return (
    <Header style={{ padding: 0, width, zIndex: 2 }} className={fixedHeader ? styles.fixedHeader : ''}>
      <GlobalHeader onCollapse={handleMenuCollapse} onMenuClick={handleMenuClick} {...props} />
    </Header>
  )
}

export default connect(({ user, global }) => ({ user: user.user, collapsed: global.collapsed }))(HeaderLayout)
