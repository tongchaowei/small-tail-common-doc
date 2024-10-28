<script setup lang="ts">
import {
  StReactCollapse, // 响应式折叠收缩内容组件
  StIconIconify, // 基于 Iconify 提供的 Vue 图标组件封装的图标组件
} from '@st-common/ui-vue3'
// 基于 Navie 的按钮组件和 Popover 组件封装的折叠气泡按钮组件
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
// Iconify 图标库中 Tabler Icons 图标集图标
import Plus from '@iconify-icons/tabler/plus'
import Trash from '@iconify-icons/tabler/trash'
import Refresh from '@iconify-icons/tabler/refresh'
import ColumnsSettingBtn from "@/components/table-template/components/columns-setting-btn.vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'TableTemplateOperator',
})
</script>

<template>
  <st-react-collapse>
    <template v-slot="{isCollapse}">
      <div class="table-template__table-container__operator flex-center gap-2">
        <CollapsePopoverBtn
          :is-collapse="isCollapse"
          type="primary"
          btn-text="新增"
        >
          <template #icon>
            <st-icon-iconify :icon="Plus"/>
          </template>
        </CollapsePopoverBtn>
        <CollapsePopoverBtn
          :is-collapse="isCollapse"
          type="error"
          btn-text="批量删除"
        >
          <template #icon>
            <st-icon-iconify :icon="Trash"/>
          </template>
        </CollapsePopoverBtn>
        <CollapsePopoverBtn
          :is-collapse="isCollapse"
          btn-text="刷新"
        >
          <template #icon>
            <st-icon-iconify :icon="Refresh"/>
          </template>
        </CollapsePopoverBtn>
        <ColumnsSettingBtn :is-collapse="isCollapse"/>
      </div>
    </template>
    <template #dropdown-content>
      <div class="table-template__table-container__operator__dropdown-content p-3 box-bg rounded-lg box-shadow flex-col-center-stretch gap-2">
        <n-button type="primary" ghost size="small">
          <template #icon>
            <st-icon-iconify :icon="Plus"/>
          </template>
          新增
        </n-button>
        <n-button type="error" ghost size="small">
          <template #icon>
            <st-icon-iconify :icon="Trash"/>
          </template>
          批量删除
        </n-button>
        <ColumnsSettingBtn :is-dropdown-vertical="false"/>
      </div>
    </template>
  </st-react-collapse>
</template>

<style scoped>

</style>
