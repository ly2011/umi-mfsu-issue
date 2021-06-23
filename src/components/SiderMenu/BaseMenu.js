import React from 'react'
import Icon from '@ant-design/icons'
import { Menu } from 'antd'
import classNames from 'classnames'
import { Link } from 'umi'
import { urlToList } from 'utils/pathTools'
import { isUrl } from 'utils/utils'
import IconFont from '../IconFont'
import { getMenuMatches } from './SiderMenuUtils'
import styles from './index.less'

const { SubMenu } = Menu

const BaseMenu = props => {
  const {
    menu = [],
    flatMenuKeys = [],
    location: { pathname },
    isMobile,
    collapsed,
    theme,
    mode,
    style,
    className,
    openKeys,
    handleOpenChange,
    onCollapse
  } = props
  let menuProps = {}
  if (openKeys && !collapsed) {
    menuProps = {
      openKeys: openKeys.length === 0 ? [] : openKeys
    }
  }
  const menuClass = classNames(className)
  const getIcon = icon => {
    if (typeof icon === 'string' && icon !== '') {
      if (isUrl(icon)) {
        return <Icon component={() => <img src={icon} alt="icon" className={styles.icon} />} />
      }
      if (icon.startsWith('icon-')) {
        return <IconFont type={icon} />
      }
    }
    // TODO: 为了兼容 antd@4，我们会在下个版本删除配置 icon: string 生成icon的用法
    // return <LegacyIcon type={icon} />
    return icon
  }
  // const link = url => history.push(url)
  const conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }
  const getMenuItemPath = item => {
    const { name } = item
    const itemPath = conversionPath(item.path || item.url)
    const icon = getIcon(item.icon)
    const { target } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true)
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }
  // Get the currently selected menu
  // eslint-disable-next-line no-shadow
  const getSelectedMenuKeys = pathname => urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())

  const menuRender = (data = []) =>
    data
      .filter(item => item.name)
      .map(item => {
        const { name } = item
        if (item.children && item.children.length > 0) {
          return (
            <SubMenu
              key={item.path || item.url}
              title={
                <span>
                  {item.icon && getIcon(item.icon)}
                  {/* 如果这里name不用span包裹，则会出现缩起来后，menu文本隐藏不了 */}
                  <span>{name}</span>
                </span>
              }
            >
              {menuRender(item.children)}
            </SubMenu>
          )
        }
        return <Menu.Item key={item.path || item.url}>{getMenuItemPath(item)}</Menu.Item>
      })

  let selectedKeys = getSelectedMenuKeys(pathname)
  if ((!selectedKeys || !selectedKeys.length) && openKeys) {
    selectedKeys = [openKeys[openKeys.length - 1]]
  }
  selectedKeys = selectedKeys.filter(item => item) // 过滤首次数组不为undefined的数据

  return (
    <Menu mode={mode} theme={theme} selectedKeys={selectedKeys} onOpenChange={handleOpenChange} style={style} className={menuClass} {...menuProps}>
      {menuRender(menu)}
    </Menu>
  )
}

export default BaseMenu
