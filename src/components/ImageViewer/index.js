import React from 'react'
import Viewer from 'react-viewer'
import 'react-viewer/dist/index.css'

const ImageViewer = props => (
  <div>
    <Viewer {...props} />
  </div>
)

export default ImageViewer
