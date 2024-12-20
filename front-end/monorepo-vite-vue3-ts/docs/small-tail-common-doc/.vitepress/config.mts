import {defineConfig} from 'vitepress'
import path from 'path'

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
    outline: [2, 3],
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Small Tail Common UI Vue3', link: '/ui-vue3/'},
      {text: '错误记录与解决', link: '/error/'}
    ],
    sidebar: [
      {
        text: 'Small Tail Common UI Vue3',
        link: '/ui-vue3/',
        collapsed: false,
        items: [
          {text: '开始使用', link: '/ui-vue3/start/'},
          {
            text: '登录页面 1',
            link: '/ui-vue3/login-page-1/',
            collapsed: true,
            items: [
              {text: '辅助展示的组件', link: '/ui-vue3/login-page-1/prepare'},
              {text: '示例', link: '/ui-vue3/login-page-1/demo'},
              {text: '示例源码', link: '/ui-vue3/login-page-1/demo-code'},
            ]
          },
          {
            text: '时间线 1',
            link: '/ui-vue3/timeline-1/',
            collapsed: true,
            items: [
              {text: '示例', link: '/ui-vue3/timeline-1/demo'},
              {text: '示例源码', link: '/ui-vue3/timeline-1/demo-code'},
            ]
          },
          {text: '动态边框 1', link: '/ui-vue3/dynamic-border-1/'},
          {text: '渐变背景 1', link: '/ui-vue3/gradient-bg-1/'},
          {text: '渐变背景 2', link: '/ui-vue3/gradient-bg-2/'},
          {text: '幽灵文本(动画版)', link: '/ui-vue3/ghost-text/'},
          {text: '幽灵文本(hover 版)', link: '/ui-vue3/ghost-text-hover/'},
          {text: '3D 文本', link: '/ui-vue3/3d-text/'},
          {text: '具有跟随鼠标 3D 倾斜效果的容器', link: '/ui-vue3/3d-tilt-container/'},
          {text: '具有点击波纹动效的容器', link: '/ui-vue3/click-wave-container/'},
        ]
      },
      {
        text: '错误记录与解决',
        link: '/error/',
        items: []
      },
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3'
      }
    ]
  },
  vite: {
    plugins: [],
    // vite 构建工具中的解析器配置
    resolve: {
      // 配置别名解析
      alias: {
        // 将项目文件中使用的 `@` 解析为 `theme` 目录的绝对路径
        '@': path.resolve(__dirname, './theme')
      },
    },
  }
})
