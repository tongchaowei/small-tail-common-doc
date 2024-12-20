/**
 * 该 Vite 配置文件用于将组件库中所有组件的样式打包到统一的一个 css 文件中
 *
 * 需要注意的是，需要先执行将组件库中每个组件的样式代码打包到单独的 css 文件中，然后再使用该配置进行打包组件库，
 * 因为在 vite.config.css-split.ts 中配置了 emptyOutDir: true，会清除之前的打包结果，而当前配置中配置
 * 了 emptyOutDir: false，不会清除之前的打包结果。
 */

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  // 插件
  plugins: [
    vue(),
    // 生成 d.ts 文件的插件
    dts({
      // ts 配置文件路径
      tsconfigPath: './tsconfig.app.json',
      // 入口文件根路径
      entryRoot: 'src',
      // d.ts 文件输出路径
      outDir: ['es', 'lib'],
    })
  ],
  // 打包配置
  build: {
    // 由于要进行的是库的打包，所以这里要指定 lib 选项，使用 lib 模式(库模式)进行打包
    // 该配置并不会真正被使用，因为我们打包实际上使用的是 vite 中的 rollup 打包工具，此配置项只是为了告诉 vite 使用 lib 模式进行打包
    lib: {
      // 打包入口
      entry: 'src/index.ts',
    },
    // 打包结果对于浏览器的兼容性
    // modules：支持原生 ES 模块、原生 ESM 动态导入和 import.meta 的浏览器
    target: 'modules',
    // 清除之前的打包结果
    emptyOutDir: false,
    // // 将组件中的样式代码拆分到单独的 css 文件中
    // // 关于自定义打包的静态文件名称可以参考：https://blog.csdn.net/qq_32805013/article/details/134420142
    // // 由于组件的写法使用的是单文件组件的形式，所以样式的打包等无法使用 https://juejin.cn/post/7138212982558818311#heading-7 中 gulp 编写工作流的方式
    // cssCodeSplit: true,
    // rollup 相关配置
    rollupOptions: {
      // 排除不需要的依赖，
      external: [
        'vue',
        // '@vueuse/core',
        // 'st-common-ui-utils',
        // 'st-common-core',
      ],
      // 打包入口
      input: 'src/index.ts',
      // 输出配置
      output: [
        // ---------------------------------------------------------- es (import) ------
        {
          // 打包输出格式，es 模块
          format: 'es',
          // 输出目录
          dir: 'es',
          // 打包输出结果的入口文件名：[name] 入口文件的文件名加上 `.js`
          entryFileNames: '[name].js',
          // 使用原始的模块文件名(源码文件名)作为输出结果的文件名
          preserveModules: true,
          // 原始模块文件的根目录
          preserveModulesRoot: 'src'
        },
        // ---------------------------------------------------------- cjs (require) ------
        {
          // 打包输出格式，es 模块
          format: 'cjs',
          // 输出目录
          dir: 'lib',
          // 打包输出结果的入口文件名：[name] 入口文件的文件名加上 `.js`
          entryFileNames: '[name].js',
          // 使用原始的模块文件名(源码文件名)作为输出结果的文件名
          preserveModules: true,
          // 原始模块文件的根目录
          preserveModulesRoot: 'src'
        }
      ]
    }
  }
})
