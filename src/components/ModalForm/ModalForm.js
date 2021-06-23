import React from 'react'
import { Drawer, Button } from 'antd'
// import isFunction from 'lodash/isFunction'
import Modal from '../Modal'
import styles from './index.less'

export function convertLegacyProps (type) {
  if (type === 'danger') {
    return { danger: true }
  }
  return { type }
}

const ModalForm = props => {
  const { modal, visible, isDrawer, children } = props
  const { props: modalProps = {} } = modal

  const { title, width = isDrawer ? 550 : undefined, footer, ...formProps } = modalProps

  // const { submit, submitButtonProps, backButtonProps } = formProps

  const ModalClass = isDrawer ? Drawer : Modal

  const renderFooter = () => {
    const { okText = '确定', okType = 'primary', cancelText = '取消', confirmLoading, okButtonProps, cancelButtonProps } = modalProps
    return (
      <>
        <Button onClick={modal.close} {...cancelButtonProps}>{cancelText}</Button>
        <Button {...convertLegacyProps(okType)} loading={confirmLoading} onClick={modal.close} {...okButtonProps}>{okText}</Button>
      </>
    )
  }

  const defaultFooter = (<>{renderFooter()}</>)

  const modalFooter = footer === undefined ? defaultFooter : footer

  return (
    <ModalClass title={title} width={width} visible={visible} className={styles['modal-form']} {...formProps} {
      ...{
        [isDrawer ? 'onClose' : 'onCancel']: () => {
          modal.close()
        }
      }
    }
      footer={modalFooter}
    >
      {children}
    </ModalClass >
  )
}
export default ModalForm
