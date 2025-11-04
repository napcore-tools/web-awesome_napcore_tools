/**
 * SINGLE SOURCE OF TRUTH FOR CATEGORY DEFINITIONS
 *
 * All category metadata is defined here and imported by:
 * - CategoryGrid.vue (needs: slug, title, icon, description)
 * - sidebar.ts (needs: slug, title)
 * - stats.data.ts (needs: slug for counting)
 *
 * When adding a new category:
 * 1. Add it to the CATEGORIES array below
 * 2. That's it! It will automatically appear in all components/configs
 *
 * IMPORTANT: 'slug' is the ONLY canonical identifier for categories
 * - Used in tool front matter: categories: ['data-quality']
 * - Used in URLs: /categories/data-quality
 * - Used in stats calculations: stats.categories['data-quality']
 */

export interface Category {
  slug: string; // kebab-case slug - THE canonical identifier: 'data-quality'
  title: string; // Display name: 'Data Quality Tools'
  icon: string; // Emoji icon: '📊'
  description: string; // Short description for category cards
}

/**
 * Complete list of all categories in the catalog.
 * Order matters: this is the display order in CategoryGrid and sidebar.
 */
export const CATEGORIES: Category[] = [
  {
    slug: 'validators',
    title: 'Validators',
    icon: '✓',
    description: 'Schema validation and business rule checking tools',
  },
  {
    slug: 'converters',
    title: 'Converters & Transformers',
    icon: '⇄',
    description: 'Format conversion and data transformation utilities',
  },
  {
    slug: 'version-tools',
    title: 'Version Upgrade Tools',
    icon: '⬆',
    description: 'Migration and compatibility utilities',
  },
  {
    slug: 'sdks',
    title: 'SDKs & Libraries',
    icon: '📦',
    description: 'Programming language bindings and libraries',
  },
  {
    slug: 'reference-implementations',
    title: 'Reference Implementations',
    icon: '🎯',
    description: 'Working examples and demo applications',
  },
  {
    slug: 'development',
    title: 'Development Tools',
    icon: '🛠',
    description: 'Browsers, editors, and generators',
  },
  {
    slug: 'data-quality',
    title: 'Data Quality Tools',
    icon: '📊',
    description: 'Validation, enrichment, and cleaning',
  },
  {
    slug: 'testing',
    title: 'Testing Utilities',
    icon: '🧪',
    description: 'Test data generation and validation',
  },
  {
    slug: 'metadata',
    title: 'Metadata Tools',
    icon: '🏷',
    description: 'Catalog generation and discovery',
  },
  {
    slug: 'route-planners',
    title: 'Route Planners',
    icon: '🗺️',
    description: 'Intermodal travel information system',
  },
  {
    slug: 'references',
    title: 'References',
    icon: '📚',
    description:
      'Technical documentation, specifications, and implementation guides for mobility data standards and systems',
  },
];

/**
 * Utility: Get array of all category slugs
 * Used by stats.data.ts for initializing category stats
 *
 * Example output: ['validators', 'converters', 'version-tools', 'data-quality', ...]
 */
export function getCategorySlugs(): string[] {
  return CATEGORIES.map((cat) => cat.slug);
}

/**
 * Utility: Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug);
}
