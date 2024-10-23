<template>
  <hs-layout-detail footerBtn>
    <section slot="header">
      <hs-breadcrumb
        :list="breadcrumbList"
        :goBack="cancelClick"
        class="pad16"
      />
    </section>
    <hs-card title="基础信息">
      <hs-descriptions
        mt16
        :column="3"
        :list="descList"
        :detailData="detailData"
      />
    </hs-card>
    <div slot="footer">
      <el-button type="plain" @click="cancelClick">取消</el-button>
    </div>
  </hs-layout-detail>
</template>
<script>
import { IndexName } from './const'
import { cardDetail } from '@/apis/project-manage'
export default {
  name: 'project-detail',
  data() {
    return {
      breadcrumbList: ['详情'],
      descList: [{ label: '项目名称', key: 'projectName' }],
      detailData: {},
    }
  },
  created() {
    this.getDetail()
  },
  methods: {
    // 获取详情
    async getDetail() {
      const data = await cardDetail(this.$route.query.id)
      this.detailData = data || {}
    },
    cancelClick() {
      this.$router.replace({
        name: IndexName,
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
