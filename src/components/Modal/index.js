import React, { PureComponent } from 'react'
import { Modal as AntdModal } from 'antd'
import shortid from 'shortid'
import classNames from 'classnames'

import DragTitle from './DragTitle'

class Modal extends PureComponent {
  modalID = `ant-${shortid.generate()}`

  modalWrapSelector = `.ant-modal-wrap.${this.modalID}`

  afterClose = async () => {
    const { afterClose, drag } = this.props
    try {
      if (drag) {
        const modalDom = document.querySelector(this.modalWrapSelector)
        if (!modalDom) return
        modalDom.style.transform = 'translate(0px, 0px)'
      }
      afterClose && (await afterClose())
    } catch (e) {
      console.error('销毁弹框失败')
    }
  }

  render () {
    const { title, drag, children, afterClose, className, ...restProps } = this.props
    const modalClass = classNames(this.modalID, className)
    return (
      <AntdModal
        wrapClassName={modalClass}
        title={drag ? <DragTitle title={title} modalWrapSelector={this.modalWrapSelector} /> : title}
        {...restProps}
        afterClose={this.afterClose}
      >
        {children}
      </AntdModal>
    )
  }
}

Modal.defaultProps = {
  keyboard: false,
  maskClosable: false,
  drag: true
}

export default Modal
