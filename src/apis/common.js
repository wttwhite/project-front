import request from './index'
// 表格搜索页面列表
export function getPageApi(url, method, data) {
  const params =
    method === 'post'
      ? {
          data,
        }
      : { params: data }
  return request({
    url,
    method,
    ...params,
  })
}

// 导出
export function exportApi(url, data, method = 'post') {
  const params =
    method === 'post'
      ? {
          data,
        }
      : { params: data }
  return request({
    url,
    method,
    ...params,
    responseType: 'blob',
  })
}
// 导入
export function importApi(url, data) {
  return request({
    url,
    method: 'post',
    data,
    headers: {
      'content-Type': 'multipart/form-data',
    },
  })
}

// 列表删除
export function commonDelApi(url, data) {
  return request({
    url,
    method: 'post',
    data,
  })
}
