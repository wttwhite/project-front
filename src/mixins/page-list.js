import { getPageApi, commonDelApi } from '@/apis/common'

export default {
  computed: {
    mxHasOperate() {
      return (type) => {
        return process.env.NODE_ENV === 'development'
          ? true
          : this.$hsjaAuth.hasPermission(type)
      }
    },
  },
  data() {
    return {
      pageTotal: 0,
      pageData: [],
      tableLoading: false,
    }
  },
  methods: {
    // 重置
    mxResetDataList(DefaultSearchForm) {
      this.searchForm = { ...DefaultSearchForm }
      this.getDataList(1)
    },
    getDataList(pageNo) {
      pageNo && typeof pageNo === 'number' && (this.searchForm.pageNo = pageNo)
      let params = { ...this.searchForm }
      this.searchFormFormat && (params = this.searchFormFormat(params))
      this.tableLoading = true
      getPageApi(this.pageUrl, this.pageMethod || 'post', params)
        .then((res) => {
          this.pageData = res.records || []
          this.pageTotal = res.total || 0
          this.$nextTick(() => {
            this.$refs.tableRef?.doLayout()
          })
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    mxDelClick(url, params, msg) {
      this.$confirm(msg || `确认删除吗, 是否继续?`, '确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          commonDelApi(url, params).then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
            })
            this.getDataList(1)
          })
        })
        .catch(() => {})
    },
    selectable(row) {
      return !row.inOperation
    },
  },
}
