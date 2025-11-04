<script setup lang="ts">
import { data as stats } from '../../stats.data';
</script>

<template>
  <div class="tool-stats">
    <ul>
      <li><strong>Total Tools</strong>: {{ stats.tools.total }}</li>
      <li><strong>Active Tools</strong>: {{ stats.tools.active }}</li>
      <li><strong>Categories Covered</strong>: {{ stats.categories.withTools }} of {{ stats.categories.total }}</li>
      <li><strong>Standards Supported</strong>: {{ stats.standards.total }}</li>
    </ul>
  </div>
</template>

<style scoped>
.tool-stats {
  margin: 1.5rem 0;
}

.tool-stats ul {
  list-style: none;
  padding: 0;
}

.tool-stats li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tool-stats li:last-child {
  border-bottom: none;
}
</style>
