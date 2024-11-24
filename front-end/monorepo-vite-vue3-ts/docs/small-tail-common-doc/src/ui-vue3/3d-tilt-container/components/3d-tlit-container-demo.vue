<script setup lang="ts">
import {St3DText, St3DTiltContainer} from 'st-common-ui-vue3'
</script>

<template>
  <div class="st-3d-tilt-container-demo">
    <St3DTiltContainer fullPageListening>
      <div class="st-3d-tilt-container__content">
        <St3DText content="Hello World! 你好，世界！" fontSize="3rem"/>
      </div>
    </St3DTiltContainer>
  </div>
</template>

<style scoped>
.st-3d-tilt-container-demo {
  height: 200px;
  background: #f5f5f5;
  border-radius: 1rem;
  overflow: hidden;
  line-height: 3rem;

  .st-3d-tilt-container__content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
  }
}
</style>
