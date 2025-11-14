<template>
  <div class="tools-filter">
    <div class="filter-header">
      <div class="search-wrapper">
        <input
          v-model="searchText"
          type="text"
          class="search-input"
          :placeholder="dynamicPlaceholder"
          @input="updateSearch"
        />
        <button v-if="searchText" class="clear-button" @click="clearSearch">Clear</button>
      </div>
    </div>
    <ToolsGrid
      :category="effectiveCategory || undefined"
      :standard="effectiveStandard || undefined"
      :standards="props.standards"
      :selected-tools="props.selectedTools"
      :show-all="props.showAll"
      :text-filter="searchText || undefined"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vitepress';
import ToolsGrid from './ToolsGrid.vue';
import { CATEGORIES } from '../../../core/metadata/categories';
import { data as standardsData } from '../../../core/data-loaders/standards.data';

interface Props {
  category?: string;
  standard?: string;
  standards?: string[];
  selectedTools?: string[];
  showAll?: boolean;
}

const props = defineProps<Props>();
const route = useRoute();
const searchText = ref<string>('');

// Auto-detect category from route path (e.g., /categories/validators -> validators)
const autoDetectedCategory = computed(() => {
  const match = route.path.match(/\/categories\/([^/.]+)/);
  return match ? match[1] : null;
});

// Auto-detect standard from route path (e.g., /standards/datex-ii -> datex-ii)
const autoDetectedStandard = computed(() => {
  const match = route.path.match(/\/standards\/([^/.]+)/);
  return match ? match[1] : null;
});

// Use provided category or fall back to auto-detected
const effectiveCategory = computed(() => props.category || autoDetectedCategory.value);

// Use provided standard or fall back to auto-detected
const effectiveStandard = computed(() => props.standard || autoDetectedStandard.value);

// Generate dynamic placeholder based on filter context
const dynamicPlaceholder = computed(() => {
  // If filtering by standards
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

  // If filtering by category
  if (effectiveCategory.value) {
    const category = CATEGORIES.find((c) => c.slug === effectiveCategory.value);
    if (category) {
      return `Search ${category.title}...`;
    }
    return `Search ${effectiveCategory.value}...`;
  }

  // If filtering by selected tools
  if (props.selectedTools && props.selectedTools.length > 0) {
    return 'Search selected tools...';
  }

  // Default: all tools or no specific filter
  return 'Search all tools...';
});

// Initialize search from URL query parameter on mount
onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      searchText.value = searchParam;
    }
  }
});

// Update URL query parameter when search changes (real-time)
function updateSearch() {
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    if (searchText.value) {
      url.searchParams.set('search', searchText.value);
    } else {
      url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url.toString());
  }
}

// Clear search and remove query parameter
function clearSearch() {
  searchText.value = '';
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    window.history.replaceState({}, '', url.toString());
  }
}
</script>

<style scoped>
.tools-filter {
  margin: 2rem 0;
}

.filter-header {
  margin-bottom: 2rem;
}

.search-wrapper {
  position: relative;
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-button {
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.clear-button:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-brand-soft);
}

@media (max-width: 640px) {
  .search-wrapper {
    flex-direction: column;
    max-width: 100%;
  }

  .search-input {
    width: 100%;
  }

  .clear-button {
    width: 100%;
  }
}
</style>
