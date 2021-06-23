import { createFromIconfontCN } from '@ant-design/icons'
import { iconfontUrl as scriptUrl } from '@/defaultSettings'

// 使用：
// import IconFont from '@/components/IconFont';
// <IconFont type='icon-demo' className='xxx-xxx' />
const IconFont = createFromIconfontCN({ scriptUrl })
export default IconFont
