<script setup lang="ts">
import {ButtonProps} from 'naive-ui'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'CollapsePopoverBtn',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // ---------------------------------------------------------------------------------------------- 自定义组件参数 ------
    // 按钮文本
    btnText?: string;
    // 按钮是否折叠收缩只显示图标
    isCollapse?: boolean;
    // 确认提示信息
    confirmText?: string;
    // ---------------------------------------------------------------------------------------------- 自定义组件参数 ------
    // -------------------------------------------------------------------------------------- n-popconfirm 组件参数 ------
    // 取消按钮文字
    negativeText?: string;
    // 确认按钮文字
    positiveText?: string;
    // 取消按钮的属性
    negativeBtnProps?: ButtonProps;
    // 确认按钮的属性
    positiveBtnProps?: ButtonProps;
    // 是否展示确认弹框中的图标
    showPopconfirmIcon?: boolean;
    // -------------------------------------------------------------------------------------- n-popconfirm 组件参数 ------
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    // 按钮的 DOM type 属性
    attrType?: 'button' | 'submit' | 'reset';
    // 按钮是否为块级元素
    block?: boolean;
    // 按钮是否为圆形
    circle?: boolean;
    // 按钮颜色
    color?: string;
    // 按钮边框是否为虚线
    dashed?: boolean;
    // 按钮是否禁用
    btnDisabled?: boolean;
    // 按钮是否透明
    ghost?: boolean;
    // 按钮是否显示加载状态
    loading?: boolean;
    // 按钮大小
    size?: 'large' | 'medium' | 'small' | 'mini';
    // 是否是次要按钮
    secondary?: boolean;
    // 是否为文本按钮
    text?: boolean;
    // 按钮类型
    type?: 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error';
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
  }>(),
  {
    // ---------------------------------------------------------------------------------------------- 自定义组件参数 ------
    btnText: '',
    isCollapse: false,
    confirmText: '',
    // ---------------------------------------------------------------------------------------------- 自定义组件参数 ------
    // -------------------------------------------------------------------------------------- n-popconfirm 组件参数 ------
    negativeText: '取消',
    positiveText: '确认',
    showPopconfirmIcon: true,
    // -------------------------------------------------------------------------------------- n-popconfirm 组件参数 ------
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    attrType: 'button',
    block: false,
    circle: false,
    dashed: false,
    btnDisabled: false,
    ghost: true,
    loading: false,
    size: 'small',
    secondary: false,
    text: false,
    type: 'default',
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
  }
)

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 点击取消事件
   *
   * @param {"negative-click"} e 事件名称
   * @returns {boolean | Promise<boolean> | any}
   */
  (e: 'negative-click'): boolean | Promise<boolean> | any;
  /**
   * 点击确定事件
   *
   * @param {"positive-click"} e 事件名称
   * @returns {boolean | Promise<boolean> | any}
   */
  (e: 'positive-click'): boolean | Promise<boolean> | any;
}>()
</script>

<template>
  <div class="popconfirm-btn flex-center">
    <n-popconfirm
      :negative-text="negativeText"
      :positive-text="positiveText"
      :negative-button-props="negativeBtnProps"
      :positive-button-props="positiveBtnProps"
      @negative-click="() => emits('negative-click')"
      @positive-click="() => emits('positive-click')"
      :show-icon="showPopconfirmIcon"
    >
      <template #trigger>
        <n-button
          :attr-type="attrType"
          :block="block"
          :circle="circle"
          :color="color"
          :dashed="dashed"
          :disabled="btnDisabled"
          :ghost="ghost"
          :loading="loading"
          :size="size"
          :secondary="secondary"
          :text="text"
          :type="type"
        >
          <template #icon>
            <slot name="icon"></slot>
          </template>
          <template #default v-if="!isCollapse">{{ btnText }}</template>
        </n-button>
      </template>
      {{ confirmText }}
    </n-popconfirm>
  </div>
</template>

<style scoped>

</style>
