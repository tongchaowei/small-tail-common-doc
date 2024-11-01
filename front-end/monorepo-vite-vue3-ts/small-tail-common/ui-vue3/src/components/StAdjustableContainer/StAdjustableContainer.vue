<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import {elSizeUtil} from 'st-common-ui-utils/src'
import {useWindowSize} from '@vueuse/core'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StAdjustableContainer'
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 是否开启调整容器宽度功能
    enableWidthAdjust?: boolean
    // 容器宽度默认值，如果开启调整容器宽度功能，容器的默认宽度小于最小宽度，则使用最小宽度作为默认宽度；
    // 容器的默认宽度大于最大宽度，则使用最大宽度作为默认宽度
    containerWidthDefault?: number | string
    // 容器最小宽度
    containerMinWidth?: number
    // 容器最大宽度
    containerMaxWidth?: number
    // 调整容器宽度元素的宽度
    adjustWidthElW?: number | string
    // 是否开启调整容器高度功能
    enableHeightAdjust?: boolean
    // 容器高度默认值，如果开启调整容器高度功能，容器的默认高度小于最小高度，则使用最小高度作为默认高度；
    // 容器的默认高度大于最大高度，则使用最大高度作为默认高度
    containerHeightDefault?: number | string
    // 容器最小高度
    containerMinHeight?: number
    // 容器最大高度
    containerMaxHeight?: number
    // 调整容器高度元素的高度
    adjustHeightElH?: number | string
    // 是否开启容器高度跟随浏览器窗口高度变化而变化，即容器高度为 100vh
    enableContainerHeightFollowWindow?: boolean
    // 是否开启调整容器大小区域下的占位
    enablePlaceholder?: boolean
  }>(),
  {
    enableWidthAdjust: true,
    containerWidthDefault: '100%',
    containerMinWidth: 0,
    containerMaxWidth: Number.MAX_SAFE_INTEGER,
    adjustWidthElW: 10,
    enableHeightAdjust: false,
    containerHeightDefault: '100%',
    containerMinHeight: 0,
    containerMaxHeight: Number.MAX_SAFE_INTEGER,
    adjustHeightElH: 10,
    enableContainerHeightFollowWindow: false,

    enablePlaceholder: false
  }
)

/**
 * 组件双向数据绑定
 */
// 容器宽度
const containerWidth = defineModel('containerWidth', {default: 0})
// 容器高度
const containerHeight = defineModel('containerHeight', {default: 0})

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 容器宽度达到组件参数指定的最小值时触发的事件
   *
   * @param {"width-to-min"} e
   * @param {number} containerWidth 容器宽度
   */
  (e: 'width-to-min', containerWidth: number): void;
  /**
   * 容器宽度达到组件参数指定的最大值时触发的事件
   *
   * @param {"width-to-max"} e
   * @param {number} containerWidth 容器宽度
   */
  (e: 'width-to-max', containerWidth: number): void;
  /**
   * 容器高度达到组件参数指定的最小值时触发的事件
   *
   * @param {"height-to-min"} e
   * @param {number} containerHeight 容器高度
   */
  (e: 'height-to-min', containerHeight: number): void;
  /**
   * 容器高度达到组件参数指定的最大值时触发的事件
   *
   * @param {"height-to-max"} e
   * @param {number} containerHeight 容器高度
   */
  (e: 'height-to-max', containerHeight: number): void;
}>()

// 容器元素引用对象
const stAdjustableContainerRef = ref<HTMLDivElement>()
/**
 * 容器宽度后处理函数
 */
const containerWidthPostHandler = () => {
  if (!props.enableWidthAdjust) return
  containerWidth.value = Math.max(containerWidth.value, props.containerMinWidth)
  containerWidth.value = Math.min(containerWidth.value, props.containerMaxWidth)
  if (containerWidth.value === props.containerMinWidth) emits('width-to-min', containerWidth.value)
  if (containerWidth.value === props.containerMaxWidth) emits('width-to-max', containerWidth.value)
}
/**
 * 容器高度后处理函数
 */
const containerHeightPostHandler = () => {
  if (!props.enableHeightAdjust) return
  containerHeight.value = Math.max(containerHeight.value, props.containerMinHeight)
  containerHeight.value = Math.min(containerHeight.value, props.containerMaxHeight)
  if (containerHeight.value === props.containerMinHeight) emits('height-to-min', containerHeight.value)
  if (containerHeight.value === props.containerMaxHeight) emits('height-to-max', containerHeight.value)
}
// 初始化容器宽度、容器高度
onMounted(() => {
  const stAdjustableContainerEl = stAdjustableContainerRef.value as HTMLDivElement
  containerWidth.value = stAdjustableContainerEl.clientWidth || props.containerMinWidth
  containerWidthPostHandler()
  containerHeight.value = stAdjustableContainerEl.clientHeight || props.containerMinHeight
  containerHeightPostHandler()
})

/**
 * PC 端 body 元素添加鼠标移动、鼠标抬起事件监听器
 */
