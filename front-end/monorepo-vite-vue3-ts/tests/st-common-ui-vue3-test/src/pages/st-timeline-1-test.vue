<script setup lang="ts">
import {StTimeline1} from "st-common-ui-vue3"
import {timelineData} from './st-timeline-1-test-data'
</script>

<template>
  <div class="st-timeline-1-test">
    <st-timeline1
      :data="timelineData"
      :timelinePerView="1"
    ></st-timeline1>
  </div>
</template>

<style scoped>

</style>
