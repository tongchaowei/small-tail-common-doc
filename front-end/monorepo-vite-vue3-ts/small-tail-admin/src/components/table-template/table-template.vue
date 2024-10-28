<script setup lang="ts">
import TableTemplateOperator from "@/components/table-template/components/table-template-operator.vue"
import {DataTableColumns} from "@/components/table-template/types/table.ts"
import {provide, Ref, ref} from "vue"
import {deepClone} from "@visulima/deep-clone"

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
    // 表格的列配置
    columns: DataTableColumns
  }>(),
  {}
)

// 表格的列配置
const columns = ref<DataTableColumns>(deepClone(props.columns) as DataTableColumns)
// 需要展示的表格列
const columnsShowed = ref<DataTableColumns>(columns.value)

// 向子组件提供 columns 和 columnsShowed
provide<DataTableColumns>('columnsOrigin', props.columns)
provide<Ref<DataTableColumns>>('columns', columns)
provide<Ref<DataTableColumns>>('columnsShowed', columnsShowed)
</script>

<template>
  <div class="table-template">
    <div class="table-template__filter p-4 mb-2 box-bg">
      {{ columnsShowed }}
    </div>
    <div class="table-template__table-container p-4 box-bg">
      <div class="table-template__table-container__top mb-4 flex-between">
        <div class="table-template__table-container__title text-lg font-bold text-nowrap">标题标题标题标题</div>
        <TableTemplateOperator></TableTemplateOperator>
      </div>
      <div class="table-template__table-container__table">
        <n-data-table
          :columns="columnsShowed"
          :bordered="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
