import React from 'react'
import { Spin } from 'antd'

const PageLoading = ({
  height = 100,
  size = 'large',
  indicator,
  tip,
  delay
}) => (
  <div style={{ paddingTop: height, textAlign: 'center' }}>
    <Spin size={size} indicator={indicator} tip={tip} delay={delay} />
  </div>
)

export default PageLoading
