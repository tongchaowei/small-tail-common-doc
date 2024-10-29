<script setup lang="ts">
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
import PopconfirmBtn from "@/components/popconfirm-btn/popconfirm-btn.vue"
import {StIconIconify} from "@st-common/ui-vue3"
import Trash from "@iconify-icons/tabler/trash"

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 按钮是否折叠收缩只显示图标
    isCollapse?: boolean;
    // 是否禁用
    disabled?: boolean;
  }>(),
  {
    isCollapse: false,
    disabled: false,
  }
)

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 点击确定事件
   *
   * @param {"positive-click"} e 事件名称
   * @returns {boolean | Promise<boolean> | any}
   */
  (e: 'positive-click'): boolean | Promise<boolean> | any;
}>()
</script>

<template>
  <div class="batch-del-btn">
    <CollapsePopoverBtn :is-collapse="isCollapse" btn-text="批量删除" :placement="disabled ? 'top' : 'bottom'">
      <PopconfirmBtn
        :is-collapse="isCollapse"
        type="error"
        :btn-disabled="disabled"
        btn-text="批量删除"
        :negative-btn-props="{size: 'small'}"
        :positive-btn-props="{size: 'small'}"
        @positive-click="() => emits('positive-click')"
        confirm-text="是否确认删除？"
      >
        <template #icon>
          <slot name="icon">
            <st-icon-iconify :icon="Trash"/>
          </slot>
        </template>
      </PopconfirmBtn>
    </CollapsePopoverBtn>
  </div>
</template>

<style scoped>

</style>
