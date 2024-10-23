<template>
  <div :class="['full ovh app-box', isDev && 'has-dev-menu']">
    <div v-if="isDev" class="dev-menu-box">
      <div class="collapse-btn" @click="isCollapse = !isCollapse">
        <i :class="`el-icon-s-${isCollapse ? 'unfold' : 'fold'}`"></i>
      </div>
      <el-scrollbar wrap-class="menu-scrollbar__wrap" :size="6">
        <el-menu
          class="menu-wrap"
          theme="light"
          :collapse="isCollapse"
          :default-active="defaultMenu"
          collapse-btn
          @click-collapse="isCollapse = !isCollapse"
          @select="handleSelect"
        >
          <el-menu-item
            v-for="(menu, i) in menuList"
            :key="i"
            :index="menu.path"
            icon="h-icon-menu_f"
          >
            <i class="el-icon-menu"></i>
            <span slot="title">{{ menu.meta.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta || !$route.meta.keepAlive" />
  </div>
</template>
<script>
import routes from '@/router/routes'
export default {
  name: 'App',
  data() {
    return {
      isCollapse: true,
      isDev: process.env.NODE_ENV === 'development',
      defaultMenu: '',
      menuList: routes.filter((item) => item.meta?.menu),
    }
  },
  async created() {
    // await this.$store.dispatch('getCurrentUser') // 用到再掉吧
  },
  watch: {
    $route: {
      handler(val) {
        this.defaultMenu = val.path
      },
    },
  },
  methods: {
    handleSelect(path) {
      this.$router.replace({
        path,
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.app-box {
  background: #f7f8fa;
}
// 本地联调菜单样式
.has-dev-menu {
  display: flex;
  height: 100%;
  padding: 16px 16px 16px 0;
  .dev-menu-box {
    flex-shrink: 0;
    padding-right: 16px;
    .collapse-btn {
      color: #797a7e;
      border-right: solid 1px #e6e6e6;
      font-size: 24px;
      cursor: pointer;
      padding: 12px 0 0 20px;
    }
    .el-scrollbar {
      height: calc(100% - 50px);
    }
    &::v-deep {
      .menu-scrollbar__wrap {
        height: 100%;
        overflow-x: hidden;
        .menu-wrap {
          height: 100%;
          &:not(.el-menu--collapse) {
            width: 200px;
          }
        }
      }
      .el-scrollbar__view {
        height: 100%;
      }
    }
  }
  > :nth-child(2) {
    width: calc(100% - 200px);
    flex: auto;
  }
}
</style>
