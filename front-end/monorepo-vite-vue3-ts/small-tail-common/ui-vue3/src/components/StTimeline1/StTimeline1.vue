<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import type {Swiper as SwiperType} from "swiper/types"
import {Controller, Mousewheel} from "swiper/modules"
import 'swiper/css'
import 'swiper/css/bundle'
import {onBeforeMount, ref, watch, onMounted} from 'vue'
import {StTimelineDataItem} from "./types.ts"
import {useWindowSize} from "@vueuse/core"
import {elSizeUtil} from 'st-common-ui-utils'

/**
 * 组件配置选项
 */
const props = withDefaults(
  defineProps<{
    // 时间线数据
    data: StTimelineDataItem[];
    // 需要响应式变化的小屏幕宽度界限
    needReactScreenWidth?: number;
    // 初始显示的时间线数据项索引
    initialIndex?: number;
    // 切换过渡效果时长，单位为毫秒
    speed?: number;
    // 切换过渡效果
    transitionFun?: string;
    // 切换过渡效果执行延迟，如果传入的是数字，则单位默认为毫秒
    transitionDelay?: number | string;
    // 背景图片
    bgImg?: string;
    // 展示区域中的文字颜色
    displayTextColor?: string;
    // 展示区域中文字动画效果时长，如果传入的是数字，则单位默认为毫秒
    displayTextAnimationSpeed?: number | string;
    // 展示区域中标题出现时动画执行延迟，如果传入的是数字，则单位默认为毫秒
    displayTitleEnterDelay?: number | string;
    // 展示区域中描述文本出现时动画执行延迟，如果传入的是数字，则单位默认为毫秒
    displayDescEnterDelay?: number | string;
    // 展示区域中标题文本最多显示行数
    displayTitleMaxLine?: number;
    // 展示区域中描述文本最多显示行数
    displayDescMaxLine?: number;
    // 是否开启鼠标滚轮切换时间线项
    enableMousewheelSwitch?: boolean;
    // 时间线可选项展示个数
    timelinePerView?: number;
    // 时间线可选项在需要响应式变换的小屏幕宽度下，展示的个数
    timelinePerViewReactScreen?: number;
    // 时间线开头和末尾的偏移量，用以实现当前激活时间线项居中效果
    timelineOffset?: number;
    // 时间线未激活项颜色
    timelineColor?: string;
    // 时间线激活项颜色
    timelineColorActive?: string;
    // 时间线每项文本最多显示行数
    timelineTextMaxLine?: number;
  }>(),
  {
    needReactScreenWidth: 600,
    initialIndex: 0,
    speed: 1500,
    transitionFun: 'cubic-bezier(.68, -0.55, .26, 1.55)',
    transitionDelay: 300,
    bgImg: 'transparent',
    displayTextColor: '#efefef',
    displayTextAnimationSpeed: 500,
    displayTitleEnterDelay: 2000,
    displayDescEnterDelay: 2200,
    displayTitleMaxLine: 1,
    displayDescMaxLine: 5,
    enableMousewheelSwitch: true,
    timelinePerView: 10,
    timelinePerViewReactScreen: 2,
    timelineColor: '#9c9c9c9f',
    timelineColorActive: '#efefef',
    timelineTextMaxLine: 1,
  }
)

/**
 * 初始处理
 */
// 是否为初始状态
const isInitial = ref(true)
// 初始显示的时间线数据项索引
const initialIdx = ref(props.initialIndex)
// 时间线开头和结尾的偏移量
const timelineSlidesOffset = ref(props.timelineOffset)
onBeforeMount(() => {
  // 判断是否越界，如果越界，则默认显示第一项
  const dataLen = props.data.length
  if (initialIdx.value >= dataLen || initialIdx.value < 0) initialIdx.value = 0
  // 时间线开头的偏移量预处理
  if (timelineSlidesOffset.value === undefined) {
    const timelineSlidePerHeight = useWindowSize().height.value / 2 / props.timelinePerView
    timelineSlidesOffset.value = timelineSlidePerHeight * (props.timelinePerView / 2 - 0.5)
  }
})

