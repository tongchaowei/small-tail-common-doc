<script setup lang="ts">
import StCapturePointerContainer from "../StCapturePointerContainer"
import {elSizeUtil} from "st-common-ui-utils"
import {randomNumUtil} from 'st-common-core'

/**
 * 组件配置选项
 */
defineOptions({
  name: "StClickBubbleParticleContainer",
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
    // 动画执行速度
    speed?: number;
    // 粒子个数
    particleCount?: number;
    // 粒子的最大大小
    particleMaxSize?: number;
    // 粒子的最小大小
    particleMinSize?: number;
    // 点击时，粒子初始位置相对于点击位置的偏移量，粒子的横纵坐标会在点击位置基础上偏移 [-offset, offset]
    offsetInitial?: number;
    // 动画结束时，粒子初始位置相对于点击位置的偏移量
    offsetEnd?: number;
    // 粒子的颜色
    particleColor?: string;
    // 是否开启粒子颜色随机
    particleColorRandom?: boolean;
    // 是否开启偶数粒子为空心只具有边框颜色
    evenEmpty?: boolean;
    // 粒子层级
    particleZIndex?: number | string;
  }>(),
  {
    width: "100%",
    height: "100%",
    speed: 1000,
    particleCount: 50,
    particleMaxSize: 20,
    particleMinSize: 5,
    offsetInitial: 20,
    offsetEnd: 200,
    particleColor: '#0a87ff',
    particleColorRandom: false,
    evenEmpty: true,
    particleZIndex: 'initial',
  }
)

/**
 * 生成粒子的处理函数
 *
 * @param {number} x 点击时点击位置的 x 坐标
 * @param {number} y 点击时点击位置的 y 坐标
 * @param {HTMLDivElement} containerEl 捕获点击事件的容器元素
 */
const genParticleHandler = (x: number, y: number, containerEl: HTMLDivElement) => {
  // 创建粒子元素，并添加到捕获点击事件的容器元素中
  for (let i = 0; i < props.particleCount; i++) {
    const particle = document.createElement("i")
    particle.classList.add("st-click-bubble-particle-container__particle")
    const particleSize = randomNumUtil.randomInt_n_m(props.particleMinSize, props.particleMaxSize) + 'px'
    particle.style.width = particleSize
    particle.style.height = particleSize
    const offsetInitialX = randomNumUtil.randomInt_n_m(-1 * props.offsetInitial, props.offsetInitial)
    const offsetInitialY = randomNumUtil.randomInt_n_m(-1 * props.offsetInitial, props.offsetInitial)
    particle.style.left = x + offsetInitialX + "px"
    particle.style.top = y + offsetInitialY + "px"
    const offsetEndX = randomNumUtil.randomInt_n_m(-1 * props.offsetEnd, props.offsetEnd)
    const offsetEndY = randomNumUtil.randomInt_n_m(-1 * props.offsetEnd, props.offsetEnd)
    particle.style.setProperty("--end-x", x + offsetEndX + 'px')
    particle.style.setProperty("--end-y", y + offsetEndY + 'px')
    particle.style.animationDuration = props.speed + "ms"
    const particleColor = props.particleColorRandom ?
      `rgb(${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)})`:
      props.particleColor
    if (props.evenEmpty) {
      particle.style.background = i % 2 === 0 ? 'transparent' : particleColor
      particle.style.border = i % 2 === 0 ? `1px solid ${particleColor}` : 'none'
    } else {
      particle.style.background = particleColor
    }
    particle.style.zIndex = props.particleZIndex + ''
    containerEl.appendChild(particle)
    // 动画执行结束移除粒子元素
    setTimeout(() => {
      particle.remove()
    }, props.speed)
  }
}
</script>

<template>
  <div
    ref="stClickBubbleParticleContainerRef"
    class="st-click-bubble-particle-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <StCapturePointerContainer
      capture-on-pointer-down
      @handlePointerEvent="genParticleHandler"
    >
      <slot></slot>
    </StCapturePointerContainer>
  </div>
</template>

<style lang="scss">
.st-click-bubble-particle-container {
  position: relative;

  .st-click-bubble-particle-container__particle {
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation-name: st-click-bubble-particle-container__particle-animation;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
}

@keyframes st-click-bubble-particle-container__particle-animation {
  100% {
    opacity: 0;
    left: var(--end-x);
    top: var(--end-y);
  }
}
</style>
