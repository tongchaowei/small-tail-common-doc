<script setup lang="ts">
import {StGradientBg1, StInfoCard2} from "st-common-ui-vue3"
import {ref} from 'vue'

const imgSrcArr = ref(['/images/bgs/1.webp', '/images/bgs/2.jpeg', '/images/bgs/3.jpg'])
</script>

<template>
  <div class="st-info-card-2-test w-full h-screen">
    <st-gradient-bg1 class="box-border p-4 overscroll-auto flex-center flex-wrap gap-4">
      <div
        v-for="(imgSrc, index) in imgSrcArr"
        :key="index"
        class="w-[500px] bg-white rounded-lg"
      >
        <StInfoCard2
          :img-src="imgSrc"
          :img-height="300"
          :title="'Title'"
          :content="'lorem ipsum dolor sit amet lorem ipsum lorem ipsum dolor sit amet lorem ipsum'.repeat((index + 1) * 2)"
        />
      </div>
    </st-gradient-bg1>
  </div>
</template>

<style scoped>

</style>
