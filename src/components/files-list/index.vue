<template>
  <section v-if="innerFileList.length" class="files-list">
    <div
      v-for="(file, index) in innerFileList"
      :key="index"
      class="file-box"
      @click="fileClick(file)"
    >
      <img src="@/assets/imgs/file-img.png" />
      <span class="file-name common-ellipsis" :title="file.fileName">{{
        file.fileName
      }}</span>
      <el-button type="text" @click="downloadFile(file)">
        <span class="download-text">下载</span>
      </el-button>
    </div>
  </section>
  <el-empty
    v-else
    description="暂无文件"
    :image-size="100"
    :class="[isSimpleEmpty && 'isSimpleEmpty']"
  />
</template>
<script>
import { downloadFileByUrl } from '@/utils/file'
export default {
  name: 'files-list',
  props: {
    fileJson: { type: String, default: '' },
    // 是否仅展示简单的   暂无文件  文案，不展示缺省图
    isSimpleEmpty: { type: Boolean, default: false },
  },
  watch: {
    fileJson: {
      handler(val) {
        this.innerFileList = val ? JSON.parse(val) : []
      },
      immediate: true,
    },
  },
  data() {
    return {
      innerFileList: [],
    }
  },
  methods: {
    fileClick(item) {
      if (item.fileType === 'image') {
        window.open(item.url)
      }
    },
    downloadFile(file) {
      downloadFileByUrl(file.url, file.fileName || file.name)
    },
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
.files-list {
  display: flex;
  flex-wrap: wrap;
}
.file-box {
  width: 360px;
  padding: 12px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  border: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 16px;
  .file-name {
    margin-left: 10px;
    padding-right: 12px;
    width: calc(100% - 116px);
  }
  .download-text {
    border-bottom: 1px solid #216dff;
  }
}
.el-empty.isSimpleEmpty {
  padding: 0;
  ::v-deep .el-empty__image {
    display: none;
  }
  ::v-deep .el-empty__description {
    margin-top: 0;
  }
}
</style>
