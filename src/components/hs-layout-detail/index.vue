<template functional>
  <div
    class="detail-box"
    :style="{ 'min-width': props.minWidth, 'max-width': props.maxWidth }"
    v-loading="props.loading"
  >
    <div class="detail-breadcrumb" v-if="props.hasBreadcrumb">
      <slot name="breadcrumb"></slot>
    </div>
    <div class="detail-box-header" v-if="props.hasHeader">
      <slot name="header"></slot>
    </div>
    <div class="detail-box-container">
      <slot></slot>
    </div>

    <div class="page-footer" v-if="props.footerBtn">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hs-layout-detail',
  props: {
    footerBtn: { type: Boolean, default: true },
    hasHeader: { type: Boolean, default: true },
    hasBreadcrumb: { type: Boolean, default: false },
    minWidth: { type: String, default: '800px' },
    maxWidth: { type: String, default: '100%' },
    loading: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .hs-breadcrumb .el-breadcrumb__inner {
  font-size: 18px;
  &:hover {
    font-size: 18px;
  }
}
.detail-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  .detail-breadcrumb {
    padding: 16px;
    background: #fff;
  }

  .detail-box-container {
    overflow: auto;
    flex: auto;
    margin-top: 16px;
    padding-bottom: 16px;
  }
  .page-footer {
    background: #fff;
    padding-top: 14px;
    padding-bottom: 14px;
    padding-right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // 水平阴影、垂直阴影、模糊距离、阴影大小、颜色、外阴影改成内阴影
    box-shadow: 0 -8px 12px 8px rgba(36, 62, 74, 0.05);
    z-index: 3;
    ::v-deep .el-button {
      padding: 9px 28px;
    }
    ::v-deep .el-button + .el-button {
      margin-left: 16px;
    }
  }
  ::v-deep .el-form {
    .el-form-item {
      // width: calc(100% - 10px);
      width: 100%;
    }
    .el-input__inner,
    .el-cascader,
    .el-date-editor,
    .el-select {
      width: 100%;
    }
    .el-input-number--small {
      width: auto;
    }
    .el-textarea__inner {
      width: 100%;
    }
    .el-date-editor--datetimerange {
      width: 100%;
    }
  }

  // 框架去掉padding这行可以去掉
  // .detail-box-header {
  //   position: relative;
  //   left: -16px;
  //   top: -16px;
  //   width: calc(100% + 32px);
  // }
  // .detail-box-container {
  //   margin-top: 0;
  // }
}
</style>
