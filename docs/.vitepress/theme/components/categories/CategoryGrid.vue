<template>
  <div class="category-grid">
    <a v-for="category in categories" :key="category.slug" :href="`/categories/${category.slug}`" class="category-card">
      <span class="category-badge">{{ category.count }}</span>
      <span class="category-icon">{{ category.icon }}</span>
      <h3 class="category-title">{{ category.title }}</h3>
      <p class="category-description">{{ category.description }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { data as tools } from '../../../core/data-loaders/tools.data';
import { CATEGORIES } from '../../../core/metadata/categories';

interface Props {
  sortByCount?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  sortByCount: false,
});

// Calculate tool counts per category
const categories = computed(() => {
  const categoriesWithCounts = CATEGORIES.map((cat) => {
    const count = tools.filter((tool) => tool.categories.includes(cat.slug)).length;

    return {
      ...cat,
      count,
    };
  });

  // Sort by count if requested (descending order, with ties preserving original order)
  if (props.sortByCount) {
    return [...categoriesWithCounts].sort((a, b) => b.count - a.count);
  }

  return categoriesWithCounts;
});
</script>
