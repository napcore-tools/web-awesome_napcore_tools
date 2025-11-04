<template>
  <table v-if="frontmatter">
    <tbody>
      <tr v-if="frontmatter.status">
        <td><strong>Status</strong></td>
        <td>{{ statusEmoji }} {{ statusLabel }}</td>
      </tr>
      <tr v-if="frontmatter.license">
        <td><strong>License</strong></td>
        <td>{{ frontmatter.license }}</td>
      </tr>
      <tr v-if="frontmatter.liveDemo">
        <td><strong>Link</strong></td>
        <td>
          <a :href="frontmatter.liveDemo" target="_blank">{{ getLinkText(frontmatter.liveDemo) }}</a>
        </td>
      </tr>
      <tr v-if="frontmatter.sourceCode">
        <td><strong>Source Code</strong></td>
        <td>
          <a :href="frontmatter.sourceCode" target="_blank">{{ getRepoText(frontmatter.sourceCode) }}</a>
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
