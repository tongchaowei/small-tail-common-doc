<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {onBeforeMount, ref, watch} from "vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StGradientBg1'
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 背景渐变颜色，如果传递的值为空或者不为数组或者数组长度小于2，则使用默认值 ['#2c3e50', '#27ae60', '#2980b9', '#e74c3c', '#8e44ad']
    colors?: Array<string>;
    // 背景大小，如果传递的值为数字，则其单位默认为 px，该参数的默认值为 500%
    size?: string | number;
    // 背景过渡动画执行速度（背景过渡动画执行一次所需的时间），如果传递的值为数字，则其单位默认为 ms，该参数的默认值为 20000ms
    speed?: number | string;
  }>(),
  {
    size: '500%',
    speed: 20000,
  }
)

// 背景颜色
const bgColors = ref(props.colors)

/**
 * 背景颜色预处理函数
 */
const colorsPreHandler = () => {
  if (!props.colors || !Array.isArray(props.colors) || props.colors.length < 2) {
    bgColors.value = ['#2c3e50', '#27ae60', '#2980b9', '#e74c3c', '#8e44ad']
  } else {
    bgColors.value = props.colors
  }
}

/**
 * 对组件参数进行预处理
 */
onBeforeMount(() => {
  colorsPreHandler()
})

// 监听传入的背景颜色组件参数的变化
watch(() => props.colors, () => colorsPreHandler(), {deep: true})
</script>

<template>
  <div
    class="st-gradient-bg-1"
    :style="{
      background: `linear-gradient(135deg, ${(bgColors as Array<string>).join(',')})`,
      backgroundSize: elSizeUtil.elSizePreHandler(size),
      animationDuration: elSizeUtil.elSizePreHandler(speed, 'ms'),
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
// 背景过渡动画
@keyframes st-gradient-bg-1-bg-gradient-animation {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.st-gradient-bg-1 {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  animation-name: st-gradient-bg-1-bg-gradient-animation;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
