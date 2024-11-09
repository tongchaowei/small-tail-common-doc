<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {computed} from "vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StDynamicBorder1',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 宽度
    width?: string | number;
    // 高度
    height?: string | number;
    // 背景颜色
    backgroundColor?: string;
    // 边框颜色列表
    borderColorList?: Array<string>;
    // 是否完全自定义边框颜色
    customBorderColor?: boolean;
    // 边框颜色
    borderColor?: string;
    // 边框宽度
    borderWidth?: string | number;
    // 边框圆角
    borderRadius?: string | number;
    // 是否开启旋转动效
    rotate?: boolean;
    // 旋转动效速度，或者说是执行一次动画所需的时间
    speed?: string | number;
    // 是否启用发光效果
    shine?: boolean;
    // 发光范围
    shineRange?: string | number;
    // 发光的亮度
    shineBrightness?: number;
    // 是否 hover 才显示动效
    hover?: boolean;
    // 是否 hover 暂停动画
    hoverPause?: boolean;
  }>(),
  {
    width: '100%',
    height: '100%',
    backgroundColor: '#111',
    customBorderColor: false,
    borderColor: 'linear-gradient(135deg, #43CBFF 15%, #9708CC 100%)',
    borderWidth: '2px',
    borderRadius: '0.25rem',
    rotate: true,
    speed: '5s',
    shine: false,
    shineRange: '10px',
    shineBrightness: 0.8,
    hover: false,
    hoverPause: false,
  }
)

// 边框颜色列表默认值
const borderColorListDefault = [
  'transparent 180deg',
  'skyblue 360deg',
]
const borderColors = computed(() => {
  if (!props.borderColorList || !Array.isArray(props.borderColorList)) return borderColorListDefault
  return props.borderColorList
})
</script>

<template>
  <div
    class="st-dynamic-border-1"
    :class="[
      !hover && rotate ? 'st-dynamic-border-1--rotate' : '',
      hover && rotate ? 'st-dynamic-border-1--rotate--hover' : '',
      !hover && shine ? 'st-dynamic-border-1--shine' : '',
      hover && shine ? 'st-dynamic-border-1--shine--hover' : '',
      !hover && hoverPause ? 'st-dynamic-border-1--hover-pause' : '',
      hover ?
        customBorderColor ? 'st-dynamic-border-1--border-color-custom--hover' : 'st-dynamic-border-1--border-color-default--hover' :
        customBorderColor ? 'st-dynamic-border-1--border-color-custom' : 'st-dynamic-border-1--border-color-default',
    ]"
    :style="{
      '--border-width': elSizeUtil.elSizePreHandler(borderWidth),
      '--border-color-list': borderColors.join(', '),
      '--border-color': borderColor,
      '--border-radius': elSizeUtil.elSizePreHandler(borderRadius),
      '--speed': elSizeUtil.elSizePreHandler(speed, 'ms'),
      '--shine-range': elSizeUtil.elSizePreHandler(shineRange),
      '--shine-brightness': shineBrightness,
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <div
      class="st-dynamic-border-1__content"
      :style="{
        backgroundColor,
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
@property --st-dynamic-border-1-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes st-dynamic-border-1-rotate {
  0% {
    --st-dynamic-border-1-angle: 0deg;
  }
  100% {
    --st-dynamic-border-1-angle: 360deg;
  }
}

.st-dynamic-border-1 {
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
  }

  .st-dynamic-border-1__content {
    z-index: 1;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius);
  }
}

.st-dynamic-border-1--border-color-default,
.st-dynamic-border-1--border-color-default--hover:hover {

  &::before,
  &::after {
    background-image: conic-gradient(from var(--st-dynamic-border-1-angle), var(--border-color-list) 360deg, transparent 360deg);
  }
}

.st-dynamic-border-1--border-color-custom,
.st-dynamic-border-1--border-color-custom--hover:hover {

  &::before,
  &::after {
    background-image: var(--border-color);
  }
}

.st-dynamic-border-1--shine,
.st-dynamic-border-1--shine--hover:hover {

  &::after {
    filter: blur(var(--shine-range));
    opacity: var(--shine-brightness);
  }
}

.st-dynamic-border-1--rotate,
.st-dynamic-border-1--rotate--hover:hover {

  &::before,
  &::after {
    animation: st-dynamic-border-1-rotate var(--speed) linear infinite;
  }
}

.st-dynamic-border-1--hover-pause:hover {

  &::before,
  &::after {
    animation-play-state: paused;
  }
}
</style>
