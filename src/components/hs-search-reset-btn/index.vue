<template>
  <el-form-item>
    <template v-if="showMore">
      <el-button type="text" @click="isOpen = true" v-show="!isOpen">
        展开
        <i class="el-icon-arrow-down"></i>
      </el-button>
      <el-button type="text" @click="isOpen = false" v-show="isOpen">
        收起
        <i class="el-icon-arrow-up"></i>
      </el-button>
    </template>
    <el-button type="primary" icon="el-icon-search" @click="search">
      查询
    </el-button>
    <el-button plain @click="reset" icon="el-icon-refresh-left">
      重置
    </el-button>
  </el-form-item>
</template>
<script>
export default {
  name: 'hs-search-reset-btn',
  props: {
    showMore: { type: Boolean, default: false },
    isCollapse: { type: Boolean, default: false },
  },
  watch: {
    isCollapse(val) {
      this.isOpen = val
    },
    isOpen(val) {
      this.$emit('update:isCollapse', val)
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    search() {
      this.$emit('search')
    },
    reset() {
      this.$emit('reset')
    },
  },
}
</script>
<style lang="scss" scoped></style>
