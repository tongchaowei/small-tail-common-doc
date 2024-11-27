<script setup lang="ts">
import {Swiper} from 'swiper/vue'
import type {Swiper as SwiperType} from "swiper/types"
import {Controller, Mousewheel} from "swiper/modules"
import 'swiper/css/bundle'
import {elSizeUtil} from 'st-common-ui-utils'
import StIconIconify from "../StIconIconify"
import ChevronCompactLeft from '@iconify-icons/tabler/chevron-compact-left'
import ChevronCompactRight from '@iconify-icons/tabler/chevron-compact-right'
import ChevronCompactUp from '@iconify-icons/tabler/chevron-compact-up'
import ChevronCompactDown from '@iconify-icons/tabler/chevron-compact-down'
import {onMounted, provide, ref} from "vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StSwiper',
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
    // 初始展示的幻灯片索引
    initialSlide?: number;
    // 幻灯片的排列方向
    direction?: 'horizontal' | 'vertical';
    // 每个视口展示的幻灯片数量
    slidesPerView?: number;
    // 幻灯片开头的偏移量
    slidesOffsetBefore?: number;
    // 幻灯片结尾的偏移量
    slidesOffsetAfter?: number;
    // 是否开启鼠标滚轮控制
    mousewheel?: boolean;
    // 是否开启导航按钮
    navigation?: boolean;
    // 导航按钮的排列方向
    navDirection?: 'horizontal' | 'vertical';
    // 导航按钮的对其方式
    navAlign?: 'center' | 'start' | 'end';
    // 导航按钮的尺寸
    navSize?: string | number;
    // 导航按钮的颜色
    navColor?: string;
    // 导航按钮禁用时的颜色
    navDisabledColor?: string;
    // 幻灯片切换的过渡效果
    transitionFun?: string;
    // 幻灯片切换的过渡速度
    transitionSpeed?: number;
    // 幻灯片切换的过渡延迟时间
    transitionDelay?: number | string;
    // 需要当前 swiper 控制的其他 swiper 实例
    controlSwiper?: SwiperType | SwiperType[];
    // swiper 溢出处理
    swiperOverflow?: string;
    // 是否开启 Slide 点击事件
    enableSlideClick?: boolean;
    // Slide 点击事件处理函数
    slideClickHandler?: (swiper: SwiperType) => void;
  }>(),
  {
    width: '100%',
    height: '100vh',
    initialSlide: 0,
    direction: 'horizontal',
    slidesPerView: 1,
    mousewheel: true,
    navigation: false,
    navDirection: 'horizontal',
    navAlign: 'center',
    navSize: '3rem',
    navColor: '#efefef',
    navDisabledColor: '#9c9c9c9f',
    transitionFun: 'initial',
    transitionSpeed: 500,
    transitionDelay: 0,
    swiperOverflow: 'hidden',
    enableSlideClick: true,
    slideClickHandler: (swiper: SwiperType) => {
      swiper.slideTo(swiper.clickedIndex)
    },
  }
)

/**
 * 组件双向数据绑定
 */
const activeSlideIdx = defineModel<number>('activeSlideIdx', {default: undefined})

// 当前组件中的 swiper 对象
const swiper = ref<SwiperType | null>(null)
/**
 * 为 swiper 对象赋值
 *
 * @param {Swiper} swiperInstance swiper 实例对象
 */
const setSwiper = (swiperInstance: SwiperType) => {
  swiper.value = swiperInstance
}
/**
 * 向当前组件外暴露的状态
 */
defineExpose({
  swiper
})

// swiper 模块
const swiperModules = [Controller, Mousewheel]

// 初始状态下展示的幻灯片索引
const initialSlideIdx = ref(props.initialSlide)
// 当前组件容器元素引用对象
const stSwiperContainerRef = ref<HTMLDivElement | null>()
// 幻灯片组件的个数
const slideCount = ref(0)
onMounted(() => {
  // 获取当前组件容器元素
  const stSwiperContainer = stSwiperContainerRef.value as HTMLDivElement
  // 获取幻灯片组件的个数
  slideCount.value = stSwiperContainer.querySelectorAll('.swiper-slide').length
  // 判断初始展示的幻灯片索引是否越界，如果越界，则默认显示第一项
  if (initialSlideIdx.value >= slideCount.value || initialSlideIdx.value < 0) {
    initialSlideIdx.value = 0
  }
})

