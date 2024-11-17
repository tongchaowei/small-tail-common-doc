# StGhostTextHover 组件

幽灵文本组件

::: info 组件样式来源

[https://www.bilibili.com/video/BV1Ur4y1Y7su/](https://www.bilibili.com/video/BV1Ur4y1Y7su/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGhostTextHover](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StGhostTextHover)

:::

::: warning 注意事项

该组件会在鼠标悬停时，执行文本消失的过渡动画，在鼠标移出组件时，执行文本出现的过渡动画。

:::

## 组件示例

<script setup>
import GhostTextDemo from './components/ghost-text-hover-demo.vue'
</script>

<GhostTextDemo />

::: details 示例代码

<<< ./components/ghost-text-hover-demo.vue

:::

## 组件参数

| 参数名             | 说明                                                        |               类型                |   默认值    |
|-----------------|:----------------------------------------------------------|:-------------------------------:|:--------:|
| content         | 文本内容，即要在组件中显示的文本                                          |             string              |          | 
| horizontalAlign | 文本水平对其方式                                                  | `'left' \| 'center' \| 'right'` | `'left'` |
| verticalAlign   | 文本垂直对其方式                                                  | `'top' \| 'center' \| 'bottom'` | `'top'`  |
| speed           | 要在组件中显示的文本的每个字符动画执行的速度，即动画执行一次所需的时间，单位毫秒                  |             number              |   1000   |
| delay           | 要在组件中显示的文本的每个字符动画执行的延迟，即在上一个字符动画执行开始后多少时间当前字符才开始执行动画，单位毫秒 |             number              |   100    |
