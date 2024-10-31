<script setup lang="ts">
import LoginFormByPwd from "@/pages/login/components/login-form-by-pwd.vue" // 用户名密码登录表单
import LoginFormByEmail from "@/pages/login/components/login-form-by-email.vue" // 邮箱登录表单
import LoginFormToggle from "@/pages/login/components/login-form-toggle.vue" // 登录表单切换组件
import {ref} from 'vue'

// 是否切换表单
const isToggleForm = ref(false)
/**
 * 切换表单
 */
const toggleForm = () => isToggleForm.value = !isToggleForm.value
</script>

<template>
  <div class="login-page">
    <st-login-page1
      v-model="isToggleForm"
      circle-mask-color="#18A058"
      :panel-img-src="[
        '/images/login/panel-1.svg',
        '/images/login/panel-2.svg'
      ]"
    >
      <template #panel-1-top>
        <LoginFormToggle
          title="使用邮箱登录"
          sub-title="如果您的账号已经绑定了邮箱，那么您可以直接使用邮箱登录"
          toggle-btn-text="前往邮箱登录"
          :toggle-handler="toggleForm"
        />
      </template>
      <template #form-1>
        <LoginFormByPwd/>
      </template>
      <template #panel-2-top>
        <LoginFormToggle
          title="无法邮箱登录"
          sub-title="如果您的账号还未绑定邮箱，那么您需要先使用用户名密码登录后绑定邮箱"
          toggle-btn-text="用户名密码登录"
          :toggle-handler="toggleForm"
        />
      </template>
      <template #form-2>
        <LoginFormByEmail/>
      </template>
    </st-login-page1>
  </div>
</template>

<style scoped>

</style>
