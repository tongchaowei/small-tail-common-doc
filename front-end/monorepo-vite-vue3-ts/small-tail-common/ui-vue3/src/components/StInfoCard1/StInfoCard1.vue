<script setup lang="ts">
import {elSizeUtil} from "st-common-ui-utils"
import {ref, onMounted} from "vue"
import {useElementSize} from "@vueuse/core"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StInfoCard1',
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
    // 背景
    background?: string;
    // 图片地址
    imgSrc?: string;
    // 图片宽度
    imgWidth?: string | number;
    // 图片高度
    imgHeight?: string | number;
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
    // 内容过渡动画的执行速度，可以说是过渡动画执行所需的事件，如果传递的值为数字，则其单位默认为 ms
    contentSpeed?: number | string;
    // 内容过渡动画延迟
    contentDelay?: number | string;
  }>(),
  {
    width: '100%',
    height: 'auto',
    padding: '1rem',
    background: '#fff',
    imgSrc: '',
    imgWidth: '100%',
    imgHeight: '100%',
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

// 图片盒子元素的引用
const imgBoxRef = ref<HTMLDivElement>()
// 图片盒子元素的初始宽度
const imgBoxOriginWidth = ref<number>()
// 图片盒子元素的初始高度
const imgBoxOriginHeight = ref<number>()

/**
 * 组件挂载后获取图片盒子元素的初始高度
 */
onMounted(() => {
  imgBoxOriginWidth.value = useElementSize(imgBoxRef.value).width.value
  imgBoxOriginHeight.value = useElementSize(imgBoxRef.value).height.value
})
</script>

<template>
  <div
    class="st-info-card-1-container"
    :style="{
      '--padding': elSizeUtil.elSizePreHandler(padding),
      '--img-width': elSizeUtil.elSizePreHandler(imgBoxOriginWidth || imgWidth),
      '--img-height': elSizeUtil.elSizePreHandler(imgBoxOriginHeight || imgHeight),
      '--img-speed': elSizeUtil.elSizePreHandler(imgSpeed, 'ms'),
      '--img-delay': elSizeUtil.elSizePreHandler(imgDelay, 'ms'),
      '--content-speed': elSizeUtil.elSizePreHandler(contentSpeed, 'ms'),
      '--content-delay': elSizeUtil.elSizePreHandler(contentDelay, 'ms'),
    }"
  >
    <div
      class="st-info-card-1"
      :style="{
        width: elSizeUtil.elSizePreHandler(width),
        height: elSizeUtil.elSizePreHandler(height),
        background,
      }"
    >
      <div class="st-info-card-1__img-placeholder"></div>
      <div ref="imgBoxRef" class="st-info-card-1__img-box">
        <slot name="img">
          <img
            class="st-info-card-1__img-box__img"
            :style="{
              objectFit: imgFillMode,
              objectPosition: imgPosition,
            }"
            :src="imgSrc" alt="img"
          />
        </slot>
      </div>
      <div class="st-info-card-1__title-box">
        <slot name="title">
          <div
            class="st-info-card-1__title-box__title"
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
</template>

<style scoped lang="scss">
.st-info-card-1-container {

  .st-info-card-1 {
    position: relative;
    box-sizing: border-box;
    padding: var(--padding);
    padding-top: 0;
    border-radius: 0.5rem;
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;

    .st-info-card-1__img-placeholder,
    .st-info-card-1__img-box {
      transition: all var(--img-speed) var(--img-delay) ease-in-out;
    }

    .st-info-card-1__img-placeholder {
      width: var(--img-width);
      height: var(--img-height);
    }

    .st-info-card-1__img-box {
      position: absolute;
      box-sizing: border-box;
      width: var(--img-width);
      height: var(--img-height);
      padding: var(--padding);
      padding-bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .st-info-card-1__img-box__img {
        width: 100%;
        height: 100%;
        border-radius: 0.25rem;
        overflow: hidden;
      }
    }

    .st-info-card-1__title-box {

      .st-info-card-1__title-box__title {
        padding-top: 1rem;
        text-align: center;
        font-weight: bold;
      }
    }

    .st-info-card-1__content-box,
    .st-info-card-1__content-box__content {
      transition-duration: var(--content-speed);
      transition-delay: var(--content-delay);
      transition-timing-function: ease-in-out;
    }

    .st-info-card-1__content-box {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 0fr;
      opacity: 0;
      transition-property: all;

      .st-info-card-1__content-box__content {
        height: 0;
        padding: 0;
        overflow: hidden;
        text-align: center;
        clip-path: circle(0 at 50% 0);
        transition-property: clip-path;
      }
    }
  }

  &:hover {
    --img-translate-y--hover: calc(var(--img-height) * -0.4);
    padding-top: calc(var(--img-translate-y--hover) * -1);

    .st-info-card-1 {

      .st-info-card-1__img-placeholder {
        height: calc(var(--img-height) * 0.75 + var(--img-translate-y--hover));
      }

      .st-info-card-1__img-box {
        transform: translateY(var(--img-translate-y--hover));
        width: calc(var(--img-width) * 0.75);
        height: calc(var(--img-height) * 0.75);

        .st-info-card-1__img-box__img {
          box-shadow: 0 7px 30px 0 rgba(0, 0, 0, 0.2);
        }
      }

      .st-info-card-1__content-box {
        grid-template-rows: 1fr;
        opacity: 1;

        .st-info-card-1__content-box__content {
          height: auto;
          padding: 0.5rem 0;
          clip-path: circle(100% at 50% 50%);
        }
      }
    }
  }
}
</style>