// 是否需要响应式变化，以适应小屏幕
const isNeedReact = ref(false)
// swiper 是否需要更改方向处理函数
const swiperIsChangeDirectionHandler = (currentWindowWidth: number) => {
  const isNeed = currentWindowWidth <= props.needReactScreenWidth
  if (isNeed && !isNeedReact.value) {
    isNeedReact.value = true
    displaySwiperRef.value?.changeDirection('horizontal');
    timelineSwiperRef.value?.changeDirection('horizontal');
    displaySwiperRef.value?.update();
    timelineSwiperRef.value?.update();
    displaySwiperCurrentSlideIndex.value = -1
    displaySwiperNextSlideIndex.value = 0
    isDisplaySwiperChangeSlide.value = true
    activeIndex.value = 0
  } else if (!isNeed && isNeedReact.value) {
    isNeedReact.value = false
    displaySwiperRef.value?.changeDirection('vertical');
    timelineSwiperRef.value?.changeDirection('vertical');
    displaySwiperRef.value?.update();
    timelineSwiperRef.value?.update();
    displaySwiperCurrentSlideIndex.value = -1
    displaySwiperNextSlideIndex.value = 0
    isDisplaySwiperChangeSlide.value = true
    activeIndex.value = 0
  }
}
onMounted(() => {
  swiperIsChangeDirectionHandler(useWindowSize().width.value)
})
/**
 * 监听屏幕宽度变化，判断是否需要响应式变化，以适应小屏幕
 */
watch(
  () => useWindowSize().width.value,
  (newVal) => {
    swiperIsChangeDirectionHandler(newVal)
  }
)

// swiper 模块
const swiperModules = ref([Controller, Mousewheel])

// swiper 引用对象
const displaySwiperRef = ref<SwiperType | null>(null)
const timelineSwiperRef = ref<SwiperType | null>(null)
// 为 swiper 引用对象赋值
const setDisplaySwiper = (swiper: SwiperType) => {
  displaySwiperRef.value = swiper
}
const setTimelineSwiper = (swiper: SwiperType) => {
  timelineSwiperRef.value = swiper
}

// 当前激活时间线项索引
const activeIndex = ref(initialIdx.value)

/**
 * 时间线 swiper 点击事件处理函数
 *
 * @param {Swiper} swiper 时间线 swiper 对象
 */
const timelineSwiperClickHandler = (swiper: SwiperType) => {
  displaySwiperRef.value?.slideTo(swiper.clickedIndex)
}

// display swiper 是否要切换幻灯片
const isDisplaySwiperChangeSlide = ref(false)
// display swiper 当前要切换走的幻灯片索引
const displaySwiperCurrentSlideIndex = ref(-1)
// display swiper 要切换到的下一张幻灯片索引
const displaySwiperNextSlideIndex = ref(0)
/**
 * display swiper 切换幻灯片开始事件处理函数
 */
const displaySwiperSlideChangeTransitionStartHandler = (swiper: SwiperType) => {
  isInitial.value = false
  displaySwiperCurrentSlideIndex.value = swiper.previousIndex
  displaySwiperNextSlideIndex.value = swiper.activeIndex
  isDisplaySwiperChangeSlide.value = true
  activeIndex.value = swiper.activeIndex
}
/**
 * display swiper 切换幻灯片结束事件处理函数
 */
const displaySwiperSlideChangeTransitionEndHandler = () => {
  isDisplaySwiperChangeSlide.value = false
}
/**
 * display swiper 鼠标滚轮滚动事件处理函数
 */
const displaySwiperMousewheelHandler = (swiper: SwiperType) => {
  timelineSwiperRef.value?.slideTo(swiper.activeIndex)
}
</script>

