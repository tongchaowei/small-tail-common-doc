<script setup lang="ts">
import {onBeforeMount, onMounted, provide, ref, watch} from 'vue'
import StSwiper from "../StSwiper"
import StSwiperSlide from "../StSwiperSlide"
import type {Swiper as SwiperType} from "swiper/types"
import {useWindowSize} from "@vueuse/core"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StTimeline1',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 初始显示的项的索引
    initialIndex?: number;
    // 是否开启鼠标滚轮切换时间线项
    enableMousewheelSwitch?: boolean;
    // 切换过渡效果时长，单位为毫秒
    speed?: number;
    // 切换过渡效果
    transitionFun?: string;
    // 切换过渡效果执行延迟，如果传入的是数字，则单位默认为毫秒
    transitionDelay?: number | string;
    // 组件背景
    background?: string;
    // 时间线数据
    timelineData: string[];
    // 时间线可选项展示个数
    timelinePerView?: number;
    // 时间线可选项在需要响应式变换的小屏幕宽度下，展示的个数
    timelinePerViewReactScreen?: number;
    // 时间线开头和末尾的偏移量
    timelineOffset?: number;
    // 时间线未激活项颜色
    timelineColor?: string;
    // 时间线激活项颜色
    timelineColorActive?: string;
    // 时间线每项文本最多显示行数
    timelineTextMaxLine?: number;
    // 时间线切换过渡效果时长，单位为毫秒
    timelineSpeed?: number;
    // 时间线切换过渡效果
    timelineTransitionFun?: string;
    // 时间线切换过渡效果执行延迟，如果传入的是数字，则单位默认为毫秒
    timelineTransitionDelay?: number | string;
    // 是否显示时间线导航按钮
    enableTimelineNav?: boolean;
    // 需要响应式变化的小屏幕宽度界限
    needReactScreenWidth?: number;
  }>(),
  {
    initialIndex: 0,
    enableMousewheelSwitch: true,
    speed: 1500,
    transitionFun: 'cubic-bezier(.68, -0.55, .26, 1.55)',
    transitionDelay: 0,
    bgImg: 'transparent',
    timelinePerView: 1,
    timelinePerViewReactScreen: 1,
    timelineOffset: undefined,
    timelineColor: '#9c9c9c9f',
    timelineColorActive: '#efefef',
    timelineTextMaxLine: 1,
    timelineSpeed: 1200,
    timelineTransitionFun: 'cubic-bezier(.68, -0.55, .26, 1.55)',
    timelineTransitionDelay: 300,
    enableTimelineNav: true,
    needReactScreenWidth: 600,
  }
)

// 幻灯片切换的方向
const direction = ref<'horizontal' | 'vertical'>('vertical')

// 展示区域 Swiper 引用对象
const displaySwiperRef = ref()
// 展示区域 Swiper 实例对象
const displaySwiper = ref<SwiperType>()
// 时间线 swiper 引用对象
const timelineSwiperRef = ref()
// 时间线 swiper 实例对象
const timelineSwiper = ref<SwiperType>()
onMounted(() => {
  displaySwiper.value = displaySwiperRef.value.swiper
  timelineSwiper.value = timelineSwiperRef.value.swiper
})

// 时间线开头和结尾的偏移量
const timelineSlidesOffset = ref(props.timelineOffset)
// 时间线开头的偏移量处理
const timelineSlidesOffsetHandler = (timelinePerView: number) => {
  // 如果没有指定时间线开头的偏移量，则默认偏移以实现当前激活的时间线项居中
  if (timelineSlidesOffset.value === undefined) {
    const windowSize = isReact.value ? useWindowSize().width.value : useWindowSize().height.value
    const timelineSlidePerHeight = windowSize / timelinePerView
    timelineSlidesOffset.value = timelineSlidePerHeight * (timelinePerView / 2 - 0.5)
  }
}
onBeforeMount(() => {
  // 预处理时间线开头的偏移量
  timelineSlidesOffsetHandler(props.timelinePerView)
})

// 当前展示的项的索引
const activeIdx = ref(props.initialIndex)

