import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import ResizableTable from '../ResizableTable'
import styles from './index.less'

const emptyArr = []
const QueryTable = props => {
  const {
    columns: oldColumns = emptyArr,
    rowKey,
    selectedRows = emptyArr,
    onSelectRow,
    onChange,
    resizable = true,
    showIndex = false,
    customizedIndex,
    rowSelection: rowSelectionProps,
    dataSource = emptyArr,
    pagination,
    size,
    disabled: listDisabled,
    bordered,
    disableSelectRow = false, // 禁止行选择触发勾选
    scroll: scrollProps,
    ...restProps
  } = props

  const tableRowKey = rowKey || 'id'
  const columns = [...oldColumns]
  if (showIndex) {
    // 只有不是可编辑table组件才默认显示索引
    // 显示索引

    columns.unshift({
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      width: (customizedIndex && customizedIndex.width) || 80,
      // render: (text, record, index) => `${index + 1}`
      render: (text, record, index) => {
        if (customizedIndex && customizedIndex.successiveIndex && pagination) {
          return `${pagination.pageSize * (pagination.current - 1) + index + 1}`
        }
        return `${index + 1}`
      }
    })
  }
  const paginationProps =
    pagination === false
      ? pagination
      : {
          showSizeChanger: true,
          showQuickJumper: true,
          size: 'small',
          pageSizeOptions: ['10', '15', '20', '30', '40'],
          showTotal: total => `总共 ${total} 条数据`,
          ...pagination
        }
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  /* eslint-disable */
  // 当父组件清空 selectedRows ,也清空 selectedRowKeys
  useEffect(() => {
    // clean state
    if (Array.isArray(selectedRows) && selectedRows.length === 0) {
      setSelectedRowKeys([])
    } else if (Array.isArray(selectedRows)) {
      let oldSelectedRowKeys = []
      if (typeof rowKey === 'function') {
        oldSelectedRowKeys = selectedRows.map(rowKey)
      } else {
        // eslint-disable-next-line
        oldSelectedRowKeys = selectedRows.map(item => item[tableRowKey])
      }

      // eslint-disable-next-line
      // console.log('oldSelectedRowKeys: ', rowKey, oldSelectedRowKeys, selectedRowKeys)
      setSelectedRowKeys(oldSelectedRowKeys)
    }
  }, [selectedRows, rowKey])
  /* eslint-enable */

  const components = props.components || undefined

  const tableColumns = columns
  // eslint-disable-next-line no-shadow
  const handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    onSelectRow && onSelectRow(selectedRows)
    setSelectedRowKeys(selectedRowKeys)
  }
  // eslint-disable-next-line no-shadow
  const handleTableChange = (pagination, filters, sorter) => {
    onChange && onChange(pagination, filters, sorter)
  }

  // fix: 解决rowSelection表格行是否可选
  const rowSelection =
    rowSelectionProps === null
      ? rowSelectionProps
      : Object.assign({}, rowSelectionProps || {}, {
          columnWidth: '40px',
          selectedRowKeys, // 建议设置rowKey,否则默认取rowKey = index，selectedRowKeys取record[rowKey]的值
          onChange: handleRowSelectChange,
          getCheckboxProps: record => ({
            disabled: listDisabled || record.disabled
          })
        })

  const scroll = scrollProps === false ? undefined : { ...scrollProps }

  const tableProps = {
    style: { pointerEvents: listDisabled ? 'none' : null },
    bordered: bordered !== false,
    rowKey: tableRowKey,
    size,
    rowSelection,
    scroll,
    components,
    columns: tableColumns,
    dataSource,
    pagination: paginationProps,
    onChange: handleTableChange,
    onSelectRow,
    onRow: record => ({
      ...(!(rowSelection && rowSelection.type === 'radio')
        ? {
            onClick: () => {
              if (listDisabled || record.disabled) return
              if (disableSelectRow) return
              // fix: 解决多个复选框，点击任何一行都选中
              const curKey = record[tableRowKey]
              const selected = !selectedRowKeys.includes(curKey)
              const nextSelectRow = selected ? [...selectedRows, record] : selectedRows.filter(row => row[tableRowKey] !== curKey)
              // const nextSelectedRowKeys = selected ? [...selectedRowKeys, key] : selectedRowKeys.filter(ikey => ikey !== key)
              // console.log('onRow selectedRowKeys: ', nextSelectRow)
              onSelectRow && onSelectRow(nextSelectRow)
            }
          }
        : {
            onClick: () => {
              if (listDisabled || record.disabled) return
              if (disableSelectRow) return
              onSelectRow && onSelectRow([record])
            }
          })
    }),
    ...restProps
  }

  return <div className={styles.queryTable}>{resizable ? <ResizableTable {...tableProps} /> : <Table {...tableProps} />}</div>
}

export default React.memo(QueryTable)