<template>
  <div
    class="st-timeline1"
    :class="[isNeedReact ? 'st-timeline1--small-screen' : '']"
    :style="{
      '--transition-fun': transitionFun,
      '--transition-delay': elSizeUtil.elSizePreHandler(transitionDelay, 'ms'),
      backgroundImage: bgImg,
    }"
  >
    <swiper
      class="st-timeline1__display-swiper"
      :direction="'vertical'"
      :initial-slide="initialIdx"
      :modules="swiperModules"
      :controller="{ control: timelineSwiperRef }"
      :speed="speed"
      :mousewheel="{enabled: enableMousewheelSwitch}"
      @scroll="displaySwiperMousewheelHandler"
      @swiper="setDisplaySwiper"
      @slide-change-transition-start="displaySwiperSlideChangeTransitionStartHandler"
      @slide-change-transition-end="displaySwiperSlideChangeTransitionEndHandler"
    >
      <swiper-slide
        class="st-timeline1__display-swipe__slide"
        v-for="(item, idx) in data"
        :key="idx"
      >
        <div
          class="st-timeline1__display-swipe__slide__content-container"
          :style="{backgroundImage: `url(${item.bgImgSrc})`}"
        >
          <div
            class="st-timeline1__display-swipe__slide__content"
            :class="[
              isInitial && initialIdx === idx ?'st-timeline1__display-swipe__slide__content--initial' : '',
              displaySwiperCurrentSlideIndex === idx ? 'st-timeline1__display-swipe__slide__content--leave' : '',
              displaySwiperNextSlideIndex === idx ? 'st-timeline1__display-swipe__slide__content--enter' : ''
            ]"
            :style="{
              '--display-text-animation-speed': elSizeUtil.elSizePreHandler(displayTextAnimationSpeed, 'ms'),
              '--display-title-enter-delay': elSizeUtil.elSizePreHandler(displayTitleEnterDelay, 'ms'),
              '--display-desc-enter-delay': elSizeUtil.elSizePreHandler(displayDescEnterDelay, 'ms'),
              color: displayTextColor
            }"
          >
            <div
              class="st-timeline1__display-swipe__slide__content__title"
              :style="{
                '--display-title-max-line': displayTitleMaxLine,
              }"
            >{{ item.title }}
            </div>
            <div
              class="st-timeline1__display-swipe__slide__content__desc"
              :style="{
                '--display-desc-max-line': displayDescMaxLine
              }"
            >{{ item.desc }}
            </div>
            <slot
              name="display-content-suffix"
              :item="item"
              :idx="idx"
              :isChange="isDisplaySwiperChangeSlide"
              :currentIdx="displaySwiperCurrentSlideIndex"
              :nextIdx="displaySwiperNextSlideIndex"
              :isInitial="isInitial"
            ></slot>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="st-timeline1__timeline-swiper-container">
      <div class="st-timeline1__timeline-swiper-box">
        <swiper
          class="st-timeline1__timeline-swiper"
          :direction="'vertical'"
          :slides-offset-before="timelineSlidesOffset"
          :slides-offset-after="timelineSlidesOffset"
          :initial-slide="initialIdx"
          :modules="swiperModules"
          :slides-per-view="isNeedReact ? timelinePerViewReactScreen : timelinePerView"
          :controller="{ control: displaySwiperRef }"
          @swiper="setTimelineSwiper"
          @click="timelineSwiperClickHandler"
        >
          <swiper-slide
            class="st-timeline1__timeline-swipe__slide"
            :class="[activeIndex === idx ? 'st-timeline1__timeline-swipe__slide--active' : '']"
            :style="{
              '--timeline-color': timelineColor,
              '--timeline-color-active': timelineColorActive
            }"
            v-for="(item, idx) in data"
            :key="idx"
          >
            <div
              class="st-timeline1__timeline-swipe__slide__content"
              :style="{'--timeline-text-max-line': timelineTextMaxLine}"
            >
              <div class="st-timeline1__timeline-swipe__slide__content__label">
                {{ item.label ? item.label : item.title }}
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.st-timeline1 {
  position: relative;
  overflow: hidden;

  :deep(.swiper) {
    overflow: initial;
  }

  .st-timeline1__display-swiper {
    width: 100%;
    height: 100vh;
    overflow: hidden;

    :deep(.swiper-wrapper) {
      transition-timing-function: var(--transition-fun);
      transition-delay: var(--transition-delay) !important;
    }

    .st-timeline1__display-swipe__slide {

      .st-timeline1__display-swipe__slide__content-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: cover;
        background-position: center;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 2fr 2fr 1fr;
        justify-items: end;
        align-items: center;

        &::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(20%, -50%);
          width: 165%;
          height: 100%;
          background: radial-gradient(circle at 100% 50%, #000000 0%, #0000009f 37.5%, transparent 65%, transparent 100%);
        }

        .st-timeline1__display-swipe__slide__content {
          z-index: 1;
          grid-row: 1 / 2;
          grid-column: 2 / 3;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: end;
          overflow: hidden;
          text-align: end;

          .st-timeline1__display-swipe__slide__content__title,
          .st-timeline1__display-swipe__slide__content__desc {
            transform: translateX(100%);
            padding-right: 2rem;
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
          }

          .st-timeline1__display-swipe__slide__content__title {
            margin-bottom: 0.5rem;
            font-size: 2rem;
            font-weight: bold;
            line-clamp: var(--display-title-max-line);
            -webkit-line-clamp: var(--display-title-max-line);
          }

          .st-timeline1__display-swipe__slide__content__desc {
            font-size: 0.95rem;
            line-height: 1.25;
            line-clamp: var(--display-desc-max-line);
            -webkit-line-clamp: var(--display-desc-max-line);
          }
        }

        @keyframes leave {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        .st-timeline1__display-swipe__slide__content--leave {

          .st-timeline1__display-swipe__slide__content__title,
          .st-timeline1__display-swipe__slide__content__desc {
            animation: leave var(--display-text-animation-speed) ease-in-out forwards;
          }
        }

        @keyframes enter {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .st-timeline1__display-swipe__slide__content--enter {

          .st-timeline1__display-swipe__slide__content__title {
            animation: enter var(--display-text-animation-speed) ease-in-out forwards;
            animation-delay: var(--display-title-enter-delay);
          }

          .st-timeline1__display-swipe__slide__content__desc {
            animation: enter var(--display-text-animation-speed) ease-in-out forwards;
            animation-delay: var(--display-desc-enter-delay);
          }
        }

        .st-timeline1__display-swipe__slide__content--initial {

          .st-timeline1__display-swipe__slide__content__title,
          .st-timeline1__display-swipe__slide__content__desc {
            transform: translateX(0);
            animation-duration: 0s;
          }
        }
      }
    }
  }

  .st-timeline1__timeline-swiper-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 4fr 1fr;
    justify-items: start;
    align-items: center;

    .st-timeline1__timeline-swiper-box {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-left: 2px solid #cecece33;
      border-top: none;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      align-items: center;

      .st-timeline1__timeline-swiper {
        width: 100%;
        height: 50%;

        .st-timeline1__timeline-swipe__slide {
          box-sizing: border-box;
          padding-left: 1rem;
          padding-top: 0;
          cursor: pointer;

          .st-timeline1__timeline-swipe__slide__content {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: start;
            align-items: center;
            color: var(--timeline-color);

            .st-timeline1__timeline-swipe__slide__content__label {
              display: -webkit-box;
              overflow: hidden;
              -webkit-box-orient: vertical;
              text-overflow: ellipsis;
              line-clamp: var(--timeline-text-max-line);
              -webkit-line-clamp: var(--timeline-text-max-line);
            }
          }
        }

        .st-timeline1__timeline-swipe__slide--active {
          position: relative;
          width: 100%;

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: -1px;
            transform: translate(-50%, -50%);
            z-index: 1;
            width: 4px;
            height: 4px;
            background-color: var(--timeline-color-active);
            border-radius: 50%;
          }

          .st-timeline1__timeline-swipe__slide__content {
            width: 100%;

            .st-timeline1__timeline-swipe__slide__content__label {
              color: var(--timeline-color-active);
            }
          }
        }
      }
    }
  }
}

