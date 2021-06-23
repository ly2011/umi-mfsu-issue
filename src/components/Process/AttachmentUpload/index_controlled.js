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
/* eslint-disable react/prefer-stateless-function */
class AttachmentUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [...(this.props.defaultFileList || [])]
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
    // console.log('handlePreview: ', file)
    if (!file.url && !file.preview) {
      // eslint-disable-next-line
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })

    const { onPreview } = this.props
    onPreview && onPreview(file)
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = () => {
    // this.setState({ fileList })
    // console.log('文件改动')
  }

  // https://github.com/ant-design/ant-design/issues/15546
  customRequest = event => {
    const { action, data, onUpdate } = this.props
    const { fileList } = this.state
    if (onUpdate) {
      onUpdate({ loading: true })
    }
    // eslint-disable-next-line no-undef
    axios
      .post(action, data)
      .then(({ data: result }) => {
        const index = fileList.findIndex(n => n.uid === event.file.uid)
        const fileKeys = ['name', 'uid']
        const fileObj = {}
        /* eslint-disable */
        fileKeys.forEach(key => {
          fileObj[key] = event.file[key]
        })
        /* eslint-enable */
        if (index > -1) {
          fileList[index].url = result.url
          fileList[index].status = 'done'
        } else {
          fileList.push({
            // ...event.file, // file很多属性是从父级继承过来的，解构不出来的
            ...fileObj,
            status: 'done',
            url: result.url
          })
        }
        if (onUpdate) {
          onUpdate({ loading: false, fileList })
        }

        this.setState({ fileList })
      })
      .catch(() => {
        if (onUpdate) {
          onUpdate({ loading: false })
        }
      })
  }

  handleRemove = file => {
    // console.log('handleRemove: ', file)
    const { onRemove, onUpdate } = this.props
    const { fileList } = this.state
    if (onRemove) onRemove(file)
    const index = fileList.findIndex(n => n.uid === file.uid)
    if (index > -1) {
      fileList.splice(index, 1)
    }
    // console.log('handleRemove - fileList: ', fileList, defaultFileList)
    this.setState({ fileList })
    if (onUpdate) {
      onUpdate({ fileList })
    }
    return false
  }

  beforeUpload = file => {
    const { size } = this.props
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
    if (!checkExtension(file)) {
      // 1.类型校验
      message.error(`仅允许上传后缀名为${extensionList.join(',')}的文件，请检查上传文件格式`)
    } else if (!checkSize(file)) {
      // 2.大小校验
      message.error(`${file.name}文件大小超出限制`)
    }
    console.log('beforeUpload success: ', checkExtension(file) && checkSize(file))
    return checkExtension(file) && checkSize(file)
  }

  uploadButton = () => {
    const { children } = this.props
    return (
      children || (
        <Button>
          <UploadOutlined /> Upload
        </Button>
      )
    )
  }

  render () {
    const { children, ...restProp } = this.props
    const { fileList, previewImage, previewVisible } = this.state

    return (
      <div className="clearfix">
        <Upload
          {...restProp}
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          customRequest={this.customRequest}
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
/* eslint-enable react/prefer-stateless-function */

AttachmentUpload.propTypes = {
  action: PropTypes.string,
  defaultFileList: PropTypes.array,
  multiple: PropTypes.bool,
  listType: PropTypes.string,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  extensions: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  size: PropTypes.number // 文件大小
}
AttachmentUpload.defaultProps = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  defaultFileList: [],
  multiple: false,
  listType: 'picture',
  onChange: () => {},
  onRemove: () => {},
  extensions: 'pdf,doc,docx,xls,xlsx,jpg,png,jpeg,zip,rar',
  size: 20
}
export default AttachmentUpload
