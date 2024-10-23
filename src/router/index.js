import VueRouter from 'vue-router'
import routes from './routes'

export default new VueRouter({
  base: '/',
  mode: 'hash',
  routes,
})
