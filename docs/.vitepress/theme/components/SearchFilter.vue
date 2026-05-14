<template>
  <div class="search-filter">
    <div class="filter-header">
      <div class="search-wrapper">
        <input
          ref="searchInput"
          v-model="searchText"
          type="text"
          class="search-input"
          :placeholder="placeholder"
          @input="updateSearch"
        />
        <button v-if="searchText" class="clear-button" @click="clearSearch">Clear</button>
      </div>
    </div>
    <slot :text-filter="searchText || undefined" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

interface Props {
  placeholder: string;
}

defineProps<Props>();

const searchText = ref<string>('');
const searchInput = ref<HTMLInputElement | null>(null);

function onDocumentMouseDown(e: MouseEvent) {
  const a = (e.target as Element).closest('a[href]');
  if (!a) return;
  try {
    const href = new URL(a.getAttribute('href')!, location.origin);
    if (href.pathname === location.pathname) {
      setTimeout(() => searchInput.value?.focus(), 50);
    }
  } catch {
    // invalid href — ignore
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) searchText.value = searchParam;
    document.addEventListener('mousedown', onDocumentMouseDown);
  }
  nextTick(() => searchInput.value?.focus());
});

onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentMouseDown);
});

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
.search-filter {
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
