<script setup lang="ts">
import {elSizeUtil} from '@st-common/ui-utils'
import {strUtil} from '@st-common/core'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StLoginPage1'
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 页面最小高度(屏幕的宽度小于 875px 时起作用)
    pageMinHeight?: number | string;
    // 圆形遮罩的直径
    circleMaskDiameter?: number | string;
    // 圆形遮罩在小屏幕(屏幕的宽度小于 875px)下的直径
    circleMaskDiameterSmall?: number | string;
    // 圆形遮罩颜色
    circleMaskColor?: string;
    // 面板中展示的图片的资源地址，
    // 如果传递的参数值为数组类型，则第一张图片会在面板1中展示，第二张图片会在面板2中展示，如果只有一张图片，则面板1与面板2展示相同的图片；
    // 如果传递的参数值为字符串类型，则面板1与面板2展示相同的图片
    panelImgSrc?: string[] | string;
    // 面板中展示的图片在小屏幕(屏幕的宽度小于 875px)下的宽度
    panelImgWidthSmall?: number | string;
  }>(),
  {
    pageMinHeight: '850px',
    circleMaskDiameter: '2500px',
    circleMaskDiameterSmall: '1500px',
    circleMaskColor: '#368EEF',
    panelImgSrc: '',
    panelImgWidthSmall: '200px'
  }
)

/**
 * 组件双向数据绑定
 */
// 是否切换表单
const isToggleForm = defineModel({default: false})
</script>

<template>
  <div
    class="st-login-page-1"
    :class="[isToggleForm ? 'toggle-form' : '']"
    :style="{
      '--page-min-height': elSizeUtil.elSizePreHandler(pageMinHeight),
      '--circle-mask-diameter': elSizeUtil.elSizePreHandler(circleMaskDiameter),
      '--circle-mask-diameter-small': elSizeUtil.elSizePreHandler(circleMaskDiameterSmall),
      '--circle-mask-color': circleMaskColor,
      '--panel-img-width-small': elSizeUtil.elSizePreHandler(panelImgWidthSmall)
    }"
  >
    <!-- 表单容器 -->
    <div class="st-login-page-1__form-container">
      <!-- 表单 -->
      <div class="st-login-page-1__form-container__form">
        <!-- 表单1 -->
        <div class="st-login-page-1__form-container__form-1">
          <slot name="form-1"></slot>
        </div>
        <!-- 表单2 -->
        <div class="st-login-page-1__form-container__form-2">
          <slot name="form-2"></slot>
        </div>
      </div>
    </div>
    <!-- 面板容器 -->
    <div class="st-login-page-1__panel-container">
      <!-- 面板1，与表单1同时展示 -->
      <div class="st-login-page-1__panel-container__panel-1">
        <slot name="panel-1">
          <div class="st-login-page-1__panel-container__panel-1__content">
            <div class="st-login-page-1__panel-container__panel-1__content__top">
              <slot name="panel-1-top"></slot>
            </div>
            <div class="st-login-page-1__panel-container__panel-1__content__img">
              <img
                v-if="strUtil.isStr(panelImgSrc) ? panelImgSrc : panelImgSrc[0]"
                class="img"
                :src="strUtil.isStr(panelImgSrc) ? panelImgSrc : panelImgSrc[0]"
                alt=""
              >
            </div>
          </div>
        </slot>
      </div>
      <!-- 面板2，与表单2同时展示 -->
      <div class="st-login-page-1__panel-container__panel-2">
        <slot name="panel-2">
          <div class="st-login-page-1__panel-container__panel-2__content">
            <div class="st-login-page-1__panel-container__panel-2__content__top">
              <slot name="panel-2-top"></slot>
            </div>
            <div class="st-login-page-1__panel-container__panel-2__content__img">
              <img
                v-if="strUtil.isStr(panelImgSrc) ? panelImgSrc : panelImgSrc[1] || panelImgSrc[0]"
                class="img"
                :src="strUtil.isStr(panelImgSrc) ? panelImgSrc : (panelImgSrc[1] ? panelImgSrc[1] : panelImgSrc[0])"
                alt=""
              >
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/******************************************************************************************** 屏幕的宽度大于 875px *******/
.st-login-page-1 {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: var(--page-min-height);
  overflow: hidden;

  /**
   * 页面中的圆形遮罩
   *
   * 关于如何使用定位处理圆形遮罩的位置：
   * 此时我们要在页面中通过对圆形遮罩进行左右平移以此来展示圆形遮罩的右下和左下部分，
   * 同时还希望能够使用正数的百分比来对圆形遮罩进行定位，因此我们需要选页面的右上角
   * 作为基准，然后通过垂直平移将圆形遮罩的水平直径固定在页面的上边界（因为球可能大
   * 于页面，所以球初始要在页面上边界下面，才可以通过垂直水平移动球自身的 50% 将球
   * 的水平直径定在页面的上边界），这样我们就可以通过左右平移圆形遮罩来展示圆形遮罩
   * 的右下和左下部分
   * （其他同理）
   */
  &::before {
    content: "";
    position: absolute;
    right: 55%;
    top: 5%;
    transform: translateY(-50%);
    z-index: 2;
    width: var(--circle-mask-diameter);
    height: var(--circle-mask-diameter);
    border-radius: 50%;
    background: var(--circle-mask-color);
    transition: 1.8s ease-in-out;
  }

  .st-login-page-1__form-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;

    .st-login-page-1__form-container__form {
      position: absolute;
      top: 50%;
      right: 0;
      z-index: 1;
      transform: translateY(-50%);
      width: 50%;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 1fr;
      justify-items: center;
      align-items: center;
      transition: 1s ease-in-out;
      transition-delay: .6s;

      .st-login-page-1__form-container__form-1,
      .st-login-page-1__form-container__form-2 {
        grid-row: 1 / 2;
        grid-column: 1 / 2;
        width: 100%;
        height: 100%;
        transition: opacity .75s ease-in-out;
        transition-delay: .6s;
      }

      .st-login-page-1__form-container__form-1 {
        opacity: 1;
        pointer-events: all;
      }

      .st-login-page-1__form-container__form-2 {
        opacity: 0;
        pointer-events: none;
      }
    }
  }

  .st-login-page-1__panel-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr);

    .st-login-page-1__panel-container__panel-1,
    .st-login-page-1__panel-container__panel-2 {
      z-index: 3;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      transition: transform .9s ease-in-out;
      transition-delay: .3s;
    }

    .st-login-page-1__panel-container__panel-1 {
      padding: 3rem 17% 2rem 12%;
      transform: translateX(0);
    }

    .st-login-page-1__panel-container__panel-2 {
      padding: 3rem 12% 2rem 17%;
      transform: translateX(100%);
    }

    .st-login-page-1__panel-container__panel-1__content,
    .st-login-page-1__panel-container__panel-2__content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: end;

      .img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}

