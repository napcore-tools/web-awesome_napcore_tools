// Dynamic sidebar configuration with tool counts
import toolsDataLoader from './tools.data'
import { CATEGORIES } from './categories'

// Load tools and calculate counts per category
function getCategoryCounts(): Record<string, number> {
  const tools = toolsDataLoader.load()
  const counts: Record<string, number> = {}

  // Initialize all counts to 0
  CATEGORIES.forEach(cat => {
    counts[cat.slug] = 0
  })

  // Count tools in each category
  tools.forEach(tool => {
    tool.categories.forEach((categorySlug: string) => {
      if (counts.hasOwnProperty(categorySlug)) {
        counts[categorySlug]++
      }
    })
  })

  return counts
}

// Generate category sidebar items with counts
function getCategoryItemsWithCounts() {
  const counts = getCategoryCounts()

  return CATEGORIES.map(cat => ({
    text: `${cat.title} (${counts[cat.slug]})`,
    link: `/categories/${cat.slug}`
  }))
}

// Sidebar for /tools/ section
export function getToolsSidebar() {
  return [
    {
      text: 'By Category',
      items: getCategoryItemsWithCounts()
    },
    {
      text: 'Featured Tools',
      items: [
        { text: 'DATEX II Browser', link: '/tools/datex-browser' },
        { text: 'DATEX II Schema Tool', link: '/tools/datex-schema-tool' },
        { text: 'mobilityDCAT-AP Generator', link: '/tools/mobilitydcat-generator' },
        { text: 'ALERT-C Locations Tester', link: '/tools/alert-c-tester' }
      ]
    }
  ]
}

// Sidebar for /categories/ section
export function getCategoriesSidebar() {
  return [
    {
      text: 'Tool Categories',
      items: [
        { text: 'Overview', link: '/categories/' },
        ...getCategoryItemsWithCounts()
      ]
    }
  ]
}
