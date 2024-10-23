import request from './index'
// 字典
export function getDictInfoList(data) {
  return request({
    url: '/app/gtree/dict-info/dictInfoList',
    method: 'post',
    data,
  })
}
// 字典
export function queryByParentIdDictList(data) {
  return request({
    url: '/app/gtree/dict/queryByParentIdDictList',
    method: 'post',
    data,
  })
}
// 上传图片
export function uploadToId(data) {
  return request({
    url: `app/gtree/file/uploadToId`,
    method: 'POST',
    data,
    headers: {
      'content-Type': 'multipart/form-data',
    },
  })
}

// 通过id获取文件的详细信息
export function getFileInfoByIds(data) {
  return request({
    url: `app/gtree/file/getFileInfoByIds`,
    method: 'POST',
    data,
    headers: {
      'content-Type': 'multipart/form-data',
    },
  })
}
