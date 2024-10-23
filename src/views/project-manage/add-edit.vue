<template>
  <hs-layout-detail footerBtn v-loading="loading">
    <section slot="header">
      <hs-breadcrumb
        :list="breadcrumbList"
        :goBack="cancelClick"
        class="pad16"
      />
    </section>
    <el-form
      :inline="true"
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-position="top"
    >
      <hs-card title="基础信息">
        <el-row class="common-form-row">
          <el-col :span="colSpan">
            <el-form-item label="项目名称" prop="projectName">
              <el-input
                v-model.number.trim="formData.projectName"
                maxlength="50"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
          <el-col :span="colSpan">
            <el-form-item label="项目日期" prop="assetGetDate">
              <el-date-picker
                v-model="formData.assetGetDate"
                type="date"
                placeholder="选择日期"
                :clearable="false"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="common-form-row">
          <el-col :span="12">
            <el-form-item label="附件" prop="filesJson">
              <upload-button
                ref="UploadFile"
                v-model="formData.filesJson"
                :fileSize="100"
                isJson
              ></upload-button>
            </el-form-item>
          </el-col>
        </el-row>
      </hs-card>
    </el-form>
    <div slot="footer">
      <el-button type="plain" @click="cancelClick">取消</el-button>
      <el-button
        type="primary"
        :disabled="loading"
        v-loading="loading"
        @click="submitClick"
        >提交</el-button
      >
    </div>
  </hs-layout-detail>
</template>
<script>
import { IndexName } from './const'
import { cardAdd } from '@/apis/project-manage'
export default {
  name: 'project-add-edit',
  data() {
    return {
      breadcrumbList: ['新增项目'],
      loading: false,
      colSpan: 8,
      formData: {
        projectName: '',
        filesJson: '',
      },
      rules: {
        projectName: [{ required: true, message: '请输入项目名称' }],
      },
    }
  },
  methods: {
    submitClick() {
      this.$refs['formRef'].validate(async (valid) => {
        if (valid) {
          this.loading = true
          await cardAdd(this.formData).finally(() => {
            this.loading = false
          })
          this.$message.success('提交成功')
          this.cancelClick()
        }
      })
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