// 是否为初始状态
const isInitial = ref(true)
// 当前展示的幻灯片索引
const currentSlideIdx = ref(initialSlideIdx.value)
// 是否为切换幻灯片状态
const isSlideChange = ref(false)
// 要切换走的幻灯片的索引
const leaveSlideIdx = ref(-1)
// 要切换到的下一张幻灯片的索引
const enterSlideIdx = ref(0)
/**
 * 幻灯片切换过渡开始时的处理函数
 *
 * @param {Swiper} swiper swiper 实例对象
 */
const slideChangeTransitionStartHandler = (swiper: SwiperType) => {
  // 当前为切换幻灯片状态
  isSlideChange.value = true
  // 记录要切换走的幻灯片的索引
  leaveSlideIdx.value = swiper.previousIndex
  // 记录要切换到的下一张幻灯片的索引
  enterSlideIdx.value = swiper.activeIndex
  // 切换了就不为初始状态
  isInitial.value = false
}
/**
 * 幻灯片切换过渡结束时的处理函数
 */
const slideChangeTransitionEndHandler = () => {
  // 当前不再为切换幻灯片状态
  isSlideChange.value = false
}
/**
 * 当前展示的幻灯片索引变化时的处理函数
 */
const activeIndexChangeHandler = (swiper: SwiperType) => {
  // 更新当前展示的幻灯片索引
  currentSlideIdx.value = swiper.activeIndex
  // 更新当前激活的幻灯片索引
  activeSlideIdx.value = swiper.activeIndex
  // 记录要切换走的幻灯片的索引
  leaveSlideIdx.value = swiper.previousIndex
  // 记录要切换到的下一张幻灯片的索引
  enterSlideIdx.value = swiper.activeIndex
}

// 幻灯片水平排列下，导航按钮对其方式与定位的映射
const navAlignHorizontalMap = {
  center: {
    top: '50%',
    bottom: 'initial',
    transform: 'translateY(-50%)',
  },
  start: {
    top: 0,
    bottom: 'initial',
  },
  end: {
    top: 'initial',
    bottom: 0,
  },
}
// 幻灯片垂直排列下，导航按钮对其方式与定位的映射
const navAlignVerticalMap = {
  center: {
    left: '50%',
    right: 'initial',
    transform: 'translateX(-50%)',
  },
  start: {
    left: 0,
    right: 'initial',
  },
  end: {
    left: 'initial',
    right: 0,
  },
}
// 幻灯片导航按钮排列方向 和 导航按钮对其方式与定位 之间的映射
const navDirectionAlignMap = {
  horizontal: navAlignHorizontalMap,
  vertical: navAlignVerticalMap,
}
// 幻灯片导航按钮排列方向与上一个/下一个按钮 和 定位 之间的映射
const navDirectionPrevNextPositionMap = {
  horizontal: {
    prev: {
      left: 0,
      right: 'initial',
    },
    next: {
      left: 'initial',
      right: 0,
    },
  },
  vertical: {
    prev: {
      top: 0,
      bottom: 'initial',
    },
    next: {
      top: 'initial',
      bottom: 0,
    },
  }
}
// 幻灯片导航按钮排列方向与上一个/下一个按钮 和 图标 之间的映射
const navDirectionPrevNextIconMap = {
  horizontal: {
    prev: ChevronCompactLeft,
    next: ChevronCompactRight,
  },
  vertical: {
    prev: ChevronCompactUp,
    next: ChevronCompactDown,
  }
}

/**
 * 下一张幻灯片处理函数
 */
const nextSlideHandler = () => {
  const toSlideIdx = (activeSlideIdx.value === undefined ? currentSlideIdx.value : activeSlideIdx.value) + 1
  // enterSlideIdx.value = toSlideIdx
  // leaveSlideIdx.value = toSlideIdx - 1
  swiper.value?.slideTo(toSlideIdx)
  // swiper.value?.slideNext()
  // enterSlideIdx.value += 1
}
/**
 * 上一张幻灯片处理函数
 */
