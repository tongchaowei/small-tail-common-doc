<script setup lang="ts">
import TableTemplateFilter from "@/components/table-template/components/table-template-filter.vue"
import TableTemplateOperator from "@/components/table-template/components/table-template-operator.vue"
import {DataTableColumns, DataTableColumn} from "@/components/table-template/types/table"
import {onBeforeMount, provide, Ref, ref} from "vue"
import {DataTableRowKey} from "naive-ui"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'TableTemplate',
})

/**
 * 组件参数
 */
const props = withDefaults(
  defineProps<{
    // 过滤表格数据部分标题
    filterTitle?: string;
    // 过滤表格数据部分是否使用折叠面板
    isFilterCollapse?: boolean;
    // 标题
    title?: string;
    // 表格的列配置
    columns: DataTableColumns;
    // 表格数据
    data: Array<Object>;
    // 是否使用内置的选择列的配置
    isUseBuiltInSelectColumn?: boolean;
    // 表格数据行唯一表示，如果表格中存在选择列，且表格数据行中不存在 key 字段，则需要传入该组件参数
    rowKey?: (rowData: object) => (number | string);
  }>(),
  {
    filterTitle: '搜索',
    isFilterCollapse: false,
    title: '标题',
    isUseBuiltInSelectColumn: true,
  }
)

/**
 * 组件双向数据绑定
 */
// 选中的表格数据行唯一标识
const checkedRowKeys = defineModel<DataTableRowKey[]>('checkedRowKeys', {default: []})

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 新增对话框关闭时触发
   *
   * @param {"add-dialog-close"} e
   */
  (e: 'add-dialog-close'): void;
  /**
   * 新增对话框点击取消按钮时触发
   *
   * @param {"add-negative-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'add-negative-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 新增对话框点击确认按钮时触发
   *
   * @param {"add-positive-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'add-positive-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 批量删除事件
   *
   * @param {"batchDel"} e 事件名称
   * @param {RowKey[]} rowKeys 要删除的表格数据行的唯一标识
   */
  (e: 'batchDel', rowKeys: DataTableRowKey[]): void;
  /**
   * 刷新事件
   *
   * @param {"refresh"} e 事件名称
   */
  (e: 'refresh'): void;
  /**
   * 搜索事件
   *
   * @param {"search"} e 事件名称
   */
  (e: 'search'): void;
  /**
   * 搜索条件重置事件
   *
   * @param {"reset-search"} e
   */
  (e: 'search-reset'): void;
}>()

// 表格勾选列的配置
const selectableColumn: DataTableColumn = {
  type: 'selection',
  className: 'p-4',
  title: '勾选列',
  checked: true,
  disableChecked: true,
  draggable: false,
}
// 表格的列配置
const columns = ref<DataTableColumns>(props.columns)
// 需要展示的表格列
const columnsShowed = ref<DataTableColumns>(columns.value)
/**
 * 预处理表格列配置
 */
onBeforeMount(() => {
  // 使用内置的选择列的配置
  if (props.isUseBuiltInSelectColumn) {
    columns.value = [selectableColumn,...columns.value]
  }
  // 默认显示所有的表格列并设置表格列排序
  let idx = 0
  columns.value.forEach((column) => {
    column.checked = true
    column.sort = idx++
  })
})

// 向子组件提供表格列配置数据
provide<Ref<DataTableColumns>>('columns', columns)
provide<Ref<DataTableColumns>>('columnsShowed', columnsShowed)

/**
 * 选中表格数据行的处理函数
 *
 * @param {DataTableRowKey[]} rowKeys 选中的表格数据行的唯一标识
 */
const checkRowHandler = (rowKeys: DataTableRowKey[]) => {
  checkedRowKeys.value = rowKeys
}

/**
 * 批量删除事件的处理函数
 */
const batchDelHandler = () => {
  emits('batchDel', checkedRowKeys.value)
}

/**
 * 刷新事件的处理函数
 */
const refreshHandler = () => {
  emits('refresh')
}
</script>

<template>
  <div class="table-template">
    <TableTemplateFilter
      :filter-title="filterTitle"
      :is-filter-collapse="isFilterCollapse"
      @search="() => emits('search')"
      @search-reset="() => emits('search-reset')"
    >
      <template #default>
        <slot name="filter"></slot>
      </template>
    </TableTemplateFilter>
    <div class="table-template__table-container p-4 box-bg rounded-lg">
      <div class="table-template__table-container__top mb-4 flex-between">
        <div class="table-template__table-container__title text-lg font-bold line-clamp-1">{{ title }}</div>
        <TableTemplateOperator
          :batch-del-disabled="checkedRowKeys.length === 0"
          @add-dialog-close="() => emits('add-dialog-close')"
          @add-negative-click="(ev) => emits('add-negative-click', ev)"
          @add-positive-click="(ev) => emits('add-positive-click', ev)"
          @batch-del="batchDelHandler"
          @refresh="refreshHandler"
        >
          <template #add-editor>
            <slot name="add-editor"></slot>
          </template>
        </TableTemplateOperator>
      </div>
      <div class="table-template__table-container__table rounded overflow-hidden">
        <n-data-table
          :columns="columnsShowed"
          :data="data"
          :row-key="rowKey"
          :bordered="false"
          @update:checked-row-keys="checkRowHandler"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.n-checkbox.n-checkbox--inside-table) {
  padding: 0.75rem 0.75rem 0.75rem 0;
}
</style>
