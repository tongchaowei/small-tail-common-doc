<script setup lang="ts">
import {VNodeChild} from "vue"
import 'naive-ui/es/dialog/styles/index'
import {ButtonProps} from 'naive-ui'

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 使用何种指令控制对话框主体的条件渲染
    displayDirective?: 'if' | 'show';
    // 对话框类型
    type?: 'error' | 'success' | 'warning' | 'info';
    // 标题
    title?: string | (() => VNodeChild);
    // 是否显示图标
    showIcon?: boolean;
    // 取消按钮的文字，不填对应的按钮不会出现
    negativeText?: string;
    // 取消按钮的属性
    negativeButtonProps?: ButtonProps;
    // 确认按钮的文字，不填对应的按钮不会出现
    positiveText?: string;
    // 确认按钮的属性
    positiveButtonProps?: ButtonProps;
  }>(),
  {
    displayDirective: 'if',
    type: 'info',
    title: '对话框',
    showIcon: false,
    negativeText: '取消',
    positiveText: '确定',
  }
)

/**
 * 组件双向数据绑定
 */
const show = defineModel<boolean>('show', {default: false})

/**
 * 自定义事件
 */
const emits = defineEmits<{
  /**
   * 点击关闭时触发
   *
   * @param {"close"} e
   */
  (e: 'close'): void;
  /**
   * 点击取消按钮时触发
   *
   * @param {"negative-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'negative-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 点击确认按钮时触发
   *
   * @param {"positive-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'positive-click', ev: MouseEvent | TouchEvent): void;
}>()

/**
 * 关闭事件处理函数
 */
const closeHandler = () => {
  emits('close')
  show.value = false
}

/**
 * 取消按钮点击事件处理函数
 *
 * @param {MouseEvent | TouchEvent} ev
 */
const negativeClickHandler = (ev: MouseEvent | TouchEvent) => {
  emits('negative-click', ev)
  show.value = false
}

/**
 * 确认按钮点击事件处理函数
 *
 * @param {MouseEvent | TouchEvent} ev
 */
const positiveClickHandler = (ev: MouseEvent | TouchEvent) => {
  emits('positive-click', ev)
  show.value = false
}
</script>

<template>
  <n-modal
    v-model:show="show"
    :display-directive="displayDirective"
    :auto-focus="false"
  >
    <template #default>
      <n-dialog
        :type="type"
        :title="title"
        :show-icon="showIcon"
        :negative-text="negativeText"
        :negative-button-props="negativeButtonProps"
        :positive-text="positiveText"
        :positive-button-props="positiveButtonProps"
        @close="closeHandler"
        @negative-click="negativeClickHandler"
        @positive-click="positiveClickHandler"
      >
        <template #icon>
          <slot name="icon"></slot>
        </template>
        <template #default>
          <slot></slot>
        </template>
      </n-dialog>
    </template>
  </n-modal>
</template>

<style scoped>

</style>
