<script setup lang="ts">
import {StGradientBg2, St3DTiltContainer} from "st-common-ui-vue3/src"
</script>

<template>
  <div class="st-3d-container-test w-full h-screen">
    <st-gradient-bg2 class="">
      <div class="w-full h-full flex justify-center items-center">
        <div class="st-3d-container-test__content w-md h-md">
          <St3DTiltContainer>
            <div class="w-full h-full flex justify-center items-center bg-sky-500 text-white"></div>
          </St3DTiltContainer>
        </div>
      </div>
    </st-gradient-bg2>
  </div>
</template>

<style scoped>

</style>
