<script setup lang="ts">
import CollapsePopoverBtn from "@/components/collapse-popover-btn/collapse-popover-btn.vue"
import {StIconIconify} from "st-common-ui-vue3"
import Search from "@iconify-icons/tabler/search"
import Reload from '@iconify-icons/tabler/reload'

/**
 * 组件参数
 */
withDefaults(
  defineProps<{
    // 过滤表格数据部分标题
    filterTitle?: string;
    // 过滤表格数据部分是否使用折叠面板
    isFilterCollapse?: boolean;
  }>(),
  {
    filterTitle: '搜索',
    isFilterCollapse: false,
  }
)

/**
 * 组件自定义事件
 */
const emits = defineEmits<{
  /**
   * 搜索事件
   *
   * @param {"search"} e 事件名称
   */
  (e: 'search'): void;
  /**
   * 搜索条件重置事件
   *
   * @param {"reset-search"} e 事件名称
   */
  (e: 'search-reset'): void;
}>()
</script>

<template>
  <div class="table-template__filter p-4 mb-3 box-bg rounded-lg">
    <n-collapse v-if="isFilterCollapse" :trigger-areas="['main', 'arrow']">
      <n-collapse-item title="搜索">
        <template #header-extra>
          <div class="flex-center gap-2">
            <CollapsePopoverBtn
              is-collapse
              btn-text="重置"
              @click="() => emits('search-reset')"
            >
              <template #icon>
                <st-icon-iconify :icon="Reload"/>
              </template>
            </CollapsePopoverBtn>
            <CollapsePopoverBtn
              type="primary"
              is-collapse
              btn-text="搜索"
              @click="() => emits('search')"
            >
              <template #icon>
                <st-icon-iconify :icon="Search"/>
              </template>
            </CollapsePopoverBtn>
          </div>
        </template>
        <template #default>
          <slot name="default"></slot>
        </template>
      </n-collapse-item>
    </n-collapse>
    <div v-else>
      <div class="flex-between">
        <div class="text-sm">{{ filterTitle }}</div>
        <div class="flex-center gap-2">
          <CollapsePopoverBtn
            is-collapse
            btn-text="重置"
            @click="() => emits('search-reset')"
          >
            <template #icon>
              <st-icon-iconify :icon="Reload"/>
            </template>
          </CollapsePopoverBtn>
          <CollapsePopoverBtn
            type="primary"
            is-collapse
            btn-text="搜索"
            @click="() => emits('search')"
          >
            <template #icon>
              <st-icon-iconify :icon="Search"/>
            </template>
          </CollapsePopoverBtn>
        </div>
      </div>
      <div>
        <slot name="default"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
