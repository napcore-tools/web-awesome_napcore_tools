<template>
  <div>
    <p v-if="displayedPosts.length === 0" class="no-posts-message">
      No blog posts available yet. Check back soon for updates!
    </p>
    <div v-else class="blog-grid">
      <BlogCard v-for="post in displayedPosts" :key="post.url" :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as posts } from '../../../core/data-loaders/blog.data';
import type { BlogPost } from '../../../core/data-loaders/blog.data';
import BlogCard from './BlogCard.vue';

interface Props {
  selectedTags?: string[];
  limit?: number;
}

const props = defineProps<Props>();

// Filter posts by selected tags if provided
const filteredPosts = computed((): BlogPost[] => {
  if (!props.selectedTags || props.selectedTags.length === 0) {
    return posts;
  }

  return posts.filter((post) => {
    if (!post.tags || post.tags.length === 0) {
      return false;
    }
    // Post must have at least one of the selected tags
    return post.tags.some((tag) => props.selectedTags?.includes(tag));
  });
});

// Apply limit if provided
const displayedPosts = computed((): BlogPost[] => {
  if (props.limit && props.limit > 0) {
    return filteredPosts.value.slice(0, props.limit);
  }
  return filteredPosts.value;
});
</script>

<style scoped>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.no-posts-message {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
