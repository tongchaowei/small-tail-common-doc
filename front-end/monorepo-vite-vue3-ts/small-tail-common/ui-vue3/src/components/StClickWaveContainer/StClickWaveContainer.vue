<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import StCapturePointerContainer from "../StCapturePointerContainer"
import {randomNumUtil} from 'st-common-core'

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
    // 是否开启波浪颜色随机
    waveColorRandom?: boolean;
    // 波浪的最大大小
    waveMaxSize?: number | string;
    // 波浪初始不透明度
    waveInitialOpacity?: number;
    // 波浪的层级
    waveZIndex?: number | string;
    // 是否在 click 时执行波浪动画
    click?: boolean;
    // 是否在移入组件时执行波浪动画
    enter?: boolean;
    // 是否在移出组件时执行波浪动画
    leave?: boolean;
  }>(),
  {
    width: '100%',
    height: '100%',
    speed: 1000,
    waveColor: '#fff',
    waveColorRandom: false,
    waveMaxSize: '100%',
    waveInitialOpacity: 0.5,
    waveZIndex: 'initial',
    click: true,
    enter: false,
    leave: false,
  }
)

/**
 * 添加波纹动画处理函数
 *
 * @param {number} x pointer 事件在组件中的 x 坐标
 * @param {number} y pointer 事件在组件中的 y 坐标
 * @param {HTMLDivElement} containerRootEl 捕获 pointer 事件的容器根元素
 */
const addWaveAnimationHandler = (x: number, y: number, containerRootEl: HTMLDivElement) => {
  // 创建一个波纹元素设置其出现位置并添加到组件中
  const waveEl = document.createElement('div')
  waveEl.classList.add('st-click-wave-container__wave')
  waveEl.style.left = x + 'px'
  waveEl.style.top = y + 'px'
  waveEl.style.zIndex = props.waveZIndex + ''
  waveEl.style.background =
    props.waveColorRandom ?
      `rgb(${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)})` :
      props.waveColor
  waveEl.style.animationDuration = props.speed + 'ms'
  containerRootEl.appendChild(waveEl)
  // 动画结束后移除波纹元素
  setTimeout(() => {
    containerRootEl.removeChild(waveEl)
  }, props.speed)
}
</script>

<template>
  <div
    class="st-click-wave-container"
    :style="{
      '--wave-max-size': elSizeUtil.elSizePreHandler(props.waveMaxSize),
      '--wave-initial-opacity': props.waveInitialOpacity,
      width: elSizeUtil.elSizePreHandler(props.width),
      height: elSizeUtil.elSizePreHandler(props.height),
    }"
  >
    <StCapturePointerContainer
      :capture-on-pointer-down="click"
      :capture-on-pointer-enter="enter"
      :capture-on-pointer-leave="leave"
      @handlePointerEvent="addWaveAnimationHandler"
    >
      <template>
        <slot></slot>
      </template>
    </StCapturePointerContainer>
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
