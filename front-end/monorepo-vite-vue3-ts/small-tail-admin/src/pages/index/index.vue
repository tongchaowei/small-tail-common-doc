<script setup lang="ts">
import '@/utils/icons/pre-add-icons'
import Layout from "@/pages/index/components/layout/layout.vue"
import Menu from "@/pages/index/components/menu/menu.vue"
import SysMenu from "@/pages/index/pages/sys/menu/sys-menu.vue"
</script>

<template>
  <div class="index-page">
    <Layout>
      <template #sider>
        <Menu />
      </template>
      <template #content>
        <SysMenu />
      </template>
    </Layout>
  </div>
</template>

<style scoped>

</style>
