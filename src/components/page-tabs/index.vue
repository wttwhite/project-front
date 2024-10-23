<template>
  <div
    :class="['page-tabs', isOnlyTabs ? 'page-tabs-only' : 'page-tabs-not-only']"
  >
    <el-tabs v-model="activeInnerName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in computedTabList"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <div class="tab-panel">
          <slot :name="item.name"></slot>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'page-tabs',
  props: {
    tabList: {
      type: Array,
      default: () => [
        // { label: '业务表单', name: 'form' }
      ],
    },
    isOnlyTabs: { type: Boolean, default: false },
    activeName: { type: String, default: '' },
  },
  computed: {
    computedTabList() {
      return this.tabList?.filter((item) => item.isHide !== true) || []
    },
  },
  watch: {
    activeName: {
      handler(n) {
        this.activeInnerName = n
      },
      immediate: true,
    },
    tabList: {
      handler(n) {
        if (this.activeName === '') {
          this.activeInnerName = n[0]?.name
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      activeInnerName: '',
    }
  },
  methods: {
    handleClick(tab) {
      this.$emit('tabChange', tab)
      this.$emit('update:activeName', tab.name)
    },
  },
}
</script>
<style lang="scss" scoped>
.page-tabs {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  color: #333333;
  transition: 0.3s;
}
.page-tabs-only {
}
.page-tabs-not-only {
  .el-tabs {
    height: 100%;
  }

  .tab-panel {
    padding: 20px;
    height: 100%;
    overflow: auto;
  }
}

::v-deep .el-tabs__header {
  margin: 0;
  padding-left: 16px;
}
::v-deep .el-tabs__nav-wrap::after {
  height: 0;
}
::v-deep .el-tabs__content {
  height: calc(100% - 40px);
}
::v-deep .el-tab-pane {
  height: 100%;
}
</style>
