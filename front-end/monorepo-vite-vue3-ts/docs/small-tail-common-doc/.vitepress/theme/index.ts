// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from "@/components/layout.vue"
import 'st-common-ui-vue3/es/style.css'
import './style.css'
import {StCommonUiVue3} from 'st-common-ui-vue3'

export default {
  extends: DefaultTheme,
  Layout: Layout,

  enhanceApp({ app, router, siteData }) {
    // ...
    app.use(StCommonUiVue3)
  }
} satisfies Theme
