<template>
  <div>
    <p v-if="categoryTools.length === 0" class="no-tools-message">
      No tools available in this category yet. <a href="/contribute">Contribute a tool →</a>
    </p>
    <div v-else class="feature-grid">
      <ToolCard
        v-for="tool in categoryTools"
        :key="tool.slug"
        :tool="tool"
        :subtitle="getSubtitle(tool)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'
import { data as tools } from '../../tools.data'
import type { Tool } from '../../tools.data'
import ToolCard from './ToolCard.vue'

interface Props {
  category?: string
}

const props = defineProps<Props>()
const route = useRoute()

// Auto-detect category from current route if not provided
const currentCategory = computed(() => {
  if (props.category) {
    return props.category
  }

  // Extract category from route path
  // e.g., /categories/development -> development
  const match = route.path.match(/\/categories\/([^/]+)/)
  if (match) {
    return match[1]
  }

  return null
})

const categoryTools = computed(() => {
  if (!currentCategory.value) {
    return []
  }

  return tools.filter((tool: Tool) =>
    tool.categories.includes(currentCategory.value!)
  )
})

// Generate a subtitle based on tool characteristics
function getSubtitle(tool: Tool): string {
  // Check for specific patterns to determine subtitle
  if (tool.tags.includes('Browser') || tool.tags.includes('Reference')) {
    return 'Reference Documentation Tool'
  }
  if (tool.tags.includes('Wizard') || tool.tags.includes('Generator')) {
    return tool.tags.includes('Profile') ? 'Profile Generation Wizard' : 'Metadata Generation Tool'
  }
  if (tool.tags.includes('Validator') || tool.categories.includes('validators')) {
    return 'Location Reference Validator'
  }
  if (tool.tags.includes('Converter')) {
    return 'Model Browser & Converter Foundation'
  }

  // Default: use first tag or category
  if (tool.tags.length > 0) {
    return `${tool.tags[0]} Tool`
  }
  return 'Development Tool'
}
</script>

<style scoped>
.no-tools-message {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
</style>
