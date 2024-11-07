<script setup lang="ts">
import {computed} from 'vue'
import {randomNumUtil} from 'st-common-core'
import {elSizeUtil} from "st-common-ui-utils"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StGradientBg2',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 背景颜色
    bgColor?: string;
    // 渐变颜色列表
    gradientColors?: string[];
    // 过渡动画执行速度，过渡动画执行一次所需的时间，如果传递的为数字，则其单位默认为 ms
    speed?: number | string;
    // 是否开启模糊效果
    blur: boolean;
  }>(),
  {
    bgColor: '#e493d0',
    speed: '15s',
    blur: true,
  }
)

// 渐变颜色列表的默认值
const gradientColorsDefault = [
  'rgb(235, 105, 78)',
  'rgb(243, 11, 164)',
  'rgb(254, 234, 131)',
  'rgb(170, 142, 245)',
  'rgb(248, 192, 147)',
]
// 预处理后的渐变颜色数据列表
const gradientColorsPreHandled = computed(() => {
  // 暂存渐变颜色列表
  let colors: string[] = []
  // 暂存渐变颜色数据列表
  let list: Array<{
    color: string;
    size0: string;
    size50: string;
    size100: string;
    p0: string;
    p50: string;
    p100: string;
  }> = []
  // 如果没有传入渐变颜色列表，则使用默认值
  if (!props.gradientColors || props.gradientColors.length === 0) colors = gradientColorsDefault
  else colors = props.gradientColors
  // 渐变颜色列表中的所有颜色都是由中心向外径向渐变到透明
  list = colors.map((color) => {
    // 随机生成渐变颜色径向渐变半径的长度
    const size0 = randomNumUtil.randomInt_n_m(50, 100)
    const size50 = randomNumUtil.randomInt_n_m(50, 100)
    const size100 = randomNumUtil.randomInt_n_m(50, 100)
    // 随机生成渐变颜色初始中心点的位置
    const p0_x = randomNumUtil.randomInt_n_m(-50, 50)
    const p0_y = randomNumUtil.randomInt_n_m(-50, 50)
    const p50_x = randomNumUtil.randomInt_n_m(-50, 50)
    const p50_y = randomNumUtil.randomInt_n_m(-50, 50)
    const p100_x = randomNumUtil.randomInt_n_m(-50, 50)
    const p100_y = randomNumUtil.randomInt_n_m(-50, 50)
    // 随机生成渐变颜色的透明度
    return {
      color: `radial-gradient(closest-side, ${color}, rgba(255, 255, 255, 0))`,
      size0: `${size0}vmax ${size0}vmax`,
      size50: `${size50}vmax ${size50}vmax`,
      size100: `${size100}vmax ${size100}vmax`,
      p0: `${p0_x}vmax ${p0_y}vmax`,
      p50: `${p50_x}vmax ${p50_y}vmax`,
      p100: `${p100_x}vmax ${p100_y}vmax`,
    }
  })
  return list
})
</script>

<template>
  <div
    class="st-gradient-bg-2"
    :style="{
      '--size0': gradientColorsPreHandled.map(item => item.size0).join(', '),
      '--size50': gradientColorsPreHandled.map(item => item.size50).join(', '),
      '--size100': gradientColorsPreHandled.map(item => item.size100).join(', '),
      '--p0': gradientColorsPreHandled.map(item => item.p0).join(', '),
      '--p50': gradientColorsPreHandled.map(item => item.p50).join(', '),
      '--p100': gradientColorsPreHandled.map(item => item.p100).join(', '),
      backgroundColor: bgColor,
      backgroundImage: gradientColorsPreHandled.map(item => item.color).join(', '),
      animationDuration: elSizeUtil.elSizePreHandler(speed, 'ms')
    }"
  >
    <div v-if="blur" class="st-gradient-bg-2__content">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<style scoped lang="scss">
@keyframes st-gradient-bg-2-bg-transition {
  0% {
    background-size: var(--size0);
    background-position: var(--p0);
  }
  50% {
    background-size: var(--size50);
    background-position: var(--p50);
  }
  100% {
    background-size: var(--size100);
    background-position: var(--p100);
  }
}

.st-gradient-bg-2 {
  width: 100%;
  height: 100%;
  background-size: var(--size0);
  background-position: var(--p0);
  background-repeat: no-repeat;
  animation-name: st-gradient-bg-2-bg-transition;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;

  .st-gradient-bg-2__content {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    -moz-backdrop-filter: blur(10px);
    -o-backdrop-filter: blur(10px);
    -ms-backdrop-filter: blur(10px);
  }
}
</style>
