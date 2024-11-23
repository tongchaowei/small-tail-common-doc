<script setup lang="ts">
import {StClickRippleContainer} from 'st-common-ui-vue3'
</script>

<template>
  <div class="st-click-wave-container-test w-full h-screen flex justify-center items-center">
    <div class="w-md h-md bg-gray-200">
      <StClickRippleContainer
        :ripple-color="'linear-gradient(to right, #ff0052, #ff7a00)'"
        ripple-color-random
        :ripple-overflow-hidden="false"
        enter
        leave
      ></StClickRippleContainer>
    </div>
  </div>
</template>

<style scoped>

</style>
