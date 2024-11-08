<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {horizontalAlignFlexMap, verticalAlignFlexMap} from "../../enums/text-align-enums.ts"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StGhostText',
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
        animationDuration: elSizeUtil.elSizePreHandler(speed, 'ms'),
        animationDelay: elSizeUtil.elSizePreHandler(idx * delay, 'ms'),
      }"
    >{{ letter === ' ' ? '&nbsp;' : letter }}</span>
  </div>
</template>

<style scoped lang="scss">
@keyframes st-ghost-text-letter-ghost {
  0% {
    transform: scale(2);
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    transform: scale(1);
    opacity: 1;
    filter: blur(0);
  }
}

.st-ghost-text {
  display: flex;
  flex-wrap: wrap;

  .st-ghost-text__letter {
    transform: scale(2);
    opacity: 0;
    filter: blur(10px);
    animation-name: st-ghost-text-letter-ghost;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
}
</style>
