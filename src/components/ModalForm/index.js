import React from 'react'
import InnerModalForm from './ModalForm'

const RefModalForm = ({ type, ...restProps }, ref) => {
  const [resetCount, setResetCount] = React.useState(0)
  const [visible, setVisible] = React.useState(false)
  const modalRef = React.useRef({})
  const modal = modalRef.current

  modal.show = props => new Promise(resolve => {
    setVisible(true)
    setResetCount(resetCount + 1)
    modal.props = props
    modal.close = result => {
      setVisible(false)
      resolve(result)
    }
  })

  React.useImperativeHandle(ref, () => ({
    show: modal.show,
    close: modal.close
  }))

  return React.createElement(InnerModalForm, {
    key: resetCount,
    visible,
    modal,
    isDrawer: type === 'drawer',
    ...restProps
  })
}

const ModalForm = React.forwardRef(RefModalForm)

export default ModalForm
