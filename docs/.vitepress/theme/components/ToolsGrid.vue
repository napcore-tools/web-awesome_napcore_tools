<template>
  <div>
    <!-- Debug info (enable by adding ?debug=true to URL) -->
    <div v-if="showDebug" style="background: #f0f0f0; padding: 1rem; margin-bottom: 1rem; font-size: 12px; border-left: 4px solid #0066cc;">
      <strong>🐛 Debug Info:</strong><br>
      Route path: {{ route.path }}<br>
      Current category: {{ currentCategory }}<br>
      Active standards: {{ activeStandards.length > 0 ? activeStandards.join(', ') : 'none' }}<br>
      Total tools loaded: {{ tools.length }}<br>
      Filtered tools: {{ categoryTools.length }}<br>
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
import { createSlug } from '../../utils'
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
    console.log('ToolsGrid mounted')
    console.log('Tools loaded:', tools)
    console.log('Route path:', route.path)
    console.log('Current category:', currentCategory.value)
    console.log('Active standards:', activeStandards.value)
    console.log('Filtered tools:', categoryTools.value)
  }
})

interface Props {
  category?: string
  standard?: string
  standards?: string[]
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

// Auto-detect standard from current route if not provided
const currentStandard = computed(() => {
  // Check if standard is provided via prop (single or array)
  if (props.standard) {
    return [props.standard]
  }
  if (props.standards && props.standards.length > 0) {
    return props.standards
  }

  // Extract standard slug from route path
  // e.g., /standards/datex-ii -> datex-ii
  const match = route.path.match(/\/standards\/([^/.]+)/)
  if (match) {
    const slug = match[1]

    // Find the actual standard name from tools by matching the slug
    for (const tool of tools) {
      if (tool.standards && tool.standards.length > 0) {
        for (const standard of tool.standards) {
          if (createSlug(standard) === slug) {
            return [standard]
          }
        }
      }
    }
  }

  return []
})

// Detect standards from route, props, or URL query parameters
const activeStandards = computed(() => {
  const standardsList: string[] = []

  // 1. Check for standard detected from route path or props
  if (currentStandard.value.length > 0) {
    standardsList.push(...currentStandard.value)
  }

  // 2. Check URL query parameters (supports repeated ?standard=X&standard=Y)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const queryStandards = params.getAll('standard')
    if (queryStandards.length > 0) {
      standardsList.push(...queryStandards)
    }
  }

  // Return unique standards
  return [...new Set(standardsList)]
})

const categoryTools = computed(() => {
  return tools.filter((tool: Tool) => {
    let matches = true

    // Filter by category if detected
    if (currentCategory.value) {
      matches = matches && tool.categories.includes(currentCategory.value)
    }

    // Filter by standards if detected
    if (activeStandards.value.length > 0) {
      // Tool must have at least one of the specified standards (OR logic)
      const hasStandards = tool.standards && tool.standards.length > 0
      const matchesStandards = hasStandards &&
        tool.standards.some(standard => activeStandards.value.includes(standard))

      matches = matches && matchesStandards
    }

    return matches
  })
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
