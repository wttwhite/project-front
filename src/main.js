import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from '@/store'
import 'normalize.css'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.scss'
import '@/components'
// 全局混入
import globalMixins from '@/mixins/global-mixins'

Vue.use(elementUI, {
  size: 'small',
})

Vue.use(VueRouter)
Vue.mixin(globalMixins)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
