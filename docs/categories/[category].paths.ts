/**
 * VitePress dynamic route paths generator for category pages.
 *
 * Generates one route per category defined in docs/data/categories.yaml that has
 * no hand-crafted .md file in docs/categories/. Categories with a dedicated .md
 * (the 11 existing prose pages) take priority and are excluded here, exactly as
 * docs/tools/[slug].paths.ts skips tools that have a hand-crafted page.
 *
 * This is latent capability: today every category has a prose .md, so paths()
 * returns nothing. Adding a category to categories.yaml without writing a .md
 * activates the generated page automatically.
 *
 * Mirrors docs/standards/[standard].paths.ts.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import categoriesDataLoader from '../.vitepress/core/data-loaders/categories.data';
import type { CategoryData } from '../.vitepress/core/data-loaders/categories.data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Category enhanced with resolved related-category titles, passed to the
 * dynamic template via route params.
 */
export interface EnhancedCategory extends CategoryData {
  related_with_titles?: Array<{ slug: string; title: string }>;
}

export default {
  /**
   * Generates dynamic paths for category pages in VitePress.
   *
   * @returns Array of path objects with params for dynamic routing
   */
  paths() {
    const categories = categoriesDataLoader.load();
    // categoriesDir is the same directory as this file — used to discover hand-crafted .md files
    const categoriesDir = __dirname;

    // Collect slugs that already have a dedicated .md page; those categories are skipped below
    const existingSlugs = new Set(
      fs
        .readdirSync(categoriesDir)
        .filter((f) => f.endsWith('.md') && !f.startsWith('[') && f !== 'index.md')
        .map((f) => f.replace('.md', ''))
    );

    return (
      Object.entries(categories)
        // Hand-crafted pages take priority — skip categories that already have one
        .filter(([slug]) => !existingSlugs.has(slug))
        .map(([slug, category]) => {
          const title = category.title || slug;

          // Enhance related categories with titles
          let enhanced: EnhancedCategory = category;
          if (category.related && category.related.length > 0) {
            enhanced = {
              ...category,
              related_with_titles: category.related.map((relatedSlug) => ({
                slug: relatedSlug,
                title: categories[relatedSlug]?.title || relatedSlug,
              })),
            };
          }

          return {
            params: {
              category: slug, // VitePress route parameter — matches [category] in filename
              categoryName: title,
              title, // picked up by transformPageData in config.ts to set <title>
              icon: category.icon,
              description: category.description,
              details: enhanced,
            },
          };
        })
    );
  },
};
