<script setup lang="ts">
import {
  StReactCollapse, // 响应式折叠收缩内容组件
  StIconIconify, // 基于 Iconify 提供的 Vue 图标组件封装的图标组件
} from '@st-common/ui-vue3'
// 基于 Navie 的按钮组件和 Popover 组件封装的折叠气泡按钮组件
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
// Iconify 图标库中 Tabler Icons 图标集图标
import Plus from '@iconify-icons/tabler/plus'
import Refresh from '@iconify-icons/tabler/refresh'
import EditorBtn from "@/components/table-template/components/editor-btn.vue"
import BatchDelBtn from "@/components/table-template/components/batch-del-btn.vue"
import ColumnsSettingBtn from "@/components/table-template/components/columns-setting-btn.vue"
import {VNodeChild} from "vue"

/**
 * 组件配置选项
 */
defineOptions({
  name: 'TableTemplateOperator',
})

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 新增编辑器标题
    addEditorTitle?: string | (() => VNodeChild);
    // 批量删除按钮是否禁用
    batchDelDisabled?: boolean;
  }>(),
  {
    addEditorTitle: '新增',
    batchDelDisabled: false,
  }
)

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 新增对话框关闭时触发
   *
   * @param {"add-dialog-close"} e
   */
  (e: 'add-dialog-close'): void;
  /**
   * 新增对话框点击取消按钮时触发
   *
   * @param {"add-negative-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'add-negative-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 新增对话框点击确认按钮时触发
   *
   * @param {"add-positive-click"} e
   * @param {MouseEvent | TouchEvent} ev
   */
  (e: 'add-positive-click', ev: MouseEvent | TouchEvent): void;
  /**
   * 批量删除事件
   *
   * @param {"batchDel"} e 事件名称
   */
  (e: 'batchDel'): void;
  /**
   * 刷新事件
   *
   * @param {"refresh"} e 事件名称
   */
  (e: 'refresh'): void;
}>()
</script>

<template>
  <st-react-collapse>
    <template v-slot="{isCollapse}">
      <div class="table-template__table-container__operator flex-center gap-2">
        <EditorBtn
          :is-collapse="isCollapse"
          btn-text="新增"
          :editor-title="addEditorTitle"
          @dialog-close="() => emits('add-dialog-close')"
          @negative-click="(ev) => emits('add-negative-click', ev)"
          @positive-click="(ev) => emits('add-positive-click', ev)"
        >
          <template #icon>
            <st-icon-iconify :icon="Plus"/>
          </template>
          <template #editor>
            <slot name="add-editor"></slot>
          </template>
        </EditorBtn>
        <BatchDelBtn
          :disabled="batchDelDisabled"
          :is-collapse="isCollapse"
          @positive-click="() => emits('batchDel')"
        />
        <CollapsePopoverBtn
          :is-collapse="isCollapse"
          btn-text="刷新"
          @click="() => emits('refresh')"
        >
          <template #icon>
            <st-icon-iconify :icon="Refresh"/>
          </template>
        </CollapsePopoverBtn>
        <ColumnsSettingBtn :is-collapse="isCollapse"/>
      </div>
    </template>
    <template #dropdown-content>
      <div
        class="table-template__table-container__operator__dropdown-content p-3 box-bg rounded-lg box-shadow flex-col-center-stretch gap-2"
      >
        <EditorBtn
          btn-text="新增"
          :editor-title="addEditorTitle"
          @dialog-close="() => emits('add-dialog-close')"
          @negative-click="(ev) => emits('add-negative-click', ev)"
          @positive-click="(ev) => emits('add-positive-click', ev)"
        >
          <template #icon>
            <st-icon-iconify :icon="Plus"/>
          </template>
          <template #editor>
            <slot name="add-editor"></slot>
          </template>
        </EditorBtn>
        <BatchDelBtn
          :disabled="batchDelDisabled"
          @positive-click="() => emits('batchDel')"
        />
        <ColumnsSettingBtn :is-dropdown-vertical="false"/>
      </div>
    </template>
  </st-react-collapse>
</template>

<style scoped>

</style>
