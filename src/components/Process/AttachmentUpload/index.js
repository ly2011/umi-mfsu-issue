import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Modal, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
class AttachmentUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: ''
  }

  // 后缀名列表
  getExtensionList = () => {
    const { extensions } = this.props
    if (!extensions) return []
    if (typeof extensions === 'string') return extensions.split(',')
    if (Array.isArray(extensions)) return extensions
    return []
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = ({ file, fileList }) => {
    console.log('文件上传: ', file)
    const { onChange } = this.props
    const successStatus = ['uploading', 'done', 'removed']
    // fix: 上传失败了，也出现在文件列表中了
    const innerFileList = fileList.filter(item => item.status && successStatus.includes(item.status))
    if (onChange) {
      onChange([...innerFileList])
    }
  }

  handleRemove = file => {
    const { value, onChange } = this.props
    // const files = value.filter(v => v.url !== file.url)
    const files = value.filter(v => v.uid !== file.uid)
    if (onChange) {
      onChange(files)
    }
  }

  beforeUpload = file => {
    const { size, limit, value } = this.props
    const extensionList = this.getExtensionList()
    // eslint-disable-next-line no-shadow
    const checkExtension = file =>
      !extensionList.length ||
      extensionList.includes(
        file.name
          .toLowerCase()
          .split('.')
          .pop()
      )
    // eslint-disable-next-line no-shadow
    const checkSize = file => file.size <= size * 1024 * 1024
    const checkCount = () => value.length < limit
    if (!checkExtension(file)) {
      // 1.类型校验
      message.error(`仅允许上传后缀名为${extensionList.join(',')}的文件，请检查上传文件格式`)
    } else if (!checkSize(file)) {
      // 2.大小校验
      message.error(`${file.name}文件大小超出限制`)
    } else if (!checkCount()) {
      message.error(`文件数量不能多于${limit}`)
    }
    return checkExtension(file) && checkSize(file) && checkCount()
  }

  uploadButton = () => {
    const { disabled, children } = this.props
    return (
      children || (
        <Button disabled={disabled}>
          <UploadOutlined /> Upload
        </Button>
      )
    )
  }

  render () {
    const { value, children, ...restProp } = this.props
    const { previewImage, previewVisible } = this.state

    return (
      <div className="clearfix">
        <Upload
          {...restProp}
          fileList={value}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {this.uploadButton()}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="attachment" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

AttachmentUpload.propTypes = {
  action: PropTypes.string,
  extensions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  size: PropTypes.number, // 文件大小
  limit: PropTypes.number // 最大数量限制
}
AttachmentUpload.defaultProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  extensions: 'pdf,doc,docx,xls,xlsx,jpg,png,jpeg,zip,rar',
  size: 20,
  limit: 1
}
export default AttachmentUpload
