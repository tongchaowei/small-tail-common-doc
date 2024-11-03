// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from "@/components/layout/index.vue"
import '@/styles/index'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // }
} satisfies Theme
