<template>
  <a :href="withBase(`/tools/${tool.slug}`)" class="homepage-tool-card">
    <div class="homepage-tool-card-header">
      <h3 class="tool-card-title">{{ tool.title }}</h3>
      <p v-if="subtitle" class="tool-card-subtitle">{{ subtitle }}</p>
    </div>
    <div class="tool-card-body">
      <p class="tool-card-description">{{ tool.description }}</p>
      <div v-if="tool.tags?.length" class="tool-tags">
        <span v-for="tag in tool.tags.slice(0, 4)" :key="tag" class="tool-tag">{{ tag }}</span>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { Tool } from '@/core/data-loaders/tools.data';
import { withBase } from 'vitepress';

interface Props {
  tool: Tool;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped>
.homepage-tool-card {
  display: flex;
  flex-direction: column;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.homepage-tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
}

.homepage-tool-card-header {
  margin-bottom: 0.5rem;
}

.tool-card-title {
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

/* Reset VitePress/browser <p> margins inside the card */
.tool-card-subtitle {
  margin: 0 0 0.25rem;
}

.tool-card-description {
  margin: 0 0 0.75rem;
}
</style>
