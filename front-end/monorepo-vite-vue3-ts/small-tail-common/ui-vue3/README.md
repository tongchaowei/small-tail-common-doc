# 小尾巴前端通用 Vue3 UI 组件库

## 安装

### npm

```bash
npm install st-common-ui-vue3
```

### yarn

```bash
yarn add st-common-ui-vue3
```

### pnpm

```bash
pnpm install st-common-ui-vue3
```

## 组件库的使用

### 样式导入

```js
import '@st-common/ui-vue3/es/style.css' // 小尾巴 vue3 组件库样式
```

### 导入并使用组件

```vue
<script setup>
  import {StPopover} from '@st-common/ui-vue3' // 小尾巴气泡弹框组件
</script>

<template>
  <st-popover>
    <template #default>
      <!-- 触发弹框区域 -->
    </template>
    <template #subContent>
      <!-- 弹框内容 -->
    </template>
  </st-popover>
</template>
```

## 代码仓库地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3)