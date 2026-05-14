<template>
  <SearchFilter placeholder="Search standards...">
    <template #default="{ textFilter }">
      <StandardsGrid :sort-by-count="props.sortByCount" :text-filter="textFilter" />
    </template>
  </SearchFilter>
</template>

<script setup lang="ts">
import SearchFilter from '../SearchFilter.vue';
import StandardsGrid from './StandardsGrid.vue';

interface Props {
  sortByCount?: boolean;
}

const props = defineProps<Props>();
</script>
