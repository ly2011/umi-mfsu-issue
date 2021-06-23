import { stringify } from 'qs'
import request from 'utils/request'

export async function queryRule (params) {
  return request.get('/api/rule', {
    params
  })
}

export async function removeRule (params) {
  return request.post('/api/rule', {
    ...params,
    method: 'delete'
  })
}

export async function addRule (params) {
  return request.post('/api/rule', {
    ...params,
    method: 'post'
  })
}

export async function updateRule (params = {}) {
  return request.post(`/api/rule?${stringify(params.query)}`, {
    ...params.body,
    method: 'update'
  })
}