.st-timeline1--small-screen {

  .st-timeline1__display-swiper {

    .st-timeline1__display-swipe__slide {

      .st-timeline1__display-swipe__slide__content-container {
        grid-template-rows: 5fr 1fr;
        grid-template-columns: 1fr;
        justify-items: start;
        align-items: end;

        &::after {
          top: 35%;
          transform: translate(0, -50%);
          width: 100%;
          height: 165%;
          background: radial-gradient(circle at 50% 100%, #000000 0%, #0000009f 37.5%, transparent 65%, transparent 100%);
        }

        .st-timeline1__display-swipe__slide__content {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
          justify-content: end;

          .st-timeline1__display-swipe__slide__content__title {
            font-size: 1.75rem;
          }

          .st-timeline1__display-swipe__slide__content__desc {
            font-size: 0.95rem;
            line-height: 1.25;
          }
        }
      }
    }
  }

  .st-timeline1__timeline-swiper-container {
    grid-template-rows: 5fr 1fr;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: start;
    overflow: hidden;

    .st-timeline1__timeline-swiper-box {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      border-top: 2px solid #cecece33;
      border-left: none;
      align-items: start;

      .st-timeline1__timeline-swiper {
        height: auto;

        .st-timeline1__timeline-swipe__slide {
          padding-left: 0;
          padding-top: 1rem;

          .st-timeline1__timeline-swipe__slide__content {
            justify-content: center;
          }
        }

        .st-timeline1__timeline-swipe__slide--active {

          &::before {
            top: -1px;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
