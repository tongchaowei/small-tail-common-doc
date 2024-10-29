<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <n-layout has-sider>
      <n-layout-sider
        content-class="relative h-screen max-h-screen"
        width="240px"
        bordered
        show-trigger="bar"
      >
        <slot name="sider"></slot>
      </n-layout-sider>
      <n-layout content-class="flex flex-col">
        <n-layout-header>

        </n-layout-header>
        <n-layout-content content-class="p-3">
          <slot name="content"></slot>
        </n-layout-content>
        <n-layout-footer>

        </n-layout-footer>
      </n-layout>
    </n-layout>
  </div>
</template>

<style scoped lang="scss">
.n-layout,
.n-layout-sider,
.n-layout-header,
.n-layout-content,
.n-layout-footer {
  background-color: transparent;
}
</style>
