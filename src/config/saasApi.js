// saas服务接口
// eslint-disable-next-line
const SAAS_URL = process.env.SAAS_URL

/**
 * 省市数据
 */

// 获取省市区列表
export const getAreaByParentId = `${SAAS_URL}/area/getAreaByParentId`
