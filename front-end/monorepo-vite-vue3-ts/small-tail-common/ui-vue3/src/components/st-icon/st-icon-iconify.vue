<script setup lang="ts">
// 本组件参考自：
// https://iconify.design/docs/usage/
// https://gitee.com/yiming_chang/vue-pure-admin/tree/main/src/components/ReIcon/src
// https://zhuanlan.zhihu.com/p/582101763

import {onBeforeMount} from "vue"
import {strUtil} from '@st-common/core'
import {Icon as IconifyIconOnline, IconifyIcon} from '@iconify/vue'
import {Icon as IconifyIconOffline, addIcon} from "@iconify/vue/offline"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StIconIconify',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 图标
    icon: string | IconifyIcon;
    // 宽度
    width?: string | number;
    // 高度
    height?: string | number;
    // 颜色
    color?: string;
    // 样式
    style?: Partial<CSSStyleDeclaration> | string;
  }>(),
  {}
)

/**
 * 预处理
 */
onBeforeMount(() => {
  // 如果传入的 icons 是 IconifyIcon 类型，即表示以离线方式使用 Iconify 图标，则将图标添加到图标数据存储中（加载图标）
  if (!strUtil.isStr(props.icon)) addIcon(`${props.icon.body}`, props.icon)
})
</script>

<template>
  <!-- 根据传入的 icons 的类型，动态选择使用 IconifyIconOnline 或 IconifyIconOffline -->
  <component
    :is="strUtil.isStr(icon) ? IconifyIconOnline : IconifyIconOffline"
    :icon="icon"
    :width="width"
    :height="height"
    :color="color"
    :style="style"
  />
</template>

<style scoped>

</style>
