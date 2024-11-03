<script setup lang="ts">
import LoginForm from "./login-form.vue"
</script>

<template>
  <div class="login-form-by-pwd">
    <LoginForm>
      <n-form-item label="用户名">
        <n-input placeholder="请输入用户名" clearable/>
      </n-form-item>
      <n-form-item label="密码">
        <n-input placeholder="请输入密码" type="password" clearable show-password-on="click"/>
      </n-form-item>
    </LoginForm>
  </div>
</template>

<style scoped>

</style>
