<template>
  <hs-card class="flow-record" :hasTitle="false">
    <section class="timeline-box" v-if="list && list.length">
      <div class="single-item" v-for="(item, index) in list" :key="index">
        <div class="time-box">
          <img
            :src="
              require(`@/assets/imgs/time-line${
                index === 0 ? '-active' : ''
              }.png`)
            "
          />
          <span class="time">{{ item.finishTime }}</span>
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
  name: 'time-line',
  props: {
    list: {
      type: Array,
      default: () => [
        {
          finishTime: '2022-08-01 12:00:00',
          taskName: '任务名称',
          assigneeName: '张三',
          commentType: '同意',
          message: '同意',
          typeName: '审批人',
        },
        {
          finishTime: '2022-08-01 12:00:00',
          taskName: '任务名称',
          assigneeName: '张三',
          commentType: '同意',
          message: '同意',
          typeName: '审批人',
        },
      ],
    },
  },
  components: {},
  data() {
    return {
      descList: [
        { label: '处理人', key: 'typeName' },
        { label: '处理结果', key: 'message' },
        { label: '处理意见', key: 'message' },
      ],
    }
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
