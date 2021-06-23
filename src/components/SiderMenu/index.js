import React, { memo } from 'react'
import { Drawer } from 'antd'
import SiderMenu from './SiderMenu'
import { getFlatMenuKeys } from './SiderMenuUtils'

const SiderMenuWrapper = memo(props => {
  const { isMobile, menu, collapsed, onCollapse } = props

  const flatMenuKeys = getFlatMenuKeys(menu)

  const closeDrawer = () => {
    onCollapse(true)
  }

  return isMobile ? (
    <Drawer visible={!collapsed} placement="left" onClose={closeDrawer} style={{ padding: 0, height: '100vh' }}>
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  )
})

export default SiderMenuWrapper
