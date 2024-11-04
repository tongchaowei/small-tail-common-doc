<script setup lang="ts">
// 导入 vite-plugin-pages 插件自动生成的路由配置
import routes from '~pages'
</script>

<template>
  <div class="index-page">
    <div class="router-link" v-for="route in routes">
      <router-link :to="route.path">{{ route.name }}</router-link>
    </div>
  </div>
</template>

<style scoped>

</style>
