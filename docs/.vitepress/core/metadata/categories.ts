/**
 * CATEGORIES MODULE - Client-safe category metadata access
 *
 * This module is safe to import in both Node.js (build time) and browser (client) code.
 * The actual data is loaded from categories.yaml via the VitePress data loader
 * (categories.data.ts). This module just exposes the stable public API consumers expect.
 *
 * Consumers (unchanged):
 * - CategoryGrid.vue (needs: slug, title, icon, description)
 * - sidebar.ts (needs: slug, title)
 * - stats.data.ts (needs: slug for counting)
 *
 * When adding a new category:
 * 1. Add an entry to docs/data/categories.yaml (keyed by slug)
 * 2. That's it! It will automatically appear in all components/configs. A page is
 *    generated for it unless a hand-crafted docs/categories/<slug>.md exists.
 *
 * IMPORTANT: 'slug' is the ONLY canonical identifier for categories
 * - Used in tool front matter: categories: ['data-quality']
 * - Used in URLs: /categories/data-quality
 * - Used in stats calculations: stats.categories['data-quality']
 */

import { data } from '../data-loaders/categories.data';
import type { CategoryData } from '../data-loaders/categories.data';

/**
 * A category with its slug attached (the YAML keys the entries by slug).
 */
export interface Category extends CategoryData {
  slug: string; // kebab-case slug - THE canonical identifier: 'data-quality'
}

/**
 * Complete list of all categories in the catalog.
 * Order matters: this is the display order in CategoryGrid and sidebar.
 * Built from categories.yaml via Object.entries(), which preserves YAML key order.
 */
export const CATEGORIES: Category[] = Object.entries(data).map(([slug, category]) => ({
  slug,
  ...category,
}));

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
