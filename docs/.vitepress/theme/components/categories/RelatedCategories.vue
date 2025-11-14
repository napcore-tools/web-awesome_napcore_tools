<template>
  <div v-if="relatedCategories.length > 0">
    <ul>
      <li v-for="category in relatedCategories" :key="category.slug">
        <a :href="`./${category.slug}`">{{ category.title }}</a>
      </li>
    </ul>
  </div>
  <p v-else class="no-related">No related categories available.</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import { getCategoryBySlug } from '../../../core/metadata/categories';

const route = useRoute();

// Auto-detect current category from route
const currentCategorySlug = computed(() => {
  // Extract category from route path
  // e.g., /categories/validators -> validators
  const match = route.path.match(/\/categories\/([^/.]+)/);
  return match ? match[1] : null;
});

// Get related categories for the current category
const relatedCategories = computed(() => {
  if (!currentCategorySlug.value) {
    return [];
  }

  // Find the current category
  const currentCategory = getCategoryBySlug(currentCategorySlug.value);
  if (!currentCategory || !currentCategory.related || currentCategory.related.length === 0) {
    return [];
  }

  // Map related slugs to full category objects
  return currentCategory.related.map((slug) => getCategoryBySlug(slug)).filter((cat) => cat !== undefined);
});
</script>

<style scoped>
.no-related {
  color: var(--vp-c-text-2);
  font-style: italic;
}
</style>
