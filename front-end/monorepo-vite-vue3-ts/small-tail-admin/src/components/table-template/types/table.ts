import {DataTableColumn as NDataTableColumn} from 'naive-ui'

/**
 * 表格列配置的类型
 */
export type DataTableColumn = NDataTableColumn & {
  // 表格列的标题
  title: string;
  // 表格列是否禁用可以选中展示
  disableChecked?: boolean;
  // 表格列是否可拖拽
  draggable?: boolean;
  // 表格列是否选中展示，提供表格列配置数据时，无需设置该值，在 table-template 中会自动设置该值为 true
  checked?: boolean;
  // 表格列的排序，提供表格列配置数据时，无需设置该值，在 table-template 中会自动根据表格列配置数据的索引设置该值
  sort?: number;
}

/**
 * 表格列配置的类型
 */
export type DataTableColumns = Array<DataTableColumn>
