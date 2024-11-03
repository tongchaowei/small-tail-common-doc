<script setup lang="ts">
import LoginForm from "./login-form.vue"
</script>

<template>
  <div class="login-form-by-email">
    <LoginForm title="邮箱登录">
      <n-form-item label="邮箱">
        <n-input placeholder="请输入邮箱" clearable/>
      </n-form-item>
      <n-form-item label="验证码">
        <n-input placeholder="请输入验证码" clearable/>
      </n-form-item>
    </LoginForm>
  </div>
</template>

<style scoped>

</style>
