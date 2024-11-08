<script setup lang="ts">
import {StDynamicBorder1} from 'st-common-ui-vue3'
</script>

<template>
  <div class="dynamic-border-1-demo-1">
    <StDynamicBorder1
      :width="150"
      :height="150"
      :border-color-list="[
        'red 0%', 'red 12.5%',
        'transparent 12.5%', 'transparent 25%',
        'green 25%', 'green 37.5%',
        'transparent 37.5%', 'transparent 50%',
        'yellow 50%', 'yellow 62.5%',
        'transparent 62.5%', 'transparent 75%',
        'blue 75%', 'blue 87.5%',
        'transparent 87.5%', 'transparent 100%'
      ]"
    >
      <div class="st-dynamic-border-1__content box-bg">
        多段边框
      </div>
    </StDynamicBorder1>
  </div>
</template>

<style scoped lang="scss">
.dynamic-border-1-demo-1 {
  margin-top: 1rem;

  .st-dynamic-border-1__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
