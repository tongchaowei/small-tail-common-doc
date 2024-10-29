import {DataTableColumns} from "@/components/table-template/types/table.ts"
import {h} from 'vue'
import EditorDelBtnGroup from "@/components/table-template/components/editor-del-btn-group.vue"
import EditorForm from "@/pages/index/pages/sys/menu/components/editor-form.vue"

// 表格列配置
export const columnsOrigin: DataTableColumns = [
  {
    title: 'No',
    key: 'no',
    draggable: true,
  },
  {
    title: 'Title',
    key: 'title',
    draggable: true,
  },
  {
    title: 'Length',
    key: 'length',
    draggable: true,
  },
  {
    title: 'Action',
    key: 'actions',
    draggable: true,
    render: (row) => {
      return h(
        EditorDelBtnGroup,
        {},
        {
          editor: () => h(
            EditorForm,
            {
              isEdit: true,
              form: row,
              'update:form'(newVal: any) {
                row = newVal
              }
            }
          )
        }
      )
    }
  }
]

// 表格数据
export const dataOrigin = [
  {no: 3, title: 'Wonderwall', length: '4:18'},
  {
    no: 4,
    title: 'Don\'t Look Back in Anger',
    length: '4:48',
    children: [{no: 13, title: 'Champagne Supernova', length: '7:27'}]
  },
  {no: 12, title: 'Champagne Supernova', length: '7:27'}
]
