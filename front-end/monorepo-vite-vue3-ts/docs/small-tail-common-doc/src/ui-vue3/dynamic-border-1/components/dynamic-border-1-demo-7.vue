<script setup lang="ts">
import {StDynamicBorder1} from 'st-common-ui-vue3'
</script>

<template>
  <div class="dynamic-border-1-demo-1">
    <StDynamicBorder1 :width="150" :height="150" hover-pause>
      <div class="st-dynamic-border-1__content box-bg">Hover 时暂停边框动效</div>
    </StDynamicBorder1>
  </div>
</template>

<style scoped lang="scss">
.dynamic-border-1-demo-1 {
  margin-top: 1rem;

  .st-dynamic-border-1__content {
    width: 100%;
    height: 100%;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
