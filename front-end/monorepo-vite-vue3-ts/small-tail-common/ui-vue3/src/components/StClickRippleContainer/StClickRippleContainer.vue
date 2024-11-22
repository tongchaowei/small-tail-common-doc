<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import StCapturePointerContainer from "../StCapturePointerContainer"
import {randomNumUtil} from 'st-common-core'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StClickRippleContainer',
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
    // 动画的执行速度，单位 ms
    speed?: number;
    // 涟漪的颜色
    rippleColor?: string;
    // 是否开启涟漪颜色随机
    rippleColorRandom?: boolean;
    // 涟漪的最大大小
    rippleMaxSize?: number | string;
    // 涟漪的宽度
    rippleWidth?: number | string;
    // 涟漪初始不透明度
    rippleInitialOpacity?: number;
    // 涟漪的层级
    rippleZIndex?: number | string;
    // 是否开启涟漪溢出隐藏
    rippleOverflowHidden?: boolean;
    // 是否在 click 时执行动画
    click?: boolean;
    // 是否在移入组件时执行动画
    enter?: boolean;
    // 是否在移出组件时执行动画
    leave?: boolean;
  }>(),
  {
    width: '100%',
    height: '100%',
    speed: 1000,
    rippleColor: '#fff',
    rippleColorRandom: false,
    rippleMaxSize: '100%',
    rippleWidth: '2px',
    rippleInitialOpacity: 1,
    rippleZIndex: 'initial',
    rippleOverflowHidden: true,
    click: true,
    enter: false,
    leave: false,
  }
)

/**
 * 添加涟漪动画处理函数
 *
 * @param {number} x pointer 事件在组件中的 x 坐标
 * @param {number} y pointer 事件在组件中的 y 坐标
 * @param {HTMLDivElement} containerRootEl 捕获 pointer 事件的容器根元素
 */
const addRippleAnimationHandler = (x: number, y: number, containerRootEl: HTMLDivElement) => {
  // 创建一个涟漪元素设置其出现位置并添加到组件中
  const rippleEl = document.createElement('div')
  rippleEl.classList.add('st-click-ripple-container__ripple')
  rippleEl.style.left = x + 'px'
  rippleEl.style.top = y + 'px'
  rippleEl.style.zIndex = props.rippleZIndex + ''
  const rippleColor = props.rippleColorRandom ?
    `rgb(${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)})` :
    props.rippleColor
  rippleEl.style.border = `${props.rippleWidth} solid ${rippleColor}`
  rippleEl.style.animationDuration = props.speed + 'ms'
  containerRootEl.appendChild(rippleEl)
  // 动画结束后移除涟漪元素
  setTimeout(() => {
    containerRootEl.removeChild(rippleEl)
  }, props.speed)
}
</script>

<template>
  <div
    class="st-click-ripple-container"
    :style="{
      '--ripple-max-size': elSizeUtil.elSizePreHandler(props.rippleMaxSize),
      '--ripple-initial-opacity': props.rippleInitialOpacity,
      width: elSizeUtil.elSizePreHandler(props.width),
      height: elSizeUtil.elSizePreHandler(props.height),
      overflow: rippleOverflowHidden ? 'hidden' : 'initial',
    }"
  >
    <StCapturePointerContainer
      :capture-on-pointer-down="click"
      :capture-on-pointer-enter="enter"
      :capture-on-pointer-leave="leave"
      @handlePointerEvent="addRippleAnimationHandler"
    >
      <template #default>
        <slot></slot>
      </template>
    </StCapturePointerContainer>
  </div>
</template>

<style lang="scss">
.st-click-ripple-container {
  position: relative;

  .st-click-ripple-container__ripple {
    position: absolute;
    transform: translate(-50%, -50%);
    background-position: center center;
    border-radius: 50%;
    pointer-events: none;
    animation-name: st-click-ripple-container-rippling;
    animation-timing-function: ease-out;
  }
}

@keyframes st-click-ripple-container-rippling {
  0% {
    width: 0;
    height: 0;
    opacity: var(--ripple-initial-opacity);
  }
  100% {
    width: var(--ripple-max-size);
    height: var(--ripple-max-size);
    opacity: 0;
  }
}
</style>
