import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 路由配置文件自动生成插件
import Pages from 'vite-plugin-pages'
import path from 'path'
import UnoCSS from 'unocss/vite'

// 项目中 src 目录的绝对路径
// __dirname 表示当前文件所在目录的绝对路径
const srcAbsolutePath: string = path.resolve(__dirname, './src')

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    // 路由配置文件自动生成插件
    Pages({
      // 配置路由页面所在的目录
      dirs: [
        // 'src/pages',
        // 配置路由页面所在的目录，并配置该目录下路由页面对应路由的基础路由
        { dir: 'src/pages', baseRoute: '' },
      ],
      // 配置路由页面文件的文件拓展名
      extensions: ['vue'],
      // 配置排除不用自动生成路由的文件
      exclude: ['**/components/**/*.vue'],
      // 配置路由页面的导入模式为异步导入
      importMode: 'async',
      // importMode(filePath, options) {
      //   // filePath - 文件路径
      //   // options - 插件配置选项
      //   return 'async'
      // },
      // 路由别名的单词之间的分隔符，默认 '-'
      // routeNameSeparator: '-',
      // 配置导入自动生成的路由配置的模块名，vue 中默认 ~pages，即 import routes from ‘~pages’
      moduleId: '~pages',
      // 扩展生成的路由
      // extendRoute(route, parent) {
      extendRoute(route) {
        // route - 当前路由配置
        // parent - 父级路由配置
        // 如果当前生成的路由对应 src/pages/Error.vue 页面，则修改其路由匹配规则，让其匹配所有路由
        // src/pages/Error.vue 页面自动生成的路由为 baseRoute/error
        if (route.path === '/error') {
          route.path = '/:pathMatch(.*)*'
        }
        return route
      },
    }),
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
