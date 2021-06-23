// UI组件层
import React from 'react'
import { Form, Col } from 'antd'
import styled from 'styled-components'
import styles from './index.less'

const totalSpan = 24

const FormItem = Form.Item

const generateColItemGrid = column => {
  const xs = 24
  const sm = column === 1 ? 24 : 12
  const md = 8
  const lg = totalSpan / column || 6
  const xl = totalSpan / column || 4
  const xxl = totalSpan / column || 4
  return {
    xs,
    sm,
    md,
    lg,
    xl,
    xxl
  }
}

const FormItemComp = styled(FormItem)`
  display: flex;
  > div:first-of-type {
    /* flex: none; */
    width: ${props => (props.labelWidth ? props.labelWidth : '100px')};
  }
  > div:nth-of-type(2) {
    /* flex: 1; */
    width: calc(100% - ${props => (props.labelWidth ? props.labelWidth : '100px')});
  }
`

// Layout也可以用自己的UI组件
const Layout = ({ config, visible = true }) => {
  const { name, column, itemOptions, children, ...argv } = config
  const colGrid = generateColItemGrid(column)
  return (
    <Col {...colGrid} className={styles['query-form-col']} style={{ display: visible ? 'block' : 'none' }}>
      {/* <Form.Item className={styles['query-form-form-item']} name={name} {...argv} {...itemOptions}>
        {children}
      </Form.Item> */}
      <FormItemComp className={styles['query-form-form-item']} name={name} {...argv} {...itemOptions}>
        {children}
      </FormItemComp>
    </Col>
  )
}

const hidden = isHidden => {
  const type = typeof isHidden
  if (type === 'function') return isHidden()
  return type === undefined || isHidden
  // return (type === 'function' && isHidden()) || type === undefined || isHidden
}

const ItemLayout = props => {
  const { config } = props
  return hidden(config.isHidden) ? null : <Layout {...config} {...props} />
}

export default ItemLayout
