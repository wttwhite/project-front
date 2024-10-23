<template>
  <el-pagination
    :current-page="pageNo"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :total="total"
    :background="background"
    :layout="layout"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :pager-count="pagerCount"
  />
</template>

<script>
export default {
  name: 'hs-pagination',
  props: {
    background: {
      type: Boolean,
      default: true,
    },
    pageNo: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    // 页码按钮的数量，当总页数超过该值时会折叠
    pagerCount: {
      type: Number,
      default: 7,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
  },
  data() {
    return {}
  },
  methods: {
    sizeChangeHandle(val) {
      this.$emit('update:pageNo', 1)
      this.$emit('update:pageSize', val)
      // 防止父组件的pageSize和pageNo没更新
      this.$nextTick(() => {
        this.$emit('refresh')
      })
    },
    currentChangeHandle(val) {
      this.$emit('update:pageNo', val)
      // 防止父组件的pageSize和pageNo没更新
      this.$nextTick(() => {
        this.$emit('refresh')
      })
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .el-pagination__editor.el-input {
  min-width: 56px;
  width: auto;
}
</style>
