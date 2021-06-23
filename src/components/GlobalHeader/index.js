import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Link } from 'umi'
import debounce from 'lodash/debounce'
import { useUnmount } from 'react-use'
import RightContent from './RightContent'
import styles from './index.less'

const GlobalHeader = props => {
  const { collapsed, onCollapse, logo } = props
  const triggerResizeEvent = debounce(() => {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  })
  useUnmount(() => {
    triggerResizeEvent.cancel()
  })
  const toggle = () => {
    onCollapse && onCollapse(!collapsed)
    triggerResizeEvent()
  }

  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo} key="logo">
        <img src={logo} alt="logo" width="32" />
      </Link>
      <span className={styles.trigger} onClick={toggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </span>
      <RightContent {...props} />
    </div>
  )
}

export default GlobalHeader
