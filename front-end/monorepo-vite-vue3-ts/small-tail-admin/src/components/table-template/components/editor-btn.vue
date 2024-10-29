<script setup lang="ts">
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
import {StIconIconify} from "@st-common/ui-vue3"
import Edit from '@iconify-icons/tabler/edit'
import Dialog from "@/components/dialog/dialog.vue"
import {ref, VNodeChild} from "vue"

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 按钮是否为块元素
    block?: boolean;
    // 按钮是否为文本按钮
    text?: boolean;
    // 按钮大小
    size?: 'mini' | "small" | "medium" | "large";
    // 按钮是否折叠收缩只显示图标
    isCollapse?: boolean;
    // 按钮文本
    btnText?: string;
    // 编辑器标题
    editorTitle?: string | (() => VNodeChild);
  }>(),
  {
    block: true,
    text: false,
    size: "small",
    isCollapse: false,
    btnText: "编辑",
    editorTitle: "编辑",
  }
)

/**
 * 自定义事件
 */
const emits = defineEmits<{
  /**
   * 对话框关闭时触发
   *
   * @param {"dialog-close"} e
   */
  (e: 'dialog-close'): void;
  /**
   * 点击取消按钮时触发
   *
   * @param {"negative-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'negative-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 点击确认按钮时触发
   *
   * @param {"positive-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'positive-click', ev: MouseEvent | TouchEvent): void;
}>()

// 是否显示编辑对话框
const isShowEditorDialog = ref(false)
</script>

<template>
  <div class="editor-btn">
    <CollapsePopoverBtn
      :is-collapse="isCollapse"
      type="primary"
      :block="block"
      :text="text"
      :size="size"
      :btn-text="btnText"
      @click="() => isShowEditorDialog = true"
    >
      <template #icon>
        <slot name="icon">
          <st-icon-iconify :icon="Edit"/>
        </slot>
      </template>
    </CollapsePopoverBtn>
  </div>
  <Dialog
    v-model:show="isShowEditorDialog"
    :title="editorTitle"
    :positive-button-props="{type: 'primary'}"
    @close="() => emits('dialog-close')"
    @negative-click="(ev) => emits('negative-click', ev)"
    @positive-click="(ev) => emits('positive-click', ev)"
  >
    <template #default>
      <slot name="editor"></slot>
    </template>
  </Dialog>
</template>

<style scoped>

</style>
