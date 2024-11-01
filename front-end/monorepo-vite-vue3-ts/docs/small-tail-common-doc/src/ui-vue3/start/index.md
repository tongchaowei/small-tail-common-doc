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

### 手动按需引入



```vue
<script setup>
  import {StIconIconify} from 'st-common-ui-vue3'
</script>

<template>
  <StIconIconify icon="line-md:star-pulsating-twotone-loop" width="24" height="24"/>
</template>
```

<StIconIconify icon="line-md:star-pulsating-twotone-loop" width="24" height="24" />

### 全局注册

#### 全局注册指定的组件

main.js
```js
import {createApp} from 'vue'
import App from './App.vue'
import 'st-common-ui-vue3/es/style.css' // 引入组件库样式文件
import {StIconIconify} from 'st-common-ui-vue3'

createApp(App)
  .use(StIconIconify) // 全局注册 StIconIconify 组件
  .mount('#app')
```

<StIconIconify icon="line-md:star-pulsating-twotone-loop" width="24" height="24" />

#### 全局注册所有组件

main.js
```js
import {createApp} from 'vue'
import App from './App.vue'
import 'st-common-ui-vue3/es/style.css' // 引入组件库样式文件
import {StCommonUiVue3} from 'st-common-ui-vue3'

createApp(App)
  .use(StCommonUiVue3) // 全局注册所有组件
  .mount('#app')
```

<StIconIconify icon="line-md:star-pulsating-twotone-loop" width="24" height="24" />
