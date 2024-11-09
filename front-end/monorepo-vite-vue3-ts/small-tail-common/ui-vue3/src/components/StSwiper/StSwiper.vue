<script setup lang="ts">
import {onMounted} from 'vue'
import Swiper from 'swiper'

onMounted(() => {
  new Swiper('.st-swiper', {
    autoplay: true,
  })
})
</script>

<template>
  <div class="st-swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-swiper {
  overflow: hidden;
}
</style>
