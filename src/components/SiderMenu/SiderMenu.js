import React, { Suspense, lazy, useState, useEffect } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'
import PageLoading from '../PageLoading'
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'
import styles from './index.less'

const { Sider } = Layout

const BaseMenu = lazy(() => import('./BaseMenu'))
const SiderMenu = props => {
  const { menu = [], collapsed, onCollapse, fixSiderbar = false, theme } = props
  const [openKeys, setOpenKeys] = useState(getDefaultCollapsedSubMenus(props))
  const defaultProps = collapsed ? {} : { openKeys }
  const sliderClassName = classNames(styles.sider, {
    [styles.fixSiderbar]: fixSiderbar,
    [styles.light]: theme === 'light'
  })

  useEffect(() => {
    setOpenKeys(getDefaultCollapsedSubMenus(props))
  }, [props])

  const isMainMenu = key =>
    menu.some(item => {
      if (key) {
        return item.key === key || item.path === key || item.url === key
      }
      return false
    })

  // eslint-disable-next-line no-shadow
  const handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1
    setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys])
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      onCollapse={onCollapse}
      // width={256}
      theme={theme}
      className={sliderClassName}
    >
      {/* <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="logo" />
          <h1>SuperMan</h1>
        </Link>
      </div> */}
      <Suspense fallback={<PageLoading />}>
        <BaseMenu
          {...props}
          {...defaultProps}
          mode="inline"
          handleOpenChange={handleOpenChange}
          onOpenChange={handleOpenChange}
          style={{ padding: '0', width: '100%' }}
        />
      </Suspense>
    </Sider>
  )
}

export default SiderMenu
