<script setup lang="ts">
import {StDynamicBorder1} from 'st-common-ui-vue3'
</script>

<template>
  <div class="dynamic-border-1-demo-1">
    <StDynamicBorder1
      :width="150"
      :height="150"
      custom-border-color
      shine
      :shine-range="20"
    >
      <div class="st-dynamic-border-1__content box-bg">
        荧光边框
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
