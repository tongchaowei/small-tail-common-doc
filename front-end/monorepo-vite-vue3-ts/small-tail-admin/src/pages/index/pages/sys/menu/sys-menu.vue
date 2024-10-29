<script setup lang="ts">
import TableTemplate from "@/components/table-template/table-template.vue"
import {DataTableColumns} from "@/components/table-template/types/table"
import {ref} from "vue"
import { klona } from 'klona'
import {columnsOrigin, dataOrigin} from "@/pages/index/pages/sys/menu/data.ts"
import EditorFrom from "@/pages/index/pages/sys/menu/components/editor-from.vue"

const columns = ref<DataTableColumns>(columnsOrigin)
const data = ref<any[]>(klona(dataOrigin))

const addForm = ref({
  no: '',
  title: '',
  length: '',
})

const titleFilter = ref('')
</script>

<template>
  <div class="sys-menu-page">
    <TableTemplate
      title="测试表格组件"
      :columns="columns"
      :data="data"
      :row-key="rowData => rowData.no"
      @search="() => {data = data.filter(rowData => rowData.title.includes(titleFilter))}"
      @add-positive-click="() => {data.push(klona(addForm)); addForm.no = ''; addForm.title = ''; addForm.length = '';}"
      @batch-del="rowKeys => data = data.filter(rowData =>!rowKeys.includes(rowData.no))"
      @refresh="() => data = klona(dataOrigin)"
    >
      <template #filter>
        <div class="mt-2">
          <n-input size="small" v-model:value="titleFilter" placeholder="请输入关键字搜索"/>
        </div>
      </template>
      <template #add-editor>
        <EditorFrom :form="addForm"/>
      </template>
    </TableTemplate>
  </div>
</template>

<style scoped>

</style>
