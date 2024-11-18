<script setup lang="ts">
import { ref } from 'vue'
import {elSizeUtil} from "st-common-ui-utils"
import {useElementBounding} from "@vueuse/core"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StClickWaveContainer',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 组件宽度
    width?: string | number;
    // 组件高度
    height?: string | number;
    // 波纹动画的执行速度，单位 ms
    speed?: number;
    // 波浪的颜色
    waveColor?: string;
    // 波浪的最大大小
    waveMaxSize?: number | string;
    // 波浪初始不透明度
    waveInitialOpacity?: number;
  }>(),
  {
    width: '100%',
    height: '100%',
    speed: 1000,
    waveColor: '#fff',
    waveMaxSize: '100%',
    waveInitialOpacity: 0.5,
  }
)

// 组件根元素引用对象
const stClickWaveContainerRef = ref<HTMLDivElement | null>(null)
// 组件根元素距离页面可视区域顶部和左侧的距离
const { top: stClickWaveContainerRefTop, left: stClickWaveContainerRefLeft } = useElementBounding(stClickWaveContainerRef)

/**
 * 组件点下事件处理函数
 */
const pointerdownHandler = (event: PointerEvent) => {
  // 获取组件根元素
  const stClickWaveContainerEl = stClickWaveContainerRef.value as HTMLDivElement
  // 创建一个波纹元素设置其出现位置并添加到组件根元素
  const waveEl = document.createElement('div')
  waveEl.classList.add('st-click-wave-container__wave')
  waveEl.style.left = (event.clientX - stClickWaveContainerRefLeft.value) + 'px'
  waveEl.style.top = (event.clientY - stClickWaveContainerRefTop.value) + 'px'
  waveEl.style.background = props.waveColor
  waveEl.style.animationDuration = props.speed +'ms'
  stClickWaveContainerEl.appendChild(waveEl)
  // 动画结束后移除波纹元素
  setTimeout(() => {
    stClickWaveContainerEl.removeChild(waveEl)
  }, props.speed)
}
</script>

<template>
  <div
    ref="stClickWaveContainerRef"
    class="st-click-wave-container"
    :style="{
      '--wave-max-size': elSizeUtil.elSizePreHandler(waveMaxSize),
      '--wave-initial-opacity': waveInitialOpacity,
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
    @pointerdown="pointerdownHandler"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">
.st-click-wave-container {
  position: relative;
  overflow: hidden;

  .st-click-wave-container__wave {
    position: absolute;
    transform: translate(-50%, -50%);
    background-position: center center;
    border-radius: 50%;
    pointer-events: none;
    animation-name: st-click-wave-container-waving;
    animation-timing-function: ease-out;
  }
}

@keyframes st-click-wave-container-waving {
  0% {
    width: 0;
    height: 0;
    opacity: var(--wave-initial-opacity);
  }
  100% {
    width: var(--wave-max-size);
    height: var(--wave-max-size);
    opacity: 0;
  }
}
</style>
