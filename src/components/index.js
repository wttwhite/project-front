/*
 * 自动注册全局组件
 * 新建子目录, 目录内新建index.vue, 且组件选项包含name属性
 * */
import Vue from 'vue'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /index.vue$/
)

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  let componentConfig = requireComponent(fileName)
  // 如果这个组件选项是通过 `export default` 导出的，
  // 那么就会优先使用 `.default`，
  // 否则回退到使用模块的根。
  componentConfig = componentConfig.default || componentConfig

  // 全局注册组件
  Vue.component(componentConfig.name, componentConfig)
})
