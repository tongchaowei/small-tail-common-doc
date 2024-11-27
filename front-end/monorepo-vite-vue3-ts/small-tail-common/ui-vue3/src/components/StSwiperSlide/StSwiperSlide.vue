<script setup lang="ts">
import {inject} from "vue"

/**
 * 注入父组件提供的状态
 */
// 是否为初始状态
const isInitial = inject('isInitial')
// 初始状态下展示的幻灯片的索引
const initialSlideIdx = inject('initialSlideIdx')
// 是否为幻灯片切换状态
const isSlideChange = inject('isSlideChange')
// 要进入浏览器可视区域的幻灯片的索引
const enterSlideIdx = inject('enterSlideIdx')
// 要离开浏览器可视区域的幻灯片的索引
const leaveSlideIdx = inject('leaveSlideIdx')
// 当前展示幻灯片的索引
const currentSlideIdx = inject('nowSlideIdx')
</script>

<template>
  <div class="swiper-slide">
    <div class="st-swiper-slide">
      <slot
        :isInitial="isInitial"
        :initialSlideIdx="initialSlideIdx"
        :isSlideChange="isSlideChange"
        :enterSlideIdx="enterSlideIdx"
        :leaveSlideIdx="leaveSlideIdx"
        :currentSlideIdx="currentSlideIdx"
      ></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-swiper-slide {
  width: 100%;
  height: 100%;
}
</style>
