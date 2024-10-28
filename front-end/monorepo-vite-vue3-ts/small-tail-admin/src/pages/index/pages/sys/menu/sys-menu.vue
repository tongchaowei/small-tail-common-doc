<script setup lang="ts">
import TableTemplate from "@/components/table-template/table-template.vue"
import {DataTableColumns} from "@/components/table-template/types/table"
import {ref} from "vue";

const columns = ref<DataTableColumns>([
  {
    title: 'No',
    key: 'no',
    checked: true,
    disableChecked: true,
    draggable: false,
  },
  {
    title: 'Title',
    key: 'title',
    checked: true,
    disableChecked: false,
    draggable: true,
  },
  {
    title: 'Length',
    key: 'length',
    checked: false,
    disableChecked: false,
    draggable: true,
  },
  {
    title: 'Action',
    key: 'actions',
    checked: true,
    disableChecked: false,
    draggable: true,
  }
])
</script>

<template>
  <div class="sys-menu-page">
    <TableTemplate :columns="columns">

    </TableTemplate>
  </div>
</template>

<style scoped>

</style>
