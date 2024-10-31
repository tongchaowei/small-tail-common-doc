<!--
  小尾巴气泡弹出框组件：
  1.对于基于组件的位置实现响应式更新组件子内容区域相对于组件的相对位置，依赖于使用该组件时通过组件参数传递进来的 x y 参数，
    x: 组件左边界距离浏览器网页页面视口的水平位置
    y: 组件上边界距离浏览器网页页面视口的水平位置
  2.关于组件的鼠标事件，组件子内容区域显示与隐藏的触发方式为 click 时，组件子内容区域的隐藏依赖于 vue use 的
  onClickOutside
  3.组件子内容区域过渡效果基于 vue 提供的 Transition 组件实现，过渡效果的具体实现是基于 css 样式
-->
<script setup lang="ts">
import {onBeforeMount, ref, watchEffect} from 'vue'
import {StPopoverSubContPosConst, StPopoverSubContPosEnum,} from "./st-popover-sub-cont-pos"
import {onClickOutside} from '@vueuse/core'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StPopover'
})

/**
 * 小尾巴弹出框出现的触发方式枚举
 */
enum StPopoverSubContTriggerEnum {
  click = 'click',
  hover = 'hover',
}

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 是否基于组件左上角距离浏览器网页页面视口的位置进行响应式更新
    // 需要注意：组件左上角距离视口的位置，需要通过组件参数 x y 手动传递进来
    baseOnPosition?: boolean,
    // 是否在垂直方向响应式更新组件子内容区域当前相对于组件的相对位置
    isVertical?: boolean,
    // 组件左边界距离浏览器网页页面视口的水平位置
    x?: number,
    // 组件上边界距离浏览器网页页面视口的水平位置
    y?: number,
    // 小尾巴弹出框出现的触发方式
    trigger?: keyof typeof StPopoverSubContTriggerEnum,
    // 组件子内容区域过渡名称
    subContTransitionName?: string,
    // 组件子内容区域层级
    subContZIndex?: number,
  }>(),
  {
    baseOnPosition: false,
    isVertical: false,
    x: 0,
    y: 0,
    trigger: StPopoverSubContTriggerEnum.hover,
    subContTransitionName: 'sub-cont',
    subContZIndex: 1,
  }
)

// 组件双向数据绑定
// 组件子内容区域的相对位置
const subContPosition = defineModel<StPopoverSubContPosEnum>(
  'subContPosition',
  {default: StPopoverSubContPosEnum.BR}
)
// 组件子内容区域是否显示
const isShow = defineModel<boolean>('isShow', {default: false})

// 组件内部状态
// 组件根元素引用对象
const stPopoverRef = ref<HTMLDivElement | null>(null)
// 组件子内容区域元素引用对象
const stPopoverSubContentRef = ref<HTMLDivElement | null>(null)
// 组件子内容区域的相对位置
const subContPos = ref<StPopoverSubContPosEnum>(StPopoverSubContPosEnum.LB)
// 是否显示组件子内容区域
const isShowSubCont = ref<boolean>(false)

// 组件挂载之前，进行组件内部状态数据的初始化
onBeforeMount(() => {
  // 如果是在垂直方向响应式更新组件子内容区域当前相对于组件的相对位置
  if (props.isVertical) subContPos.value = StPopoverSubContPosEnum.BR
})

/**
 * 获取下面方法中需要使用到的数据：
 * 组件及组件中元素的宽高(包含边框)
 */
const getData = () => {
  // 组件的宽高(包含边框)
  let width = stPopoverRef.value?.offsetWidth ?? 0
  let height = stPopoverRef.value?.offsetHeight ?? 0
  // 组件子内容区域的宽高(包含边框)
  let scWidth = stPopoverSubContentRef.value?.offsetWidth ?? 0
  let scHeight = stPopoverSubContentRef.value?.offsetHeight ?? 0
  return {
    width,
    height,
    scHeight,
    scWidth,
  }
}
// ----------------------------------------------------------------------------------------------------- 水平方向 --------
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的顶部边界
 */
