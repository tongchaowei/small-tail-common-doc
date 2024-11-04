# StLoginPage1 组件

登录页面组件 1

::: info 组件样式来源

[https://www.bilibili.com/video/BV1XA4y1D7DC/](https://www.bilibili.com/video/BV1XA4y1D7DC/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StLoginPage1](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/StLoginPage1)

:::

## 组件参数

| 参数名                     | 说明                                                                                                                                                                              |          类型          |   默认值   |
|-------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------:|:-------:|
| pageMinHeight           | 页面最小高度，当浏览器屏幕的宽度小于 875px 时起作用，当传入的值为数字类型时，单位默认为 px                                                                                                                              |  `number \| string`  |  850px  |
| circleMaskDiameter      | 圆形遮罩的直径，就是表单切换时会移动覆盖掉要切换掉的表单的元素，当传入的值为数字类型时，单位默认为 px                                                                                                                            |  `number \| string`  | 2500px  |
| circleMaskDiameterSmall | 圆形遮罩在小屏幕下的直径，即当浏览器屏幕的宽度小于 875px 时，会使用这个值作为圆形遮罩的直径，当传入的值为数字类型时，单位默认为 px                                                                                                          |  `number \| string`  | 1500px  |
| circleMaskColor         | 圆形遮罩的颜色                                                                                                                                                                         |        string        | #368EEF |
| panelImgSrc             | 面板中展示的图片的资源地址，这里的面板指定是登录页面中表单的左边或右边那半部分用于展示图片和切换表单按钮与文本的区域。<br/>如果传递的参数值为数组类型，则第一张图片会在面板 1 中展示，第二张图片会在面板 2 中展示，如果只有一张图片，则面板 1 与面板 2 展示相同的图片；如果传递的参数值为字符串类型，则面板 1 与面板 2 展示相同的图片。 | `string \| string[]` |   ''    |
| panelImgWidthSmall      | 面板中展示的图片在小屏幕下的宽度，当浏览器屏幕的宽度小于 875px 时起作用，当传入的值为数字类型时，单位默认为 px                                                                                                                    |  `number \| string`  |  200px  |

## 组件双向数据绑定

| 参数名          | 说明                                                            |   类型    |  默认值  |
|--------------|:--------------------------------------------------------------|:-------:|:-----:|
| isToggleForm | 是否切换为第二个表单，即当该值为 true 时，会切换展示第二个表单；否则，当该值为 false 时，会切换展示第一个表单 | boolean | false |

## 组件插槽

| 插槽名         | 说明                    |
|-------------|:----------------------|
| form-1      | 第一个表单的内容              |
| panel-1     | 与第一个表单同时展示的面板的内容      |
| panel-1-top | 与第一个表单同时展示的面板的顶部区域的内容 |
| form-2      | 第二个表单的内容              |
| panel-2     | 与第二个表单同时展示的面板的内容      |
| panel-2-top | 与第二个表单同时展示的面板的顶部区域的内容 |


