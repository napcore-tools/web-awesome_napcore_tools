<script setup lang="ts">
import { data as stats } from '../../../core/data-loaders/stats.data';
</script>

<template>
  <div class="stats-grid">
    <div class="stat-item">
      <div class="stat-number">{{ stats.tools.total }}</div>
      <div class="stat-label">Available Tools</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.categories.total }}</div>
      <div class="stat-label">Categories</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">{{ stats.standards.total }}</div>
      <div class="stat-label">Standards Supported</div>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  text-align: center;
}

.stat-item {
  padding: 1.5rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}
</style>
