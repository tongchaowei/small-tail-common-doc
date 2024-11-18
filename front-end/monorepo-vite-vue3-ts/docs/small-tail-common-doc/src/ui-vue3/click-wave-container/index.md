# StClickWaveContainer 组件

具有点击波纹动效的容器组件

::: info 组件样式来源

[https://www.bilibili.com/video/BV1jz411b7sx/](https://www.bilibili.com/video/BV1jz411b7sx/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StClickWaveContainer](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StClickWaveContainer)

:::

::: warning 注意事项

1. 该组件中的波纹动效，是通过在触发点击事件时，使用 `document.createElement` API 动态创建一个 `div`
   元素，并使用相对于组件根元素的绝对定位和位移将该元素的中心点定位在点击位置，然后让该元素执行波纹动画，从而实现点击波纹动效；
2. 动态创建的 `div` 元素，会在其动画执行完成后，自动移除；
3. 动态创建的 `div` 元素，其 `z-index` 属性的取值为默认值，即没有为其设置 `z-index` 属性；

:::

## 组件示例

<script setup lang="ts">
import {StClickWaveContainer} from 'st-common-ui-vue3'
import {ref} from 'vue'

const bgColor = ref('#efefef')
const speed = ref(1000)
const waveColor = ref('linear-gradient(to right, #ff0052, #ff7a00)')
const waveMaxSize = ref('300px')
const waveInitialOpacity = ref(0.8)
</script>

<div :style="{height: '300px', backgroundColor: bgColor, borderRadius: '1rem'}">
  <StClickWaveContainer
    :speed="speed"
    :waveColor="waveColor"
    :waveMaxSize="waveMaxSize"
    :waveInitialOpacity="waveInitialOpacity"
  >
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div>speed: {{ speed }}</div>
      <div>waveColor: {{ waveColor }}</div>
      <div>waveMaxSize: {{ waveMaxSize }}</div>
      <div>waveInitialOpacity: {{ waveInitialOpacity }}</div>
    </div>
  </StClickWaveContainer>
</div>

<el-form label-width="auto" style="margin-top: 20px">
  <el-form-item label="背景颜色">
    <el-color-picker v-model="bgColor" clearable />
  </el-form-item>
  <el-form-item label="speed">
    <el-input-number v-model="speed" clearable />
  </el-form-item>
  <el-form-item label="waveColor">
    <el-input v-model="waveColor" clearable />
  </el-form-item>
  <el-form-item label="waveMaxSize">
    <el-input v-model="waveMaxSize" clearable />
  </el-form-item>
  <el-form-item label="waveInitialOpacity">
    <el-input-number v-model="waveInitialOpacity" clearable :step="0.1" />
   </el-form-item>
</el-form>

::: details 示例代码

```vue
<script setup lang="ts">
   import {StClickWaveContainer} from 'st-common-ui-vue3'
   import {ref} from 'vue'

   const bgColor = ref('#efefef')
   const speed = ref(1000)
   const waveColor = ref('linear-gradient(to right, #ff0052, #ff7a00)')
   const waveMaxSize = ref('300px')
   const waveInitialOpacity = ref(0.8)
</script>

<template>
   <div :style="{height: '300px', backgroundColor: bgColor, borderRadius: '1rem'}">
      <StClickWaveContainer
        :speed="speed"
        :waveColor="waveColor"
        :waveMaxSize="waveMaxSize"
        :waveInitialOpacity="waveInitialOpacity"
      >
         <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div>speed: {{ speed }}</div>
            <div>waveColor: {{ waveColor }}</div>
            <div>waveMaxSize: {{ waveMaxSize }}</div>
            <div>waveInitialOpacity: {{ waveInitialOpacity }}</div>
         </div>
      </StClickWaveContainer>
   </div>
</template>
```

:::

## 组件参数

| 参数名                | 说明                                           |         类型         |   默认值    |
|--------------------|:---------------------------------------------|:------------------:|:--------:|
| width              | 组件的宽度，如果传递的参数值为数字，则其单位默认为 px                 | `string \| number` | `'100%'` |
| height             | 组件的高度，如果传递的参数值为数字，则其单位默认为 px                 | `string \| number` | `'100%'` |
| speed              | 波纹动画的执行速度，即执行一次波纹动画所需的时间，单位 ms               |       number       |   1000   |
| waveColor          | 波纹的颜色                                        |       string       | `'#fff'` |
| waveMaxSize        | 波纹的最大大小，即波纹动画结束时波纹的大小，如果传递的参数值为数字，则其单位默认为 px | `string \| number` | `'100%'` |
| waveInitialOpacity | 波纹动画执行开始时，波纹的透明度                             |       number       |   0.5    |

## 组件插槽

| 插槽名     | 说明     |
|---------|:-------|
| default | 组件内容区域 |