# St3DText 组件

3D 文本组件

::: info 组件样式来源

[https://www.bilibili.com/video/BV1MT4y1E7HT/](https://www.bilibili.com/video/BV1MT4y1E7HT/)

:::

::: tip 组件源码地址

[https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/St3DText](https://gitee.com/tongchaowei/small-tail-admin/tree/dev/front-end/monorepo-vite-vue3-ts/small-tail-common/ui-vue3/src/components/St3DText)

:::

::: warning 注意事项

该组件中文本的 3D 效果，是通过多层文本在 z 轴方向上位移实现的；

:::

## 组件示例

> 示例中使用到的 St3DTiltContainer 组件的具体用法可以参考[其说明文档](/ui-vue3/3d-tilt-container/)

<script setup lang="ts">
import {St3DText, St3DTiltContainer} from 'st-common-ui-vue3'
import {ref} from 'vue'

const bgColor = ref('#efefef')
const content = ref('Hello, World! 你好，世界！')
const color = ref('#fff')
const fontSize = ref('3rem')
const layerCnt = ref(20)
const layerGap = ref(1.5)
const shadow = ref(true)
const shadowSize = ref('5px')
const base = ref(true)
const baseWidth = ref('10px')
const baseColor = ref('#fb7299')
const baseShadow = ref(true)
const perspective = ref('1000px')
</script>

<div style="height: 300px; border-radius: 1rem; overflow: hidden;" :style="{background: bgColor, lineHeight: fontSize}">
  <St3DTiltContainer fullPageListening>
    <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; transform-style: preserve-3d">
      <St3DText
        :content="content"
        :color="color"
        :fontSize="fontSize"
        :layerCnt="layerCnt"
        :layerGap="layerGap"
        :shadow="shadow"
        :shadowSize="shadowSize"
        :base="base"
        :baseWidth="baseWidth"
        :baseColor="baseColor"
        :baseShadow="baseShadow"
        :perspective="perspective"
      />
    </div>
  </St3DTiltContainer>
</div>

<el-form label-width="auto" style="margin-top: 20px">
  <el-form-item label="示例区域背景颜色">
    <el-color-picker v-model="bgColor" clearable />
  </el-form-item>
  <el-form-item label="content">
    <el-input v-model="content" clearable/>
  </el-form-item>
  <el-form-item label="color">
    <el-color-picker v-model="color" clearable />
  </el-form-item>
  <el-form-item label="fontSize">
    <el-input v-model="fontSize" clearable/>
  </el-form-item>
  <el-form-item label="layerCnt">
    <el-input-number v-model="layerCnt" clearable/>
  </el-form-item>
  <el-form-item label="layerGap">
    <el-input-number v-model="layerGap" :step="0.1" clearable/>
  </el-form-item>
  <el-form-item label="shadow">
    <el-switch v-model="shadow" />
  </el-form-item>
  <el-form-item label="shadowSize">
    <el-input v-model="shadowSize" clearable/>
  </el-form-item>
  <el-form-item label="base">
    <el-switch v-model="base" />
  </el-form-item>
  <el-form-item label="baseWidth">
     <el-input v-model="baseWidth" clearable/>
  </el-form-item>
  <el-form-item label="baseColor">
    <el-color-picker v-model="baseColor" clearable />
  </el-form-item>
  <el-form-item label="baseShadow">
    <el-switch v-model="baseShadow" />
  </el-form-item>
  <el-form-item label="perspective">
    <el-input v-model="perspective" clearable/>
  </el-form-item>
</el-form>

::: details 示例代码

```vue
<script setup lang="ts">
import {St3DText, St3DTiltContainer} from 'st-common-ui-vue3'
import {ref} from 'vue'

const bgColor = ref('#efefef')
const content = ref('Hello, World! 你好，世界！')
const color = ref('#fff')
const fontSize = ref('3rem')
const layerCnt = ref(20)
const layerGap = ref(1.5)
const shadow = ref(true)
const shadowSize = ref('5px')
const base = ref(true)
const baseWidth = ref('10px')
const baseColor = ref('#fb7299')
const baseShadow = ref(true)
const perspective = ref('1000px')
</script>

<template>
  <div style="height: 300px; border-radius: 1rem; overflow: hidden;" :style="{background: bgColor}">
    <St3DTiltContainer fullPageListening>
      <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; transform-style: preserve-3d">
        <St3DText
          :content="content"
          :color="color"
          :fontSize="fontSize"
          :layerCnt="layerCnt"
          :layerGap="layerGap"
          :shadow="shadow"
          :shadowSize="shadowSize"
          :base="base"
          :baseWidth="baseWidth"
          :baseColor="baseColor"
          :baseShadow="baseShadow"
          :perspective="perspective"
        />
      </div>
    </St3DTiltContainer>
  </div>
</template>
```

:::

## 组件参数

| 参数名         | 说明                                                |         类型         |     默认值     |
|-------------|:--------------------------------------------------|:------------------:|:-----------:|
| content     | 文本内容，该组件参数为**必填项**                                |       string       |             |
| color       | 文本的颜色                                             |       string       |  `'#fff'`   |
| fontSize    | 文本字体大小，如果传递的参数值为数字，则其单位为像素 px                     | `number \| string` |  `'3rem'`   |
| layerCnt    | 组成 3D 文本效果的文本层数                                   |       number       |     20      |
| layerGap    | 组件 3D 文本效果的文本层数每层之间的间距，其单位为像素 px                  |       number       |     1.5     |
| shadow      | 是否开启文本的阴影效果                                       |      boolean       |    true     |
| shadowSize  | 文本阴影的大小，如果传递的参数值为数字，则其单位为像素 px                    | `number \| string` |   `'5px'`   |
| base        | 是否开启 3D 文本的底层底座效果                                 |      boolean       |    true     |
| baseWidth   | 3D 文本的底层底座的宽度，如果传递的参数值为数字，则其单位为像素 px              | `number \| string` |  `'10px'`   |
| baseColor   | 3D 文本的底层底座的颜色                                     |       string       | `'#fb7299'` |
| baseShadow  | 是否开启 3D 文本底座的阴影效果                                 |      boolean       |    true     |
| perspective | 3D 透视效果的距离，即观察者与 z=0 平面的距离，如果传递的参数值为数字，则其单位为像素 px | `number \| string` | `'1000px'`  |
