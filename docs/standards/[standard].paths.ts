// Dynamic path generator for standard pages
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import toolsDataLoader from '../.vitepress/core/data-loaders/tools.data';
import standardsDataLoader from '../.vitepress/core/data-loaders/standards.data';
import type { Standard } from '../.vitepress/core/data-loaders/standards.data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Enhanced standard with computed related standards titles
 * Used in dynamic routes to pass resolved standard references
 */
export interface EnhancedStandard extends Standard {
  related_standards_with_titles?: Array<{ slug: string; title: string }>;
}

export default {
  /**
   * Generates dynamic paths for standard pages in VitePress.
   * Creates routes for each standard with metadata including title and related standards.
   *
   * @returns Array of path objects with params for dynamic routing
   */
  paths() {
    // Collect all unique standards (already slugified in tool frontmatter)
    const standardSlugsSet = new Set<string>();
    const tools = toolsDataLoader.load();

    for (const tool of tools) {
      if (tool.standards && tool.standards.length > 0) {
        for (const standardSlug of tool.standards) {
          standardSlugsSet.add(standardSlug);
        }
      }
    }

    // Load standards data
    const standards = standardsDataLoader.load();

    // Collect slugs that already have a dedicated .md page; those standards are skipped
    // below so an optional hand-crafted prose overlay won't collide with the generated
    // route (same precedence as docs/tools/[slug] and docs/categories/[category]).
    const existingSlugs = new Set(
      fs
        .readdirSync(__dirname)
        .filter((f) => f.endsWith('.md') && !f.startsWith('[') && f !== 'index.md')
        .map((f) => f.replace('.md', ''))
    );

    // Create paths for each standard with title and details
    return Object.keys(standards)
      .filter((slug) => !existingSlugs.has(slug))
      .map((slug) => {
        const standard = standards[slug];
        const title = standard?.title || slug; // Fallback to slug if not found

        // Enhance related standards with titles
        let enhancedDetails: EnhancedStandard | undefined = standard;
        if (standard && standard.related_standards) {
          enhancedDetails = {
            ...standard,
            related_standards_with_titles: standard.related_standards.map((relatedSlug) => {
              const relatedStandard = standards[relatedSlug];
              return {
                slug: relatedSlug,
                title: relatedStandard?.title || relatedSlug,
              };
            }),
          };
        }

        return {
          params: {
            standard: slug,
            standardName: title,
            title: `Tools supporting ${title}`, // For transformPageData hook
            details: enhancedDetails || null, // Pass details or null if not found
          },
        };
      });
  },
};
