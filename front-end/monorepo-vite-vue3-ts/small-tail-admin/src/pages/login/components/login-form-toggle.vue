<script setup lang="ts">
/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 标题
    title?: string;
    // 副标题
    subTitle?: string;
    // 切换按钮文字
    toggleBtnText: string;
    // 切换按钮点击事件处理函数
    toggleHandler?: () => void;
  }>(),
  {
    title: '',
    subTitle: '',
    toggleBtnText: '',
    toggleHandler: () => {}
  }
)
</script>

<template>
  <div class="login-form-toggle text-white">
    <div class="login-form-toggle__title mb-1 text-2xl font-bold">{{ title }}</div>
    <div class="login-form-toggle__sub-title max-w-[240px] mb-3 text-sm">{{ subTitle }}</div>
    <div class="login-form-toggle__toggle-btn">
      <n-button
        class="border-[2px] border-solid border-white"
        color="transparent"
        type="primary"
        size="large"
        round
        @click="toggleHandler"
      >{{ toggleBtnText }}</n-button>
    </div>
  </div>
</template>

<style scoped>

</style>
