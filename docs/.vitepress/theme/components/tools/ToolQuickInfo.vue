<template>
  <table v-if="frontmatter">
    <tbody>
      <tr v-if="frontmatter.status && frontmatter.status !== 'active'">
        <td><strong>Status</strong></td>
        <td>{{ statusEmoji }} {{ statusLabel }}</td>
      </tr>
      <tr v-if="frontmatter.endorsed">
        <td><strong>Provenance</strong></td>
        <td class="endorsed-cell">
          <span class="endorsed-pill">By NAPCORE</span>
          <img src="/napcore-logo.png" alt="NAPCORE" class="endorsed-logo" />
        </td>
      </tr>
      <tr v-if="frontmatter.license">
        <td><strong>License</strong></td>
        <td>{{ frontmatter.license }}</td>
      </tr>
      <tr v-if="frontmatter.website">
        <td><strong>Website</strong></td>
        <td>
          <a :href="frontmatter.website" target="_blank">{{ getLinkText(frontmatter.website) }}</a>
        </td>
      </tr>
      <tr v-if="frontmatter.repository">
        <td><strong>Repository</strong></td>
        <td>
          <a :href="frontmatter.repository" target="_blank">{{ getRepoText(frontmatter.repository) }}</a>
        </td>
      </tr>
      <tr v-if="frontmatter.documentation">
        <td><strong>Documentation</strong></td>
        <td>
          <a :href="frontmatter.documentation" target="_blank">{{ getLinkText(frontmatter.documentation) }}</a>
        </td>
      </tr>
      <tr v-if="frontmatter.demo">
        <td><strong>Demo</strong></td>
        <td>
          <a :href="frontmatter.demo" target="_blank">{{ getLinkText(frontmatter.demo) }}</a>
        </td>
      </tr>
      <tr v-if="frontmatter.developer">
        <td><strong>Developer</strong></td>
        <td>{{ frontmatter.developer }}</td>
      </tr>
      <tr v-if="frontmatter.maintainedBy">
        <td><strong>Maintained by</strong></td>
        <td>{{ frontmatter.maintainedBy }}</td>
      </tr>
      <tr v-if="frontmatter.mainContributor">
        <td><strong>Main Contributor</strong></td>
        <td>{{ frontmatter.mainContributor }}</td>
      </tr>
      <tr v-if="frontmatter.technology">
        <td><strong>Technology</strong></td>
        <td>{{ frontmatter.technology }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter } = useData();

const statusEmoji = computed(() => {
  switch (frontmatter.value.status) {
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
  switch (frontmatter.value.status) {
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
