<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {horizontalAlignFlexMap, verticalAlignFlexMap} from "../../enums/text-align-enums.ts"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StGhostTextHover',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 文本内容
    content: string;
    // 文本水平对其方式
    horizontalAlign?: 'left' | 'center' | 'right';
    // 文本垂直对其方式
    verticalAlign?: 'top' | 'center' | 'bottom';
    // 每个字符动画执行的速度，动画执行一次所需的时间，单位毫秒
    speed?: number;
    // 每个字符动画执行的延迟，单位毫秒
    delay?: number;
  }>(),
  {
    horizontalAlign: 'left',
    verticalAlign: 'top',
    speed: 1000,
    delay: 100,
  }
)
</script>

<template>
  <div
    class="st-ghost-text"
    :style="{
      justifyContent: horizontalAlignFlexMap[horizontalAlign],
      alignItems: verticalAlignFlexMap[verticalAlign],
    }"
  >
    <span
      v-for="(letter, idx) in content"
      :key="idx"
      class="st-ghost-text__letter"
      :style="{
        transitionDuration: elSizeUtil.elSizePreHandler(speed, 'ms'),
        transitionDelay: elSizeUtil.elSizePreHandler(idx * delay, 'ms'),
      }"
    >{{ letter === ' ' ? '&nbsp;' : letter }}</span>
  </div>
</template>

<style scoped lang="scss">
.st-ghost-text {
  display: flex;
  flex-wrap: wrap;

  .st-ghost-text__letter {
    transition-property: transform, opacity, filter;
    transition-timing-function: linear;
  }
}

.st-ghost-text:hover {

  .st-ghost-text__letter {
    transform: scale(2);
    opacity: 0;
    filter: blur(10px);
  }
}
</style>
