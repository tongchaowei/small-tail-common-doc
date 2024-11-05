<script setup lang="ts">
import {StInfoCard1, StGradientBg1} from 'st-common-ui-vue3'
import {ref} from 'vue'

const imgSrcArr = ref(['/images/bgs/1.webp', '/images/bgs/2.jpeg', '/images/bgs/3.jpg'])
</script>

<template>
  <div class="st-info-card-1-test w-full h-screen">
    <StGradientBg1 class="flex justify-center items-center gap-4 flex-wrap">
      <div
        v-for="(imgSrc, index) in imgSrcArr"
        :key="index"
        class="w-[350px] rounded-lg"
      >
        <StInfoCard1
          :img-src="imgSrc"
          :img-height="200"
          :title="'Title'"
          :content="'lorem ipsum dolor sit amet lorem ipsum lorem ipsum dolor sit amet lorem ipsum'.repeat(index + 1)"
        />
      </div>
    </StGradientBg1>
  </div>
</template>

<style scoped>

</style>
