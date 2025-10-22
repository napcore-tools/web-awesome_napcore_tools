<template>
  <div class="category-grid">
    <a
      v-for="category in categories"
      :key="category.slug"
      :href="`/categories/${category.slug}`"
      class="category-card"
    >
      <span class="category-badge">{{ category.count }}</span>
      <span class="category-icon">{{ category.icon }}</span>
      <h3 class="category-title">{{ category.title }}</h3>
      <p class="category-description">{{ category.description }}</p>
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as tools } from '../../tools.data'

// Category definitions
const categoryDefinitions = [
  {
    slug: 'validators',
    title: 'Validators',
    icon: '✓',
    description: 'Schema validation and business rule checking tools'
  },
  {
    slug: 'converters',
    title: 'Converters & Transformers',
    icon: '⇄',
    description: 'Format conversion and data transformation utilities'
  },
  {
    slug: 'version-tools',
    title: 'Version Upgrade Tools',
    icon: '⬆',
    description: 'Migration and compatibility utilities'
  },
  {
    slug: 'sdks',
    title: 'SDKs & Libraries',
    icon: '📦',
    description: 'Programming language bindings and libraries'
  },
  {
    slug: 'reference',
    title: 'Reference Implementations',
    icon: '🎯',
    description: 'Working examples and demo applications'
  },
  {
    slug: 'development',
    title: 'Development Tools',
    icon: '🛠',
    description: 'Browsers, editors, and generators'
  },
  {
    slug: 'data-quality',
    title: 'Data Quality Tools',
    icon: '📊',
    description: 'Validation, enrichment, and cleaning'
  },
  {
    slug: 'testing',
    title: 'Testing Utilities',
    icon: '🧪',
    description: 'Test data generation and validation'
  },
  {
    slug: 'metadata',
    title: 'Metadata Tools',
    icon: '🏷',
    description: 'Catalog generation and discovery'
  }
]

interface Props {
  sortByCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sortByCount: false
})

// Calculate tool counts per category
const categories = computed(() => {
  const categoriesWithCounts = categoryDefinitions.map(cat => {
    const count = tools.filter(tool =>
      tool.categories.includes(cat.slug)
    ).length

    return {
      ...cat,
      count
    }
  })

  // Sort by count if requested (descending order, with ties preserving original order)
  if (props.sortByCount) {
    return [...categoriesWithCounts].sort((a, b) => b.count - a.count)
  }

  return categoriesWithCounts
})
</script>
