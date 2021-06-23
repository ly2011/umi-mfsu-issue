import React, { Component } from 'react'
import { Table } from 'antd'
import equal from 'fast-deep-equal'
import ResizeableTitle from './ResizeableTitle'
import styles from './index.less'

// TODO: 若父组件的columns是动态改变的，这样会有问题
class ResizableTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: props.columns,
      lastColumns: props.columns
    }
  }

  components = Object.assign(
    {},
    {
      header: {
        cell: ResizeableTitle
      }
    },
    this.props.components || {},
  )

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!equal(nextProps.columns, prevState.lastColumns)) {
      // console.log('我改变了...', nextProps.columns, prevState.lastColumns)
      return {
        columns: nextProps.columns,
        lastColumns: nextProps.columns
      }
    }
    // 不更新state
    return null
  }

  handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      }
      return { columns: nextColumns }
    })
  }

  render () {
    const { columns: oColumns, components: oComponents, ...restProps } = this.props
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index)
      })
    }))

    return (
      <Table
        className={styles['resizable-table-wrapper']}
        bordered
        components={this.components}
        {...restProps}
        columns={columns}
      />
    )
  }
}

export default ResizableTable
