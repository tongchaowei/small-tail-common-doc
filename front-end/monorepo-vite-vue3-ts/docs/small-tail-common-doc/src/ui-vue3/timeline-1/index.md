# 时间线组件 1

StTimeline1 为时间线组件 1，StTimelineItem1 为时间线组件 1 的子组件，即时间线数据项展示组件。

::: info 组件样式来源

[https://www.bilibili.com/video/BV12t4y1q74Z/](https://www.bilibili.com/video/BV12t4y1q74Z/)

:::

::: tip 组件源码地址

- [https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StTimeline1](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StTimeline1)
- [https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StTimelineItem1](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StTimelineItem1)

:::

## 组件参数

### StTimeline1

| 参数名                        | 说明                                                   |         类型         |                   默认值                   |
|----------------------------|:-----------------------------------------------------|:------------------:|:---------------------------------------:|
| initialIndex               | 初始展示的时间线数据项的索引                                       |       number       |                    0                    |
| enableMousewheelSwitch     | 是否开启鼠标滚轮切换时间线数据项                                     |      boolean       |                  true                   |
| speed                      | 时间线数据项切换过渡的速度，即切换时间线数据项时，过渡动画执行所需的时间，单位为毫秒           |       number       |                  1500                   |
| transitionFun              | 时间线数据项切换的过渡效果                                        |       string       | `'cubic-bezier(.68, -0.55, .26, 1.55)'` |
| transitionDelay            | 时间线数据项切换过渡动画的执行延迟，如果传入的是数字，则单位默认为毫秒                  | `number \| string` |                    0                    |
| background                 | 组件的背景，**注意**，该参数的参数值会直接赋值给组件根元素的 `background` CSS 属性 |       string       |             `'transparent'`             |
| timelineData               | 组件右边或下面的时间线数据项，**此参数为必填项**                           |     `string[]`     |                                         |
| timelinePerView            | 组件右边的时间线数据项的展示个数                                     |       number       |                    1                    |
| timelinePerViewReactScreen | 组件下边的时间线数据项的展示个数，即组件在响应式变换后的小屏幕宽度下的时间线数据项的展示个数       |       number       |                    1                    |
| needReactScreenWidth       | 需要响应式变化的小屏幕宽度界限，即浏览器可视窗口的宽度小于对于何值时，为小屏幕下的响应式布局       |       number       |                   600                   |
| timelineOffset             | 组件右边或下面的时间线开头和末尾的偏移量                                 |       number       |               `undefined`               |
| timelineColor              | 组件右边或下面的时间线未激活项的颜色                                   |       string       |              `'#9c9c9c9f'`              |
| timelineColorActive        | 组件右边或下面的时间线激活项的颜色                                    |       string       |               `'#efefef'`               |
| timelineTextMaxLine        | 组件右边或下面的时间线每项文本最多显示行数                                |       number       |                    1                    |
| timelineSpeed              | 组件右边或下面的时间线切换过渡效果的时长，单位为毫秒                           |       number       |                  1200                   |
| timelineTransitionFun      | 组件右边或下面的时间线切换的过渡效果                                   |       string       | `'cubic-bezier(.68, -0.55, .26, 1.55)'` |
| timelineTransitionDelay    | 组件右边或下面的时间线切换过渡效果执行延迟，如果传入的是数字，则单位默认为毫秒              | `number \| string` |                   300                   |
| enableTimelineNav          | 是否显示组件右边或下面的时间线区域的上一项或下一项的导航按钮                       |      boolean       |                  true                   |

### StTimelineItem1

| 参数名             | 说明                                              |         类型         |     默认值     |
|-----------------|:------------------------------------------------|:------------------:|:-----------:|
| idx             | 当前时间线展示数据项的索引，或者说是 `for` 循环中当前组件的索引，**此参数为必填项** |       number       |             |
| bgImgSrc        | 组件的背景图片资源地址字符串                                  |       string       |    `''`     |
| title           | 标题                                              |       string       |    `''`     |
| desc            | 描述文本                                            |       string       |    `''`     |
| color           | 组件中的文字的颜色                                       |       string       | `'#efefef'` |
| animationSpeed  | 标题和描述文本的动画效果的执行时长，如果传入的是数字，则单位默认为毫秒             | `number \| string` |     500     |
| titleEnterDelay | 标题出现动画的执行延迟，如果传入的是数字，则单位默认为毫秒                   | `number \| string` |    1500     |
| descEnterDelay  | 描述文本出现动画的执行延迟，如果传入的是数字，则单位默认为毫秒                 | `number \| string` |    1700     |
| titleMaxLine    | 标题文本最多显示行数，超出此行数的文本会以省略号显示                      |       number       |      1      |
| descMaxLine     | 描述文本最多显示行数，超出此行数的文本会以省略号显示                      |       number       |      5      |

## 组件插槽

### StTimeline1

| 插槽名     | 说明                                        |
|---------|:------------------------------------------|
| default | 时间线数据展示项组件的放置区域，即 StTimelineItem1 组件的放置位置 |

### StTimelineItem1

| 插槽名    | 说明                        | 插槽上绑定的参数                                                                                                                                                                            | 
|--------|:--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| suffix | 时间线数据展示项组件中标题和描述文本下面的后缀内容 | 1. `isInitial`：时间线组件是否初始状态；<br/>2. `isChange`：当前是否为切换时间线数据展示项的状态；<br/>3. `enterIdx`：接下来要进入浏览器可视区域的时间线数据展示项的索引；<br/>4. `leaveIdx`：接下来要离开浏览器可视区域的时间线数据展示项的索引；<br/>5. `currentIdx`：当前展示在浏览器可视区域的时间线数据展示项的索引 |

## 向子组件提供的状态

> 在子组件中，可以通过 `inject` API 注入父组件中通过 `provide` API 通过的状态。

### StTimeline1

| 状态名     | 说明                          |
|---------|:----------------------------|
| isReact | 当前组件是否响应式变化，以适应在小屏幕下展示时间线数据 |
