// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from "@/components/layout/index.vue"
import naive from 'naive-ui'
import ElementPlus from 'element-plus'
import '@/styles/index'

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.use(naive)
    app.use(ElementPlus)
  }
} satisfies Theme
