<template>
  <div class="blog-tag-filter">
    <div class="filter-header">
      <h3 class="filter-title">Filter by Tag</h3>
      <button v-if="selectedTags.length > 0" class="clear-button" @click="clearFilters">Clear All</button>
    </div>
    <div class="tags-cloud">
      <button
        v-for="tag in availableTags"
        :key="tag.name"
        :class="['tag-button', { active: isTagSelected(tag.name) }]"
        @click="toggleTag(tag.name)"
      >
        {{ tag.name }}
        <span class="tag-count">{{ tag.count }}</span>
      </button>
    </div>
    <BlogGrid :selected-tags="selectedTags.length > 0 ? selectedTags : undefined" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { data as posts } from '../../../blog.data';
import BlogGrid from './BlogGrid.vue';

interface TagInfo {
  name: string;
  count: number;
}

const selectedTags = ref<string[]>([]);

// Compute all available tags with their counts
const availableTags = computed((): TagInfo[] => {
  const tagCounts = new Map<string, number>();

  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    }
  });

  // Convert to array and sort by count (descending), then by name
  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.name.localeCompare(b.name);
    });
});

function toggleTag(tag: string) {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
}

function isTagSelected(tag: string): boolean {
  return selectedTags.value.includes(tag);
}

function clearFilters() {
  selectedTags.value = [];
}
</script>

<style scoped>
.blog-tag-filter {
  margin: 2rem 0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.filter-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.clear-button {
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-button:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
}

.tag-button {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.tag-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tag-button.active {
  background-color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.tag-button.active:hover {
  background-color: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.tag-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: var(--vp-c-default-soft);
  border-radius: 10px;
}

.tag-button.active .tag-count {
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
}

@media (max-width: 640px) {
  .filter-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .tags-cloud {
    padding: 1rem;
    gap: 0.5rem;
  }

  .tag-button {
    padding: 0.375rem 0.75rem;
    font-size: 0.8125rem;
  }
}
</style>
