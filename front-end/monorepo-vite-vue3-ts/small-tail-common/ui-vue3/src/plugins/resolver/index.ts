/**
 * 代码参考自：https://juejin.cn/post/7138212982558818311#heading-7
 */

import type {ComponentResolver} from "unplugin-vue-components"

/**
 * 判断是不是服务端渲染
 */
// 报错：Uncaught ReferenceError: process is not defined
// const isSSR = Boolean(
//   process.env.SSR || process.env.SSG || process.env.VITE_SSR || process.env.VITE_SSG
// )
const importMeta = import.meta as ImportMeta & {env: Record<string, any>}
const isSSR = importMeta.env?.SSR || importMeta.env?.SSG || importMeta.env?.VITE_SSR || importMeta.env?.VITE_SSG

/**
 * 服务端渲染使用 cjs 模块（commonjs 导入），反之使用 esm 模块（import 导入）
 */
const moduleType = isSSR ? "lib" : "es"

/**
 * Small Tail Common UI Vue3 组件库组件自动按需导入的解析器
 *
 * @returns {ComponentResolver} 组件解析器
 */
export const StCommonUIVue3Resolver = (): ComponentResolver => {
  return {
    // 指定该解析器对什么类型进行解析
    // 这里指定对组件类型进行解析，然后根据组件名称自动按需导入组件
    type: "component",
    // 解析器处理函数
    // 根据组件名称自动按需导入组件
    resolve: (name: string) => {
      console.log("resolve", name, isSSR)
      // 判断解析的组件名称是不是当前组件库的
      if (name.startsWith("St")) {
        return {
          // 要导入的组件名称
          name,
          // 从哪里导入
          from: `st-common-ui-vue3`,
          // 根据组件名称自动按需导入组件时，需要一同导入的附加内容
          // 由于组件的样式是打包到了单独的样式文件中，所以还需在这里指定导入组件的样式文件
          sideEffects: `st-common-ui-vue3/${moduleType}/components/${name}/${name}.css`
        };
      }
    },
  };
}
