<template>
  <table v-if="tool">
    <tbody>
      <tr v-if="tool.status && tool.status !== 'active'">
        <td><strong>Status</strong></td>
        <td>{{ statusEmoji }} {{ statusLabel }}</td>
      </tr>
      <tr v-if="tool.endorsed">
        <td><strong>Provenance</strong></td>
        <td class="endorsed-cell">
          <span class="endorsed-pill">By NAPCORE</span>
          <img src="/napcore-logo.png" alt="NAPCORE" class="endorsed-logo" />
        </td>
      </tr>
      <tr v-if="tool.license">
        <td><strong>License</strong></td>
        <td>{{ tool.license }}</td>
      </tr>
      <tr v-if="tool.website">
        <td><strong>Website</strong></td>
        <td>
          <a :href="tool.website" target="_blank">{{ getLinkText(tool.website) }}</a>
        </td>
      </tr>
      <tr v-if="tool.repository">
        <td><strong>Repository</strong></td>
        <td>
          <a :href="tool.repository" target="_blank">{{ getRepoText(tool.repository) }}</a>
        </td>
      </tr>

      <tr v-if="tool.documentation">
        <td><strong>Documentation</strong></td>
        <td>
          <a :href="tool.documentation" target="_blank">{{ getLinkText(tool.documentation) }}</a>
        </td>
      </tr>
      <tr v-if="tool.demo">
        <td><strong>Demo</strong></td>
        <td>
          <a :href="tool.demo" target="_blank">{{ getLinkText(tool.demo) }}</a>
        </td>
      </tr>
      <tr v-if="tool.developer">
        <td><strong>Developer</strong></td>
        <td>{{ tool.developer }}</td>
      </tr>
      <tr v-if="tool.maintainedBy">
        <td><strong>Maintained by</strong></td>
        <td>{{ tool.maintainedBy }}</td>
      </tr>
      <tr v-if="tool.mainContributor">
        <td><strong>Main Contributor</strong></td>
        <td>{{ tool.mainContributor }}</td>
      </tr>
      <tr v-if="tool.technology">
        <td><strong>Technology</strong></td>
        <td>{{ tool.technology }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { data as tools } from '../../../core/data-loaders/tools.data';

const { page } = useData();

const tool = computed(() => {
  const slug = page.value.relativePath.replace(/^tools\//, '').replace(/\.md$/, '');
  return tools.find((t) => t.slug === slug);
});

const statusEmoji = computed(() => {
  switch (tool.value?.status) {
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
  switch (tool.value?.status) {
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

// Extract clean domain and path from URL for display
const getLinkText = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname === '/' ? '' : urlObj.pathname;
    return urlObj.hostname.replace(/^www\./, '') + path;
  } catch {
    return url;
  }
};

// Get repository text based on URL
const getRepoText = (url: string): string => {
  if (url.includes('github.com')) {
    return 'GitHub Repository';
  } else if (url.includes('gitlab.com')) {
    return 'GitLab Repository';
  } else {
    return 'Source Code Repository';
  }
};
</script>

<style scoped>
img {
  margin: 0;
}

.endorsed-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.endorsed-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  background: rgba(0, 102, 204, 0.07);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(0, 102, 204, 0.15);
}

.endorsed-logo {
  height: 2.5em;
  width: auto;
  flex-shrink: 0;
}
</style>
