<script setup lang="ts">
import DefaultTheme from "vitepress/theme"
import {useData} from 'vitepress'
import Home from '@/components/layout/home/home.vue'

// 默认主题中的 Layout 组件
const {Layout} = DefaultTheme

// 页面数据
const data = useData()
</script>

<template>
  <div class="layout">
    <div v-if="data.frontmatter.value.layout === 'custom-home'">
      <Home />
    </div>
    <div v-else-if="data.frontmatter.value.layout === 'none'"></div>
    <Layout v-else></Layout>
  </div>
</template>

<style scoped lang="scss">

</style>
