<script setup lang="ts">
/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 是否为编辑模式
    isEdit: boolean
  }>(),
  {
    isEdit: false
  }
)

/**
 * 组件双向数据绑定
 */
const form = defineModel('form', {default: {no: '', title: '', length: ''}})
</script>

<template>
  <div class="editor-form">
    <n-form
      :label-width="80"
    >
      <n-form-item label="No">
        <n-input v-model:value="form.no" :disabled="isEdit"/>
      </n-form-item>
      <n-form-item label="Title">
        <n-input v-model:value="form.title"/>
      </n-form-item>
      <n-form-item label="Length">
        <n-input v-model:value="form.length"/>
      </n-form-item>
    </n-form>
  </div>
</template>

<style scoped>

</style>
