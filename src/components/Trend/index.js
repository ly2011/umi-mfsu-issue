import React from 'react'
import PropTypes from 'prop-types'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import styles from './index.less'

const Trend = ({ colorful = true, reverseColor = false, flag, children, className, ...rest }) => {
  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful
    },
    className
  )
  const renderFlag = () => {
    if (flag) {
      return flag === 'up' ? <UpOutlined /> : <DownOutlined />
    }
    return ''
  }
  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          {/* <LegacyIcon type={`caret-${flag}`} /> */}
          {renderFlag()}
        </span>
      )}
    </div>
  )
}
Trend.propTypes = {
  flag: PropTypes.oneOf(['down', 'up'])
}

Trend.defaultProps = {}
export default Trend
