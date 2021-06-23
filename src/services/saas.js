import request from 'utils/request'
import * as SaasApi from 'config/saasApi'

// 获取省市区列表
export const getAreaByParentId = async (parentId, level) => request.get(`${SaasApi.getAreaByParentId}?parentId=${parentId}&level=${level}`)
