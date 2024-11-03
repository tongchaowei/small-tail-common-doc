import {defineConfig} from 'vitepress'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite' // 用于自动导入 API 的插件
import Components from 'unplugin-vue-components/vite' // 用于按需导入组件的插件
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers' // Element Plus 自动导入其相关 API 和按需导入加载组件的解析器
// 按需自动加载 Naive UI 组件的解析器，用于帮助按需自动加载组件的插件自动按需加载 Navie UI 组件
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Small Tail Common",
  description: "小尾巴前端通用库",
  // 文档源码根目录
  srcDir: 'src',
  // 站点部署到的 base URL
  // base: '/small-tail-common-doc/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Small Tail Common UI Vue3', link: '/ui-vue3/'},
      {text: '错误记录与解决', link: '/error/'}
    ],

    sidebar: [
      {
        text: 'Small Tail Common UI Vue3',
        link: '/ui-vue3/',
        items: [
          {text: '开始使用', link: '/ui-vue3/start/'},
          {
            text: '登录页面 1',
            link: '/ui-vue3/login-page-1/',
            items: [
              {text: '辅助展示的组件', link: '/ui-vue3/login-page-1/prepare'},
              {text: '示例', link: '/ui-vue3/login-page-1/demo'},
              {text: '示例源码', link: '/ui-vue3/login-page-1/demo-code'},
            ]
          },
        ]
      },
      {
        text: '错误记录与解决',
        link: '/error/',
        items: [

        ]
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
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // 自动引入 Vue 和 Navie UI 中的 API
        imports: [
          'vue',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
          },
        ],
        // 不需要自动引入的 API
        ignore: ['h']
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          NaiveUiResolver()
        ],
      }),
    ],
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
