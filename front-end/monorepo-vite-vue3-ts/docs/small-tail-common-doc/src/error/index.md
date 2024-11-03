---
title: 错误记录与解决
---

# 错误记录与解决

在该文档中，我将会记录在与本文档相对应的库的使用中遇到的错误，及其解决方法。

## Uncaught SyntaxError: Identifier 'h' has already been declared

### 报错信息

```
Uncaught SyntaxError: Identifier 'h' has already been declared (at StLoginPage1.vue2.js:6:113)
```

### 错误原因

造成该报错的原因是，因为你之前已经在你的项目中使用 unplugin-auto-import 这个 Vite 插件配置了自动导入项目中使用到的 API，在我的组件库的 StLoginPage1 组件打包生成的代码中 h 变量已经被声明过了，又由于 unplugin-auto-import 这个插件会自动导入 Vue 中 h 函数，导致出现了变量重复声明的错误。

### 解决方法

在 unplugin-auto-import 插件的配置中配置忽略 Vue 中的 h 函数即可，让其不要自动导入。

::: code-group

```js [vite.config.js | vite.config.ts]
import {defineConfig} from 'vite'
import AutoImport from 'unplugin-auto-import/vite' // 自动引入 API 的插件

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 自动引入 API 的插件
    AutoImport({
      // ...
      // 忽略，不需要自动引入的 API
      ignore: ['h'] // [!code ++]
    }),
    // ...
  ],
  // ...
})
```

:::