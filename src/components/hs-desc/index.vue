<template>
  <div class="hs-desc">
    <i class="el-icon-warning-outline"></i>
    {{ value }}
  </div>
</template>
<script>
export default {
  name: 'hs-desc',
  props: {
    value: { type: String, default: '' },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style lang="scss" scoped>
.hs-desc {
  color: #8e959f;
  line-height: 20px;
  font-size: 12px;
  margin-top: 4px;
}
</style>
