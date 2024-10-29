<script setup lang="ts">
import TableTemplate from "@/components/table-template/table-template.vue"
import {columnsOrigin, dataOrigin} from './data.ts'
import {ref} from 'vue'
import EditorForm from "@/pages/index/pages/sys/menu/components/editor-form.vue"
import {klona} from "klona" // 深度拷贝

const columns = ref(columnsOrigin)
const data = ref(klona(dataOrigin))

const addForm = ref({no: '', title: '', length: ''})

const titleFilter = ref('')
</script>

<template>
  <div class="sys-menu">
    <TableTemplate
      :columns="columns"
      :data="data"
      :row-key="row => row.no"
      is-filter-collapse
      @search="() => {data = data.filter(row => row.title.includes(titleFilter))}"
      @add-positive-click="() => {data.push(klona(addForm)); addForm.no = ''; addForm.title = ''; addForm.length = ''}"
      @batch-del="rowKeys => {data = data.filter(row =>!rowKeys.includes(row.no))}"
      @refresh="() => {data = klona(dataOrigin)}"
    >
      <template #filter>
        <div class="mt-2">
          <n-input v-model:value="titleFilter" />
        </div>
      </template>
      <template #add-editor>
        <EditorForm v-model:form="addForm"/>
      </template>
    </TableTemplate>
  </div>
</template>

<style scoped>

</style>
