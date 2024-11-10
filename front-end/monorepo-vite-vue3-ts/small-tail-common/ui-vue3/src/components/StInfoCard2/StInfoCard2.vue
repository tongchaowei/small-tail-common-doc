<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StInfoCard2',
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
    // 组件内边距
    padding?: string | number;
    // 图片地址
    imgSrc?: string;
    // 图片宽度
    imgWidth?: string | number;
    // 图片高度
    imgHeight?: string | number;
    // 组件鼠标悬浮时图片的大小
    imgSizeHover?: string | number;
    // 图片填充模式
    imgFillMode?: 'cover' | 'contain' | 'none' | 'scale-down';
    // 图片位置
    imgPosition?: string;
    // 图片过渡动画的执行速度，可以说是过渡动画执行所需的事件，如果传递的值为数字，则其单位默认为 ms
    imgSpeed?: number | string;
    // 图片过渡动画延迟
    imgDelay?: number | string;
    // 标题
    title?: string;
    // 标题字体大小
    titleFontSize?: string | number;
    // 内容
    content?: string;
    // 下面的内容，指的是标题和内容
    // 内容过渡动画的执行速度，可以说是过渡动画执行所需的事件，如果传递的值为数字，则其单位默认为 ms
    contentSpeed?: number | string;
    // 内容过渡动画延迟
    contentDelay?: number | string;
  }>(),
  {
    width: '100%',
    height: '100%',
    padding: '1rem',
    imgSrc: '',
    imgWidth: '100%',
    imgHeight: '100%',
    imgSizeHover: 150,
    imgFillMode: 'cover',
    imgPosition: 'center',
    imgSpeed: 500,
    imgDelay: 0,
    title: '',
    titleFontSize: '1.25rem',
    content: '',
    contentSpeed: 500,
    contentDelay: 150,
  }
)
</script>

<template>
  <div
    class="st-info-card-2"
    :style="{
      '--padding': elSizeUtil.elSizePreHandler(padding),
      '--img-width': elSizeUtil.elSizePreHandler(imgWidth),
      '--img-height': elSizeUtil.elSizePreHandler(imgHeight),
      '--img-size--hover': elSizeUtil.elSizePreHandler(imgSizeHover),
      '--img-speed': elSizeUtil.elSizePreHandler(imgSpeed, 'ms'),
      '--img-delay': elSizeUtil.elSizePreHandler(imgDelay, 'ms'),
      '--content-speed': elSizeUtil.elSizePreHandler(contentSpeed, 'ms'),
      '--content-delay': elSizeUtil.elSizePreHandler(contentDelay, 'ms'),
      width: elSizeUtil.elSizePreHandler(width),
      height: elSizeUtil.elSizePreHandler(height),
    }"
  >
    <div class="st-info-card-2__img-placeholder"></div>
    <div class="st-info-card-2__img-box">
      <slot name="img">
        <img
          class="st-info-card-2__img-box__img"
          :style="{
            objectFit: imgFillMode,
            objectPosition: imgPosition,
          }"
          :src="imgSrc"
          alt=""
        />
      </slot>
    </div>
    <div class="st-info-card-2__title-content-container">
      <div class="st-info-card-2__title-content">
        <div class="st-info-card-2__title-box">
          <slot name="title">
            <div
              class="st-info-card-2__title-box__title"
              :style="{
                fontSize: elSizeUtil.elSizePreHandler(titleFontSize),
              }"
            >{{ title }}
            </div>
          </slot>
        </div>
        <div class="st-info-card-1__content-box">
          <slot name="content">
            <div class="st-info-card-1__content-box__content">{{ content }}</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-info-card-2 {
  position: relative;
  box-sizing: border-box;
  border-radius: 0.5rem;
  overflow: hidden;

  .st-info-card-2__img-placeholder,
  .st-info-card-2__img-box {
    transition: all var(--img-speed) ease-in-out;
    transition-delay: var(--img-delay);
  }

  .st-info-card-2__img-placeholder {
    width: var(--img-width);
    height: var(--img-height);
  }

  .st-info-card-2__img-box {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: var(--img-width);
    height: var(--img-height);
    border-radius: 0;
    overflow: hidden;

    .st-info-card-2__img-box__img {
      width: 100%;
      height: 100%;
    }
  }

  .st-info-card-2__title-content-container,
  .st-info-card-2__title-content {
    transition-duration: var(--content-speed);
    transition-delay: var(--content-delay);
    transition-timing-function: ease-in-out;
  }

  .st-info-card-2__title-content-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0fr;
    justify-items: center;
    align-items: center;
    transition-property: grid-template-rows;

    .st-info-card-2__title-content {
      height: 100%;
      overflow: hidden;
      clip-path: circle(0 at 50% 0);
      opacity: 0;
      transition-property: clip-path, opacity;

      .st-info-card-2__title-box {
        overflow: hidden;

        .st-info-card-2__title-box__title {
          padding-top: 1rem;
          text-align: center;
          font-weight: bold;
        }
      }
    }

    .st-info-card-1__content-box {
      overflow: hidden;

      .st-info-card-1__content-box__content {
        padding: 0.5rem 0 0;
        text-align: center;
      }
    }
  }

  &:hover {
    padding: var(--padding);
    padding-top: 0;

    .st-info-card-2__img-placeholder {
      height: var(--img-size--hover);
      padding-top: var(--padding);
    }

    .st-info-card-2__img-box {
      top: var(--padding);
      width: var(--img-size--hover);
      height: var(--img-size--hover);
      border-radius: 50%;
    }

    .st-info-card-2__title-content-container {
      grid-template-rows: 1fr;

      .st-info-card-2__title-content {
        clip-path: circle(100% at 50% 50%);
        opacity: 1;
      }
    }
  }
}
</style>