const documentBodyAddEventListenerPC = (mousemoveHandler: (this: HTMLElement, ev: MouseEvent) => any) => {
  const documentBodyEl = document.body
  const mouseupHandler = () => {
    documentBodyEl.removeEventListener('mousemove', mousemoveHandler)
    documentBodyEl.removeEventListener('mouseup', mouseupHandler)
  }
  documentBodyEl.addEventListener('mousemove', mousemoveHandler)
  documentBodyEl.addEventListener('mouseup', mouseupHandler)
}
/**
 * 移动端 body 元素添加触摸移动、触摸抬起事件监听器
 */
const documentBodyAddEventListenerMobile = (touchmoveHandler: (this: HTMLElement, ev: TouchEvent) => any) => {
  const documentBodyEl = document.body
  const touchendHandler = () => {
    documentBodyEl.removeEventListener('touchmove', touchmoveHandler)
    documentBodyEl.removeEventListener('touchend', touchendHandler)
  }
  documentBodyEl.addEventListener('touchmove', touchmoveHandler)
  documentBodyEl.addEventListener('touchend', touchendHandler)
}
/**
 * 开始调整容器宽度的处理函数
 */
const resizeWidthStartHandler = (event: Event) => {
  // 如果是移动端的触摸事件
  if (event instanceof TouchEvent) {
    // 触摸开始时，触摸点位置
    const startX = event.touches[0].pageX
    // 触摸开始时，容器宽度
    const containerWidthOriginal = containerWidth.value
    const touchmoveHandler = (ev: TouchEvent) => {
      containerWidth.value = containerWidthOriginal + (ev.touches[0].pageX - startX)
      containerWidthPostHandler()
    }
    documentBodyAddEventListenerMobile(touchmoveHandler)
  }
  // 如果是 PC 端的鼠标事件
  else if (event instanceof MouseEvent) {
    const mousemoveHandler = (ev: MouseEvent) => {
      containerWidth.value += ev.movementX
      containerWidthPostHandler()
    }
    documentBodyAddEventListenerPC(mousemoveHandler)
  }
}
/**
 * 开始调整容器高度的处理函数
 */
const resizeHeightStartHandler = (event: Event) => {
  // 如果是移动端的触摸事件
  if (event instanceof TouchEvent) {
    // 触摸开始时，触摸点位置
    const startY = event.touches[0].pageY
    // 触摸开始时，容器高度
    const containerHeightOriginal = containerHeight.value
    const touchmoveHandler = (ev: TouchEvent) => {
      containerHeight.value = containerHeightOriginal + (ev.touches[0].pageY - startY)
      containerWidthPostHandler()
    }
    documentBodyAddEventListenerMobile(touchmoveHandler)
  }
  // 如果是 PC 端的鼠标事件
  else if (event instanceof MouseEvent) {
    const mousemoveHandler = (ev: MouseEvent) => {
      containerHeight.value += ev.movementY
      containerHeightPostHandler()
    }
    documentBodyAddEventListenerPC(mousemoveHandler)
  }
}

/**
 * 监听浏览器高度的变化，如果开启容器高度跟随浏览器窗口高度变化而变化，则跟随浏览器窗口高度的变化，
 * 响应式更新容器高度
 */
watch(
  () => useWindowSize().height.value,
  (windowHeight) => {
    if (!props.enableContainerHeightFollowWindow) return
    // 跟随浏览器窗口高度的变化，响应式更新容器高度
    containerHeight.value = windowHeight
  }
)
</script>

<template>
  <div
    ref="stAdjustableContainerRef"
    class="st-adjustable-container"
    :style="{
      width: elSizeUtil.elSizePreHandler(containerWidth ? containerWidth : containerWidthDefault),
      height: elSizeUtil.elSizePreHandler(containerHeight ? containerHeight : containerHeightDefault),
      paddingRight: enablePlaceholder && enableWidthAdjust ? elSizeUtil.elSizePreHandler(adjustWidthElW) : 0,
      paddingBottom: enablePlaceholder && enableHeightAdjust ? elSizeUtil.elSizePreHandler(adjustHeightElH) : 0,
    }"
  >
    <slot></slot>
    <div
      v-if="enableWidthAdjust"
      class="st-adjustable-container__resize-handle-width"
      :style="{width: elSizeUtil.elSizePreHandler(adjustWidthElW)}"
      @mousedown="resizeWidthStartHandler"
      @touchstart="resizeWidthStartHandler"
    ></div>
    <div
      v-if="enableHeightAdjust"
      class="st-adjustable-container__resize-handle-height"
      :style="{height: elSizeUtil.elSizePreHandler(adjustHeightElH)}"
      @mousedown="resizeHeightStartHandler"
      @touchstart="resizeHeightStartHandler"
    ></div>
  </div>
</template>

<style scoped>
.st-adjustable-container {
  position: relative;

  .st-adjustable-container__resize-handle-width,
  .st-adjustable-container__resize-handle-height {
    position: absolute;

    &:hover {
      background-color: #dcdcdc7f;
      transition: background-color 300ms ease-in-out;
    }
  }

  .st-adjustable-container__resize-handle-width {
    top: 0;
    right: 0;
    height: 100%;
    cursor: col-resize;
  }

  .st-adjustable-container__resize-handle-height {
    bottom: 0;
    left: 0;
    width: 100%;
    cursor: row-resize;
  }
}
</style>
