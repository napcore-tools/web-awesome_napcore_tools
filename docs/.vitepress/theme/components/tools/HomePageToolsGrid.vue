<template>
  <div class="tools-grid">
    <HomePageToolCard v-for="tool in endorsedTools" :key="tool.slug" :tool="tool" :subtitle="getSubtitle(tool)" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as tools } from '@/core/data-loaders/tools.data';
import type { Tool } from '@/core/data-loaders/tools.data';
import { getSubtitle } from '@/core/utils';
import HomePageToolCard from './HomePageToolCard.vue';

const endorsedTools = computed(() => tools.filter((tool: Tool) => tool.endorsed === true));
</script>

<style scoped>
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  gap: 1rem;
  margin: 1rem 0;
}
</style>
