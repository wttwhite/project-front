<template>
  <hs-layout noBreadcrumb>
    <el-form
      slot="search"
      :inline="true"
      :model="searchForm"
      ref="searchFormRef"
      @submit.native.prevent
    >
      <el-form-item label="项目名称">
        <el-input v-model="searchForm.projectName" />
      </el-form-item>
      <hs-search-reset-btn
        @search="getDataList(1)"
        @reset="mxResetDataList(DefaultSearchForm)"
      />
    </el-form>
    <section slot="btnBox">
      <el-button type="primary" @click="addClick" icon="el-icon-plus">
        新增
      </el-button>
    </section>
    <el-table
      :data="pageData"
      height="100%"
      ref="tableRef"
      v-loading="tableLoading"
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column
        v-for="(item, index) in TableColumnList"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width || ''"
        :min-width="item.minWidth || ''"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span v-if="!item.format">{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110" fixed="right">
        <template slot-scope="{ row }">
          <el-button type="text" @click="detailClick(row)"> 详情 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <hs-pagination
      slot="footer"
      @refresh="getDataList"
      :page-no.sync="searchForm.pageNo"
      :page-size.sync="searchForm.pageSize"
      :total="pageTotal"
    />
  </hs-layout>
</template>

<script>
import dayjs from 'dayjs'
import pageListMixin from '@/mixins/page-list'
import { TableColumnList } from './const'
import { cardDelete, cardTotal } from '@/apis/project-manage'
const DefaultSearchForm = () => {
  return {
    pageNo: 1,
    pageSize: 10,
    assetTypeCode: '',
    month: dayjs(new Date()).format('YYYY-MM'),
  }
}
// 资产卡片没有流程
export default {
  name: 'asset-card',
  mixins: [pageListMixin],
  data() {
    return {
      searchForm: DefaultSearchForm(),
      DefaultSearchForm: Object.freeze(DefaultSearchForm()),
      TableColumnList: Object.freeze(TableColumnList),
      pageUrl: '/rpc/asset/card/page',
      exportUrl: '/rpc/asset/card/export',
      pageData: [{ id: 1 }],
    }
  },
  methods: {
    keepAliveInit() {
      this.getDataList()
    },
    addClick() {
      this.$router.replace({
        name: 'project-manage-add-edit',
        query: {
          pageType: 'add',
        },
      })
    },
    detailClick(row) {
      this.$router.replace({
        name: 'project-manage-detail',
        query: {
          pageType: 'detail',
          id: row.id,
        },
      })
    },
    searchFormFormat(params) {
      const { month, assetTypeCode } = params
      params.beginDate =
        (month && dayjs(month).startOf('month').format('YYYY-MM-DD')) || ''
      params.endDate =
        (month && dayjs(month).endOf('month').format('YYYY-MM-DD')) || ''
      params.assetTypeCodes = assetTypeCode ? [assetTypeCode] : []
      return params
    },
  },
}
</script>
<style lang="scss" scoped></style>
