// 高度配置化的查询方法
import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import ItemLayout from './ItemLayout'

import styles from './index.less'

const SearchForm = props => {
  const {
    name = 'queryForm',
    initialValues,
    searchConfig,
    // formItemLayout,
    gutter,
    showOperate,
    showToggle,
    hideRequiredMark,
    labelAlign,
    layout,
    colon,
    size,
    column,
    autoResetForm,
    pageIndexField,
    autoResetPageIndex,
    onExpand,
    onReset: onResetProp,
    onFinish: onFinishProp,
    onFinishFailed: onFinishFailedProp,
    beforeFinish: beforeFinishProp
  } = props
  const [form] = Form.useForm()
  // 收起状态(默认收起)
  const [collapse, setCollapse] = useState(props.collapse !== undefined ? props.collapse : true)
  const formRef = useRef()
  const formWrapRef = useRef()

  const onFinish = async values => {
    if (autoResetPageIndex) values[pageIndexField] = 1
    beforeFinishProp && (values = await Promise.resolve(beforeFinishProp(values)))
    onFinishProp && onFinishProp(values)
  }

  const onFinishFailed = errorInfo => {
    onFinishFailedProp && onFinishFailedProp(errorInfo)
  }

  const onReset = () => {
    autoResetForm && form.resetFields()
    onResetProp && onResetProp()
  }

  const onToggle = () => {
    setCollapse(!collapse)
    onExpand && onExpand(!collapse)
  }

  return (
    <div ref={formWrapRef} className="search-form">
      <Form
        className={styles['query-form']}
        hideRequiredMark={hideRequiredMark}
        labelAlign={labelAlign}
        layout={layout}
        colon={colon}
        ref={formRef}
        scrollToFirstError
        form={form}
        name={name}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row type="flex" gutter={gutter}>
          {searchConfig(props).map((item, i) => (
            <ItemLayout config={{ size, column, ...item }} form={form} key={i} visible={!collapse} />
          ))}
        </Row>

        {showOperate && (
          <Row>
            <Col span={24}>
              <span className={styles['submit-buttons']}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={onReset}>
                  重置
                </Button>
                {showToggle && (
                  <Button type="link" style={{ marginLeft: 8 }} onClick={onToggle}>
                    {collapse ? '展开' : '折叠'}
                    {collapse ? <DownOutlined style={{ marginLeft: 3 }} /> : <UpOutlined style={{ marginLeft: 3 }} />}
                  </Button>
                )}
              </span>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  )
}

SearchForm.propTypes = {
  hideRequiredMark: PropTypes.bool,
  labelAlign: PropTypes.oneOf(['left', 'right']),
  colon: PropTypes.bool,
  searchConfig: PropTypes.func.isRequired,
  showOperate: PropTypes.bool,
  showToggle: PropTypes.bool,
  // formItemLayout: PropTypes.object,
  gutter: PropTypes.number,
  // loading: PropTypes.bool,
  // maxVisibleFieldCount: PropTypes.number,
  autoResetForm: PropTypes.bool,
  // autoLayout: PropTypes.bool, // 自动适应布局
  pageIndexField: PropTypes.string,
  autoResetPageIndex: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'default', 'large']),
  column: PropTypes.oneOf([8, 6, 4, 3, 2, 1]) // 一行展示多少个
}
SearchForm.defaultProps = {
  hideRequiredMark: false,
  labelAlign: 'right',
  colon: true,
  showOperate: true,
  showToggle: true,
  // formItemLayout: defaultFormItemLayout,
  gutter: 0,
  // loading: false,
  // maxVisibleFieldCount: 0,
  autoResetForm: true,
  // autoLayout: true,
  pageIndexField: 'pageNum',
  autoResetPageIndex: true,
  size: 'small',
  column: 4
}

export default SearchForm
