import React, { Component } from 'react'
import DragM from 'dragm'

class DragTitle extends Component {
  updateTransform = transformStr => {
    if (!this.modalDom) return
    this.modalDom.style.transform = transformStr
  }

  componentDidMount () {
    const { modalWrapSelector } = this.props
    // eslint-disable-next-line prefer-destructuring
    this.modalDom = document.querySelector(
      modalWrapSelector // modal的class是ant-modal
    )
  }

  render () {
    const { title } = this.props
    return (
      <DragM updateTransform={this.updateTransform}>
        <div>{title}</div>
      </DragM>
    )
  }
}

export default DragTitle
