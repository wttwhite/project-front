<template>
  <el-descriptions
    :class="['common-descriptions', padBottomClass]"
    :column="column"
    :colon="false"
    :direction="direction"
    :border="border"
    :size="size"
  >
    <el-descriptions-item
      v-for="(item, index) in descListInner"
      :key="index"
      :label="`${item.label ? item.label + (colon ? '：' : '') : ''}`"
      :span="item.span || 1"
      :labelClassName="['label-ellipsis']"
      :contentClassName="[item.isEllipsis && 'content-ellipsis']"
    >
      <!-- 附件 -->
      <span v-if="item.type === 'upload-files-json'">
        <upload-button
          disabled
          :value="detailData[item.key]"
          :isSimpleEmpty="item.isSimpleEmpty"
        />
      </span>
      <!-- 图片 -->
      <span v-else-if="item.type === 'upload-imgs-json'">
        <upload-imgs-json disabled :value="detailData[item.key]" />
      </span>
      <!-- 布尔 -->
      <span v-else-if="item.type === 'boolean'">
        <span>{{
          detailData[item.key] === true
            ? item.booleanTrue
            : detailData[item.key] === false
            ? item.booleanFalse
            : ''
        }}</span>
      </span>
      <!-- 链接 -->
      <span v-else-if="item.type === 'a_black'">
        <a :href="detailData[item.key]" target="_blank">
          {{ detailData[item.key] }}
        </a>
      </span>
      <!-- 拼接 -->
      <span v-else-if="item.type === 'join'">
        <span v-for="(joinL, i) in item.joinList" :key="i">
          {{ joinL.key ? detailData[joinL.key] : '' }}
          {{ joinL.label ? joinL.label : '' }}
          <span v-if="i !== item.joinList.length - 1">
            <!-- 有值才拼接 -->
            {{ joinL.key && detailData[joinL.key] ? item.join || '-' : '' }}
          </span>
        </span>
      </span>
      <!-- 默认 -->
      <!-- 文本域的折行与省略号不能共存 -->
      <span
        v-else
        :class="[
          'textarea-detail-break-all',
          item.isEllipsis && 'value-ellipsis',
        ]"
        :style="customValueStyle"
        :title="
          item.isEllipsis
            ? item.func
              ? item.func(detailData)
              : detailData[item.key]
            : ''
        "
      >
        <el-tooltip
          v-if="item.tooltip"
          effect="dark"
          :content="item.tooltip"
          placement="top"
        >
          <img
            class="question-img"
            :src="require(`@/assets/imgs/question-small.png`)"
            width="16"
            height="16"
            alt=""
          />
        </el-tooltip>
        <span class="text">
          {{
            (item.func ? item.func(detailData) : detailData[item.key]) ||
            item.seat
          }}
          {{
            item.unit ? item.unit : item.unitKey ? detailData[item.unitKey] : ''
          }}
        </span>
      </span>
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
// 1. 支持简单的详情面板，复杂的自己模块里写
// {  label: '说明',
//    key: 'remark',
//    isEllipsis: true,  // 是否一行展示出现省略号，默认折行
//    type: '',  // 类型
//    unit: ''
//    unitKey: ''  // 单位, 取详情中的key
//    tooltip: '资产实用面积',  // 出现小问号
// },
// 2. 图片
// type: 'upload-imgs-json'
// isSimpleEmpty: true  // 没有文件时仅展示文案，不展示缺省图，循环的时候太占地儿了
// 4. 布尔
// type: 'boolean'
// booleanTrue: '是'
// booleanFalse: '否'
// 3. 字段拼接
// type: 'join',
// joinList: joinList: [
//   { key: 'assetName' }, // key: 从详情中获取值
//   { label: 'aaa' },  // label: 固定值
// ],
// join: '-',
// 4. 附件
// type === 'upload-files-json'
// 5. func
// 6. a链接
// type === 'a_black'
export default {
  name: 'hs-descriptions',
  props: {
    column: { type: Number, default: 3 },
    list: { type: Array, default: () => [] },
    detailData: { type: Object, default: () => {} },
    colon: { type: Boolean, default: true },
    direction: { type: String, default: 'horizontal' }, // vertical
    customValueStyle: { type: Object, default: () => {} },
    padBottomClass: { type: String, default: '' }, // pd8：下边距8px，默认16px
    border: { type: Boolean, default: false },
    size: { type: String, default: '' },
    seat: { type: String, default: '' }, // 占位
  },
  computed: {
    descListInner() {
      return this.list.filter((item) => !item.isHide)
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep .label-ellipsis {
  flex-shrink: 0;
}
::v-deep .el-descriptions-item__content {
  font-size: 14px;
  padding-left: 8px;
  position: relative;
}
.question-img {
  position: absolute;
  left: -3px;
  top: 1px;
}
.question-img + .text {
  display: inline-block;
  padding-left: 8px;
}
::v-deep .el-descriptions-item__label:not(.is-bordered-label) {
  margin-right: 0;
}
::v-deep .content-ellipsis {
  width: 100%;
  .value-ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    word-break: normal !important;
  }
}
.pd8.common-descriptions
  ::v-deep
  .el-descriptions--small:not(.is-bordered)
  .el-descriptions-item {
  padding-bottom: 8px;
}
</style>
