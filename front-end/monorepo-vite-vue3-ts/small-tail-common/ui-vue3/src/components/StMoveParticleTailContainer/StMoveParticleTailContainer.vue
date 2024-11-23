<script setup lang="ts">
import StCapturePointerContainer from "../StCapturePointerContainer"
import {elSizeUtil} from "st-common-ui-utils"
import {randomNumUtil} from 'st-common-core'

/**
 * 组件配置选项
 */
defineOptions({
  name: "StMoveParticleTailContainer",
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
    // 粒子个数
    particleCount?: number;
    // 粒子的样式 class 类名
    particleClass?: string;
    // 点击时，粒子初始位置相对于点击位置的偏移量，粒子的横纵坐标会在点击位置基础上偏移 [0, offset]
    offsetInitial?: number;
    // 动画结束时，粒子初始位置相对于点击位置的偏移量
    offsetEnd?: number;
    /**
     * 设置粒子样式的处理函数
     *
     * @param {HTMLElement} particleEl 粒子元素
     * @param {number} idx 粒子的索引
     */
    setParticleStyleHandler: (particleEl: HTMLElement, idx: number) => void
    // 粒子层级
    particleZIndex?: number | string;
    // 动画执行速度
    speed?: number;
    // 是否开启点击时产生粒子效果
    click?: boolean;
    // 是否开启鼠标移动时产生粒子效果
    move?: boolean;
  }>(),
  {
    width: "100%",
    height: "100%",
    particleCount: 10,
    particleClass: '',
    offsetInitial: 20,
    offsetEnd: 200,
    setParticleStyleHandler: () => {},
    particleZIndex: 'initial',
    speed: 1000,
    click: false,
    move: true,
  }
)

/**
 * 生成粒子的处理函数
 *
 * @param {number} x 事件触发时 pointer 位置的 x 坐标
 * @param {number} y 事件触发时 pointer 位置的 y 坐标
 * @param {HTMLDivElement} containerEl 捕获点击事件的容器元素
 */
const genParticleHandler = (x: number, y: number, containerEl: HTMLDivElement) => {
  // 创建粒子元素，并添加到捕获点击事件的容器元素中
  for (let i = 0; i < props.particleCount; i++) {
    // 创建粒子元素
    const particle = document.createElement("i")
    // 添加类名
    particle.classList.add("st-move-particle-tail-container__particle")
    if (props.particleClass) particle.classList.add(props.particleClass)
    // 设置粒子的初始位置
    const offsetInitialX = randomNumUtil.randomInt_0_n(props.offsetInitial)
    const offsetInitialY = randomNumUtil.randomInt_0_n(props.offsetInitial)
    particle.style.left = x + offsetInitialX + "px"
    particle.style.top = y + offsetInitialY + "px"
    // 设置粒子动画结束时的位置
    const offsetEndX = randomNumUtil.randomInt_0_n(props.offsetEnd)
    const offsetEndY = randomNumUtil.randomInt_0_n(props.offsetEnd)
    particle.style.setProperty("--end-x", x + offsetEndX + 'px')
    particle.style.setProperty("--end-y", y + offsetEndY + 'px')
    // 设置粒子样式
    props.setParticleStyleHandler(particle, i)
    // 设置粒子的层级
    particle.style.zIndex = props.particleZIndex + ''
    // 设置粒子动画的执行时间
    particle.style.animationDuration = props.speed + "ms"
    // 添加粒子元素到捕获点击事件的容器元素中
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
    class="st-move-particle-tail-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <StCapturePointerContainer
      :capture-on-pointer-down="click"
      :capture-on-pointer-move="move"
      @handlePointerEvent="genParticleHandler"
    >
      <slot></slot>
    </StCapturePointerContainer>
  </div>
</template>

<style lang="scss">
.st-move-particle-tail-container {
  position: relative;

  .st-move-particle-tail-container__particle {
    position: absolute;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    animation-name: st-move-particle-tail-container__particle-animation;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
}

@keyframes st-move-particle-tail-container__particle-animation {
  100% {
    opacity: 0;
    left: var(--end-x);
    top: var(--end-y);
  }
}
</style>
