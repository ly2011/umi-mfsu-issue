import { useState, useCallback } from 'react'

/**
 * @example
 * import useModal from './useModal'
 * import { Modal, Input, Button, Form, message } from 'antd'
 *
 * export default props => {
 *  const [form] = Form.useForm()
 *  const [modalProps,show, close] = useModal({
 *    defaultVisible: false
 *  })
 *  const onSubmit = async () => {
 *    try {
 *      const values = await form.validateFields()
 *      await new Promise(r => setTimeout(r, 1000))
 *      form.resetFields()
 *      message.success('提交成功')
 *      close()
 *    } catch (err) {
 *      console.log(err)
 *    }
 *  }
 *  return (
 *    <div>
 *      <Modal {...modalProps} title="useModal" okText="submit" onOk={onSubmit} width={600}>
 *        <Form layout="inline" form={form}>
 *          <Form.Item label="Username" name="username" rules={[{required: true, message: 'Please input username'}]}>
 *            <Input placement="Username" />
 *          </Form.Item>
 *          <Form.Item label="Email" name="email" rules={[{required: true, message: 'Please input email', type: 'email'}]}>
 *            <Input placement="Email" />
 *          </Form.Item>
 *        </Form>
 *      </Modal>
 *      <Button onClick={show}>show</Button>
 *    </div>
 *  )
 * }
 */

/**
 * 获取Modal的通用属性
 * @param {Object} config {defaultVisible: boolean}
 * @return {Object} result {modalProps: antd Modal 组件的props，作为Modal组件的props即可, show: 打开弹窗, close: 关闭弹窗, visible: 弹框当前显隐状态}
 */
const useModal = config => {
  const modalConfig = config || {}
  const { defaultVisible = false } = modalConfig

  const [visible, setVisible] = useState(defaultVisible)
  const show = useCallback(() => setVisible(true), [visible])
  const close = useCallback(() => setVisible(false), [visible])

  const modalProps = {
    visible,
    onCancel: close
  }

  return {
    visible,
    show,
    close,
    modalProps
  }
}

export default useModal
