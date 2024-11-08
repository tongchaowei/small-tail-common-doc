<script setup lang="ts">
import {StDynamicBorder1} from 'st-common-ui-vue3'
</script>

<template>
  <div class="dynamic-border-1-demo-1">
    <StDynamicBorder1
      :width="150"
      :height="150"
      :border-color-list="['transparent', 'red 50%', 'transparent 50%', 'orange']"
    >
      <div class="st-dynamic-border-1__content box-bg">
        自定义边框颜色
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
