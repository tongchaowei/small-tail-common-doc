<script setup lang="ts">
import StClickParticleBombContainer from "../StClickParticleBombContainer"
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
    // 动画执行速度
    speed?: number;
    // 是否开启点击时执行气泡粒子动画
    click?: boolean;
    // 是否开启鼠标移动时执行气泡粒子动画
    move?: boolean;
  }>(),
  {
    width: "100%",
    height: "100%",
    particleCount: 50,
    particleMaxSize: 20,
    particleMinSize: 5,
    offsetInitial: 20,
    offsetEnd: 200,
    particleColor: '#0a87ff',
    particleColorRandom: false,
    evenEmpty: true,
    particleZIndex: 'initial',
    speed: 1000,
    click: true,
    move: false,
  }
)

/**
 * 设置粒子样式的处理函数
 *
 * @param {HTMLElement} particleEl 粒子元素
 * @param {number} idx 粒子的索引
 */
const setParticleStyleHandler = (particleEl: HTMLElement, idx: number) => {
  // 设置粒子的大小
  const particleSize = randomNumUtil.randomInt_n_m(props.particleMinSize, props.particleMaxSize) + 'px'
  particleEl.style.width = particleSize
  particleEl.style.height = particleSize
  // 设置粒子的背景和边框
  const particleColor = props.particleColorRandom ?
    `rgb(${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)}, ${randomNumUtil.randomInt_0_n(255)})`:
    props.particleColor
  if (props.evenEmpty) {
    particleEl.style.background = idx % 2 === 0 ? 'transparent' : particleColor
    particleEl.style.border = idx % 2 === 0 ? `1px solid ${particleColor}` : 'none'
  } else {
    particleEl.style.background = particleColor
  }
}
</script>

<template>
  <div
    class="st-click-bubble-particle-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <StClickParticleBombContainer
      :particle-count="particleCount"
      :offset-initial="offsetInitial"
      :offset-end="offsetEnd"
      :set-particle-style-handler="setParticleStyleHandler"
      :particle-z-index="particleZIndex"
      :speed="speed"
      :click-particle-bomb="click"
      :move-particle-bomb="move"
    >
      <slot></slot>
    </StClickParticleBombContainer>
  </div>
</template>

<style lang="scss">

</style>
