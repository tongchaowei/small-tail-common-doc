<script setup lang="ts">
import {StGhostText} from "st-common-ui-vue3"
</script>

<template>
  <div class="ghost-text-demo">
    <st-ghost-text
      content="St Ghost Text Demo"
      horizontal-align="center"
      vertical-align="center"
    ></st-ghost-text>
  </div>
</template>

<style scoped>
.ghost-text-demo {
  padding: 2rem 1rem;
  font-size: 3rem;
  font-weight: bold;
}
</style>
