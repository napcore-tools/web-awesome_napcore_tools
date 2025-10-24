<template>
  <div>
    <!-- Debug info (enable by adding ?debug=true to URL) -->
    <div v-if="showDebug" style="background: #f0f0f0; padding: 1rem; margin-bottom: 1rem; font-size: 12px; border-left: 4px solid #0066cc;">
      <strong>🐛 Debug Info:</strong><br>
      Route path: {{ route.path }}<br>
      Current category: {{ currentCategory }}<br>
      Total tools loaded: {{ tools.length }}<br>
      Tools in this category: {{ categoryTools.length }}<br>
      All tools: {{ tools.map(t => t.slug).join(', ') }}<br>
      <small style="color: #666; margin-top: 0.5rem; display: block;">
        To disable: remove <code>?debug=true</code> from URL
      </small>
    </div>

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
import { computed, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { data as tools } from '../../tools.data'
import type { Tool } from '../../tools.data'
import ToolCard from './ToolCard.vue'

// Debug mode (enable by adding ?debug=true to URL)
const showDebug = computed(() => {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  return params.get('debug') === 'true'
})

// Debug logging
onMounted(() => {
  if (showDebug.value) {
    console.log('CategoryTools mounted')
    console.log('Tools loaded:', tools)
    console.log('Route path:', route.path)
    console.log('Current category:', currentCategory.value)
    console.log('Filtered tools:', categoryTools.value)
  }
})

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
  // Handle both with and without .html extension, with or without trailing slash
  const match = route.path.match(/\/categories\/([^/.]+)/)
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
  if (["Journey Planner", "Router", "Intermodal"].some(r => tool.tags.includes(r))) {
    return 'Journey Planner'
  }
  if (["Data Model", "Documentation"].some(r => tool.tags.includes(r))) {
    return 'Documentation'
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
