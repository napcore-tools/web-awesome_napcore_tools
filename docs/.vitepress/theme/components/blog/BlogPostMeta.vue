<template>
  <div class="blog-post-meta">
    <div class="meta-main">
      <div v-if="date" class="meta-item">
        <span class="meta-icon">📅</span>
        <time :datetime="date" class="meta-value">{{ formattedDate }}</time>
      </div>
      <div v-if="author" class="meta-item">
        <span class="meta-icon">✍️</span>
        <span class="meta-value">{{ author }}</span>
      </div>
    </div>
    <div v-if="tags && tags.length > 0" class="meta-tags">
      <span class="meta-icon">🏷️</span>
      <div class="tags-list">
        <a
          v-for="resolvedTag in resolvedTags"
          :key="resolvedTag.slug"
          :href="resolvedTag.url"
          :class="['tag', resolvedTag.type]"
        >
          {{ resolvedTag.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
import { resolveTags } from '../../utils/tagResolver';

const { frontmatter } = useData();

const date = computed(() => frontmatter.value.date);
const author = computed(() => frontmatter.value.author);
const tags = computed(() => frontmatter.value.tags);

const resolvedTags = computed(() => {
  if (!tags.value) return [];
  return resolveTags(tags.value);
});

const formattedDate = computed(() => {
  if (!date.value) return '';

  const dateObj = new Date(date.value);
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped>
.blog-post-meta {
  padding: 1.5rem;
  margin: 2rem 0;
  background-color: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
}

.meta-main {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.meta-main:last-child {
  margin-bottom: 0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  font-size: 1.125rem;
}

.meta-value {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

.meta-tags {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  flex: 1;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  background-color: var(--vp-c-default-soft);
  border-radius: 12px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.tag:hover {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

/* Tag type-specific styling will be added in blog.css */

@media (max-width: 640px) {
  .blog-post-meta {
    padding: 1rem;
  }

  .meta-main {
    flex-direction: column;
    gap: 0.75rem;
  }
}
</style>
