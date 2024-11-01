import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Small Tail Common",
  description: "小尾巴前端通用库",
  // 文档源码根目录
  srcDir: 'src',
  // 站点部署到的 base URL
  base: '/small-tail-common-doc/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Small Tail Common UI Vue3', link: '/ui-vue3/' }
    ],

    sidebar: [
      {
        text: 'Small Tail Common UI Vue3',
        link: '/ui-vue3/',
        items: [
          { text: '开始使用', link: '/ui-vue3/start/' },
          { text: '登录页面 1', link: '/ui-vue3/login-page-1' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3' }
    ]
  },
})
