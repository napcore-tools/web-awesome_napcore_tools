<script setup>
import { data as tools } from '../.vitepress/tools.data'
import { createSlug } from '../.vitepress/utils'

// Extract unique standards and count tools
const standardsMap = new Map()
for (const tool of tools) {
  if (tool.standards && tool.standards.length > 0) {
    for (const standard of tool.standards) {
      const count = standardsMap.get(standard) || 0
      standardsMap.set(standard, count + 1)
    }
  }
}

// Convert to sorted array with slugs
const standards = Array.from(standardsMap.entries())
  .map(([name, count]) => ({
    name,
    slug: createSlug(name),
    count
  }))
  .sort((a, b) => a.name.localeCompare(b.name))
</script>

# Tools by Standard

Browse tools organized by the European mobility data standards they support.

<div v-for="standard in standards" :key="standard.slug" style="margin: 0.75rem 0;">
  <a :href="`/standards/${standard.slug}`" style="font-size: 1.1rem; font-weight: 500;">
    {{ standard.name }}
  </a>
  <span style="color: var(--vp-c-text-2); margin-left: 0.5rem;">
    ({{ standard.count }} {{ standard.count === 1 ? 'tool' : 'tools' }})
  </span>
</div>
