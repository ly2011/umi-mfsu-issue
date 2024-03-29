import React from 'react'
import { Modal, Form, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 5
  },
  wrapperCol: {
    span: 15
  }
}
const CreateForm = props => {
  const [form] = Form.useForm()
  const { modalVisible, onSubmit: handleAdd, onCancel } = props

  const okHandle = async () => {
    const fieldsValue = await form.validateFields()
    form.resetFields()
    handleAdd(fieldsValue)
  }

  return (
    <Modal destroyOnClose title="新建规则" visible={modalVisible} onOk={okHandle} onCancel={() => onCancel()}>
      <Form form={form}>
        <FormItem {...formItemLayout} label="描述" name="desc" rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}>
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default CreateForm
