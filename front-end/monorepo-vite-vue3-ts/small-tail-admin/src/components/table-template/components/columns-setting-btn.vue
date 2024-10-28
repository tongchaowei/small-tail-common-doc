<script setup lang="ts">
import {
  StPopover, // 气泡弹框组件
  StIconIconify, // 基于 Iconify 提供的 Vue 图标组件封装的图标组件
} from '@st-common/ui-vue3'
// 基于 Navie 的按钮组件和 Popover 组件封装的折叠气泡按钮组件
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
// Iconify 图标库中 Tabler Icons 图标集图标
import Settings from '@iconify-icons/tabler/settings'
import {inject, Ref, ref, watchEffect} from "vue"
import type {DataTableColumns} from '@/components/table-template/types/table'
import {VueDraggable} from 'vue-draggable-plus'
import ArrowsMoveVertical from '@iconify-icons/tabler/arrows-move-vertical'
import {useElementBounding} from '@vueuse/core'
import {deepClone} from "@visulima/deep-clone"

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 按钮是否折叠收缩展示
    isCollapse: boolean;
    // 下拉菜单是否垂直方向上展示
    isDropdownVertical: boolean;
  }>(),
  {
    isCollapse: false,
    isDropdownVertical: true,
  }
)

// 获取按钮距离页面左上角的距离
const columnsSettingBtnRef = ref<HTMLDivElement>()
const {x, y} = useElementBounding(columnsSettingBtnRef)
/**
 * 更新按钮距离页面左上角的距离
 */
const updateColumnsSettingBtnBounding = () => {
  const columnsSettingBtnBounding = useElementBounding(columnsSettingBtnRef)
  x.value = columnsSettingBtnBounding.x.value
  y.value = columnsSettingBtnBounding.y.value
}

// 表格的列配置的原始数据
const columnsOrigin = inject('columnsOrigin') as DataTableColumns
// 表格的列配置
const columns = inject('columns') as Ref<DataTableColumns>
// 需要展示的表格列
const columnsShowed = inject('columnsShowed') as Ref<DataTableColumns>
// 需要展示的表格列是否为部分表格列
const isColumnsShowedIndeterminate = ref(false)
// 需要展示的表格列是否为全部表格列
const isColumnsShowedAll = ref(false)

/**
 * 更新需要展示的表格列的处理函数
 */
const updateColumnsShowedHandler = (columns: DataTableColumns) => {
  // 记录需要展示的表格列的个数
  let columnsShowedCount = 0
  // 更新需要展示的表格列
  columnsShowed.value = columns.filter(column => {
    if (column.checked) {
      columnsShowedCount++
    }
    return column.checked
  })
  // 判断需要展示的表格列是否为部分表格列
  isColumnsShowedIndeterminate.value = columns.length > 0 && columnsShowedCount < columns.length
  // 判断需要展示的表格列是否为全部表格列
  isColumnsShowedAll.value = columns.length > 0 && columnsShowedCount === columns.length
  // 更新按钮距离页面左上角的距离
  updateColumnsSettingBtnBounding()
}

// 监听 columns 变化，更新 columnsShowed
watchEffect(() => {
  updateColumnsShowedHandler(columns.value)
})

/**
 * 更新全选复选框是否选中的处理函数
 *
 * @param checked 全选复选框是否选中
 */
const updateColumnsShowedAllHandler = (checked: boolean) => {
  columns.value.forEach(column => {
    if (!column.disableChecked) {
      column.checked = checked
    }
  })
}

/**
 * 根据表格的列配置的原始数据，重置表格的列配置的处理函数
 */
const resetColumnsShowedHandler = () => {
  columns.value = deepClone(columnsOrigin) as DataTableColumns
}
</script>

<template>
  <div ref="columnsSettingBtnRef" class="columns-setting-btn">
    <st-popover :is-vertical="isDropdownVertical" base-on-position :x="x" :y="y">
      <template #default>
        <div class="columns-setting-btn__btn">
          <CollapsePopoverBtn block :is-collapse="isCollapse" btn-text="列设置">
            <template #icon>
              <st-icon-iconify :icon="Settings"/>
            </template>
          </CollapsePopoverBtn>
        </div>
      </template>
      <template #subContent>
        <div
          class="columns-setting-btn__columns-setting rounded-lg box-shadow overflow-hidden"
          :class="[isDropdownVertical ? 'my-2' : 'mx-2']"
        >
          <n-list hoverable clickable>
            <n-list-item>
              <div class="p-2 flex-between">
                <n-checkbox
                  size="small"
                  v-model:checked="isColumnsShowedAll"
                  :indeterminate="isColumnsShowedIndeterminate"
                  @update:checked="updateColumnsShowedAllHandler"
                >
                  <span class="text-nowrap">全选</span>
                </n-checkbox>
                <n-button text size="small" @click="resetColumnsShowedHandler">重置</n-button>
              </div>
            </n-list-item>
            <VueDraggable v-model="columns" handle=".columns-setting-btn__columns-setting__item-handler">
              <div
                v-for="column in columns"
                :key="column.title"
                class="columns-setting-btn__columns-setting__item"
              >
                <n-list-item>
                  <div class="flex items-center">
                    <div
                      class="p-3"
                      :class="
                        column.draggable ?
                          'columns-setting-btn__columns-setting__item-handler cursor-move' :
                          'text-gray-3 cursor-not-allowed'
                      "
                    >
                      <st-icon-iconify :icon="ArrowsMoveVertical" width="16"/>
                    </div>
                    <n-checkbox size="small" :disabled="column.disableChecked" v-model:checked="column.checked">
                      <span class="text-nowrap">{{ column.title }}</span>
                    </n-checkbox>
                  </div>
                </n-list-item>
              </div>
            </VueDraggable>
          </n-list>
        </div>
      </template>
    </st-popover>
  </div>
</template>

<style scoped>
:deep(.n-list.n-list--bordered .n-list-item),
:deep(.n-list.n-list--hoverable .n-list-item) {
  padding: 0;
}
</style>