/*----------------------------------------------------------------------------------------------------- 表单切换 ------*/
.st-login-page-1.toggle-form {

  &::before {
    right: 50%;
    transform: translate(100%, -50%);
  }

  .st-login-page-1__form-container {

    .st-login-page-1__form-container__form {
      right: 50%;

      .st-login-page-1__form-container__form-1 {
        opacity: 0;
        pointer-events: none;
      }

      .st-login-page-1__form-container__form-2 {
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  .st-login-page-1__panel-container {

    .st-login-page-1__panel-container__panel-1 {
      transform: translateX(-100%);
    }

    .st-login-page-1__panel-container__panel-2 {
      transform: translateX(0);
    }
  }
}

/******************************************************************************************** 屏幕的宽度小于 875px *******/
@media screen and (max-width: 875px) {
  .st-login-page-1 {

    &::before {
      --circle-mask-diameter: var(--circle-mask-diameter-small);
      top: initial;
      right: initial;
      left: 30%;
      bottom: 78%;
      transform: translateX(-50%);
    }

    .st-login-page-1__form-container {

      .st-login-page-1__form-container__form {
        top: 50%;
        right: 0;
        transform: translateY(-25%);
        width: 100%;
      }
    }

    .st-login-page-1__panel-container {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;

      .st-login-page-1__panel-container__panel-1 {
        padding: 1rem 17% 1rem 12%;
        grid-row: 1 / 2;
      }

      .st-login-page-1__panel-container__panel-2 {
        padding: 1rem 12% 1rem 17%;
        grid-row: 3 / 4;
      }

      .st-login-page-1__panel-container__panel-1__content,
      .st-login-page-1__panel-container__panel-2__content {
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .img {
          width: var(--panel-img-width-small);
        }
      }
    }
  }

  /*---------------------------------------------------------------------------------------------------- 表单切换 ------*/
  .st-login-page-1.toggle-form {

    &::before {
      bottom: 22%;
      transform: translate(-50%, 100%);
    }

    .st-login-page-1__form-container {

      .st-login-page-1__form-container__form {
        top: 0;
        right: 0;
        transform: translateY(25%);
        width: 100%;
      }
    }
  }
}

/******************************************************************************************** 屏幕的宽度小于 600px *******/
@media screen and (max-width: 600px) {
  .st-login-page-1 {

    &::before {
      left: 50%;
      bottom: 80%;
      transform: translateX(-50%);
    }

    .st-login-page-1__form-container {

      .st-login-page-1__form-container__form {
        transform: translateY(-35%);
        box-sizing: border-box;
        padding: 0 1rem;
      }
    }

    .st-login-page-1__panel-container {

      .st-login-page-1__panel-container__panel-1,
      .st-login-page-1__panel-container__panel-2 {
        transition-delay: .5s;
      }

      .st-login-page-1__panel-container__panel-1 {
        transform: translateY(0);
      }

      .st-login-page-1__panel-container__panel-2 {
        transform: translateY(100%);
      }

      .st-login-page-1__panel-container__panel-1__content,
      .st-login-page-1__panel-container__panel-2__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }

  /*---------------------------------------------------------------------------------------------------- 表单切换 ------*/
  .st-login-page-1.toggle-form {

    &::before {
      bottom: 42%;
      transform: translate(-50%, 100%);
    }

    .st-login-page-1__form-container {

      .st-login-page-1__form-container__form {
        transform: translateY(10%);
      }
    }

    .st-login-page-1__panel-container {

      .st-login-page-1__panel-container__panel-1 {
        transform: translateY(-100%);
      }

      .st-login-page-1__panel-container__panel-2 {
        transform: translateY(0);
      }
    }
  }
}
</style>
