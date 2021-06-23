import React from 'react'
// import { connect } from 'dva'
import { Menu, Dropdown } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import TabsViewHook from './useTabsView'
import styles from './index.less'

// tabs 菜单选项 key 值
const closeCurrentTabMenuKey = 'closeCurrent'
const closeOthersTabMenuKey = 'closeOthers'
const closeAllTabMenuKey = 'closeAll'
const TabsViewAction = () => {
  const { activeTagId, removeTag, removeAllTag, removeOtherTag } = TabsViewHook.useContainer()
  // const removeTag = () => {
  //   dispatch({
  //     type: 'removeTag',
  //     payload: activeTagId
  //   })
  // }
  // const removeOtherTag = () => {
  //   dispatch({
  //     type: 'removeTag',
  //     payload: activeTagId
  //   })
  // }
  const handleTabsMenuClick = ({ key }) => {
    // dispatch({
    //   type: `tabsView/${key}`,
    //   payload: activeTagId
    // })
    const funcObj = {
      [closeCurrentTabMenuKey]: removeTag,
      [closeOthersTabMenuKey]: removeOtherTag,
      [closeAllTabMenuKey]: removeAllTag
    }
    funcObj[key] && funcObj[key](activeTagId)
  }

  const overlayMenu = (
    <Menu onClick={handleTabsMenuClick}>
      <Menu.Item key={closeCurrentTabMenuKey}>关闭当前标签</Menu.Item>
      <Menu.Item key={closeOthersTabMenuKey}>关闭其他标签</Menu.Item>
      <Menu.Item key={closeAllTabMenuKey}>关闭所有标签</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={overlayMenu}>
      <SettingOutlined className={styles['tabs-views-extra']} />
    </Dropdown>
  )
}

export default TabsViewAction
