# StGradientBg1 组件

具有渐变过渡动画的背景组件 1

::: info 组件样式来源

[https://www.bilibili.com/video/BV1vS4y1j7Yo/](https://www.bilibili.com/video/BV1vS4y1j7Yo/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGradientBg1](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGradientBg1)

:::

## 组件示例

<script setup lang="ts">
import {StGradientBg1} from 'st-common-ui-vue3'
import {ref, watch} from 'vue'

const colorsDefault = ['#43CBFF', '#9708CC']
const colorsInput = ref(JSON.stringify(colorsDefault))
const colors = ref(colorsDefault)
const size = ref('500%')
const speed = ref(20000)

watch(colorsInput, (val) => {
  try {
    colors.value = JSON.parse(val)
  } catch (error) {
    console.error(error)
  }
}, {deep: true})
</script>

<div style="height: 300px; border-radius: 1rem; overflow: hidden;">
  <StGradientBg1
    :colors="colors" 
    :size="size" 
    :speed="speed"
  >
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div>colors: {{ colors }}</div>
      <div>size: {{ size }}</div>
      <div>speed: {{ speed }}</div>
    </div>
  </StGradientBg1>
</div>

<el-form label-width="auto" style="margin-top: 20px">
  <el-form-item label="colors">
    <el-input v-model="colorsInput" clearable/>
  </el-form-item>
  <el-form-item label="size">
    <el-input v-model="size" clearable/>
  </el-form-item>
  <el-form-item label="speed">
    <el-input-number v-model="speed" clearable />
  </el-form-item>
</el-form>

::: details 示例代码

```vue
<script setup lang="ts">
  import {ref} from 'vue'
  
  const colors = ref(['#43CBFF', '#9708CC'])
  const size = ref('500%')
  const speed = ref(20000)
</script>

<template>
  <div style="height: 300px; border-radius: 1rem; overflow: hidden;">
    <StGradientBg1
      :colors="colors"
      :size="size"
      :speed="speed"
    >
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div>colors: {{ colors }}</div>
        <div>size: {{ size }}</div>
        <div>speed: {{ speed }}</div>
      </div>
    </StGradientBg1>
  </div>
</template>
```

:::

## 组件参数

| 参数名    | 说明                                                                                                   |         类型         |                            默认值                            |
|--------|:-----------------------------------------------------------------------------------------------------|:------------------:|:---------------------------------------------------------:|
| colors | 背景渐变颜色，如果传递的值为空或者不为数组或者数组长度小于2，则会使用该参数的默认值                                                           |  `Array<string>`   | `['#2c3e50', '#27ae60', '#2980b9', '#e74c3c', '#8e44ad']` |
| size   | 背景的大小，该参数用于设置组件根元素的 `background-size` css 属性，如果传递的值为数字，则其单位默认为 px                                    | `string \| number` |                         `'500%'`                          |
| speed  | 背景过渡动画执行速度，也可以说是背景过渡动画执行一次所需的时间，该参数用于设置组件根元素的 `background-duration` css 属性，单位为秒，如果传递的值为数字，则其单位默认为 ms | `string \| number` |                           2000                            |

## 组件插槽

| 插槽名     | 说明     |
|---------|:-------|
| default | 组件内容区域 |