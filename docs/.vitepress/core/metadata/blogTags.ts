/**
 * BLOG TAGS MODULE - Client-safe blog tag metadata access
 *
 * This module is safe to import in both Node.js (build time) and browser (client) code.
 * The actual data is loaded from blogTags.yaml via the VitePress data loader (blogTags.data.ts).
 *
 * To add new blog tags:
 * 1. Edit docs/data/blogTags.yaml
 * 2. Add new entries with slug and title
 * 3. Tags will automatically be available throughout the site
 */

import { data as BLOG_TAGS } from '../data-loaders/blogTags.data';
import type { BlogTag } from '../data-loaders/blogTags.data';

// Re-export the BlogTag interface for convenience
export type { BlogTag };

/**
 * Get display title for a blog tag, with fallback to slug
 * @param tagSlug - The slugified tag name (e.g., 'technical')
 * @returns The display title (e.g., 'Technical'), or the slug if not found
 */
export function getBlogTagTitle(tagSlug: string): string {
  const blogTag = BLOG_TAGS[tagSlug];
  return blogTag?.title || tagSlug;
}

/**
 * Get blog tag by slug
 * @param tagSlug - The slugified tag name
 * @returns BlogTag object or undefined if not found
 */
export function getBlogTagBySlug(tagSlug: string): BlogTag | undefined {
  return BLOG_TAGS[tagSlug];
}

/**
 * Export the complete blog tags data for modules that need full details
 */
export { BLOG_TAGS };
