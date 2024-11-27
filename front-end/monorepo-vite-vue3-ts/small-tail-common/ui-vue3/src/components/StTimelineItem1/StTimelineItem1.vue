<script setup lang="ts">
import StSwiperSlide from "../StSwiperSlide"
import {elSizeUtil} from "st-common-ui-utils"
import {inject} from "vue";

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StTimelineItem1',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 当前项的索引
    idx: number;
    // 背景图片资源地址
    bgImgSrc?: string;
    // 标题
    title?: string;
    // 描述文本
    desc?: string;
    // 文字颜色
    color?: string;
    // 文字动画效果时长，如果传入的是数字，则单位默认为毫秒
    animationSpeed?: number | string;
    // 标题出现时动画执行延迟，如果传入的是数字，则单位默认为毫秒
    titleEnterDelay?: number | string;
    // 描述文本出现时动画执行延迟，如果传入的是数字，则单位默认为毫秒
    descEnterDelay?: number | string;
    // 标题文本最多显示行数
    titleMaxLine?: number;
    // 描述文本最多显示行数
    descMaxLine?: number;
  }>(),
  {
    bgImgSrc: '',
    title: '',
    desc: '',
    color: '#efefef',
    animationSpeed: 500,
    titleEnterDelay: 1500,
    descEnterDelay: 1700,
    titleMaxLine: 1,
    descMaxLine: 5,
  }
)

/**
 * 注入父组件提供的状态
 */
// 是否响应式变化，以适应小屏幕
const isReact = inject('isReact')
</script>

<template>
  <StSwiperSlide>
    <template v-slot="{isInitial, initialSlideIdx, isSlideChange, enterSlideIdx, leaveSlideIdx, currentSlideIdx}">
      <div
        class="st-timeline-item1"
        :class="[isReact ? 'st-timeline-item1--small-screen' : '']"
        :style="{backgroundImage: `url(${bgImgSrc})`}"
      >
        <div
          class="st-timeline-item1__content"
          :class="[
              isInitial && initialSlideIdx === idx ?'st-timeline-item1__content--initial' : '',
              leaveSlideIdx === idx ? 'st-timeline-item1__content--leave' : '',
              enterSlideIdx === idx ? 'st-timeline-item1__content--enter' : ''
            ]"
          :style="{
              '--animation-speed': elSizeUtil.elSizePreHandler(animationSpeed, 'ms'),
              '--title-enter-delay': elSizeUtil.elSizePreHandler(titleEnterDelay, 'ms'),
              '--desc-enter-delay': elSizeUtil.elSizePreHandler(descEnterDelay, 'ms'),
              color,
            }"
        >
          <div class="st-timeline-item1__content__title" :style="{'--title-max-line': titleMaxLine}">{{ title }}</div>
          <div class="st-timeline-item1__content__desc" :style="{'--desc-max-line': descMaxLine}">{{ desc }}</div>
          <slot
            name="suffix"
            :isInitial="isInitial"
            :isChange="isSlideChange"
            :enterIdx="enterSlideIdx"
            :leaveIdx="leaveSlideIdx"
            :currentIdx="currentSlideIdx"
          ></slot>
        </div>
      </div>
    </template>
  </StSwiperSlide>
</template>

<style scoped lang="scss">
.st-timeline-item1 {
  position: relative;
  z-index: 99;
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

  .st-timeline-item1__content {
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

    .st-timeline-item1__content__title,
    .st-timeline-item1__content__desc {
      transform: translateX(100%);
      padding-right: 2rem;
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
    }

    .st-timeline-item1__content__title {
      margin-bottom: 0.5rem;
      font-size: 2rem;
      font-weight: bold;
      line-clamp: var(--title-max-line);
      -webkit-line-clamp: var(--title-max-line);
    }

    .st-timeline-item1__content__desc {
      padding-bottom: 1rem;
      font-size: 0.95rem;
      line-height: 1.25;
      line-clamp: var(--desc-max-line);
      -webkit-line-clamp: var(--desc-max-line);
    }
  }

  @keyframes st-timeline-item1__content-leave {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .st-timeline-item1__content--leave {

    .st-timeline-item1__content__title,
    .st-timeline-item1__content__desc {
      animation: st-timeline-item1__content-leave var(--animation-speed) ease-in-out forwards;
    }
  }

  @keyframes st-timeline-item1__content-enter {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .st-timeline-item1__content--enter {

    .st-timeline-item1__content__title {
      animation: st-timeline-item1__content-enter var(--animation-speed) ease-in-out forwards;
      animation-delay: var(--title-enter-delay);
    }

    .st-timeline-item1__content__desc {
      animation: st-timeline-item1__content-enter var(--animation-speed) ease-in-out forwards;
      animation-delay: var(--desc-enter-delay);
    }
  }

  .st-timeline-item1__content--initial {

    .st-timeline-item1__content__title,
    .st-timeline-item1__content__desc {
      transform: translateX(0);
      animation-duration: 0s;
    }
  }
}

.st-timeline-item1--small-screen {
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

  .st-timeline-item1__content {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    justify-content: end;

    .st-timeline-item1__content__title,
    .st-timeline-item1__content__desc {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .st-timeline-item1__content__title {
      font-size: 1.75rem;
    }

    .st-timeline-item1__content__desc {
      font-size: 0.95rem;
      line-height: 1.25;
    }
  }
}
</style>
