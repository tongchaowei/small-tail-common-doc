<script setup lang="ts">
import {StSwiper} from "st-common-ui-vue3"
import StSwiperSlide from 'st-common-ui-vue3/src/components/StSwiperSlide/StSwiperSlide.vue'
</script>

<template>
  <div class="st-swiper-test">
    <st-swiper navigation >
      <StSwiperSlide>Slide 1</StSwiperSlide>
      <StSwiperSlide>Slide 2</StSwiperSlide>
      <StSwiperSlide>Slide 3</StSwiperSlide>
    </st-swiper>
  </div>
</template>

<style lang="scss">
//.swiper-slide {
//  width: 100%;
//  height: 100vh;
//  background: #0c7a43;
//}
</style>
