<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {ref, onMounted, onBeforeUnmount} from "vue"
import VanillaTilt from 'vanilla-tilt'

/**
 * 组件配置选项
 */
defineOptions({
  name: "St3DTiltContainer",
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 组件宽度
    width?: number | string;
    // 组件高度
    height?: number | string;
    // 倾斜的最大角度，单位为角度 degrees
    max?: number;
    // x 轴的初始角度，单位为角度 degrees
    startX?: number;
    // y 轴的初始角度，单位为角度 degrees
    startY?: number;
    // perspective 3D 透视效果的距离，即观察者与 z=0 平面的距离，单位为像素 px
    perspective?: number;
    // 鼠标悬停时放大的倍数
    scale?: number;
    // 过渡的速度，单位毫秒 ms
    speed?: number;
    // 是否开启过渡效果
    transition?: boolean;
    // 限制倾斜效果起作用的坐标轴
    axis?: 'x' | 'y' | null;
    // 鼠标离开元素时是否恢复原状
    reset?: boolean;
    // 鼠标离开元素时是否恢复到 [startX, startY] 指定的初始状态，否则恢复到 [0, 0]
    resetToStart?: boolean;
    // 过渡效果函数
    easing?: string;
    // 是否开启眩光效果
    glare?: boolean;
    // 眩光效果的不透明度
    maxGlare?: number;
    // 是否启用设备方向检测
    gyroscope?: boolean;
    // 设备在 x 轴上倾斜，元素最小的倾斜角度
    gyroscopeMinAngleX?: number;
    // 设备在 x 轴上倾斜，元素最大的倾斜角度
    gyroscopeMaxAngleX?: number;
    // 设备在 y 轴上倾斜，元素最小的倾斜角度
    gyroscopeMinAngleY?: number;
    // 设备在 y 轴上倾斜，元素最大的倾斜角度
    gyroscopeMaxAngleY?: number;
    // 是否开启全屏监听鼠标移动
    fullPageListening?: boolean;
  }>(),
  {
    width: '100%',
    height: '100%',
    max: 35,
    startX: 0,
    startY: 0,
    perspective: 1000,
    scale: 1,
    speed: 300,
    transition: true,
    axis: null,
    reset: true,
    resetToStart: true,
    easing: 'cubic-bezier(.03,.98,.52,.99)',
    glare: false,
    maxGlare: 1,
    gyroscope: true,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45,
    fullPageListening: false,
  }
)

// 组件根元素引用对象
const st3DContainerRef = ref<HTMLDivElement | null>(null)

/**
 * 组件挂在之后为组件添加 3d 动效
 */
onMounted(() => {
  VanillaTilt.init(st3DContainerRef.value as HTMLDivElement, {
    max: props.max,
    startX: props.startX,
    startY: props.startY,
    perspective: props.perspective,
    scale: props.scale,
    speed: props.speed,
    transition: props.transition,
    axis: props.axis,
    reset: props.reset,
    'reset-to-start': props.resetToStart,
    easing: props.easing,
    glare: props.glare,
    'max-glare': props.maxGlare,
    gyroscope: props.gyroscope,
    gyroscopeMinAngleX: props.gyroscopeMinAngleX,
    gyroscopeMaxAngleX: props.gyroscopeMaxAngleX,
    gyroscopeMinAngleY: props.gyroscopeMinAngleY,
    gyroscopeMaxAngleY: props.gyroscopeMaxAngleY,
    "full-page-listening": props.fullPageListening,
  })
})

/**
 * 组件销毁之前进行销毁处理
 */
onBeforeUnmount(() => {
  st3DContainerRef.value?.vanillaTilt.destroy();
})
</script>

<template>
  <div
    ref="st3DContainerRef"
    class="st-3d-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
      perspective: elSizeUtil.elSizePreHandler(perspective),
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.st-3d-container {
  transform-style: preserve-3d;
}
</style>
