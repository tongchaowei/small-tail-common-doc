<script setup lang="ts">
import {StGhostTextHover} from "st-common-ui-vue3"
</script>

<template>
  <div class="ghost-text-demo">
    <st-ghost-text-hover
      content="St Ghost Text Demo"
      horizontal-align="center"
      vertical-align="center"
    ></st-ghost-text-hover>
  </div>
</template>

<style scoped>
.ghost-text-demo {
  padding: 2rem 1rem;
  font-size: 3rem;
  font-weight: bold;
}
</style>
