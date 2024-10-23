export default {
  /**
   * 全局返回
   * @param {*} to
   * @param {*} from
   * @param {*} next
   * 注意:初始化时可能造成重复调用接口 一般组件内会默认调接口 这里又调用一次
   * app.js
      <keep-alive><router-view v-if="$route.meta.keepAlive" /> </keep-alive>
      <router-view v-if="!$route.meta || !$route.meta.keepAlive" /> 
   */
  beforeRouteEnter(to, from, next) {
    console.log('from', from)
    console.log('to', to)
    next(async (vm) => {
      if (to?.meta?.keepAlive && vm?.keepAliveInit) {
        vm.keepAliveInit()
      }
      // 当前路由是菜单
      if (to.meta?.menu && vm) {
        if (process.env.NODE_ENV === 'development') {
          vm.mxIndexMenuName = to.meta.title
        } else {
          await vm.$store.dispatch('getAllMenu')
          const allMenu = vm.$store.state.menu.allMenu
          vm.mxIndexMenuName = vm._getCurrentIndexMenu(allMenu) || ''
        }
      }
    })
  },
  data() {
    return {
      mxIndexMenuName: '',
    }
  },
  methods: {
    _getCurrentIndexMenu(allMenu) {
      // 获取url上的appId 和 id
      const { appId, id } = this._getAppIdAndId()
      for (const menuList of allMenu) {
        for (const apps of menuList.apps) {
          for (const pages of apps.pages) {
            if (pages.appId === appId && pages.id === id) return pages.name
          }
        }
      }
    },
    _getAppIdAndId() {
      // #/21_189/dictionaryDetail?l
      const hash = window.location.hash
      const hashArr = hash.split('/')
      const addIdAndId = hashArr[1].split('_')
      // return { appId: 121, id: 570 }
      return { appId: parseInt(addIdAndId[0]), id: parseInt(addIdAndId[1]) }
    },
  },
}
