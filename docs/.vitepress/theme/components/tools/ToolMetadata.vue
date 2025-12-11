<template>
  <div v-if="frontmatter" class="tool-metadata">
    <p class="metadata-title"><strong>Tool Metadata</strong></p>
    <ul class="metadata-list">
      <li v-if="resolvedCategories.length > 0">
        <strong>Categories</strong>:
        <template v-for="(category, index) in resolvedCategories" :key="category.slug">
          <a :href="withBase(category.url)">{{ category.title }}</a>
          <span v-if="index < resolvedCategories.length - 1">, </span>
        </template>
      </li>
      <li v-if="resolvedStandards.length > 0">
        <strong>Standards</strong>:
        <template v-for="(standard, index) in resolvedStandards" :key="standard.slug">
          <a :href="withBase(standard.url)">{{ standard.title }}</a>
          <span v-if="index < resolvedStandards.length - 1">, </span>
        </template>
      </li>
      <li v-if="frontmatter.license"><strong>License</strong>: {{ frontmatter.license }}</li>
      <li v-if="maintenanceStatus"><strong>Maintenance</strong>: {{ maintenanceStatus }}</li>
      <li v-if="typeDisplay"><strong>Type</strong>: {{ typeDisplay }}</li>
      <li v-if="frontmatter.language"><strong>Language</strong>: {{ frontmatter.language }}</li>
      <li v-if="frontmatter.technology"><strong>Technology</strong>: {{ frontmatter.technology }}</li>
      <li v-if="frontmatter.tags && frontmatter.tags.length > 0">
        <strong>Tags</strong>: {{ frontmatter.tags.join(', ') }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * ToolMetadata Component
 *
 * Displays a formatted metadata box at the end of tool documentation pages.
 * Automatically reads and displays tool metadata from the page's frontmatter,
 * resolving category and standard slugs to their display names and creating links.
 *
 * ## What it displays:
 * - Categories (as clickable links to category pages)
 * - Standards (as clickable links to standard pages)
 * - License information
 * - Maintenance status (derived from lastUpdated field)
 * - Tool type(s) (can be single string or array)
 * - Programming language
 * - Technology stack
 * - Tags (comma-separated)
 *
 * ## Usage:
 * Place `<ToolMetadata />` at the end of your tool markdown file (typically after a separator).
 *
 * ## Example frontmatter:
 * ```yaml
 * ---
 * title: My Tool
 * categories:
 *   - validators
 *   - data-quality
 * standards:
 *   - datex-ii
 *   - netex
 * license: MIT
 * language: Python
 * type: CLI Tool
 * technology: Python, SQLite
 * tags:
 *   - Validator
 *   - Command-line
 * lastUpdated: 2025-10-22
 * ---
 * ```
 *
 * ## Example markdown usage:
 * ```markdown
 * ## Support
 * - Issues: [GitHub Issues](...)
 *
 * ---
 *
 * <ToolMetadata />
 * ```
 *
 * ## Features:
 * - **Conditional rendering**: Only shows fields that have values
 * - **Smart resolution**: Converts category/standard slugs to display titles
 * - **Automatic linking**: Categories and standards are clickable links
 * - **Date formatting**: Converts lastUpdated to human-readable maintenance status
 * - **Array support**: Handles type field as both string and array
 * - **Single source of truth**: All data comes from frontmatter
 */
import { computed } from 'vue';
import { useData } from 'vitepress';
import { getCategoryBySlug } from '@/core/metadata/categories';
import { data as standardsData } from '@/core/data-loaders/standards.data';
import { withBase } from 'vitepress';

const { frontmatter } = useData();

/**
 * Resolve category slugs to display titles and URLs.
 * Reads category slugs from frontmatter, looks up their metadata from categories.ts,
 * and constructs clickable links to category pages.
 *
 * @returns Array of objects with title, slug, and url for each category
 * @example
 * Input: categories: ['validators', 'data-quality']
 * Output: [
 *   { title: 'Validators', slug: 'validators', url: '/categories/validators' },
 *   { title: 'Data Quality Tools', slug: 'data-quality', url: '/categories/data-quality' }
 * ]
 */
const resolvedCategories = computed(() => {
  const categories = frontmatter.value.categories || [];
  return categories
    .map((slug: string) => {
      const category = getCategoryBySlug(slug);
      return category
        ? { title: category.title, slug, url: `/categories/${slug}` }
        : { title: slug, slug, url: `/categories/${slug}` };
    })
    .filter((item: { title: string; slug: string; url: string }) => item.title);
});

/**
 * Resolve standard slugs to display titles and URLs.
 * Reads standard slugs from frontmatter, looks up their metadata from standards.data.ts,
 * and constructs clickable links to standard pages.
 *
 * @returns Array of objects with title, slug, and url for each standard
 * @example
 * Input: standards: ['datex-ii', 'netex']
 * Output: [
 *   { title: 'DATEX II', slug: 'datex-ii', url: '/standards/datex-ii' },
 *   { title: 'NeTEx', slug: 'netex', url: '/standards/netex' }
 * ]
 */
const resolvedStandards = computed(() => {
  const standards = frontmatter.value.standards || [];
  return standards
    .map((slug: string) => {
      const standard = standardsData[slug];
      return standard
        ? { title: standard.title, slug, url: `/standards/${slug}` }
        : { title: slug, slug, url: `/standards/${slug}` };
    })
    .filter((item: { title: string; slug: string; url: string }) => item.title);
});

/**
 * Display type as comma-separated string if array.
 * Handles both single string and array values for the type field.
 *
 * @returns Formatted type string or null if not present
 * @example
 * Input: type: 'CLI Tool' → Output: 'CLI Tool'
 * Input: type: ['CLI Tool', 'Validator'] → Output: 'CLI Tool, Validator'
 */
const typeDisplay = computed(() => {
  const type = frontmatter.value.type;
  if (!type) return null;
  return Array.isArray(type) ? type.join(', ') : type;
});

/**
 * Derive maintenance status from lastUpdated field.
 * Converts ISO date string to human-readable format.
 *
 * @returns Formatted maintenance status string or null if not present
 * @example
 * Input: lastUpdated: '2025-10-22' → Output: 'Actively maintained (October 2025)'
 */
const maintenanceStatus = computed(() => {
  const lastUpdated = frontmatter.value.lastUpdated;
  if (!lastUpdated) return null;

  try {
    const date = new Date(lastUpdated);
    const monthYear = date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
    return `Actively maintained (${monthYear})`;
  } catch {
    return `Actively maintained (${lastUpdated})`;
  }
});
</script>

<style scoped>
.tool-metadata {
  background: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  border: 1px solid var(--vp-c-divider);
}

.metadata-title {
  margin: 0 0 0.75rem 0;
  color: var(--vp-c-text-1);
  font-size: 1rem;
}

.metadata-list {
  margin: 0;
  padding-left: 1.5rem;
  color: var(--vp-c-text-2);
}

.metadata-list li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.metadata-list strong {
  color: var(--vp-c-text-1);
}
</style>
