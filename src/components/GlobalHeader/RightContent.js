import React from 'react'
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons'
import { Spin, Menu, Avatar } from 'antd'
import HeaderDropdown from '../HeaderDropdown'
import SelectLang from '../SelectLang'
import styles from './index.less'

const GlobalHeaderRight = props => {
  const { user, theme = 'light', logo, onMenuClick } = props

  const menuRender = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key="userCenter">
        <UserOutlined />
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item key="userInfo">
        <SettingOutlined />
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  )

  let className = styles.right
  if (theme === 'dark') {
    className = `${styles.right} ${styles.dark}`
  }
  return (
    <div className={className}>
      {user && user.name ? (
        <HeaderDropdown overlay={menuRender}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="small" src={user.avatar || logo} className={styles.avatar} alt="avatar" />
            <span className={styles.name}>{user.name}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }}></Spin>
      )}
      <SelectLang className={styles.action} />
    </div>
  )
}

export default GlobalHeaderRight
