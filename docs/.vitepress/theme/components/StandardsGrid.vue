<template>
  <div class="category-grid">
    <a
      v-for="standard in standards"
      :key="standard.slug"
      :href="`/standards/${standard.slug}`"
      class="category-card standard-card"
    >
      <span class="category-badge">{{ standard.count }}</span>
      <span class="category-icon">{{ standard.icon }}</span>
      <h3 class="category-title">{{ standard.name }}</h3>
      <p v-if="standard.description" class="category-description">{{ standard.description }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as tools } from '../../tools.data'
import { createSlug } from '../../utils'
import { getStandardMetadata } from '../../standards'

interface Props {
  sortByCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sortByCount: false
})

// Extract unique standards and count tools
const standards = computed(() => {
  const standardsMap = new Map<string, number>()

  // Count tools per standard
  for (const tool of tools) {
    if (tool.standards && tool.standards.length > 0) {
      for (const standard of tool.standards) {
        const count = standardsMap.get(standard) || 0
        standardsMap.set(standard, count + 1)
      }
    }
  }

  // Convert to array with slugs and metadata
  const standardsList = Array.from(standardsMap.entries()).map(([name, count]) => {
    const metadata = getStandardMetadata(name)
    return {
      name,
      slug: createSlug(name),
      count,
      icon: metadata.icon,
      description: metadata.description
    }
  })

  // Sort by count if requested (descending order), otherwise alphabetically
  if (props.sortByCount) {
    return standardsList.sort((a, b) => b.count - a.count)
  }

  return standardsList.sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<style scoped>
/* StandardsGrid uses the same card styling as CategoryGrid, with a subtle color accent */

.standard-card::before {
  /* Use green accent for standards (vs blue for categories) */
  /* background: linear-gradient(90deg, var(--napcore-green), var(--vp-c-brand-1)) !important; */
}

.standard-card .category-badge {
  /* Green-tinted badge for standards */
  /* background: var(--vp-c-green-soft);
  color: var(--napcore-green);
  font-weight: 700; */
}

.standard-card:hover {
  /* Subtle green-tinted shadow on hover */
  /* box-shadow: 0 8px 24px rgba(0, 166, 81, 0.12); */
}
</style>
