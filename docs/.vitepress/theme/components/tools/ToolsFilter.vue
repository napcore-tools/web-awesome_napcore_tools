<template>
  <SearchFilter :placeholder="dynamicPlaceholder">
    <template #default="{ textFilter }">
      <ToolsGrid
        :category="effectiveCategory || undefined"
        :standard="effectiveStandard || undefined"
        :standards="props.standards"
        :selected-tools="props.selectedTools"
        :show-all="props.showAll"
        :endorsed-only="props.endorsedOnly"
        :text-filter="textFilter"
      />
    </template>
  </SearchFilter>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import SearchFilter from '../SearchFilter.vue';
import ToolsGrid from './ToolsGrid.vue';
import { CATEGORIES } from '@/core/metadata/categories';
import { data as standardsData } from '@/core/data-loaders/standards.data';

interface Props {
  category?: string;
  standard?: string;
  standards?: string[];
  selectedTools?: string[];
  showAll?: boolean;
  endorsedOnly?: boolean;
}

const props = defineProps<Props>();
const route = useRoute();

const CATEGORY_DISPLAY_OVERRIDES: Record<string, string> = {
  'napcore-provided': 'Tools by NAPCORE',
};

const autoDetectedCategory = computed(() => {
  const match = route.path.match(/\/categories\/([^/.]+)/);
  return match ? match[1] : null;
});

const autoDetectedStandard = computed(() => {
  const match = route.path.match(/\/standards\/([^/.]+)/);
  return match ? match[1] : null;
});

const effectiveCategory = computed(() => props.category || autoDetectedCategory.value);
const effectiveStandard = computed(() => props.standard || autoDetectedStandard.value);

const dynamicPlaceholder = computed(() => {
  if (effectiveStandard.value) {
    const standardName = standardsData[effectiveStandard.value]?.title || effectiveStandard.value;
    return `Search ${standardName} tools...`;
  }

  if (props.standards && props.standards.length > 0) {
    if (props.standards.length === 1) {
      const standardName = standardsData[props.standards[0]]?.title || props.standards[0];
      return `Search ${standardName} tools...`;
    }
    return 'Search selected standards...';
  }

  if (effectiveCategory.value) {
    const category = CATEGORIES.find((c) => c.slug === effectiveCategory.value);
    if (category) {
      return `Search ${category.title}...`;
    }
    const override = CATEGORY_DISPLAY_OVERRIDES[effectiveCategory.value];
    return `Search ${override ?? effectiveCategory.value}...`;
  }

  if (props.selectedTools && props.selectedTools.length > 0) {
    return 'Search selected tools...';
  }

  return 'Search All tools...';
});
</script>
