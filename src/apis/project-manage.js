import request from './index'
// 项目管理-新增
export function cardAdd(data) {
  return request({
    url: `/asset/card/add`,
    method: 'post',
    data,
  })
}