// 是否响应式变化，以适应小屏幕
const isReact = ref(false)
// Swiper 更改方向处理函数
const changeSwiperDirectionHandler = (currentWindowWidth: number) => {
  // 当前浏览器可视区域的宽度是否需要修改 Swiper 方向
  const isNeed = currentWindowWidth <= props.needReactScreenWidth
  // 如果需要修改方向，且没响应式变化，则进行响应式变换
  if (isNeed && !isReact.value) {
    // 标记为响应式变化了
    isReact.value = true
    // 修改 Swiper 方向
    displaySwiperRef.value.swiper?.changeDirection('horizontal')
    timelineSwiperRef.value.swiper?.changeDirection('horizontal')
    // 处理方向修改后的时间线开头和末尾的偏移量
    timelineSlidesOffsetHandler(props.timelinePerViewReactScreen)
    // 更新 Swiper
    displaySwiperRef.value.swiper?.update();
    timelineSwiperRef.value.swiper?.update();
  }
  // 如果不需要修改方向了，且响应式变化了，则恢复响应式变换之前的 Swiper 方向
  else if (!isNeed && isReact.value) {
    isReact.value = false
    displaySwiperRef.value.swiper?.changeDirection('vertical');
    timelineSwiperRef.value.swiper?.changeDirection('vertical');
    timelineSlidesOffsetHandler(props.timelinePerView)
    displaySwiperRef.value.swiper?.update();
    timelineSwiperRef.value.swiper?.update();
  }
}
// 组件挂载完成后，判断是否需要响应式变换
onMounted(() => {
  changeSwiperDirectionHandler(useWindowSize().width.value)
})
// 监听屏幕宽度变化，判断是否需要响应式变化，以适应小屏幕
watch(() => useWindowSize().width.value, (newVal) => {
  changeSwiperDirectionHandler(newVal)
})
// 向子组件提供状态
provide('isReact', isReact)
</script>

<template>
  <div class="st-timeline1" :class="[isReact ? 'st-timeline1--small-screen' : '']" :style="{background}">
    <div class="st-timeline1__display">
      <StSwiper
        ref="displaySwiperRef"
        v-model:active-slide-idx="activeIdx"
        :initial-slide="initialIndex"
        :direction="direction"
        :mousewheel="enableMousewheelSwitch"
        :control-swiper="timelineSwiper"
        :transition-fun="transitionFun"
        :transition-speed="speed"
        :transition-delay="transitionDelay"
      >
        <slot></slot>
      </StSwiper>
    </div>
    <div class="st-timeline1__timeline">
      <StSwiper
        ref="timelineSwiperRef"
        class="st-timeline1__timeline-swiper"
        :width="isReact ? '100vw' : '100%'"
        :height="isReact ? '100%' : '100vh'"
        v-model:active-slide-idx="activeIdx"
        :initial-slide="initialIndex"
        :direction="direction"
        :slides-per-view="timelinePerView"
        :slides-offset-before="timelineSlidesOffset"
        :slides-offset-after="timelineSlidesOffset"
        :mousewheel="enableMousewheelSwitch"
        :navigation="enableTimelineNav"
        nav-direction="vertical"
        :nav-align="isReact ? 'end' : 'start'"
        :control-swiper="displaySwiper"
        swiper-overflow="initial"
        :transition-fun="timelineTransitionFun"
        :transition-speed="timelineSpeed"
        :transition-delay="timelineTransitionDelay"
      >
        <template v-slot="{ activeSlideIdx }">
          <StSwiperSlide
            v-for="(item, idx) in timelineData"
            :key="idx"
            class="st-timeline1__timeline-swipe__slide"
            :class="[activeSlideIdx === idx ? 'st-timeline1__timeline-swipe__slide--active' : '']"
            :style="{
              '--timeline-color': timelineColor,
              '--timeline-color-active': timelineColorActive
            }"
          >
            <div
              class="st-timeline1__timeline-swipe__slide__content"
              :style="{'--timeline-text-max-line': timelineTextMaxLine}"
            >
              <div class="st-timeline1__timeline-swipe__slide__content__label">{{ item }}</div>
            </div>
          </StSwiperSlide>
        </template>
      </StSwiper>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-timeline1 {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .st-timeline1__timeline {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 4fr 1fr;
    justify-items: start;
    align-items: center;

    .st-timeline1__timeline-swiper {
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

.st-timeline1--small-screen {

  .st-timeline1__timeline {
    grid-template-rows: 5fr 1fr;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: start;
    overflow: hidden;

    .st-timeline1__timeline-swiper {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      width: 100vw;
      height: 100%;
      border-top: 2px solid #cecece33;
      border-left: none;
      align-items: start;

      .st-timeline1__timeline-swipe__slide {
        padding-left: 0;
        padding-top: 1rem;

        .st-timeline1__timeline-swipe__slide__content {
          box-sizing: border-box;
          padding-left: 1rem;
          padding-right: 1rem;
          justify-content: center;
          align-items: start;
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
</style>
