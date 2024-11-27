<script setup lang="ts">
import {StHoverFleetingContainer} from "st-common-ui-vue3"
</script>

<template>
  <div class="st-hover-fleeting-container-test w-full h-screen bg-[#333] flex justify-center items-center">
    <div class="st-hover-fleeting-container-box w-sm h-sm">
      <StHoverFleetingContainer
        :shine="false"
        :blur-border="true"
      >
        <div class="w-full h-full flex justify-center items-center text-white font-bold text-lg">StHoverFleetingContainer</div>
      </StHoverFleetingContainer>
    </div>
  </div>
</template>

<style scoped>

</style>
