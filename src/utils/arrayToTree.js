import groupBy from 'lodash.groupby'

/**
 * 将数组数据转为树状结构
 * @param {Array} data 原数据
 * @param {Object} options 字段映射属性
 * @example const tree = smartArrayToTree(data, { id: 'regionId', pid: 'parentId', firstPid: null });
 */
function arrayToTree (data, options) {
  options = Object.assign(
    {
      id: 'id',
      pid: 'pid',
      children: 'children',
      firstPid: null
    },
    options
  )
  const groupArray = groupBy(data, n => n[options.pid])
  const firstArray = groupArray[options.firstPid]
  transform(firstArray)
  function transform (startList) {
    if (startList) {
      for (let i = 0; i < startList.length; i++) {
        groupArray[startList[i][options.id]] && (startList[i][options.children] = groupArray[startList[i][options.id]])
        transform(startList[i][options.children])
      }
    }
  }
  return firstArray
}

/**
 * 树形数据转为数组结构
 * @param {Array} dataSource 原数据
 * @param {String} childrenKey children字段
 */
export const treeToArray = (dataSource = [], childrenKey = 'children') => {
  const arr = []
  const expanded = data => {
    if (data && data.length > 0) {
      data.forEach(item => {
        arr.push(item)
        if (Array.isArray(item[childrenKey])) {
          expanded(item[childrenKey])
        }
      })
    }
  }
  expanded(dataSource)
  return arr
}

export default arrayToTree
