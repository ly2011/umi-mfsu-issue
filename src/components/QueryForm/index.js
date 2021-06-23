/* import React, { useState, useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import { Form, Row, Col, Button, Icon } from 'antd'
import styles from './index.less'

const QueryForm = props => {
  const {
    isShowOperate = true,
    isDefaultCollapse = false,
    isDefaultShowToggle = true,
    form,
    beforeSubmit,
    onSubmit,
    onReset,
    onExpand,
    renderSearchForm
  } = props
  const [showToggle, setShowToggle] = useState(isDefaultShowToggle)
  const [collapse, setCollapse] = useState(isDefaultCollapse) // 是否展开
  const [totalSpan] = useState(24) // 每行总共占的栅格列数
  const [span, setSpan] = useState(8) // 栅格占据的列数
  const [col, setCol] = useState(3) // 每行显示个数
  const formRef = useRef(null)

  const getChildren = () => (renderSearchForm ? renderSearchForm(form) : [])

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, fieldsValue) => {
      if (err) return
      let values = { ...fieldsValue }
      beforeSubmit && (values = beforeSubmit(fieldsValue))
      onSubmit && onSubmit(values)
    })
  }
  const handleReset = () => {
    form.resetFields()
    onReset && onReset()
  }

  const toggle = () => {
    setCollapse(!collapse)
    onExpand && onExpand(!collapse)
  }
  const addResizeListener = (formEl, formItemEls) => {
    // 监听宽口变化事件，且避免事件覆盖
    window.onresize = () => {
      // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
      resetLayout(formEl, formItemEls)
    }
  }
  const getElBoxProperty = (el, property) => {
    if (!el) return 0
    return +el.getBoundingClientRect()[property]
  }
  const resetLayout = (formEl, formItemEls) => {
    const formWidth = getElBoxProperty(formEl, 'width')
    let innerCol = 0
    if (formWidth > 1100) {
      innerCol = 4
    } else if (formWidth > 800) {
      innerCol = 3
    } else if (formWidth > 600) {
      innerCol = 2
    } else {
      innerCol = 1
    }
    Array.isArray(formItemEls) && setShowToggle(formItemEls.length > innerCol)
    setSpan(totalSpan / innerCol)
    setCol(innerCol)
  }
  const initLayout = () => {
    if (!formRef.current) return
    // const formEl = formRef.current;
    // eslint-disable-next-line react/no-find-dom-node
    const formEl = findDOMNode(formRef.current)
    // const formItemEls = React.Children.map(children, child => child);
    const formItemEls = getChildren()
    resetLayout(formEl, formItemEls)
    addResizeListener(formEl, formItemEls)
  }
  const renderFormItem = () => {
    const children = getChildren()
    const len = children.length
    const lineNum = len % col === 0 ? len / col : Math.ceil(len / col)
    const columns = []
    for (let i = 0; i < lineNum; i++) {
      const tmpChildren = children.slice(i * col, i * col + col)
      const tmpColumns = tmpChildren.map((child, idx) => (
        <Col key={`${i}_${idx}`} span={span}>
          {child}
        </Col>
      ))
      columns.push(
        <Row key={i} gutter={24} style={{ display: collapse && i > 0 ? 'none' : 'block' }}>
          {tmpColumns}
        </Row>
      )
    }

    return columns
  }
  useEffect(() => {
    initLayout()
  }, [])
  return (
    <Form className={styles.queryForm} ref={formRef} onSubmit={handleSubmit}>
      {renderFormItem()}
      {isShowOperate && (
        <Row>
          <Col span={24}>
            <span className={styles['submit-buttons']}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={handleReset}>
                重置
              </Button>
              {showToggle && (
                <Button type="link" style={{ marginLeft: 8 }} onClick={toggle}>
                  {collapse ? '展开' : '收起'}
                  <Icon style={{ marginLeft: 3 }} type={collapse ? 'down' : 'up'} />
                </Button>
              )}
            </span>
          </Col>
        </Row>
      )}
    </Form>
  )
}

export default Form.create()(QueryForm) */

import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { Form, Row, Col, Button, Icon } from 'antd'
import styles from './index.less'

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

class QueryForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapse: false, // 展开状态
      totalSpan: 24, // 每行总共占的栅格列数
      span: 8, // 栅格占据的列数
      col: 3 // 每行显示个数
    }
    this.formRef = createRef()
  }

  componentDidMount () {
    this.initLayout()
  }

  onSearch = e => {
    const { form, beforeSubmit, onSubmit } = this.props
    e.preventDefault()
    form.validateFields((err, fieldsValue) => {
      if (err) return
      let values = { ...fieldsValue }
      beforeSubmit && (values = beforeSubmit(fieldsValue))
      onSubmit && onSubmit(values)
    })
  }

  onReset = () => {
    const { form, onReset, autoResetForm } = this.props
    autoResetForm && form.resetFields()
    onReset && onReset()
  }

  onToggle = () => {
    const { onExpand } = this.props
    const { collapse } = this.state
    this.setState({
      collapse: !collapse
    })
    onExpand && onExpand(!collapse)
  }

  addResizeListener = (formEl, formItemEls) => {
    // 监听宽口变化事件，且避免事件覆盖
    window.onresize = () => {
      // eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
      this.resetLayout(formEl, formItemEls)
    }
  }

  getElBoxProperty = (el, property) => {
    if (!el) return 0
    return +el.getBoundingClientRect()[property]
  }

  resetLayout = (formEl, formItemEls) => {
    const formWidth = this.getElBoxProperty(formEl, 'width')
    const { totalSpan } = this.state
    let innerCol = 0
    if (formWidth > 1100) {
      innerCol = 4
    } else if (formWidth > 800) {
      innerCol = 3
    } else if (formWidth > 600) {
      innerCol = 2
    } else {
      innerCol = 1
    }
    this.setState({
      span: totalSpan / innerCol,
      col: innerCol,
      ...(Array.isArray(formItemEls) && { showToggle: formItemEls.length > innerCol })
    })
  }

  initLayout = () => {
    const { getFields } = this.props
    if (!this.formRef.current) return
    // const formEl = formRef.current;
    // eslint-disable-next-line react/no-find-dom-node
    const formEl = findDOMNode(this.formRef.current)
    // const formItemEls = React.Children.map(children, child => child);
    const formItemEls = getFields() || []
    this.resetLayout(formEl, formItemEls)
    this.addResizeListener(formEl, formItemEls)
  }

  renderFormItem = form => {
    const { getFields, maxVisibleFieldCount } = this.props
    const { collapse, span, col } = this.state
    const children = getFields(form) || []
    const len = children.length
    const count = collapse ? maxVisibleFieldCount : len
    const lineNum = len % col === 0 ? len / col : Math.ceil(len / col)
    const columns = []
    for (let i = 0; i < lineNum; i++) {
      const tmpChildren = children.slice(i * col, i * col + col)
      const tmpColumns = tmpChildren.map((child, idx) => (
        <Col key={`${i}_${idx}`} span={span} style={{ display: i * col >= count ? 'none' : 'block', color: 'red' }}>
          {child}
        </Col>
      ))
      columns.push(
        <Row key={i} gutter={24}>
          {tmpColumns}
        </Row>
      )
    }

    return columns
  }

  render () {
    const { form, formItemLayout, showOperate, showToggle } = this.props
    const { collapse } = this.state
    return (
      <Form {...formItemLayout} ref={this.formRef} className={styles.queryForm} onSubmit={this.onSearch}>
        {this.renderFormItem(form)}
        {showOperate && (
          <Row>
            <Col span={24}>
              <span className={styles['submit-buttons']}>
                <Button type="primary" onClick={this.onSearch}>
                  搜索
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.onReset}>
                  重置
                </Button>
                {showToggle && (
                  <Button type="link" style={{ marginLeft: 8 }} onClick={this.onToggle}>
                    {collapse ? '展开' : '收起'}
                    <Icon style={{ marginLeft: 3 }} type={collapse ? 'down' : 'up'} />
                  </Button>
                )}
              </span>
            </Col>
          </Row>
        )}
      </Form>
    )
  }
}

QueryForm.propTypes = {
  showOperate: PropTypes.bool,
  showToggle: PropTypes.bool,
  getFields: PropTypes.func,
  formItemLayout: PropTypes.object,
  loading: PropTypes.bool,
  maxVisibleFieldCount: PropTypes.number,
  autoResetForm: PropTypes.bool
}
QueryForm.defaultProps = {
  showOperate: true,
  showToggle: true,
  getFields: () => null,
  formItemLayout: defaultFormItemLayout,
  loading: false,
  maxVisibleFieldCount: 0,
  autoResetForm: true
}

export default Form.create()(QueryForm)
