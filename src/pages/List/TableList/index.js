import React, { useState, useRef } from 'react'
import { Divider, Menu, message, Button, Dropdown } from 'antd'
import { DownOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable from '@ant-design/pro-table'
import PageHeaderWrapper from 'components/PageHeaderWrapper'
import CreateForm from './components/CreateForm'
import UpdateForm from './components/UpdateForm'
import { queryRule, updateRule, addRule, removeRule } from './service'

/**
 * 添加节点
 * @param {Object} fields
 */
const handleAdd = async fields => {
  const hide = message.loading('正在添加')
  try {
    await addRule({
      desc: fields.desc
    })
    hide()
    message.success('添加成功')
    return true
  } catch (error) {
    hide()
    message.error('添加失败请重试！')
    return false
  }
}

/**
 * 更新节点
 * @param {Object} fields
 */
const handleUpdate = async fields => {
  const hide = message.loading('正在配置')
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key
    })
    hide()
    message.success('配置成功')
    return true
  } catch (error) {
    hide()
    message.error('配置失败，请重试！')
    return false
  }
}

const handleRemove = async selectedRows => {
  const hide = message.loading()
  if (!selectedRows) return true
  try {
    await removeRule({
      key: selectedRows.map(row => row.key)
    })
    hide()
    message.success('删除成功，即将刷新')
    return true
  } catch (error) {
    hide()
    message.error('删除失败，请重试')
    return false
  }
}

const TableList = ({ location }) => {
  const [createModalVisible, handleModalVisible] = useState(false)
  const [updateModalVisible, handleUpdateModalVisible] = useState(false)
  const [stepFormValues, setStepFormValues] = useState({})
  const actionRef = useRef()

  const columns = [
    {
      title: '规则名称',
      dataIndex: 'name',
      width: 100,
      ellipsis: true // TODO: 3.24.0这个antd-table已支持
    },
    {
      title: '描述',
      dataIndex: 'desc',
      width: 100,
      ellipsis: true // TODO: 3.24.0这个antd-table已支持
    },
    {
      title: '服务调用次数',
      dataIndex: 'callNo',
      sorter: true,
      width: 100,
      render: val => `${val} 万`
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '运行中', status: 'Processing' },
        2: { text: '已上线', status: 'Success' },
        3: { text: '异常', status: 'Error' }
      }
    },
    {
      title: '上次调度时间',
      dataIndex: 'updatedAt',
      sorter: true,
      width: 100,
      valueType: 'dateTime'
    },
    {
      title: '操作',
      width: 100,
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              handleUpdateModalVisible(true)
              setStepFormValues(record)
            }}
          >
            配置
          </Button>
          <Divider type="vertical" />
          <Button type="link" className="text-link">
            订阅警报
          </Button>
        </>
      )
    }
  ]

  return (
    <PageHeaderWrapper title="查询表格" location={location}>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async e => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows)
                      action.reload()
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          )
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>服务调用次数总计 {selectedRows.reduce((prev, item) => prev + item.callNo, 0)} 万</span>
          </div>
        )}
        request={async params => {
          const { data } = await queryRule(params)
          console.log('result: ', data)
          return data
        }}
        columns={columns}
        rowSelection={{}}
      />
      <CreateForm
        onSubmit={async value => {
          const success = await handleAdd(value)
          if (success) {
            handleModalVisible(false)
            if (actionRef.current) {
              actionRef.current.reload()
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await handleUpdate(value)
            if (success) {
              handleUpdateModalVisible(false)
              if (actionRef.current) {
                actionRef.current.reload()
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false)
            setStepFormValues({})
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  )
}

export default TableList
