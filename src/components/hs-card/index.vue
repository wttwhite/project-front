<template>
  <el-card
    :class="['hs-card', shadow === 'neverBorder' && 'never-border']"
    :shadow="shadowInner"
  >
    <div v-if="hasTitle" slot="header" class="card-title">
      <div class="title">
        <span v-if="showStar" style="color: red; margin-right: 4px"> * </span>
        {{ title }}
      </div>
      <slot name="rightBtn"></slot>
    </div>
    <slot></slot>
  </el-card>
</template>
<script>
export default {
  name: 'hs-card',
  props: {
    title: { type: String, default: '标题' },
    showStar: { type: Boolean, default: false },
    hasTitle: { type: Boolean, default: true },
    shadow: { type: String, default: 'neverBorder' },
  },
  computed: {
    shadowInner() {
      return this.shadow === 'neverBorder' ? 'never' : this.shadow
    },
  },
}
</script>
<style lang="scss" scoped>
.hs-card.never-border {
  border: none;
}
// .hs-card:not(:last-child) { 只有一个的时候不行
//   margin-bottom: 16px;
// }
::v-deep .el-card__header {
  padding: 0;
}
::v-deep .el-card__body {
  padding: 16px;
}
.card-title {
  min-height: 48px;
  padding: 0 16px;
  .title {
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
