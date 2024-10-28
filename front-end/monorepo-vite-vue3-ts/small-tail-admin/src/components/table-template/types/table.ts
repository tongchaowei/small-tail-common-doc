import {DataTableColumn as NDataTableColumn} from 'naive-ui'

/**
 * 表格列配置的类型
 */
export type DataTableColumn = NDataTableColumn & {
  // 表格列的标题
  title: string;
  // 表格列是否选中展示
  checked: boolean;
  // 表格列是否禁用可以选中展示
  disableChecked: boolean;
  // 表格列是否可拖拽
  draggable: boolean;
}

/**
 * 表格列配置的类型
 */
export type DataTableColumns = DataTableColumn[]
