<script setup lang="ts">
import {StGradientBg2} from "st-common-ui-vue3"
</script>

<template>
  <div class="st-gradient-bg-2-test w-full h-screen bg-gray-900 flex justify-center items-center">
    <StGradientBg2 :blur="false" bg-color="transparent" :gradient-colors="['red']" class="text-bg bg-clip-text text-[#ffffff33] text-9xl font-bold">
      <div>123123</div>
    </StGradientBg2>
  </div>
</template>

<style scoped>
.text-bg {
  width: fit-content !important;
  height: fit-content !important;
}
</style>
