<template>
  <div class="tools-grid">
    <HomePageToolCard v-for="tool in endorsedTools" :key="tool.slug" :tool="tool" :subtitle="getSubtitle(tool)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as tools } from '@/core/data-loaders/tools.data';
import type { Tool } from '@/core/data-loaders/tools.data';
import HomePageToolCard from './HomePageToolCard.vue';

const endorsedTools = computed(() => tools.filter((tool: Tool) => tool.endorsed === true));

function getSubtitle(tool: Tool): string {
  if (tool.tags?.includes('Browser') || tool.tags?.includes('Reference')) {
    return 'Reference Documentation Tool';
  }
  if (tool.tags?.includes('Wizard') || tool.tags?.includes('Generator')) {
    return tool.tags?.includes('Profile') ? 'Profile Generation Wizard' : 'Metadata Generation Tool';
  }
  if (tool.tags?.includes('Validator') || tool.categories.includes('validators')) {
    return 'Location Reference Validator';
  }
  if (tool.tags?.includes('Converter')) {
    return 'Model Browser & Converter Foundation';
  }
  if (['Journey Planner', 'Router', 'Intermodal'].some((r) => tool.tags?.includes(r))) {
    return 'Journey Planner';
  }
  if (['Data Model', 'Documentation'].some((r) => tool.tags?.includes(r))) {
    return 'Documentation';
  }
  if (tool.tags && tool.tags.length > 0) {
    return `${tool.tags[0]} Tool`;
  }
  return 'Development Tool';
}
</script>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
</style>
