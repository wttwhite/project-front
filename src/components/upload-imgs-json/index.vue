<template>
  <!-- 
    图片回显需要使用URL 接口返回url并不是完整路径 需要处理 所以将fullUrl赋值给url
    使用ids所以暂时没有影响
    不用fullUrl
   -->
  <section>
    <el-upload
      v-if="!isShowEmpty"
      :class="[isHideUpload ? 'hide' : '', disabled ? 'isDetail' : '']"
      ref="elUpload"
      list-type="picture-card"
      action="#"
      :file-list="fileList"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :before-remove="beforeRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-empty v-else description="暂无图片" :image-size="100" />
    <image-viewer
      v-if="previewVisible"
      :urlList="previewSrcList"
      :on-close="previewClose"
      :z-index="2100"
    />
  </section>
</template>
<script>
import { uploadToId } from '@/apis/gtree'
// 有需求的时候再下载对应组件
// import { addWatermarkToImageFile } from '@/utils/watermark'
import dayjs from 'dayjs'
import ImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'upload-imgs-json',
  components: { ImageViewer },
  props: {
    value: { type: String, default: '' },
    fileType: { type: Array, default: () => ['.jpg', '.jpeg', '.png'] },
    fileSize: { type: Number, default: 100 }, // M为单位
    limit: { type: Number, default: 1 },
    disabled: { type: Boolean, default: false },
    tipContent: { type: String },
    hasWater: { type: Boolean, default: false },
    // 默认 登录人 + 时间
    markStr: { type: String, default: '' },
    watermarkOptions: {
      type: Object,
      default: () => ({
        // text: '我新增了一个水印', 用markStr字段拼接
        font: '20px Arial',
        color: '#ccc',
        opacity: 0.5,
        rotate: -20, // 倾斜角度
        repeatNum: 4, // 重复次数
      }),
    },
  },
  data() {
    return {
      fileList: [],
      timer: null,
      previewVisible: false,
      previewSrcList: [],
    }
  },
  computed: {
    computedFileTypeText() {
      let text = ''
      if (this.fileSize) {
        text = `单文件不超过${this.fileSize}M`
      }

      if (this.fileType.length) {
        const typeText = `只能上传${this.fileType.join(',')}文件`
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
    isShowEmpty() {
      if (!this.disabled) return false
      return this.disabled && this.fileList?.length === 0
    },
  },
  mounted() {},
  watch: {
    value: {
      handler(n) {
        if (n && typeof n === 'string') {
          this.fileList = JSON.parse(n)
        } else {
          this.fileList = []
        }
      },
      immediate: true,
    },
  },
  methods: {
    formateFileToJson(list) {
      return JSON.stringify(list)
    },
    onRemove(file) {
      if (file && file.status === 'success') {
        this.fileList.splice(
          this.fileList.findIndex((item) => item.id === file.id),
          1
        )
        this.$emit('input', this.formateFileToJson(this.fileList))
      }
    },
    beforeRemove(file) {
      if (this.disabled) return false

      if (!file.id && file.status === 'uploading') {
        this.$message.warning('文件正在上传，请勿删除')
        return false
      } else {
        return true
      }
    },
    async httpRequest(file) {
      let fileObj = file.file
      let formData = new FormData()

      formData.append('extName', fileObj.name)
      let uid = fileObj.uid
      let idx = this.$refs.elUpload?.uploadFiles.findIndex(
        (item) => item.uid === uid
      )
      // 增加进度条，httpRequest好像没有进度条
      this.setProgress(idx, 0, 'uploading')
      this.stepProgress(idx)
      // 如果有水印内容，则使用水印上传
      try {
        // 在这里添加水印代码 传入fileObj
        if (this.hasWater) {
          // let watermarkedFile = await addWatermarkToImageFile(fileObj, {
          //   ...this.watermarkOptions,
          //   text: await this.getMarkStr(),
          // })
          // formData.append('file', watermarkedFile)
        } else {
          formData.append('file', fileObj)
        }
        const uploadFileData = await uploadToId(formData)
        uploadFileData.name = uploadFileData.fileName
        this.fileList.push({ ...uploadFileData })
        this.clearTimer()
        this.setProgress(idx, 100, 'success')
        // 抛出数据
        this.$emit('input', this.formateFileToJson(this.fileList))
      } catch (error) {
        this.$refs.elUpload &&
          (this.$refs.elUpload.uploadFiles[idx].status = 'fail')
        this.$refs.elUpload?.uploadFiles.splice(idx, 1)
      }
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
        // this.$message.error(this.computedFileTypeText)
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
    async getMarkStr() {
      if (this.markStr) {
        return this.markStr
      } else {
        await this.$store.dispatch('getCurrentUser')
        const str = this.$store.state.user.userInfo.name
        return `${str} ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
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
    onPreview(file) {
      // window.open(file.url)
      this.previewSrcList = this.fileList
        .filter((e) => e.url !== file.url)
        .map((e) => e.url)
      this.previewSrcList.unshift(file.url)
      this.previewVisible = true
    },
    previewClose() {
      this.previewVisible = false
    },
  },
  destroyed() {
    this.clearTimer()
  },
}
</script>
<style lang="scss" scoped>
::v-deep .el-empty__description {
  margin-top: 12px;
  p {
    color: #d8d8d8;
  }
}
::v-deep .el-upload-list--picture-card .el-upload-list__item,
::v-deep .el-upload--picture-card {
  width: 122px;
  height: 122px;
}
::v-deep .el-upload--picture-card {
  line-height: 122px;
}
.hide {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
.isDetail {
  ::v-deep .el-upload-list__item-delete,
  ::v-deep .el-upload-list__item .el-icon-close-tip {
    display: none !important;
  }
  // 详情的时候去掉成功的角标
  ::v-deep .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
  }
}
</style>
