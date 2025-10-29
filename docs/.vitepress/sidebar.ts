// Dynamic sidebar configuration with tool counts
import toolsDataLoader from './tools.data'
import { CATEGORIES } from './categories'
import { createSlug } from './utils'

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
      if (Object.hasOwn(counts, categorySlug)) {
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
    text: `${cat.title} <span class="sidebar-badge">${counts[cat.slug]}</span>`,
    link: `/categories/${cat.slug}`
  }))
}

// Load tools and calculate counts per standard
function getStandardCounts(): Record<string, number> {
  const tools = toolsDataLoader.load()
  const counts: Record<string, number> = {}

  // Count tools per standard
  tools.forEach(tool => {
    if (tool.standards && tool.standards.length > 0) {
      tool.standards.forEach((standard: string) => {
        if (!Object.hasOwn(counts, standard)) {
          counts[standard] = 0
        }
        counts[standard]++
      })
    }
  })

  return counts
}

// Generate standard sidebar items with counts
function getStandardItemsWithCounts() {
  const counts = getStandardCounts()

  // Sort standards alphabetically
  const sortedStandards = Object.keys(counts).sort((a, b) => a.localeCompare(b))

  return sortedStandards.map(standard => ({
    text: `${standard} <span class="sidebar-badge">${counts[standard]}</span>`,
    link: `/standards/${createSlug(standard)}`
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
      text: 'Tools',
      collapsed: false,
      items: [
        { text: 'By Categories', link: 'categories/' },
        { text: 'By Standards', link: 'standards/' },
        { text: 'Featured', link: 'categories/featured' },
      ]
    },
    {
      text: 'By Category',
      collapsed: false,
      items: [
          ...getCategoryItemsWithCounts()
      ]
    },
    {
      text: 'By Standard',
      collapsed: false,
      items: [
          ...getStandardItemsWithCounts()
      ]
    },
  ]
}
