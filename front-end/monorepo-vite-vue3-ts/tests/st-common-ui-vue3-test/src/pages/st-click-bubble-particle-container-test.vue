<script setup lang="ts">
import {StClickBubbleParticleContainer} from'st-common-ui-vue3'
</script>

<template>
  <div class="st-click-wave-container-test w-full h-screen flex justify-center items-center">
    <div class="w-md h-md bg-gray-200">
      <StClickBubbleParticleContainer
        :particle-count="10"
        particle-color-random
        :click="false"
        move
      >
        StClickBubbleParticleContainer
      </StClickBubbleParticleContainer>
    </div>
  </div>
</template>

<style scoped>

</style>
