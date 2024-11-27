<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StHoverFleetingContainer',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 宽度
    width?: string | number;
    // 高度
    height?: string | number;
    // 背景颜色
    backgroundColor?: string;
    // 边框颜色
    borderColor?: string;
    // 边框宽度
    borderWidth?: string | number;
    // 边框圆角
    borderRadius?: string | number;
    // 动画执行起始位置
    start?: string | number;
    // 动画执行速度，或者说是执行一次动画所需的时间
    speed?: string | number;
    // 是否启用发光效果
    shine?: boolean;
    // 动画开始时的发光范围
    shineRangeStart?: string | number;
    // 动画结束时的发光范围
    shineRangeEnd?: string | number;
    // 动画开始时的发光亮度
    shineBrightnessStart?: number;
    // 动画结束时的发光亮度
    shineBrightnessEnd?: number;
    // 是否虚化边框，边框虚化效果由 shineRangeEnd shineBrightnessEnd 决定
    blurBorder?: boolean;
    // 边框动画虚化的执行速度
    blurSpeed: number | string;
  }>(),
  {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    borderColor: '#43CBFF',
    borderWidth: '2px',
    borderRadius: '0.25rem',
    start: 0,
    speed: '1.5s',
    shine: false,
    shineRangeStart: '10px',
    shineRangeEnd: '30px',
    shineBrightness: 0.6,
    shineBrightnessEnd: 1,
    blurBorder: false,
    blurSpeed: '1.5s',
  }
)
</script>

<template>
  <div
    class="st-hover-fleeting-container"
    :class="[
      shine ? 'st-hover-fleeting-container--shine' : '',
      blurBorder ? 'st-hover-fleeting-container--blur-border' : '',
    ]"
    :style="{
      '--border-width': elSizeUtil.elSizePreHandler(borderWidth),
      '--border-color': borderColor,
      '--border-radius': elSizeUtil.elSizePreHandler(borderRadius),
      '--start': elSizeUtil.elSizePreHandler(start, 'deg'),
      '--speed': elSizeUtil.elSizePreHandler(speed, 'ms'),
      '--shine-range-start': elSizeUtil.elSizePreHandler(shineRangeStart),
      '--shine-range-end': elSizeUtil.elSizePreHandler(shineRangeEnd),
      '--shine-brightness-start': shineBrightnessStart,
      '--shine-brightness-end': shineBrightnessEnd,
      '--blur-speed': elSizeUtil.elSizePreHandler(blurSpeed, 'ms'),
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <div
      class="st-hover-fleeting-container__content"
      :style="{backgroundColor}"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@property --st-hover-fleeting-container-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes st-hover-fleeting-container-rotate {
  0% {
    --st-hover-fleeting-container-angle: 0deg;
  }
  100% {
    --st-hover-fleeting-container-angle: 360deg;
  }
}

.st-hover-fleeting-container {
  position: relative;
  box-sizing: border-box;
  padding: var(--border-width);
  border-radius: var(--border-radius);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
    background-image: conic-gradient(from var(--start), var(--border-color) var(--st-hover-fleeting-container-angle), transparent var(--st-hover-fleeting-container-angle), transparent 360deg);
  }

  &:hover::after,
  &:hover::before {
    animation: st-hover-fleeting-container-rotate var(--speed) ease-out forwards;
  }

  .st-hover-fleeting-container__content {
    z-index: 1;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
}

@keyframes st-hover-fleeting-container-rotate--shine {
  0% {
    --st-hover-fleeting-container-angle: 0deg;
    filter: blur(var(--shine-range-start));
    opacity: var(--shine-brightness-start);
  }
  100% {
    --st-hover-fleeting-container-angle: 360deg;
    filter: blur(var(--shine-range-end));
    opacity: var(--shine-brightness-end);
  }
}

.st-hover-fleeting-container--shine:hover {

  &::after {
    animation: st-hover-fleeting-container-rotate--shine var(--speed) ease-out forwards;
  }
}

.st-hover-fleeting-container--blur-border:hover {

  &::before,
  &::after {
    filter: blur(var(--shine-range-end));
    opacity: var(--shine-brightness-end);
    transition-delay: var(--speed);
    transition-duration: var(--blur-speed);
  }

  &::before {
    opacity: 0;
  }
}
</style>
