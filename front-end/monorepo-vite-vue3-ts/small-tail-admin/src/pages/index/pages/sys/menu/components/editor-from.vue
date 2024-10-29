<script setup lang="ts">
withDefaults(
  defineProps<{
    isEditor: boolean
  }>(),
  {
    isEditor: false
  }
)

const form = defineModel('form', {default: {no: '', title: '', length: ''}})
</script>

<template>
  <n-form :label-width="80">
    <n-form-item label="No">
      <n-input v-model:value="form.no" :disabled="isEditor"/>
    </n-form-item>
    <n-form-item label="Title">
      <n-input v-model:value="form.title"/>
    </n-form-item>
    <n-form-item label="Length">
      <n-input v-model:value="form.length"/>
    </n-form-item>
  </n-form>
</template>

<style scoped>

</style>
