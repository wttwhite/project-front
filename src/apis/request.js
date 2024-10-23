import axios from 'axios'
/**
 * getEnvUrl
 * @param {String} env - 环境
 * @param {String} context - 上下文
 * @param {Boolean} authentication - 是否需要鉴权
 * @returns {String} result - 请求url公共部分
 **/
function getEnvUrl(env, context, authentication) {
  return authentication ? `/${env}/${context}` : `/other/${context}`
}

/**
 * _axios
 * @param {String} env - 环境
 * @param {String} context - 上下文
 * @param {Boolean} authentication - 是否需要鉴权
 * @param {String} token - 开发模式开发环境用户token
 * @param {Function} callback - response自定义回调  入参为response
 * @param {Object} headerOption - 请求头自定义配置
 * @param {Object} createOption - 请求实例创建自定义配置
 * @param {Object} configOptionFun - 请求配置自定义配置
 **/
function _axios({
  context,
  env,
  authentication,
  token,
  callback,
  headerOption,
  createOption,
  configOptionFun,
}) {
  const service = axios.create({
    baseURL: getEnvUrl(env, context, authentication),
    timeout: 5000,
    ...createOption,
  })
  service.interceptors.request.use(
    (config) => {
      config.headers = {
        'Content-Type': config.headers['Content-Type']
          ? config.headers['Content-Type']
          : 'application/json',
        authorization: token
          ? token
          : `Bearer ${localStorage['hsja_X_token_base']}`,
        frontApplication: window.top
          ? window.top.hsja_activePageData
          : window.hsja_activePageData,
        ...headerOption,
        ...config.headers,
      }
      let configOption = {}
      if (
        configOptionFun &&
        Object.prototype.toString.call(configOptionFun) === '[object Function]'
      ) {
        configOption = configOptionFun(config)
      }
      config = {
        ...config,
        ...configOption,
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  service.interceptors.response.use(
    (response) => {
      const res = response.data
      if (callback) {
        return callback(response)
      } else {
        return res.data ? res.data : res
      }
    },
    (error) => {
      console.log(error.message)
      return Promise.reject(error)
    }
  )

  return service
}

function getChildren(obj, pubPath) {
  if (obj.children) {
    let arr = []
    obj.children.map((item) => {
      arr.push({
        path: pubPath + item.path,
        name: item.name,
        meta: item.meta,
        props: item.props,
        redirect: item.redirect ? pubPath + item.redirect : '',
        component: item.component,
        children: getChildren(item, pubPath),
      })
    })
    return arr
  } else {
    return []
  }
}
function handleRoute(routes, props) {
  let arr = []
  routes.map((item) => {
    arr.push({
      path: props.pubPath + item.path,
      name: item.name,
      meta: item.meta,
      props: item.props,
      redirect: item.redirect ? props.pubPath + item.redirect : '',
      component: item.component,
      children: getChildren(item, props.pubPath),
    })
  })
  return arr
}

export { getEnvUrl, _axios, handleRoute }
