<template>
  <div class="tool-card">
    <div class="tool-card-header">
      <div :class="['tool-status', tool.status]">{{ statusEmoji }} {{ statusLabel }}</div>
      <h3 class="tool-card-title">
        <a :href="`/tools/${tool.slug}`">{{ tool.title }}</a>
      </h3>
      <p v-if="subtitle" class="tool-card-subtitle">{{ subtitle }}</p>
    </div>
    <div class="tool-card-body">
      <p class="tool-card-description">
        {{ tool.description }}
      </p>
      <div v-if="tool.tags && tool.tags.length > 0" class="tool-tags">
        <span v-for="tag in tool.tags.slice(0, 4)" :key="tag" class="tool-tag">
          {{ tag }}
        </span>
      </div>
    </div>
    <div class="tool-links">
      <a v-if="tool.website" :href="tool.website" target="_blank" class="tool-link"> Website </a>
      <a v-if="tool.repository" :href="tool.repository" target="_blank" class="tool-link"> Repository </a>
      <a v-if="tool.documentation" :href="tool.documentation" target="_blank" class="tool-link"> Documentation </a>
      <a :href="`/tools/${tool.slug}`" class="tool-link">Details</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Tool } from '../../tools.data';

interface Props {
  tool: Tool;
  subtitle?: string;
}

const props = defineProps<Props>();

const statusEmoji = computed(() => {
  switch (props.tool.status) {
    case 'active':
      return '🟢';
    case 'maintenance':
      return '🟡';
    case 'deprecated':
      return '🔴';
    default:
      return '⚪';
  }
});

const statusLabel = computed(() => {
  switch (props.tool.status) {
    case 'active':
      return 'Active';
    case 'maintenance':
      return 'Maintenance';
    case 'deprecated':
      return 'Deprecated';
    default:
      return 'Unknown';
  }
});
</script>
