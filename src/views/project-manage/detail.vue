<template>
  <hs-layout-detail footerBtn>
    <section slot="header">
      <hs-breadcrumb
        :list="breadcrumbList"
        :goBack="cancelClick"
        class="pad16"
      />
      <page-tabs :activeName.sync="activeName" isOnlyTabs :tabList="tabList" />
    </section>

    <hs-card title="基础信息" v-show="activeName === 'info'">
      <hs-descriptions
        mt16
        :column="3"
        :list="descList"
        :detailData="detailData"
      />
    </hs-card>
    <timeLineVue v-show="activeName === 'time'" />
    <div slot="footer">
      <el-button type="plain" @click="cancelClick">取消</el-button>
    </div>
  </hs-layout-detail>
</template>
<script>
import { IndexName } from './const'
import { cardDetail } from '@/apis/project-manage'
import timeLineVue from './components/time-line.vue'
export default {
  name: 'project-detail',
  components: {
    timeLineVue,
  },
  data() {
    return {
      breadcrumbList: ['详情'],
      activeName: 'info',
      tabList: [
        { label: '基本信息', name: 'info' },
        { label: '时间线', name: 'time' },
      ],
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
