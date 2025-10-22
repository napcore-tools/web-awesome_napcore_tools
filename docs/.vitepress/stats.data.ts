// Data loader for stats - combines manual data from stats.yaml with dynamic calculations from tools
import fs from 'fs'
import path from 'path'
import { parse } from 'yaml'

// Import tools data loader to get tool metadata
import toolsDataLoader from './tools.data'

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

    // Define all possible categories (these are our fixed category slugs)
    const categoryDefinitions = [
      'validators',
      'converters',
      'versionTools',
      'sdks',
      'reference',
      'development',
      'dataQuality',
      'testing',
      'metadata',
      `route-planner`
    ]

    // Map of category slugs used in tool files to yaml property names
    const categorySlugMapping = {
      'validators': 'validators',
      'converters': 'converters',
      'version-tools': 'versionTools',
      'sdks': 'sdks',
      'reference': 'reference',
      'development': 'development',
      'data-quality': 'dataQuality',
      'testing': 'testing',
      'metadata': 'metadata',
      'route-planners': 'route-planner'
    }

    // Calculate category statistics dynamically
    const categoryStats: any = {
      total: categoryDefinitions.length,
      withTools: 0
    }

    // Initialize all category counts to 0
    categoryDefinitions.forEach(cat => {
      categoryStats[cat] = 0
    })

    // Count tools per category
    tools.forEach(tool => {
      tool.categories.forEach((catSlug: string) => {
        const yamlProperty = categorySlugMapping[catSlug]
        if (yamlProperty && categoryStats.hasOwnProperty(yamlProperty)) {
          categoryStats[yamlProperty]++
        }
      })
    })

    // Count how many categories have at least one tool
    categoryStats.withTools = categoryDefinitions.filter(cat => categoryStats[cat] > 0).length

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
