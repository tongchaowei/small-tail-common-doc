<script setup lang="ts">
import {StTimeline1, StTimelineItem1} from 'st-common-ui-vue3'
// 导入背景图片 BASE64 字符串
import bg1 from '../images/bg-1.ts'
import bg2 from '../images/bg-2.ts'
import bg3 from "../images/bg-3.ts"

// 时间线数据
const timelineData = [
  {
    title: 'Small Tail Common UI Vue3',
    desc: '小尾巴通用 Vue3 UI 组件库',
    bgImg: bg1,
  },
  {
    title: 'StTimeline1',
    desc: '时间线组件',
    bgImg: bg2,
  },
  {
    title: 'StTimelineItem1',
    desc: '时间线子组件',
    bgImg: bg3,
  },
]
</script>

<template>
  <div class="timeline-1-demo">
    <StTimeline1 :timeline-data="timelineData.map(item => item.title)">
      <StTimelineItem1
        v-for="(item, index) in timelineData"
        :key="index"
        :idx="index"
        :title="item.title"
        :desc="item.desc"
        :bg-img-src="item.bgImg"
      >
        <template #suffix>
          <div class="timeline-1-demo__item__suffix">时间线数据展示组件的后缀内容区域 {{ index }}</div>
        </template>
      </StTimelineItem1>
    </StTimeline1>
  </div>
</template>

<style scoped lang="scss">
.timeline-1-demo {

  .timeline-1-demo__item__suffix {
    padding: 0 2rem;
  }
}
</style>
