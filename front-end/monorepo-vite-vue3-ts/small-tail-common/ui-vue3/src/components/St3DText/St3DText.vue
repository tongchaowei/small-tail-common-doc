<script setup lang="ts">
import { elSizeUtil} from "st-common-ui-utils"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'St3DText',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 文本内容
    content: string;
    // 文本颜色
    color?: string;
    // 文字大小，如果传递的参数值为数字，则其单位为像素 px
    fontSize?: number | string;
    // 文本的行高
    lineHeight?: number | string;
    // 文本 layer 层数
    layerCnt?: number;
    // 文本 layer 之间的间距，其单位为像素 px
    layerGap?: number;
    // 是否开启文本阴影
    shadow?: boolean;
    // 文本阴影大小
    shadowSize?: number | string;
    // 是否开启文本底层底座
    base?: boolean;
    // 文本底座的宽度
    baseWidth?: number | string;
    // 文本底座的颜色
    baseColor?: string;
    // 是否开启文本底座的阴影效果
    baseShadow?: boolean;
    // perspective 3D 透视效果的距离，即观察者与 z=0 平面的距离，如果传递的参数值为数字，则其单位为像素 px
    perspective?: number | string;
  }>(),
  {
    color: '#fff',
    fontSize: '3rem',
    lineHeight: undefined,
    layerCnt: 20,
    layerGap: 1.5,
    shadow: true,
    shadowSize: '5px',
    base: true,
    baseWidth: '10px',
    baseColor: '#fb7299',
    baseShadow: true,
    perspective: '1000px',
  }
)

/**
 * layer 文本阴影预处理函数
 *
 * @param {number} i 第几层（从 1 开始）
 */
const layerTextStrokePreHandler = (i: number) => {
  if (props.base && i >= props.layerCnt / 2 + 1) {
    return elSizeUtil.elSizePreHandler(props.baseWidth) + ' ' + props.baseColor
  }
  if (props.shadow && i >= props.layerCnt / 2 - 1) {
    return `${elSizeUtil.elSizePreHandler(props.shadowSize)} rgba(0, 0, 0, 0.25)`
  }
  return 'none'
}
</script>

<template>
  <div
    class="st-3d-text"
    :style="{
      '--perspective': elSizeUtil.elSizePreHandler(perspective),
      color,
      fontSize: elSizeUtil.elSizePreHandler(fontSize),
      lineHeight: lineHeight ? elSizeUtil.elSizePreHandler(lineHeight) : elSizeUtil.elSizePreHandler(fontSize),
    }"
  >
    <div
      v-for="(i, idx) in layerCnt"
      :key="i"
      class="st-3d-text__layer"
      :style="{
        '--layer-gap': layerGap * -idx + 'px',
        '-webkit-text-stroke': layerTextStrokePreHandler(i),
        textShadow: baseShadow && i >= props.layerCnt / 2 + 1 ? '6px 0 6px rgba(0, 0, 0, 0.25), 5px 5px 5px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.25)' : 'none'
      }"
    >{{ content }}</div>
  </div>
</template>

<style scoped lang="scss">
.st-3d-text {
  position: relative;
  white-space: pre-wrap;
  transform-style: preserve-3d;
  perspective: var(--perspective);

  .st-3d-text__layer {
    width: 100%;
    height: 100%;
    white-space: pre-wrap;
    transform: translateZ(var(--layer-gap));
    perspective: var(--perspective);
    transform-style: preserve-3d;
  }

  .st-3d-text__layer:nth-child(n+2) {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
