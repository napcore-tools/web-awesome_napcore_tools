/**
 * Tag Resolver Utility
 *
 * Resolves blog tags to their display titles, types, and URLs.
 * Resolution order:
 * 1. Check if tag matches a category slug
 * 2. Check if tag matches a standard slug
 * 3. Check if tag exists in blog tags mapping
 * 4. Fallback: use tag as-is
 */

import { getCategoryBySlug } from '../metadata/categories';
import { STANDARDS } from '../metadata/standards';
import { getBlogTagTitle } from '../metadata/blogTags';

export type TagType = 'category' | 'standard' | 'blog-tag';

export interface ResolvedTag {
  slug: string; // Original tag slug from frontmatter
  title: string; // Display title
  type: TagType; // Type of tag
  url: string; // URL to link to
}

/**
 * Resolve a tag slug to its display information
 * @param tagSlug - The tag slug from blog post frontmatter
 * @returns ResolvedTag with title, type, and URL
 */
export function resolveTag(tagSlug: string): ResolvedTag {
  // 1. Check if tag matches a category
  const category = getCategoryBySlug(tagSlug);
  if (category) {
    return {
      slug: tagSlug,
      title: category.title,
      type: 'category',
      url: `/categories/${tagSlug}`,
    };
  }

  // 2. Check if tag matches a standard
  const standard = STANDARDS[tagSlug];
  if (standard) {
    return {
      slug: tagSlug,
      title: standard.title,
      type: 'standard',
      url: `/standards/${tagSlug}`,
    };
  }

  // 3. Check blog tags mapping or use as-is
  const title = getBlogTagTitle(tagSlug);
  return {
    slug: tagSlug,
    title,
    type: 'blog-tag',
    url: `/blog?tag=${encodeURIComponent(tagSlug)}`,
  };
}

/**
 * Resolve multiple tags at once
 * @param tagSlugs - Array of tag slugs
 * @returns Array of ResolvedTag objects
 */
export function resolveTags(tagSlugs: string[]): ResolvedTag[] {
  return tagSlugs.map(resolveTag);
}
