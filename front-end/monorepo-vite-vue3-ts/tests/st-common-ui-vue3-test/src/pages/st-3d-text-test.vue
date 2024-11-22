<script setup lang="ts">
import {St3DText, StGradientBg2, St3DTiltContainer} from "st-common-ui-vue3"
</script>

<template>
  <div class="st-3d-text-test w-full h-screen">
    <StGradientBg2>
      <div class="w-full h-full flex justify-center items-center">
        <St3DTiltContainer width="100px" height="300px" full-page-listening>
          <St3DText :content="'Hello, World!'"/>
        </St3DTiltContainer>
      </div>
    </StGradientBg2>
  </div>
</template>

<style scoped>

</style>
