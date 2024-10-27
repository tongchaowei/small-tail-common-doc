<script setup lang="ts">
import TableTemplateOperator from "@/components/table-template/components/table-template-operator.vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'TableTemplate',
})
</script>

<template>
  <div class="table-template">
    <div class="table-template__filter p-4 mb-2 box-bg">

    </div>
    <div class="table-template__table-container p-4 box-bg flex-between">
      <div class="table-template__table-container__title text-lg font-bold line-clamp-1">标题标题标题标题</div>
      <TableTemplateOperator></TableTemplateOperator>
    </div>
  </div>
</template>

<style scoped>

</style>
