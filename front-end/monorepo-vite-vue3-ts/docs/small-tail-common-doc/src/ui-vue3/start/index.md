---
title: Small Tail Common UI Vue3
titleTemplate: 开始使用
---

# 开始使用

## 安装

::: code-group

```bash [npm]
npm install st-common-ui-vue3
```

```bash [yarn]
yarn add st-common-ui-vue3
```

```bash [pnpm]
pnpm add st-common-ui-vue3
```

:::

## 使用

::: info 提示
这里以使用 StPopover 组件为例，其它组件的使用方法请参考组件说明文档。
:::

### 自动按需引入组件

#### 安装依赖

::: code-group

```bash [npm]
npm install unplugin-vue-components -D
```

```bash [yarn]
yarn add unplugin-vue-components --dev
```

```bash [pnpm]
pnpm install unplugin-vue-components -D
```

:::

#### 配置自动按需引入组件

::: code-group

```js [vite.config.js | vite.config.ts]
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需自动加载组件的 Vite 插件
import Components from 'unplugin-vue-components/vite' // [!code ++]
// 按需自动加载 st-common-ui-vue3 组件的解析器，用于帮助按需自动加载组件的 Vite 插件自动按需加载 st-common-ui-vue3 组件
import {StCommonUIVue3Resolver} from "st-common-ui-vue3" // [!code ++]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置按需自动加载组件的 Vite 插件
    Components({ // [!code ++]
      // 配置解析器，用于帮助按需自动加载组件的 Vite 插件解析并按需加载组件
      resolvers: [ // [!code ++]
        StCommonUIVue3Resolver() // [!code ++]
      ], // [!code ++]
    }) // [!code ++]
  ],
})
```

```vue [App.vue]
<script setup lang="ts"></script>

<template>
  <!-- 使用 StPopover 组件 -->
  <StPopover>
    <!-- ... -->
  </StPopover>
</template>
```

:::

::: tip 提示

如果在你的项目中有使用 TypeScript，为了保证自动按需引入的组件能够被 TypeScript 正确识别，并且能够有相应的代码提示，还需要在 TypeScript 配置文件中添加 unplugin-vue-components 自动生成的包含自动按需引入的组件的类型声明的文件 components.d.ts。

```json
{
  "compilerOptions": {
    ...
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "components.d.ts" // [!code ++]
  ]
}
```

:::

### 手动按需引入组件

#### 一次性引入所有组件样式

::: code-group

```js [main.js | main.ts]
import { createApp } from 'vue'
import App from './App.vue'
// 引入组件库所有组件的样式
import 'st-common-ui-vue3/es/style.css' // [!code ++]

createApp(App).mount('#app')
```

```vue [App.vue]
<script setup lang="ts">
  // 引入 StPopover 组件
  import {StPopover} from "st-common-ui-vue3" // [!code highlight]
</script>

<template>
  <!-- 使用 StPopover 组件 -->
  <StPopover>
    <!-- ... -->
  </StPopover>
</template>
```

:::

#### 按需引入组件样式

```vue
<script setup lang="ts">
  // 引入 StPopover 组件
  import {StPopover} from "st-common-ui-vue3" // [!code highlight]
  // 引入 StPopover 组件样式
  import 'st-common-ui-vue3/es/components/StPopover/StPopover.css' // [!code highlight]
</script>

<template>
  <!-- 使用 StPopover 组件 -->
  <StPopover>
    <!-- ... -->
  </StPopover>
</template>
```

### 全局注册

#### 全局注册指定的组件

::: code-group

```js [main.js | main.ts]
import { createApp } from 'vue'
import App from './App.vue'
// 引入组件库所有组件的样式
import 'st-common-ui-vue3/es/style.css' // [!code ++]
// 引入指定组件的全局注册插件
import {StPopoverRegister} from "st-common-ui-vue3" // [!code ++]

createApp(App)
    // 全局注册指定组件
    .use(StPopoverRegister) // [!code ++]
    .mount('#app')
```

```vue [App.vue]
<script setup lang="ts"></script>

<template>
  <!-- 使用 StPopover 组件 -->
  <StPopover>
    <!-- ... -->
  </StPopover>
</template>
```

:::

#### 全局注册所有组件

::: code-group

```js [main.js | main.ts]
import { createApp } from 'vue'
import App from './App.vue'
// 引入组件库所有组件的样式
import 'st-common-ui-vue3/es/style.css' // [!code ++]
// 引入全局注册所有组件的插件
import {StCommonUiVue3} from "st-common-ui-vue3" // [!code ++]

createApp(App)
    // 全局注册组件库所有组件
    .use(StCommonUiVue3) // [!code ++]
    .mount('#app')
```

```vue [App.vue]
<script setup lang="ts"></script>

<template>
  <!-- 使用 StPopover 组件 -->
  <StPopover>
    <!-- ... -->
  </StPopover>
</template>
```

:::
