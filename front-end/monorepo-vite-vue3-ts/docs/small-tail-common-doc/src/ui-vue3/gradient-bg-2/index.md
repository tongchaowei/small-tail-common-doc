# StGradientBg2 组件

具有渐变过渡动画的背景组件 2

::: info 组件样式来源

[https://www.bilibili.com/video/BV1b44y1e7Wx/](https://www.bilibili.com/video/BV1b44y1e7Wx/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGradientBg2](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGradientBg2)

:::

::: warning 注意事项

1. 组件中的背景渐变过渡效果是通过 CSS 属性 `背景图片`
   中多个圆形径向渐变背景图片的移动实现的，其中，圆形径向渐变背景图片的半径长度以及中心点位置(
   包括初始中心点位置和过渡中心点位置)都是随机生成的；
2. 所有的圆形径向渐变背景图片都是从中心点开始由指定的颜色向外透明渐变；
3. 圆形径向渐变背景图片半径长度的随机生成范围为 `[50vmax, 100vmax]`；
4. 圆形径向渐变背景图片的中心点位置的随机生成范围为 `[-50vmax, 50vmax]`；

:::

## 组件示例

<script setup lang="ts">
import {StGradientBg2} from 'st-common-ui-vue3'
import {ref, watch} from 'vue'

const bgColor = ref('#e493d0')
const gradientColorsDefault = ['#43CBFF', '#9708CC', 'red', 'orange', 'yellow', 'skyblue']
const gradientColorsInput = ref(JSON.stringify(gradientColorsDefault))
const gradientColors = ref(gradientColorsDefault)
const speed = ref(15000)
const blur = ref(true)

watch(gradientColorsInput, (val) => {
  try {
    gradientColors.value = JSON.parse(val)
  } catch (error) {
    console.error(error)
  }
}, {deep: true})
</script>

<div style="height: 300px; border-radius: 1rem; overflow: hidden;">
  <StGradientBg2
    :bgColor="bgColor"
    :gradientColors="gradientColors"
    :speed="speed"
    :blur="blur"
  >
    <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div>bgColor: {{ bgColor }}</div>
      <div>gradientColors: {{ gradientColors }}</div>
      <div>speed: {{ speed }}</div>
      <div>blur: {{ blur }}</div>
    </div>
  </StGradientBg2>
</div>

<el-form label-width="auto" style="margin-top: 20px">
  <el-form-item label="bgColor">
    <el-color-picker v-model="bgColor" clearable />
  </el-form-item>
  <el-form-item label="gradientColors">
    <el-input v-model="gradientColorsInput" clearable/>
  </el-form-item>
  <el-form-item label="speed">
    <el-input-number v-model="speed" clearable />
  </el-form-item>
  <el-form-item label="blur">
    <el-switch v-model="blur" />
  </el-form-item>
</el-form>

::: details 示例代码

```vue

<script setup lang="ts">
  import {StGradientBg2} from 'st-common-ui-vue3'
  import {ref, watch} from 'vue'

  const bgColor = ref('#e493d0')
  const gradientColorsDefault = ['#43CBFF', '#9708CC', 'red', 'orange', 'yellow', 'skyblue']
  const gradientColorsInput = ref(JSON.stringify(gradientColorsDefault))
  const gradientColors = ref(gradientColorsDefault)
  const speed = ref(15000)
  const blur = ref(true)

  watch(gradientColorsInput, (val) => {
    try {
      gradientColors.value = JSON.parse(val)
    } catch (error) {
      console.error(error)
    }
  }, {deep: true})
</script>

<template>
  <div style="height: 300px; border-radius: 1rem; overflow: hidden;">
    <StGradientBg2
      :bgColor="bgColor"
      :gradientColors="gradientColors"
      :speed="speed"
      :blur="blur"
    >
      <div style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div>bgColor: {{ bgColor }}</div>
        <div>gradientColors: {{ gradientColors }}</div>
        <div>speed: {{ speed }}</div>
        <div>blur: {{ blur }}</div>
      </div>
    </StGradientBg2>
  </div>
</template>
```

:::

## 组件参数

| 参数名            | 说明                                             |         类型         |                                                    默认值                                                     |
|----------------|:-----------------------------------------------|:------------------:|:----------------------------------------------------------------------------------------------------------:|
| bgColor        | 背景颜色                                           |       string       |                                                `'#e493d0'`                                                 |
| gradientColors | 组件中的圆形径向渐变背景图片的颜色列表                            |     `string[]`     | `['rgb(235, 105, 78)','rgb(243, 11, 164)','rgb(254, 234, 131)','rgb(170, 142, 245)','rgb(248, 192, 147)']` |
| speed          | 过渡动画执行速度，即过渡动画执行一次所需的时间，如果传递的参数值为数字，则其单位默认为 ms | `number \| string` |                                                  `'15s'`                                                   |
| blur           | 是否开启对背景的模糊效果                                   |      boolean       |                                                    true                                                    |

## 组件插槽

| 插槽名     | 说明     |
|---------|:-------|
| default | 组件内容区域 |