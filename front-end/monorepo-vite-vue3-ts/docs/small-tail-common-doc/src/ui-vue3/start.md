---
title: 开始使用 Small Tail Common UI Vue3 组件库
---

# 开始使用 Small Tail Common UI Vue3 组件库

## 安装

### npm

使用 npm 安装组件库：

```bash
npm install st-common-ui-vue3
```

### yarn

使用 yarn 安装组件库：

```bash
yarn add st-common-ui-vue3
```

### pnpm

使用 pnpm 安装组件库：

```bash
pnpm add st-common-ui-vue3
```

## 配置

由于本组件库并没有将每个组件的样式打包成单独的样式文件，而是将组件库中所有组件的样式打包到了一个样式文件中，
所以我们在使用本组件库之前，需要在我们的项目中引入组件库的样式文件。

> 因为将组件库中的每个组件的样式打包成单独的样式文件之后，我们在每次 import 使用组件库中的组件时，
> 都还需要引入组件对应的样式文件，这样子组件库的使用过于繁琐。
>
> 为了避免上述的繁琐操作，而又要将组件库中的每个组件的样式打包成单独的样式文件，
> 那么就需要编写组件库组件自动按需引入的插件，由于我组件的命名好像有点问题，所以目前先以此方式使用本组件库。

```js
import 'st-common-ui-vue3/es/style.css'
```

## 使用

> 这边以 StIconIconify 组件为例，展示如何使用组件库中的组件。

### 按需引入

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
