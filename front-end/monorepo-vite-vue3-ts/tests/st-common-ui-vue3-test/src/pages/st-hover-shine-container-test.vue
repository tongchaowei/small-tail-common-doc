<script setup lang="ts">
import {StHoverShineContainer} from'st-common-ui-vue3'
</script>

<template>
  <div class="st-click-wave-container-test w-full h-screen bg-black flex justify-center items-center">
    <div class="w-md h-md">
      <StHoverShineContainer
        :wave-color="'linear-gradient(to right, #ff0052, #ff7a00)'"
        wave-color-random
        enter
        leave
      >
        <div>StHoverShineContainer</div>
      </StHoverShineContainer>
    </div>
  </div>
</template>

<style scoped>

</style>
