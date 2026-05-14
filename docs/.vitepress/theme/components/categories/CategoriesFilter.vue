<template>
  <SearchFilter placeholder="Search categories...">
    <template #default="{ textFilter }">
      <CategoryGrid :sort-by-count="props.sortByCount" :text-filter="textFilter" />
    </template>
  </SearchFilter>
</template>

<script setup lang="ts">
import SearchFilter from '../SearchFilter.vue';
import CategoryGrid from './CategoryGrid.vue';

interface Props {
  sortByCount?: boolean;
}

const props = defineProps<Props>();
</script>
