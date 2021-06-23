import { notification } from 'antd'


const defaultConfig = {
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
  rtl: true
}

/**
 * 操作成功通知提示
 * @param {object} options - 默认属性
 * @param {?string} [options.message=操作成功] - 提示信息
 * @param {?string} [options.description] - 详细描述
 */
const success = (options = {}) => {
  const { message = '操作成功', description, ...restProps } = options
  notification.success({
    ...defaultConfig,
    message,
    description,
    className: 'success',
    ...restProps
  })
}

/**
 * 操作失败通知提示
 * @param {object} options - 默认属性
 * @param {?string} [options.message=操作失败] - 提示信息
 * @param {?string} [options.description] - 详细描述
 */
const error = (options = {}) => {
  const { message = '操作失败', description, ...restProps } = options
  notification.error({
    ...defaultConfig,
    message,
    description,
    className: 'error',
    ...restProps
  })
}

/**
 * 操作异常通知提示
 * @param {object} options - 默认属性
 * @param {?string} [options.message=操作异常] - 提示信息
 * @param {?string} [options.description] - 详细描述
 */
const warning = (options = {}) => {
  const { message = '操作异常', description, ...restProps } = options
  notification.warning({
    ...defaultConfig,
    message,
    description,
    className: 'warn',
    ...restProps
  })
}

/**
 * 操作信息通知提示
 * @param {object} options - 默认属性
 * @param {?string} [options.message] - 提示信息
 * @param {?string} [options.description] - 详细描述
 */
const info = (options = {}) => {
  const { message, description, ...restProps } = options
  notification.info({
    ...defaultConfig,
    message,
    description,
    className: 'info',
    ...restProps
  })
}

export default {
  success,
  error,
  warning,
  info
}
