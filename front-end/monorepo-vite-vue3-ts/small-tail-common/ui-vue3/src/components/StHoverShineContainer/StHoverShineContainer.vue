<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import StCapturePointerContainer from "../StCapturePointerContainer"
import {ref} from "vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: "StHoverShineContainer",
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 组件宽度
    width?: number | string;
    // 组件高度
    height?: number | string;
    // 组件背景
    background?: string;
    // 组件内容区域背景
    contentBackground?: string;
    // 发光范围的大小
    shineSize?: number | string;
    // 发光的颜色
    shineColor?: string;
    // 发光过渡速度
    speed?: number | string;
    // 发光边框宽度
    shineBorderWidth?: number | string;
    // 发光边框圆角
    shineBorderRadius?: number | string;
    // 对发光的模糊大小
    shineBlur?: number | string;
  }>(),
  {
    width: "100%",
    height: "100%",
    background: "#333",
    contentBackground: "rgba(45, 45, 45, 0.8)",
    shineSize: "200px",
    shineColor: "#00ff00",
    speed: "0.5s",
    shineBorderWidth: "2px",
    shineBorderRadius: "0.25rem",
    shineBlur: "10px",
  }
)

// 发光的位置
const shineX = ref(0)
const shineY = ref(0)

/**
 * 鼠标悬浮事件处理函数
 *
 * @param {number} x 鼠标在组件中的横坐标
 * @param {number} y 鼠标在组件中的纵坐标
 */
const hoverHandler = (x: number, y: number) => {
  // 根据鼠标在组件中的位置更新发光的位置
  shineX.value = x
  shineY.value = y
}
</script>

<template>
  <div
    class="st-hover-shine-container"
    :style="{
      '--shine-size': elSizeUtil.elSizePreHandler(shineSize),
      '--shine-color': shineColor,
      '--shine-x': shineX + 'px',
      '--shine-y': shineY + 'px',
      '--speed': elSizeUtil.elSizePreHandler(speed, 'ms'),
      '--shine-border-radius': elSizeUtil.elSizePreHandler(shineBorderRadius),
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
      padding: elSizeUtil.elSizePreHandler(shineBorderWidth),
      background,
    }"
  >
    <StCapturePointerContainer
      capture-on-pointer-move
      capture-on-pointer-enter
      @handlePointerEvent="hoverHandler"
    >
      <div
        class="st-hover-shine-container__content-box"
        :style="{
        background: contentBackground,
        backdropFilter: `blur(${elSizeUtil.elSizePreHandler(shineBlur)})`
      }"
      >
        <slot></slot>
      </div>
    </StCapturePointerContainer>
  </div>
</template>

<style scoped lang="scss">
.st-hover-shine-container {
  position: relative;
  box-sizing: border-box;
  border-radius: var(--shine-border-radius);
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    left: var(--shine-x);
    top: var(--shine-y);
    transform: translate(-50%, -50%);
    width: var(--shine-size);
    height: var(--shine-size);
    background: radial-gradient(circle, var(--shine-color), transparent 70%, transparent);
    transition: opacity var(--speed) ease-in-out;
    pointer-events: none;
    opacity: 0;
  }

  &:hover:before {
    opacity: 1;
  }

  .st-hover-shine-container__content-box {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--shine-border-radius);
  }
}
</style>
