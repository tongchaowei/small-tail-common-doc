<!--
  该组件实现响应式折叠收缩组件内容是基于判断当前组件根元素(左边界)是否与上一个兄弟元素(右边界)接触。
  因此需要注意，对于当前元素与其上一个兄弟元素，需要保证其偏移父元素(offsetParent)是同一个元素，
  否则可能会出现响应式折叠收缩组件内容失效的情况。
-->
<script setup lang="ts">
import {ref, watch, nextTick} from 'vue'
import {useElementSize, useParentElement} from '@vueuse/core'
import useElementContactPrevious from "../../hooks/use-element-contact-previous"
import useElementParentChildrenWidth from "../../hooks/use-element-parent-children-width"
import StPopover from "../st-popover/st-popover.vue"
import StIconIconify from "../st-icon/st-icon-iconify.vue"
import AlignRight from '@iconify-icons/tabler/align-right'

/**
 * 组件配置选项
 */
defineOptions({
  name: 'StReactCollapse',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    dropdownZIndex?: number
  }>(),
  {
    dropdownZIndex: 1
  }
)

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
// 组件内容折叠收缩前，组件根元素父元素的所有子元素宽度之和
const parentChildrenOffsetWidthSumCollapse = ref(0)
// 是否折叠收缩，采用下拉菜单方式展示内容
const isDropdown = ref(false)
// 组件内容使用下拉菜单方式展示前，组件根元素父元素的所有子元素宽度之和
const parentChildrenOffsetWidthSumDropdown = ref(0)

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
      parentChildrenOffsetWidthSumCollapse.value = useElementParentChildrenWidth(stReactCollapseRef).offsetWidthSum
      // 当前组件内容折叠收缩
      isCollapse.value = true
      // 在下一次 DOM 更新时，获取当前组件根元素是否与其上一个兄弟元素接触，判断是否需要使用下拉菜单方式展示组件内容
      nextTick(() => {
        isContactPre.value = useElementContactPrevious(stReactCollapseRef)
        // 如果当前组件根元素与其上一个兄弟元素接触，且当前组件内容已折叠收缩，即当前组件内容需要使用下拉菜单方式展示
        if (isContactPre.value && isCollapse.value && !isDropdown.value) {
          // 获取保存组件内容使用下拉菜单方式展示前当前组件根元素父元素的所有子元素宽度之和
          parentChildrenOffsetWidthSumDropdown.value = useElementParentChildrenWidth(stReactCollapseRef).offsetWidthSum
          isDropdown.value = true
        }
      })
    }
    // 如果当前组件根元素与其上一个兄弟元素接触，且当前组件内容已折叠收缩，即当前组件内容需要使用下拉菜单方式展示
    else if (isContactPre.value && isCollapse.value && !isDropdown.value) {
      parentChildrenOffsetWidthSumDropdown.value = useElementParentChildrenWidth(stReactCollapseRef).offsetWidthSum
      isDropdown.value = true
    }
    // 如果当前组件根元素的父元素的宽度大于保存的组件内容折叠收缩前当前组件根元素父元素的所有子元素宽度之和，即当前组件内容需要展开显示
    // 且当前组件内容已折叠收缩
    if (width.value > parentChildrenOffsetWidthSumCollapse.value && isCollapse.value) {
      // 当前组件内容展开显示
      isCollapse.value = false
    }
      // 如果当前组件根元素的父元素的宽度，小于保存的组件内容折叠收缩前组件根元素父元素的所有子元素宽度之和，大于保存的组件内容使用下拉菜单方式
      // 展示前组件根元素父元素的所有子元素宽度之和，且当前组件内容已处于折叠收缩状态，即当前组件内容需要使用折叠收缩方式展示
    // 并且此时组件内容已使用下拉菜单方式展示
    else if (width.value > parentChildrenOffsetWidthSumDropdown.value && isCollapse.value && isDropdown.value) {
      // 取消组件内容使用下拉菜单方式展示
      isDropdown.value = false
    }
  },
  {immediate: true}
)
</script>

<template>
  <div class="st-react-collapse" ref="stReactCollapseRef">
    <div v-show="!isDropdown" class="st-react-collapse__content">
      <slot name="default" :isCollapse="isCollapse"></slot>
    </div>
    <div v-show="isDropdown" class="st-react-collapse__dropdown">
      <st-popover is-vertical :sub-cont-z-index="dropdownZIndex">
        <template #default>
          <div class="st-react-collapse__dropdown-icon">
            <slot name="dropdown-icon">
              <st-icon-iconify :icon="AlignRight" width="24"/>
            </slot>
          </div>
        </template>
        <template #subContent>
          <div class="st-react-collapse__dropdown-content">
            <slot name="dropdown-content"></slot>
          </div>
        </template>
      </st-popover>
    </div>
  </div>
</template>

<style scoped lang="scss">
.st-react-collapse {

  .st-react-collapse__dropdown {

    .st-react-collapse__dropdown-icon {
      cursor: pointer;
    }
  }
}
</style>
