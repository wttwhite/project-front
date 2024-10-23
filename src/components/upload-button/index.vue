<template>
  <el-upload
    v-if="!disabled"
    ref="elUpload"
    action="#"
    :before-upload="beforeAvatarUpload"
    :http-request="httpRequest"
    :file-list="fileList"
    :on-preview="onPreview"
    :on-remove="onRemove"
    :before-remove="beforeRemove"
  >
    <el-button :type="btnType" size="small">
      <slot>点击上传</slot>
    </el-button>
    <div class="el-upload__tip" slot="tip" v-if="btnType !== 'text'">
      {{ tipContent || computedFileTypeText }}
    </div>
  </el-upload>
  <files-list v-else :fileJson="value" :isSimpleEmpty="isSimpleEmpty" />
</template>
<script>
import { uploadToId } from '@/apis/gtree'
export default {
  name: 'upload-button',
  props: {
    value: { type: [Array, String] },
    fileType: { type: Array, default: () => [] },
    fileSize: { type: Number, default: 100 }, // M为单位
    limit: { type: Number, default: 0 },
    disabled: {
      type: Boolean,
      default: false,
    },
    tipContent: { type: String },
    isJson: { type: Boolean, default: false },
    btnType: { type: String, default: 'primary' },
    // 新增外部获取文件后上传, 一般都是单个文件
    isEmitFile: { type: Boolean, default: false },
    // 是否仅展示简单的   暂无文件  文案，不展示缺省图
    isSimpleEmpty: { type: Boolean, default: false },
  },
  data() {
    return {
      fileList: [],
      timer: null,
    }
  },
  computed: {
    computedFileTypeText() {
      let text = ''
      if (this.fileSize) {
        text = `单文件不超过${this.fileSize}M`
      }

      if (this.fileType.length) {
        const typeText = `只能上传${this.fileType.join(' ')}文件`
        this.fileSize ? (text += `, 且${typeText}`) : (text = typeText)
      }
      return text
    },
    isHideUpload() {
      if (this.disabled) return true
      if (
        this.limit &&
        this.fileList?.length &&
        this.limit <= this.fileList?.length
      ) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    value: {
      handler(n) {
        this.fileList = this.isJson
          ? n && typeof n === 'string'
            ? JSON.parse(n)
            : []
          : n || []
      },
      immediate: true,
    },
  },
  methods: {
    formateFileToJson(list) {
      return this.isJson ? (list.length > 0 ? JSON.stringify(list) : '') : list
    },
    onRemove(file) {
      console.log(file)
      if (file && file.status === 'success') {
        this.fileList.splice(
          this.fileList.findIndex((item) => item.id === file.id),
          1
        )
        this.$emit('input', this.formateFileToJson(this.fileList))
        this.$parent.$emit('el.form.change')
        this.isEmitFile && this.$emit('removeFile')
      }
    },
    beforeRemove(file) {
      console.log('beforeRemove-file', file)
      if (!file.id && file.status === 'uploading') {
        this.$message.warning('文件正在上传，请勿删除')
        return false
      } else {
        return true
      }
    },
    onPreview(file) {
      window.open(file.url)
    },
    httpRequest(file) {
      let fileObj = file.file
      let formData = new FormData()
      formData.append('file', fileObj)
      formData.append('extName', fileObj.name)
      if (this.isEmitFile) {
        this.fileList = [{ name: fileObj.name }]
        this.$emit('fileHttpRequest', file)
        return
      }
      let uid = fileObj.uid
      let idx = this.$refs.elUpload?.uploadFiles.findIndex(
        (item) => item.uid === uid
      )
      console.log('this.$refs.elUpload', this.$refs.elUpload)
      console.log('idxidxidx', idx)
      // 增加进度条，httpRequest好像没有进度条
      this.setProgress(idx, 0, 'uploading')
      this.stepProgress(idx)
      uploadToId(formData)
        .then((res) => {
          res.name = res.fileName
          this.fileList.push(res)
          this.clearTimer()
          this.setProgress(idx, 100, 'success')
          // 抛出数据
          this.$emit('input', this.formateFileToJson(this.fileList))
          this.$parent.$emit('el.form.change')
        })
        .catch(() => {
          this.$refs.elUpload &&
            (this.$refs.elUpload.uploadFiles[idx].status = 'fail')
          this.$refs.elUpload?.uploadFiles.splice(idx, 1)
        })
    },
    beforeAvatarUpload(file) {
      if (this.limit) {
        const len = this.fileList.length
        if (len >= this.limit) {
          this.$message.error(
            `最多支持${this.limit}个文件上传，当前已经上传${len}个文件`
          )
          return false
        }
      }
      let fileName = file.name
      let pos = fileName.lastIndexOf('.')
      let lastName = fileName.substring(pos, fileName.length)

      if (
        this.fileType.length &&
        !this.fileType.includes(lastName.toLowerCase())
      ) {
        this.$message.error('文件格式不正确')
        return false
      }

      if (this.fileSize) {
        const isLimitSize = file.size / 1024 / 1024 <= this.fileSize
        if (!isLimitSize) {
          this.$message.warning(`请上传大小不超过${this.fileSize}M的文件`)
          return false
        }
      }
    },
    // 进度条相关
    stepProgress(idx) {
      this.clearTimer()
      this.timer = setInterval(() => {
        const flag =
          this.$refs.elUpload?.uploadFiles[idx] &&
          this.$refs.elUpload.uploadFiles[idx].percentage
        if (flag || flag === 0) {
          this.$refs.elUpload.uploadFiles[idx].percentage < 90 &&
            (this.$refs.elUpload.uploadFiles[idx].percentage += 10)
        }
      }, 500)
    },
    setProgress(idx, percent, status) {
      const flag =
        this.$refs.elUpload?.uploadFiles[idx] &&
        this.$refs.elUpload.uploadFiles[idx].percentage
      if (flag || flag === 0) {
        this.$refs.elUpload.uploadFiles[idx].percentage = percent
        this.$refs.elUpload.uploadFiles[idx].status = status
      }
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
  },
  destroyed() {
    this.clearTimer()
  },
}
</script>
<style lang="scss" scoped>
.el-upload__tip {
  color: #aaa;
  // 被 .el-form-item--small .el-form-item__content 的 line-height:32px 撑高了
  line-height: 1;
}
</style>
