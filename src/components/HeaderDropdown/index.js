import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'
import styles from './index.less'

const HeaderDropdown = props => {
  const { overlayClassName, ...otherProps } = props

  return (
    <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...otherProps} />
  )
}

export default HeaderDropdown
