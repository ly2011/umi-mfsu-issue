import moment from 'moment'
import nzh from 'nzh/cn'
import isEqual from 'lodash/isEqual'
import store from 'store2'
import { isObject, omit, pick } from 'lodash'
import notification from './notification'

export function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val
}

export function getTimeDistance(type) {
  const now = new Date()
  const oneDay = 1000 * 60 * 60 * 24

  if (type === 'today') {
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)
    return [moment(now), moment(now.getTime() + (oneDay - 1000))]
  }

  if (type === 'week') {
    let day = now.getDay()
    now.setHours(0)
    now.setMinutes(0)
    now.setSeconds(0)

    if (day === 0) {
      day = 6
    } else {
      day -= 1
    }

    const beginTime = now.getTime() - day * oneDay

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))]
  }

  if (type === 'month') {
    const year = now.getFullYear()
    const month = now.getMonth()
    const nextDate = moment(now).add(1, 'months')
    const nextYear = nextDate.year()
    const nextMonth = nextDate.month()

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000)
    ]
  }

  const year = now.getFullYear()
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)]
}

/* eslint no-useless-escape:0 */
// eslint-disable-next-line max-len
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl(path) {
  return reg.test(path)
}

export function digitUppercase(n) {
  return nzh.toMoney(n)
}

// 深比较
export const deepEqual = isEqual

export const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time)
  })

/**
 * 纯前端文件下载
 * @param {String} url 文件路径
 */
export const downloadFile = url => {
  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.style.display = 'none'
  iframe.onload = function () {
    console.log('start downloading...')
    document.body.removeAttribute(iframe)
  }
  document.body.appendChild(iframe)
}

/**
 * 获取所有按钮权限
 */
export const getAllBtnAuthCodes = () => {
  const btnAuthCodes = store.get('btnAuthCodes') || []
  return btnAuthCodes
}

/**
 * 字符串类型空校验
 * @param {String} value
 * @returns Boolean
 */
export const stringIsEmpty = value => {
  if (typeof value === 'string') {
    // eslint-disable-next-line no-param-reassign
    value = value.trim()
  }
  if (value === undefined || value === null || value === '') {
    return true
  }
  return false
}

/**
 * tableScrollWidth - 计算滚动表格的宽度
 * 如果 fixWidth 不传或者为0, 会将没有设置宽度的列 宽度假设为 200
 * @param {array} columns - 表格列
 * @param {number} fixWidth - 不固定宽度列需要补充的宽度
 * @return {number} - 返回计算过的 x 值
 */
export const tableScrollWidth = (columns = [], fixWidth = 0) => {
  let fillFixWidthCount = 0
  const total = columns.reduce((prev, current) => {
    if (current.width) {
      return prev + current.width
    }
    fillFixWidthCount += 1
    return prev
  }, 0)
  if (fixWidth) {
    return total + fixWidth + 1
  }
  return total + fillFixWidthCount * 200 + 1
}

/**
 * 过滤掉对象值为 undefined 和 空字符串 和 空数组 的属性
 * @param {Object} obj
 * @returns {Object} 过滤后的查询参数
 */
export const filterNullValueObject = obj => {
  const result = {}
  if (obj && Object.keys(obj).length >= 1) {
    Object.keys(obj).forEach(key => {
      if (key && obj[key] !== undefined && obj[key] !== '' && obj[key] !== null) {
        // 如果查询的条件不为空
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
          return
        }
        result[key] = obj[key]
      }
    })
  }
  return result
}

export const hasOwn = (obj, attr) => Object.prototype.hasOwnProperty.call(obj, attr)

/**
 * 调整消息返回
 * @param {*} response
 * @param {*} errorCallback
 */
// eslint-disable-next-line consistent-return
export const getResponse = (response, errorCallback) => {
  const { data } = response || {}
  if (data && data.success !== true) {
    if (errorCallback) {
      errorCallback(data)
    } else {
      const msg = {
        message: '操作失败',
        description: data.msg
      }
      switch (data.type) {
        case 'info':
          notification.info(msg)
          break
        case 'warn':
          notification.warning(msg)
          break
        case 'error':
        default:
          notification.error(msg)
          break
      }
    }
  } else {
    return data && hasOwn(data, 'data') ? data.data : data
  }
}

/**
 * 通过 ref 获取表单数据
 * this.filterFormRef = React.createRef();
 * <FilterForm wrappedComponentRef={this.filterFormRef} />
 * const data = getRefFormData(this.filterFormRef);
 * @param {React.RefObject<Form>} ref - 表单的 ref
 * @return {object}
 */
export function getRefFormData(ref) {
  if (ref.current) {
    const { form } = ref.current.props
    return form.getFieldsValue()
  }
  return {}
}

/**
 * 获取行内编辑表格中的 form
 * @param {array} dataSource - 表格数据源
 */
