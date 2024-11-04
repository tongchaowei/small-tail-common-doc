import { createRouter, createWebHashHistory } from 'vue-router'
// 导入 vite-plugin-pages 插件自动生成的路由配置
import routes from '~pages'

const router = createRouter({
  // 页面历史模式采用 hash 模式（网页 url 中带 #）
  history: createWebHashHistory(),
  // 页面路由配置，使用 vite-plugin-pages 插件自动生成
  routes,
})

export default router
