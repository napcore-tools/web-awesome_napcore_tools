// Data loader for stats - combines manual data from stats.yaml with dynamic calculations from tools
import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'

// Import tools data loader to get tool metadata
import toolsDataLoader from './tools.data'
// Import centralized category definitions and utilities
import { getCategorySlugs } from './categories'

export default {
  // Watch both stats.yaml (for manual data) and tool files (for dynamic calculations)
  watch: ['../data/stats.yaml', '../tools/*.md'],
  load() {
    // Load manual data from stats.yaml (standards, community)
    const statsPath = path.resolve(__dirname, '../data/stats.yaml')
    const content = fs.readFileSync(statsPath, 'utf-8')
    const manualStats = parse(content)

    // Load tools data dynamically
    const tools = toolsDataLoader.load()

    // Calculate tool statistics dynamically
    const toolStats = {
      total: tools.length,
      active: tools.filter(t => t.status === 'active').length,
      maintenance: tools.filter(t => t.status === 'maintenance').length,
      deprecated: tools.filter(t => t.status === 'deprecated').length
    }

    // Get category slugs from centralized source
    const categorySlugs = getCategorySlugs()

    // Calculate category statistics dynamically
    // Using slug as the key (e.g., 'data-quality', 'validators')
    const categoryStats: any = {
      total: categorySlugs.length,
      withTools: 0
    }

    // Initialize all category counts to 0
    categorySlugs.forEach(slug => {
      categoryStats[slug] = 0
    })

    // Count tools per category
    tools.forEach(tool => {
      tool.categories.forEach((catSlug: string) => {
        if (categoryStats.hasOwnProperty(catSlug)) {
          categoryStats[catSlug]++
        }
      })
    })

    // Count how many categories have at least one tool
    categoryStats.withTools = categorySlugs.filter(slug => categoryStats[slug] > 0).length

    // Combine manual and dynamic data
    return {
      tools: toolStats,
      categories: categoryStats,
      standards: manualStats.standards,
      community: manualStats.community,
      lastUpdated: manualStats.lastUpdated
    }
  }
}
