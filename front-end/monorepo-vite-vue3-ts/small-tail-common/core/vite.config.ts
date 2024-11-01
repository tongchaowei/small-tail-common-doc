import {defineConfig} from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  // 插件
  plugins: [
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
    emptyOutDir: true,
    // rollup 相关配置
    rollupOptions: {
      // 排除不需要的依赖，
      external: [],
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