const isOverflowTopBasePos = () => {
  let {height, scHeight} = getData()
  return scHeight - height > props.y
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的底部边界
 */
const isOverflowBottomBasePos = () => {
  let {scHeight} = getData()
  return scHeight > window.innerHeight - props.y
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的左边界
 */
const isOverflowLeftBasePos = () => {
  let {scWidth} = getData()
  return scWidth > props.x
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的右边界
 */
const isOverflowRightBasePos = () => {
  let {width, scWidth} = getData()
  return scWidth > document.body.clientWidth - (props.x + width)
}
// ----------------------------------------------------------------------------------------------------- 垂直方向 --------
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的左边界(在垂直方向响应式更新)
 */
const isOverflowLeftBasePosVer = () => {
  let {scWidth} = getData()
  return scWidth > props.x
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的右边界(在垂直方向响应式更新)
 */
const isOverflowRightBasePosVer = () => {
  let {scWidth} = getData()
  return scWidth > document.body.clientWidth - props.x
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的顶部边界(在垂直方向响应式更新)
 */
const isOverflowTopBasePosVer = () => {
  let {scHeight} = getData()
  return scHeight > props.y
}
/**
 * 判断组件子内容区域是否超出浏览器网页页面视口的底部边界(在垂直方向响应式更新)
 */
const isOverflowBottomBasePosVer = () => {
  let {height, scHeight} = getData()
  return scHeight > window.innerHeight - props.y - height
}
/**
 * 更新组件子内容区域相对于组件的相对位置
 *
 * @param toPosition 组件子内容区域相对于组件的相对位置，更新到的新位置
 */
const subContPosTo = (toPosition: StPopoverSubContPosEnum) => {
  subContPos.value = toPosition
  subContPosition.value = toPosition
}
/**
 * 基于组件左上角距离浏览器网页页面视口的位置，根据组件子内容区域当前相对于组件的相对位置，
 * 响应式更新组件子内容区域相对于组件的相对位置的处理函数
 *
 * @param judgeHandler 是否要进行响应式更新组件子内容区域相对于组件的相对位置的判断函数
 * @param toPosition 判断成立时，组件子内容区域相对于组件的相对位置，更新到的新位置
 */
const subContPosToBasePosHandler = (
  judgeHandler: () => boolean,
  toPosition: StPopoverSubContPosEnum
) => {
  if (judgeHandler()) { // 要进行响应式更新组件子内容区域相对于组件的相对位置
    subContPosTo(toPosition)
  }
}
/**
 * 基于组件左上角距离浏览器网页页面视口的位置，根据组件子内容区域当前相对于组件的相对位置
 * 进行响应式更新组件子内容区域相对于组件的相对位置
 */
const subContPosToBasePos = {
  // -------------------------------------------------------------------------------------------------- 水平方向 --------
  [StPopoverSubContPosEnum.LT]: () => {
    subContPosToBasePosHandler(isOverflowBottomBasePos, StPopoverSubContPosEnum.LB)
    subContPosToBasePosHandler(isOverflowLeftBasePos, StPopoverSubContPosEnum.RT)
  },
  [StPopoverSubContPosEnum.LB]: () => {
    subContPosToBasePosHandler(isOverflowTopBasePos, StPopoverSubContPosEnum.LT)
    subContPosToBasePosHandler(isOverflowLeftBasePos, StPopoverSubContPosEnum.RB)
  },
  [StPopoverSubContPosEnum.RT]: () => {
    subContPosToBasePosHandler(isOverflowBottomBasePos, StPopoverSubContPosEnum.RB)
    subContPosToBasePosHandler(isOverflowRightBasePos, StPopoverSubContPosEnum.LT)
  },
  [StPopoverSubContPosEnum.RB]: () => {
    subContPosToBasePosHandler(isOverflowTopBasePos, StPopoverSubContPosEnum.RT)
    subContPosToBasePosHandler(isOverflowRightBasePos, StPopoverSubContPosEnum.LB)
  },
  // -------------------------------------------------------------------------------------------------- 垂直方向 --------
  [StPopoverSubContPosEnum.TL]: () => {
    subContPosToBasePosHandler(isOverflowTopBasePosVer, StPopoverSubContPosEnum.BL)
    subContPosToBasePosHandler(isOverflowRightBasePosVer, StPopoverSubContPosEnum.TR)
  },
  [StPopoverSubContPosEnum.TR]: () => {
    subContPosToBasePosHandler(isOverflowTopBasePosVer, StPopoverSubContPosEnum.BR)
    subContPosToBasePosHandler(isOverflowLeftBasePosVer, StPopoverSubContPosEnum.TL)
  },
  [StPopoverSubContPosEnum.BL]: () => {
    subContPosToBasePosHandler(isOverflowBottomBasePosVer, StPopoverSubContPosEnum.TL)
    subContPosToBasePosHandler(isOverflowRightBasePosVer, StPopoverSubContPosEnum.BR)
  },
  [StPopoverSubContPosEnum.BR]: () => {
    subContPosToBasePosHandler(isOverflowBottomBasePosVer, StPopoverSubContPosEnum.TR)
    subContPosToBasePosHandler(isOverflowLeftBasePosVer, StPopoverSubContPosEnum.BL)
  }
}
/**
 * 基于组件的位置实现响应式更新组件子内容区域当前相对于组件的相对位置
 */
const updateSubContPosBaseOnPosition = () => {
  // 基于组件的位置实现响应式更新组件子内容区域当前相对于组件的相对位置
  if (props.baseOnPosition) {
    for (let key in StPopoverSubContPosEnum) {
      // 匹配组件子内容区域当前相对于组件的相对位置
      if (key === subContPos.value) {
        // 判断是否需要进行响应式更新组件子内容区域当前相对于组件的相对位置
        subContPosToBasePos[key]()
      }
    }
  }
}
// 监听，实现响应式更新组件子内容区域当前相对于组件的相对位置
watchEffect(() => {
  updateSubContPosBaseOnPosition()
})

/**
 * 当前显示组件子内容区域的触发方式是否为 click
 */
const isClick = () => {
  return props.trigger === StPopoverSubContTriggerEnum.click
}
/**
 * 显示组件子内容区域
 *
 * @param e 事件对象
 */
const showSubContent = (e: Event) => {
  // 基于组件的位置实现响应式更新组件子内容区域当前相对于组件的相对位置
  updateSubContPosBaseOnPosition()
  // click 方式触发组件子内容区域的显示与隐藏
  // 由于在移动端只有点击等相关事件，pointerdown 事件在 PC 端和移动端的事件对象都为
  // PointerEvent，所以采用如下写法，不管组件子内容区域的显示是 hover 还是 click
  // 都可以触发组件子内容区域的显示；
  // 相当于触发组件子内容区域显示的方式只限制了 PC 端对于鼠标移动事件是否执行组件子内容
  // 区域的显示
  if (isClick()) {
    if (e instanceof PointerEvent) {
      isShowSubCont.value = true
      isShow.value = true
    }
    return
  }
  // hover 方式触发组件子内容区域的显示与隐藏
  isShowSubCont.value = true
  isShow.value = true
}
/**
 * 隐藏组件子内容区域
 *
 * @param e 事件对象
 */
const hideSubContent = (e: Event) => {
  // click 方式触发组件子内容区域的显示与隐藏
  if (isClick()) {
    if (e instanceof PointerEvent) {
      isShowSubCont.value = false
      isShow.value = false
    }
    return
  }
  // hover 方式触发组件子内容区域的显示与隐藏
  isShowSubCont.value = false
  isShow.value = false
}
// 为组件绑定点击组件外部事件
onClickOutside(stPopoverRef, hideSubContent)
</script>

<template>
  <!-- 气泡弹出框 -->
  <!--
    鼠标事件：
    1.由于移动端没有鼠标移动事件，所以只为组件绑定 mouseover mouseleave 事件，
    只有在 PC 端才会触发鼠标移动相关事件
    2.由于 PC 端和移动端的点击都会触发 pointerdown 事件，所以 click 方式下，组
    件子内容区域的显示由该事件是否触发控制
  -->
  <div
    ref="stPopoverRef"
    class="st-popover"
    @mouseover="showSubContent"
    @mouseleave="hideSubContent"
    @pointerdown="showSubContent"
  >
    <!-- 弹出气泡的内容区域 -->
    <div class="st-popover__content">
      <slot name="default"></slot>
    </div>
    <transition :name="subContTransitionName">
      <!-- 弹出气泡的子内容区域 -->
      <div
        v-show="isShowSubCont"
        ref="stPopoverSubContentRef"
        class="st-popover__sub-content"
        :style="{
          ...StPopoverSubContPosConst[subContPos].position,
          zIndex: subContZIndex,
        }"
      >
        <slot name="subContent"></slot>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
/**
 * 气泡弹出框
 */
.st-popover {
  position: relative;

  // 弹出气泡的内容区域
  //.st-popover__content {
  //  cursor: pointer;
  //}

  // 弹出气泡的子内容区域
  .st-popover__sub-content {
    position: absolute;
  }
}

/**
 * 组件子内容区域的过渡效果
 */
.sub-cont-enter-active,
.sub-cont-leave-active {
  transition: all 300ms ease-in-out;
}

.sub-cont-enter-from,
.sub-cont-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
