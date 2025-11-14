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
  related?: string[]; // Optional array of related category slugs
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
    related: ['data-quality', 'testing', 'converters', 'metadata', 'development'],
  },
  {
    slug: 'converters',
    title: 'Converters & Transformers',
    icon: '⇄',
    description: 'Format conversion and data transformation utilities',
    related: ['validators', 'version-tools', 'sdks', 'data-quality', 'development'],
  },
  {
    slug: 'version-tools',
    title: 'Version Upgrade Tools',
    icon: '⬆',
    description: 'Migration and compatibility utilities',
    related: ['converters', 'validators', 'references', 'data-quality', 'sdks'],
  },
  {
    slug: 'sdks',
    title: 'SDKs & Libraries',
    icon: '📦',
    description: 'Programming language bindings and libraries',
    related: ['development', 'validators', 'converters', 'reference-implementations', 'route-planners'],
  },
  {
    slug: 'reference-implementations',
    title: 'Reference Implementations',
    icon: '🎯',
    description: 'Working examples and demo applications',
    related: ['sdks', 'references', 'development', 'route-planners', 'testing'],
  },
  {
    slug: 'development',
    title: 'Development Tools',
    icon: '🛠',
    description: 'Browsers, editors, and generators',
    related: ['sdks', 'validators', 'testing', 'converters', 'reference-implementations'],
  },
  {
    slug: 'data-quality',
    title: 'Data Quality Tools',
    icon: '📊',
    description: 'Validation, enrichment, and cleaning',
    related: ['validators', 'metadata', 'testing', 'converters', 'version-tools'],
  },
  {
    slug: 'testing',
    title: 'Testing Utilities',
    icon: '🧪',
    description: 'Test data generation and validation',
    related: ['validators', 'data-quality', 'development', 'sdks', 'reference-implementations'],
  },
  {
    slug: 'metadata',
    title: 'Metadata Tools',
    icon: '🏷',
    description: 'Catalog generation and discovery',
    related: ['data-quality', 'validators', 'references', 'converters', 'development'],
  },
  {
    slug: 'route-planners',
    title: 'Route Planners',
    icon: '🗺️',
    description: 'Intermodal travel information system',
    related: ['sdks', 'reference-implementations', 'converters', 'validators', 'data-quality'],
  },
  {
    slug: 'references',
    title: 'Reference Documentations',
    icon: '📚',
    description:
      'Technical documentation, specifications, and implementation guides for mobility data standards and systems',
    related: ['reference-implementations', 'validators', 'version-tools', 'metadata', 'development'],
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
