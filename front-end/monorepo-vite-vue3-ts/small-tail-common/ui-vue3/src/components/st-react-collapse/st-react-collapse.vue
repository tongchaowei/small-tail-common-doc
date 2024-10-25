<script setup lang="ts">
import {ref, watch} from 'vue'
import {useElementSize, useParentElement} from '@vueuse/core'
import useElementContactPrevious from "../../hook/use-element-contact-previous"
import useElementParentChildrenWidth from "../../hook/use-element-parent-children-width"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StReactCollapse',
})

// 当前组件根元素的引用对象
const stReactCollapseRef = ref<HTMLDivElement>()
// 当前组件根元素的父元素的引用对象
const parentRef = useParentElement()
// 当前组件根元素的父元素的宽度
const {width} = useElementSize(parentRef)
// 当前组件根元素是否与其上一个兄弟元素接触
const isContactPre = ref(false)
// 当前组件的内容是否需要折叠收缩，默认不折叠，确保页面初始情况下，能够获取保存组件内容折叠收缩前当前组件根元素父元素的所有子元素宽度之和
const isCollapse = ref(false)
// 当前组件根元素父元素的所有子元素宽度之和
const parentChildrenOffsetWidthSum = ref(0)

/**
 * 监听当前组件根元素的父元素的宽度变化，并根据其宽度的变化来响应式控制当前组件内容的折叠收缩与展开
 */
watch(
  width,
  () => {
    // 获取当前组件根元素是否与其上一个兄弟元素接触
    isContactPre.value = useElementContactPrevious(stReactCollapseRef)
    // 如果当前组件根元素与其上一个兄弟元素接触，即当前组件内容需要折叠收缩，且当前组件内容未折叠收缩
    if (isContactPre.value && !isCollapse.value) {
      // 获取保存组件内容折叠收缩前当前组件根元素父元素的所有子元素宽度之和
      parentChildrenOffsetWidthSum.value = useElementParentChildrenWidth(stReactCollapseRef).offsetWidthSum
      // 当前组件内容折叠收缩
      isCollapse.value = true
    }
    // 如果当前组件根元素的父元素的宽度大于保存的组件内容折叠收缩前当前组件根元素父元素的所有子元素宽度之和，即当前组件内容需要展开显示
    // 且当前组件内容已折叠收缩
    if (width.value > parentChildrenOffsetWidthSum.value && isCollapse.value) {
      // 当前组件内容展开显示
      isCollapse.value = false
    }
  },
  {immediate: true}
)
</script>

<template>
  <div class="st-react-collapse" ref="stReactCollapseRef">
    <slot :isCollapse="isCollapse"></slot>
  </div>
</template>

<style scoped>

</style>
