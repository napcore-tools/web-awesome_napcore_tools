<template>
  <div class="blog-card">
    <div class="blog-card-header">
      <h3 class="blog-card-title">
        <a :href="post.url">{{ post.title }}</a>
      </h3>
      <div class="blog-card-meta">
        <span class="blog-date">📅 {{ post.date.string }}</span>
        <span v-if="post.author" class="blog-author">✍️ {{ post.author }}</span>
      </div>
    </div>
    <div class="blog-card-body">
      <p class="blog-card-description">{{ post.description }}</p>
    </div>
    <div v-if="post.tags && post.tags.length > 0" class="blog-tags">
      <a
        v-for="resolvedTag in resolvedTags.slice(0, 5)"
        :key="resolvedTag.slug"
        :href="resolvedTag.url"
        :class="['blog-tag', resolvedTag.type]"
      >
        {{ resolvedTag.title }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { BlogPost } from '../../../core/data-loaders/blog.data';
import { resolveTags } from '../../../core/utils/tagResolver';

interface Props {
  post: BlogPost;
}

const props = defineProps<Props>();

const resolvedTags = computed(() => {
  if (!props.post.tags) return [];
  return resolveTags(props.post.tags);
});
</script>

<style scoped>
.blog-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.3s ease;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
}

.blog-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.blog-card-header {
  margin-bottom: 1rem;
}

.blog-card-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.blog-card-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.blog-card-title a:hover {
  color: var(--vp-c-brand-1);
}

.blog-card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.blog-date,
.blog-author {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.blog-card-body {
  flex: 1;
  margin-bottom: 1rem;
}

.blog-card-description {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.blog-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

/* Slightly different background for tags linking to actual pages */
.blog-tag.category,
.blog-tag.standard {
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

/* Hover states - general tags */
.blog-tag.blog-tag:hover {
  transform: translateY(-1px);
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

/* Hover states - category and standard tags (maintain accent) */
.blog-tag.category:hover,
.blog-tag.standard:hover {
  transform: translateY(-1px);
  background-color: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}
</style>
