<script setup lang="ts">
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
    // 按钮文本
    btnText?: string;
    // 按钮是否折叠收缩只显示图标
    isCollapse?: boolean;
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    // 按钮的 DOM type 属性
    attrType?: 'button' |'submit' |'reset';
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
    size?: 'large' |'medium' |'small' |'mini';
    // 是否是次要按钮
    secondary?: boolean;
    // 按钮类型
    type?: 'default' | 'tertiary' | 'primary' | 'success' | 'info' | 'warning' | 'error';
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    // ----------------------------------------------------------------------------------------- n-popover 组件参数 ------
    // 条件渲染使用的指令
    displayDirective?: 'if' | 'show';
    // 是否在 trigger 为 hover 的时候，悬浮在 popover 时保持 popover 显示
    keepAliveOnHover?: boolean;
    // popover 的触发方式
    trigger?: 'hover' | 'click' | 'focus' | 'manual';
    // ----------------------------------------------------------------------------------------- n-popover 组件参数 ------
  }>(),
  {
    btnText: '',
    isCollapse: false,
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    attrType: 'button',
    block: false,
    circle: false,
    dashed: false,
    btnDisabled: false,
    ghost: true,
    loading: false,
    size:'small',
    secondary: false,
    type: 'default',
    // ------------------------------------------------------------------------------------------ n-button 组件参数 ------
    // ----------------------------------------------------------------------------------------- n-popover 组件参数 ------
    displayDirective: 'show',
    keepAliveOnHover: false,
    trigger: 'hover',
    // ----------------------------------------------------------------------------------------- n-popover 组件参数 ------
  }
)
</script>

<template>
  <div class="collapse-popover-btn">
    <n-popover
      :disabled="!isCollapse"
      :display-directive="displayDirective"
      :keep-alive-on-hover="keepAliveOnHover"
      :trigger="trigger"
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
          :type="type"
        >
          <template #icon>
            <slot name="icon"></slot>
          </template>
          <template #default v-if="!isCollapse">{{ btnText }}</template>
        </n-button>
      </template>
      <template #default>
        <span>{{ btnText }}</span>
      </template>
    </n-popover>
  </div>
</template>

<style scoped>

</style>