const prevSlideHandler = () => {
  const toSlideIdx = (activeSlideIdx.value === undefined ? currentSlideIdx.value : activeSlideIdx.value) - 1
  // enterSlideIdx.value = toSlideIdx
  // leaveSlideIdx.value = toSlideIdx + 1
  swiper.value?.slideTo(toSlideIdx)
}

// 向子组件提供状态
provide('isInitial', isInitial)
provide('initialSlideIdx', initialSlideIdx)
provide('isSlideChange', isSlideChange)
provide('enterSlideIdx', enterSlideIdx)
provide('leaveSlideIdx', leaveSlideIdx)
provide('nowSlideIdx',  activeSlideIdx.value === undefined ? currentSlideIdx : activeSlideIdx)
</script>

<template>
  <div
    ref="stSwiperContainerRef"
    class="st-swiper-container"
    :style="{
      '--transition-fun': transitionFun,
      '--transition-delay': elSizeUtil.elSizePreHandler(transitionDelay, 'ms'),
    }"
  >
    <Swiper
      class="st-swiper"
      :style="{
        '--swiper-overflow': swiperOverflow,
        width: elSizeUtil.elSizePreHandler(width),
        height: elSizeUtil.elSizePreHandler(height),
      }"
      :initial-slide="initialSlideIdx"
      :direction="direction"
      :slides-per-view="slidesPerView"
      :slides-offset-before="slidesOffsetBefore"
      :slides-offset-after="slidesOffsetAfter"
      :modules="swiperModules"
      :mousewheel="{enabled: mousewheel}"
      :controller="{control: controlSwiper}"
      :speed="transitionSpeed"
      @swiper="setSwiper"
      @slide-change-transition-start="slideChangeTransitionStartHandler"
      @slide-change-transition-end="slideChangeTransitionEndHandler"
      @active-index-change="activeIndexChangeHandler"
      @click="(swiper: SwiperType) => enableSlideClick && slideClickHandler(swiper)"
    >
      <template #wrapper-start>
        <slot
          :currentSlideIdx="currentSlideIdx"
          :activeSlideIdx="activeSlideIdx"
        ></slot>
      </template>
    </Swiper>
    <div
      v-if="navigation"
      class="st-swiper__nav st-swiper__nav-prev"
      :style="{
        ...navDirectionPrevNextPositionMap[navDirection]['prev'],
        ...navDirectionAlignMap[navDirection][navAlign],
      }"
      @pointerdown="currentSlideIdx > 0 && prevSlideHandler()"
    >
      <slot name="prev">
        <div
          class="st-swiper__nav__content"
          :style="{
            fontSize: elSizeUtil.elSizePreHandler(navSize),
            color: currentSlideIdx <= 0 ? navDisabledColor : navColor,
            cursor: currentSlideIdx <= 0 ? 'no-drop' : 'pointer'
          }"
        >
          <StIconIconify :icon="navDirectionPrevNextIconMap[navDirection]['prev']"/>
        </div>
      </slot>
    </div>
    <div
      v-if="navigation"
      class="st-swiper__nav st-swiper__nav-next"
      :style="{
        ...navDirectionPrevNextPositionMap[navDirection]['next'],
        ...navDirectionAlignMap[navDirection][navAlign],
      }"
      @pointerdown="currentSlideIdx < slideCount - 1 && nextSlideHandler()"
    >
      <slot name="next">
        <div
          class="st-swiper__nav__content"
          :style="{
            fontSize: elSizeUtil.elSizePreHandler(navSize),
            color: currentSlideIdx >= slideCount - 1 ? navDisabledColor : navColor,
            cursor: currentSlideIdx >= slideCount - 1 ? 'no-drop' : 'pointer'
          }"
        >
          <StIconIconify :icon="navDirectionPrevNextIconMap[navDirection]['next']"/>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-swiper-container {
  position: relative;

  :deep(.swiper) {
    overflow: initial;
  }

  .st-swiper {
    overflow: var(--swiper-overflow);

    :deep(.swiper-wrapper) {
      transition-timing-function: var(--transition-fun);
      transition-delay: var(--transition-delay) !important;
    }
  }

  .st-swiper__nav {
    position: absolute;
    z-index: 1;

    .st-swiper__nav__content {
      padding: 1rem;
    }
  }
}
</style>
