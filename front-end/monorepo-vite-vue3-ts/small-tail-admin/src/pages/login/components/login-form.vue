<script setup lang="ts">
/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 表单标题
    title?: string;
    // 表单标签宽度
    labelWidth?: number | string | "auto";
    // 按钮文本
    btnText?: string;
  }>(),
  {
    title: "登录",
    labelWidth: 60,
    btnText: "登录",
  }
)
</script>

<template>
  <div class="login-form box-border w-[95%] max-w-md p-6 m-a box-bg rounded-lg flex-col-center">
    <h1
      class="login-form__title w-content bg-gradient-to-br from-[#92fe9d] to-[#18A058] pb-6 text-3xl font-bold text-gradient"
    >
      {{ title }}
    </h1>
    <div class="login-form__form">
      <n-form
        :label-width="labelWidth"
        label-placement="left"
        label-align="left"
      >
        <slot></slot>
        <n-form-item>
          <n-button type="primary" block round attr-type="submit">{{ btnText }}</n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<style scoped>

</style>