export function getEditTableForm(dataSource) {
  const formList = []
  const fetchForm = (source, list) => {
    if (Array.isArray(source)) {
      source.forEach(item => {
        if (item.$form) {
          list.push(item.$form)
        }
        if (item.children && Array.isArray(item.children)) {
          fetchForm(item.children, list)
        }
      })
    }
  }
  fetchForm(dataSource, formList)
  return formList
}

/**
 * 获取行内编辑表格中的 form
 * @param {array} dataSource - 表格数据源
 * @param {array} filterList - 过滤新增操作中的属性字段，例如：['children', 'unitId']，默认过滤 $form
 * @param {object} scrollOptions - 配置form效验报错后的滚动行为，
 * - 默认是基于页面滚动，如果需要基于表格内滚动，
 * - 需要：{ container: document.querySelector('.ant-table-body') }，同时需要设置Y轴滚动
 * @param {string} treeChildrenAlias = 'children' - 指定树形结构行内编辑的子节点名称
 */
export async function getEditTableData(dataSource = [], filterList = [], treeChildrenAlias = 'children') {
  const paramsList = []
  const errList = []
  const fetchForm = async (source, list) => {
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        // eslint-disable-next-line
        if (source[i].$form && source[i]._status) {
          try {
            // eslint-disable-next-line
            const values = await source[i].$form.validateFields()
            const { $form, ...otherProps } = source[i]
            if (Array.isArray(filterList) && filterList.length > 0) {
              // eslint-disable-next-line
              for (const name of filterList) {
                // 如果record中存在需要过滤的值，且是新增操作，执行过滤，默认过滤$form
                // eslint-disable-next-line
                if (source[i][name] && source[i]._status === 'create') {
                  delete otherProps[name]
                  // eslint-disable-next-line
                  delete values[name]
                }
              }
            }
            list.push({ ...otherProps, ...values })
          } catch (err) {
            // 捕获表单效验错误
            errList.push(err)
          }
        }
        if (source[i][treeChildrenAlias] && Array.isArray(source[i][treeChildrenAlias])) {
          fetchForm(source[i][treeChildrenAlias], list)
        }
      }
    }
  }
  await fetchForm(dataSource, paramsList)
  return errList.length > 0 ? [] : paramsList
}

/**
 * 获取行内表格中字段
 * @param {array} dataSource - 表格数据源
 * @param {array} filterList - 过滤新增操作中的属性字段，例如：['children', 'unitId']，默认过滤 $form
 * @param {string} filterType = pick - 过滤方式，pick: 挑选出想要的字段, omit: 过滤掉的字段
 * @param {*} treeChildrenAlias  = 'children' - 指定树形结构行内编辑的子节点名称
 * @example
 * filterTableDataFields(tableData, ['_status', 'id'])
 */
export function filterTableDataFields(dataSource = [], filterList = [], filterType = 'pick', treeChildrenAlias = 'children') {
  const filterTypeMap = { pick, omit }
  const filterTypeArr = Object.keys(filterTypeMap)
  const paramsList = []
  const nextFilterList = ['$form'].concat(filterList)
  const fetchForm = (source, list) => {
    if (Array.isArray(source)) {
      for (let i = 0; i < source.length; i++) {
        const itemData = source[i]
        const nextItemData = filterTypeArr.includes(filterType) ? filterTypeMap[filterType](itemData, nextFilterList) : itemData
        list.push(nextItemData)
        if (source[i][treeChildrenAlias] && Array.isArray(source[i][treeChildrenAlias])) {
          fetchForm(source[i][treeChildrenAlias], list)
        }
      }
    }
  }
  fetchForm(dataSource, paramsList)
  return paramsList
}

/**
 * 以弹框形式展示form表单错误提示信息
 * @param {Object} err form表单错误信息
 */
export const showFormErrorMsgs = (err = {}) => {
  const errKeys = Object.keys(err)
  if (!errKeys.length) return
  const msgs = []
  errKeys.forEach(key => {
    const errMsg = err[key].errors[0].message // 现在只拿错误的第一条消息提醒用户
    if (!errMsg) {
      return
    }
    msgs.push(errMsg)
  })
  /* eslint-disable react/react-in-jsx-scope */
  notification.warning({
    message: (
      <>
        {msgs.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </>
    )
  })
  /* eslint-enable react/react-in-jsx-scope */
}

/**
 * 格式化字符串，替换变量
 * @param {String} template 模板
 * @param {Object} data 变量
 * @example
 * formatString(`中文输入法名称：{name}，年龄: {age}`, {name: '张三', age: 20})
 * // output: "中文输入法名称：张三，年龄: 20"
 */
export const formatString = (template, data) => {
  let nextTemplate = template
  if (!isObject(data)) {
    console.warn('formatString变量必须为对象')
    return template
  }
  Object.keys(data).forEach(key => {
    nextTemplate = nextTemplate.split(`{${key}}`).join(data[key])
  })

  return nextTemplate
}
