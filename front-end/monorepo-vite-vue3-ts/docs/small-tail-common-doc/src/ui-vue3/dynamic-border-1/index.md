# StDynamicBorder1 组件

动态边框组件 1

:::info 组件样式来源

[https://www.bilibili.com/video/BV1rE4m1R7rH/](https://www.bilibili.com/video/BV1rE4m1R7rH/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StDynamicBorder1](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StDynamicBorder1)

:::

::: warning 注意事项

1. 该组件根元素的 `box-sizing` css 属性值为 `border-box`；
2. 该组件动态边框的实现原理为，样式底层组件根元素利用渐变背景的旋转动画实现边框的动态效果，然后将组件默认插槽所在的父元素定位覆盖组件根元素并利用内边距，实现边框效果

:::

## 组件示例

<script setup>
import DynamicBorder1Demo1 from './components/dynamic-border-1-demo-1.vue'
import DynamicBorder1Demo2 from './components/dynamic-border-1-demo-2.vue'
import DynamicBorder1Demo3 from './components/dynamic-border-1-demo-3.vue'
import DynamicBorder1Demo4 from './components/dynamic-border-1-demo-4.vue'
import DynamicBorder1Demo5 from './components/dynamic-border-1-demo-5.vue'
import DynamicBorder1Demo6 from './components/dynamic-border-1-demo-6.vue'
import DynamicBorder1Demo7 from './components/dynamic-border-1-demo-7.vue'
</script>

### 简单使用

<DynamicBorder1Demo1 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-1.vue

:::

### 自定义边框颜色

<DynamicBorder1Demo2 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-2.vue

:::

### 多段边框

<DynamicBorder1Demo3 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-3.vue

:::

### 完全自定义边框颜色

<DynamicBorder1Demo4 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-4.vue

:::

### 荧光边框

<DynamicBorder1Demo5 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-5.vue

:::

### Hover 时显示边框动效

<DynamicBorder1Demo6 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-6.vue

:::

### Hover 时暂停边框动效

<DynamicBorder1Demo7 />

::: details 示例源码

<<< ./components/dynamic-border-1-demo-7.vue

:::

## 组件参数

| 参数名               | 说明                                                                       |         类型         |                          默认值                           |
|-------------------|:-------------------------------------------------------------------------|:------------------:|:------------------------------------------------------:|
| width             | 组件的宽度，如果传递的参数值为数字类型，则其默认单位为 px                                           | `number \| string` |                        `'100%'`                        |
| height            | 组件的高度，如果传递的参数值为数字类型，则其默认单位为 px                                           | `number \| string` |                        `'100%'`                        |
| backgroundColor   | 组件中默认插槽所在父元素的背景颜色，即组件内容区域的背景颜色                                           |      `string`      |                        `'#111'`                        |
| borderColorList   | 边框的颜色列表，默认情况下，实现边框渐变效果的组件根元素的背景渐变效果为 `conic-gradient`                    |  `Array<string>`   |       `['transparent 180deg', 'skyblue 360deg']`       |
| customBorderColor | 是否完全自定义边框颜色，即是否自定义边框的渐变效果及其颜色组成，如果其值为 `false`，则边框的渐变效果为 `conic-gradient` |      boolean       |                         false                          |
| borderColor       | 完全自定义边框颜色时，即 `customBorderColor` 值为 `true` 时，使用该参数值指定边框的颜色               |       string       | `'linear-gradient(135deg, #43CBFF 15%, #9708CC 100%)'` |
| borderWidth       | 边框的宽度，如果传递的参数值为数字类型，则其默认单位为 px                                           | `number \| string` |                        `'2px'`                         |
| borderRadius      | 边框的圆角，如果传递的参数值为数字类型，则其默认单位为 px                                           | `number \| string` |                      `'0.25rem'`                       |
| rotate            | 是否开启边框的旋转效果                                                              |      boolean       |                          true                          |
| speed             | 边框旋转动画的速度，即执行一次边框动画所需的时间，如果传递的参数值为数字类型，则其默认单位为 ms                        | `number \| string` |                         `'5s'`                         |
| shine             | 是否开启边框的光晕效果                                                              |      boolean       |                         false                          |
| shineRange        | 边框光晕的范围，如果传递的参数值为数字类型，则其默认单位为 px                                         | `number \| string` |                        `'10px'`                        |
| shineBrightness   | 边框光晕的亮度，取值范围为 `0 - 1`                                                    |       number       |                          0.8                           |
| hover             | 边框的效果是否在鼠标悬停时才生效                                                         |      boolean       |                         false                          |
| hoverPause        | 是否在鼠标悬停时暂停边框旋转动画                                                         |      boolean       |                         false                          |

## 组件插槽

| 插槽名     | 说明     |
|---------|:-------|
| default | 组件内容区域 |