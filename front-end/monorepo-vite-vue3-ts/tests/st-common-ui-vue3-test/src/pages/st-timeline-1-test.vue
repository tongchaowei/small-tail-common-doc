<script setup lang="ts">
import {StTimeline1, StTimelineItem1} from "st-common-ui-vue3"
import {timelineData} from './st-timeline-1-test-data'
</script>

<template>
  <div class="st-timeline-1-test">
    <st-timeline1
      :timeline-data="[...timelineData, ...timelineData].map(item => item.title)"
      :timeline-per-view="3"
      :timeline-text-max-line="2"
    >
      <StTimelineItem1
        v-for="(item, index) in [...timelineData, ...timelineData]"
        :key="index"
        :idx="index"
        :bg-img-src="item.bgImgSrc"
        :title="item.title"
        :desc="item.desc"
      ></StTimelineItem1>
    </st-timeline1>
  </div>
</template>

<style scoped>

</style>
