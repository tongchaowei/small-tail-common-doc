<script setup lang="ts">
import {ref} from 'vue'
import {elSizeUtil} from "st-common-ui-utils"
import {useElementBounding} from "@vueuse/core"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StCapturePointerContainer',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 组件宽度
    width?: string | number;
    // 组件高度
    height?: string | number;
    // 是否在 pointer 进入时捕获
    captureOnPointerEnter?: boolean;
    // 是否在 pointer 离开时捕获
    captureOnPointerLeave?: boolean;
    // 是否在 pointer 按下时捕获
    captureOnPointerDown?: boolean;
    // 是否在 pointer 松开时捕获
    captureOnPointerUp?: boolean;
    // 是否在 pointer 移动时捕获
    captureOnPointerMove?: boolean;
    // 是否在 pointer 悬停时捕获
    captureOnPointerOver?: boolean;
    // 是否在 pointer 移出时捕获
    captureOnPointerOut?: boolean;
  }>(),
  {
    width: '100%',
    height: '100%',
    captureOnPointerEnter: false,
    captureOnPointerLeave: false,
    captureOnPointerDown: false,
    captureOnPointerUp: false,
    captureOnPointerMove: false,
    captureOnPointerOver: false,
    captureOnPointerOut: false,
  }
)

/**
 * 自定义事件
 */
const emits = defineEmits<{
  /**
   * 处理 pointer 事件的组件自定义事件
   * @param {"handlePointerEvent"} e 组件自定义事件
   * @param {number} x pointer 事件在组件中的 x 坐标
   * @param {number} y pointer 事件在组件中的 y 坐标
   * @param {HTMLDivElement} componentRootEl 组件根元素
   * @param {PointerEvent} event pointer 事件对象
   */
  (e: 'handlePointerEvent', x: number, y: number, componentRootEl: HTMLDivElement, event: PointerEvent): void;
}>()

// 组件根元素引用对象
const stCapturePointerContainerRef = ref<HTMLDivElement | null>(null)
// 组件根元素左上角距离屏幕可视区左上角的距离
const {left: stCapturePointerContainerElLeft, top: stCapturePointerContainerTop} = useElementBounding(stCapturePointerContainerRef)
//

/**
 * 捕获 pointer 处理函数
 */
const capturePointerHandler = (event: PointerEvent) => {
  // 获取组件根元素
  const stCapturePointerContainerEl = stCapturePointerContainerRef.value as HTMLDivElement
  // pointer 事件在组件中的 x y 坐标
  // event.clientX, event.clientY pointer 事件距离屏幕可视区左上角的距离
  // const x = event.clientX - stCapturePointerContainerEl.offsetLeft
  const x = event.clientX - stCapturePointerContainerElLeft.value
  // const y = event.clientY - stCapturePointerContainerEl.offsetTop
  const y = event.clientY - stCapturePointerContainerTop.value
  // 触发组件自定义事件
  emits('handlePointerEvent', x, y, stCapturePointerContainerEl, event)
}
</script>

<template>
  <div
    ref="stCapturePointerContainerRef"
    class="st-capture-pointer-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
    @pointerenter="(e) => captureOnPointerEnter && capturePointerHandler(e)"
    @pointerleave="(e) => captureOnPointerLeave && capturePointerHandler(e)"
    @pointerdown="(e) => captureOnPointerDown && capturePointerHandler(e)"
    @pointerup="(e) => captureOnPointerUp && capturePointerHandler(e)"
    @pointermove="(e) => captureOnPointerMove && capturePointerHandler(e)"
    @pointerover="(e) => captureOnPointerOver && capturePointerHandler(e)"
    @pointerout="(e) => captureOnPointerOut && capturePointerHandler(e)"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss">

</style>
