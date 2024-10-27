<script setup lang="ts">
import menuOptions from "@/pages/index/components/menu/menu-options.ts"
</script>

<template>
  <div class="menu h-screen box-bg">
    <n-menu
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </div>
</template>

<style scoped>

</style>
