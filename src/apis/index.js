import { _axios } from './request'
import { Message } from 'element-ui'
const request = _axios({
  context: 'holdasset-base', //上下文
  env: 'app', //服务环境, 目前 app,wx
  authentication: true, //是否进行鉴权
  token:
    process.env.NODE_ENV == 'production' ? null : require('./dev-token').Token, //开发环境调试的token
  createOption: {
    timeout: 500000,
  }, //请求实例创建自定义配置
  callback: (res) => {
    if (res.data instanceof Blob) {
      return res
    }
    let data = res.data
    if (data.code !== 0 && data.code !== '0' && data.code !== 200) {
      Message.warning(data.msg || data.datamessage)
      return Promise.reject(data.data || '')
    } else {
      return data.data
    }
  }, //接口返回自定义处理函数
  headerOption: {}, //自定义请求头
  configOptionFun: (config) => {
    if (!config.url) return config
    if (config.url.includes('gtree')) {
      config.baseURL = process.env.NODE_ENV == 'production' ? '' : '/devKey'
    }
    if (config.header) {
      config.headers = { ...config.headers, ...config.header }
    }
    return config
  },
})

export default request
