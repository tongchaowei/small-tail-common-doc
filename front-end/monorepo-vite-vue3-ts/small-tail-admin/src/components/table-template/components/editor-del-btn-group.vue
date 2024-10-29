<script setup lang="ts">
import EditorBtn from "@/components/table-template/components/editor-btn.vue"
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
import PopconfirmBtn from '@/components/popconfirm-btn/popconfirm-btn.vue'
import {StIconIconify} from "@st-common/ui-vue3"
import Trash from "@iconify-icons/tabler/trash"

/**
 * 自定义事件
 */
const emits = defineEmits<{
  /**
   * 编辑对话框关闭时触发
   *
   * @param {"editor-dialog-close"} e
   */
  (e: 'editor-dialog-close'): void;
  /**
   * 编辑对话框点击取消按钮时触发
   *
   * @param {"editor-negative-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'editor-negative-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 编辑对话框点击确认按钮时触发
   *
   * @param {"editor-positive-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'editor-positive-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 删除事件
   *
   * @param {"del"} e
   */
  (e: 'del'): void;
}>()
</script>

<template>
  <div class="editor-del-btn-group flex gap-2">
    <EditorBtn
      is-collapse
      text
      @dialog-close="() => emits('editor-dialog-close')"
      @negative-click="ev => emits('editor-negative-click', ev)"
      @positive-click="ev => emits('editor-positive-click', ev)"
    >
      <template #editor>
        <slot name="editor"></slot>
      </template>
    </EditorBtn>
    <CollapsePopoverBtn
      is-collapse
      btn-text="删除"
    >
      <template #default>
        <PopconfirmBtn
          type="error"
          is-collapse
          text
          confirm-text="是否确认删除"
          @positive-click="() => emits('del')"
        >
          <template #icon>
            <st-icon-iconify :icon="Trash"/>
          </template>
        </PopconfirmBtn>
      </template>
    </CollapsePopoverBtn>
  </div>
</template>

<style scoped>

</style>
