<script setup lang="ts">
import { darkTheme } from 'naive-ui' // 导入 Naive UI 的深色主题
import {useDark} from '@vueuse/core'

// 获取当前是否为深色模式
const isDark = useDark()
</script>

<template>
  <div class="navie-config-provider">
    <!-- 实现切换 Naive UI 使用的主题颜色的组件 -->
    <n-config-provider :theme="isDark ? darkTheme : undefined">
      <slot></slot>
    </n-config-provider>
  </div>
</template>

<style scoped>

</style>
