# St3DTiltContainer 组件

具有跟随鼠标 3D 倾斜效果的容器组件

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/St3DTiltContainer](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/St3DTiltContainer)

:::

::: warning 注意事项

- 该组件依赖于 vanilla-tilt.js，是对其的封装；
- vanilla-tilt.js 文档：[https://micku7zu.github.io/vanilla-tilt.js/](https://micku7zu.github.io/vanilla-tilt.js/)；

:::

## 组件示例

> 示例中使用到的 St3DText 组件的具体用法可以参考[其说明文档](/ui-vue3/3d-text/)

<script setup lang="ts">
import St3DTiltContainerDemo from './components/3d-tlit-container-demo.vue'
</script>

<St3DTiltContainerDemo />

::: details 示例代码

<<< ./components/3d-tlit-container-demo.vue

:::

## 组件参数

| 参数名                | 说明                                                                                       |          类型          |                默认值                |
|--------------------|:-----------------------------------------------------------------------------------------|:--------------------:|:---------------------------------:|
| width              | 组件宽度，如果传递的参数值为数字，则其单位默认为 px                                                              |  `number \| string`  |             `'100%'`              |
| height             | 组件高度，如果传递的参数值为数字，则其单位默认为 px                                                              |  `number \| string`  |             `'100%'`              |
| max                | 组件允许倾斜的最大角度，单位为角度 degrees                                                                |        number        |                35                 |
| startX             | 在 x 轴上的初始倾斜角度，单位为角度 degrees                                                              |        number        |                 0                 |
| startY             | 在 y 轴上的初始倾斜角度，单位为角度 degrees                                                              |        number        |                 0                 |
| perspective        | 组件 3D 透视效果的距离，即观察者与 z=0 平面的距离，单位为像素 px                                                   |        number        |               1000                |
| scale              | 鼠标悬停时放大的倍数                                                                               |        number        |                 1                 |
| speed              | 过渡的速度，即过渡动画执行所需的时间，单位毫秒 ms                                                               |        number        |                300                |
| transition         | 是否开启过渡效果                                                                                 |       boolean        |               true                |
| axis               | 限制倾斜效果作用的坐标轴，即限制在哪些轴上具有倾斜效果，如果传递的值为 `null` 则不限制倾斜效果作用的坐标轴                                | `'x' \| 'y' \| null` |               null                |
| reset              | 鼠标离开时是否恢复组件的倾斜状态                                                                         |       boolean        |               true                |
| resetToStart       | 鼠标离开时恢复组件的倾斜状态，是否恢复到 `[startX, startY]` 指定的组件初始倾斜状态，如果传递的参数值为 false 则组件的倾斜状态恢复到 `[0, 0]` |       boolean        |               true                |
| easing             | 过渡效果函数                                                                                   |        string        | `'cubic-bezier(.03,.98,.52,.99)'` |
| glare              | 是否开启眩光效果                                                                                 |       boolean        |               false               |
| maxGlare           | 眩光效果的最大透明度                                                                               |        number        |                 1                 |
| gyroscope          | 是否启用设备方向检测，即组件是否跟随设备的倾斜而倾斜                                                               |       boolean        |               true                |
| gyroscopeMinAngleX | 设备在 x 轴上倾斜，组件跟随倾斜的最小倾斜角度，单位为角度 degrees                                                   |        number        |                -45                |
| gyroscopeMaxAngleX | 设备在 x 轴上倾斜，组件跟随倾斜的最大倾斜角度，单位为角度 degrees                                                   |        number        |                45                 |
| gyroscopeMinAngleY | 设备在 y 轴上倾斜，组件跟随倾斜的最小倾斜角度，单位为角度 degrees                                                   |        number        |                -45                |
| gyroscopeMaxAngleY | 设备在 y 轴上倾斜，组件跟随倾斜的最大倾斜角度，单位为角度 degrees                                                   |        number        |                45                 |
| fullPageListening  | 是否开启全屏监听鼠标移动，如果传递的参数值为 false，则只有鼠标在组件中移动时组件才会跟随鼠标倾斜                                      |       boolean        |               false               |

## 组件插槽

| 插槽名     | 说明     |
|---------|:-------|
| default | 组件内容区域 |
