<script setup lang="ts">
import {StLoginPage1} from '@st-common/ui-vue3'
import LoginFormByPwd from '@/pages/login/components/login-form-by-pwd.vue'
import LoginFormByEmail from '@/pages/login/components/login-form-by-email.vue'
import LoginFormToggle from "@/pages/login/components/login-form-toggle.vue"
import {ref} from 'vue'

// 是否切换表单
const isToggleForm = ref(false)
/**
 * 切换表单
 */
const toggleForm = () => isToggleForm.value =!isToggleForm.value
</script>

<template>
  <div class="login-page">
    <st-login-page1
      v-model="isToggleForm"
      circle-mask-color="#36AD6A"
      :panel-img-src="[
        '/images/login/panel-1.svg',
        '/images/login/panel-2.svg',
      ]"
    >
      <template #form-1>
        <LoginFormByPwd/>
      </template>
      <template #form-2>
        <LoginFormByEmail/>
      </template>
      <template #panel-1-top>
        <LoginFormToggle
          title="使用邮箱登录"
          sub-title="如果您的账号已经绑定了邮箱，那么您可以直接使用邮箱登录"
          toggle-btn-text="前往邮箱登录"
          :toggle-handler="toggleForm"
        />
      </template>
      <template #panel-2-top>
        <LoginFormToggle
          title="无法邮箱登录"
          sub-title="如果您的账号还未绑定邮箱，那么您需要先使用用户名密码登录后绑定邮箱"
          toggle-btn-text="用户名密码登录"
          :toggle-handler="toggleForm"
        />
      </template>
    </st-login-page1>
  </div>
</template>

<style scoped>

</style>
