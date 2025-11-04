// Data loader for stats - all calculations are now fully dynamic from tools data
import toolsDataLoader from './tools.data'
import { getCategorySlugs } from './categories'

export default {
  // Watch tool files for dynamic calculations
  watch: ['../tools/*.md', '../data/standards.yaml'],
  load() {
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
    const categoryStats: Record<string, number> = {
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
        if (Object.hasOwn(categoryStats, catSlug)) {
          categoryStats[catSlug]++
        }
      })
    })

    // Count how many categories have at least one tool
    categoryStats.withTools = categorySlugs.filter(slug => categoryStats[slug] > 0).length

    // Calculate standards statistics - count unique standards used by tools
    const uniqueStandards = new Set<string>()
    tools.forEach(tool => {
      if (tool.standards && tool.standards.length > 0) {
        tool.standards.forEach((std: string) => uniqueStandards.add(std))
      }
    })

    const standardsStats = {
      total: uniqueStandards.size
    }

    // Return combined statistics (all calculated dynamically)
    return {
      tools: toolStats,
      categories: categoryStats,
      standards: standardsStats
    }
  }
}
