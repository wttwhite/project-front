<template>
  <hs-card class="flow-record" :hasTitle="false">
    <section class="timeline-box" v-if="activities && activities.length">
      <div class="single-item" v-for="(item, index) in activities" :key="index">
        <div class="time-box">
          <img
            :src="
              require(`@/assets/imgs/time-line${
                index === 0 ? '-active' : ''
              }.png`)
            "
          />
          <span class="time">{{ item.finishTime }}</span>
          <span v-if="index === 0 && !item.finishTime" class="process-name">
            处理中</span
          >
        </div>
        <div class="task-name" v-if="item.taskName">{{ item.taskName }}</div>
        <hs-descriptions
          :column="1"
          :list="[
            {
              label: '处理人',
              key: 'assigneeName',
              func: (row) => {
                return `${row.assigneeName || row.candidate || '--'}`
              },
            },
          ]"
          :detailData="item"
        />
        <hs-descriptions
          v-if="item.commentType"
          :column="1"
          :list="[{ label: '处理结果', key: 'commentType' }]"
          :detailData="item"
        />
        <hs-descriptions
          v-if="item.message"
          :column="1"
          :list="[{ label: '处理意见', key: 'message' }]"
          :detailData="item"
        />
      </div>
    </section>
    <el-empty v-else description="暂无数据" class="empty-box"></el-empty>
  </hs-card>
</template>

<script>
export default {
  name: 'flow-record',
  props: {
    finish: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      // CXTJ  提交（发起流程）
      // TJ  提交（发起流程）
      // SP  审批（审批通过）
      // TH  退回（审批被驳回）
      // ZF  作废（发起人作废）
      // WC  完成（完整流程通过）
      // CH  撤回（发起人撤回）
      // TG  自动跳过（尽量不要用，貌似有跳过的流程获取form数据会有部分表单数据丢失情况）
      commitType: {
        CXTJ: '重新提交',
        TJ: '提交',
        SP: '同意',
        TH: '不同意',
        ZF: '作废',
        CH: '撤销',
        TG: '跳过',
      },
      activities: [
        {
          taskName: '支持使用图标',
          timestamp: '2018-04-12 20:46',
          type: 'primary',
          color: '#0bbd87',
          icon: 'el-icon-more',
          name: 'sc',
          assigneeName: '研发部',
          nodeType: `<span style="color:red">操作类型：审批通过</span>`,
        },
        {
          taskName: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
          color: '#0bbd87',
          name: 'sc',
          assigneeName: '研发部',
        },
        {
          taskName: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          name: 'sc',
          assigneeName: '研发部',
        },
        {
          taskName: '默认样式的节点',
          timestamp: '2018-04-03 20:46',
          name: 'sc',
          assigneeName: '研发部',
        },
      ],
      descList: [
        { label: '处理人', key: 'typeName' },
        { label: '处理结果', key: 'message' },
        { label: '处理意见', key: 'message' },
      ],
    }
  },
  computed: {},
  watch: {
    list: {
      handler(val) {
        const list = JSON.parse(JSON.stringify(val)).reverse()
        this.activities = list?.map((item) => {
          return {
            ...item,
            commentType:
              item.comment && item.comment.type
                ? this.commitType[item.comment.type]
                : '',
            message:
              item.comment && item.comment.comment ? item.comment.comment : '',
          }
        })
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.flow-record {
  height: 100%;
  ::v-deep .el-card__body {
    height: 100%;
  }
  .timeline-box {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-left: 32px;
    padding-top: 28px;
  }
}
.single-item:not(:last-child) {
  border-left: 2px solid #ebeef5;
}
.single-item {
  padding-left: 186px;
  position: relative;
  padding-bottom: 30px;
  .time-box {
    position: absolute;
    left: -8px;
    display: flex;
    align-items: center;

    .time {
      margin-left: 16px;
      color: #8e959f;
    }
    .process-name {
      color: #216dff;
    }
  }
  .task-name {
    font-weight: 500;
    font-size: 16px;
    font-weight: bold;
    color: #363c44;
    line-height: 24px;
    margin-bottom: 12px;
    position: relative;
    top: -4px;
  }
}
</style>
