<template>
  <div class="hs-breadcrumb">
    <div class="back-box" v-if="path || goBack" @click="innerGoBack()">
      <img src="@/assets/imgs/arrow-left-bold.png" width="16" height="16" />
    </div>
    <!-- <el-breadcrumb separator="/"> -->
    <div v-for="(item, index) in list" :key="index" class="single">
      <span>{{ item }}</span>
      <span v-if="index !== list.length - 1" class="separator">{{
        separator
      }}</span>
    </div>
    <!-- </el-breadcrumb> -->
  </div>
</template>

<script>
export default {
  name: 'hs-breadcrumb',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    path: { type: String, default: '' },
    goBack: { type: [Function, String], default: '' },
    separator: { type: String, default: '/' },
  },
  methods: {
    innerGoBack() {
      if (this.goBack) {
        this.goBack()
        return
      }
      if (this.path) {
        this.$router.replace(this.path)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.hs-breadcrumb {
  width: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: #fff;
  .single {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 26px;
    display: inline-block;
    .separator {
      display: inline-block;
      padding: 0 8px;
    }
  }
}
.back-box {
  margin-right: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4782eb;
  font-weight: 400;
  font-size: 14px;

  .el-icon-arrow-left {
    font-weight: 600;
    margin-right: 4px;
  }
}
</style>
