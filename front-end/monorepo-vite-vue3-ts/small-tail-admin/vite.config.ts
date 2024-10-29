import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path' // Node.js 内置的 path 模块
import AutoImport from 'unplugin-auto-import/vite' // 自动引入 API 的插件
import Components from 'unplugin-vue-components/vite' // 按需自动加载组件的插件
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers' // 按需自动加载 Naive UI 组件的解析器，用于帮助按需自动加载组件的插件自动按需加载 Navie UI 组件
import UnoCSS from 'unocss/vite' // UnoCSS

// 项目中 src 目录的绝对路径
// __dirname 表示当前文件所在目录的绝对路径
const srcAbsolutePath: string = path.resolve(__dirname, './src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // 自动引入 API 的插件
    AutoImport({
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
    // 按需自动加载组件的插件
    Components({
      resolvers: [NaiveUiResolver()],
    })
  ],
  // vite 构建工具中的解析器配置
  resolve: {
    // 配置别名解析
    alias: {
      // 将项目文件中使用的 `@` 解析为 `src` 目录的绝对路径
      '@': srcAbsolutePath,
    },
  },
})
