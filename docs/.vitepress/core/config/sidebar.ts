// Dynamic sidebar configuration with tool counts
import toolsDataLoader from '../data-loaders/tools.data';
import standardsDataLoader from '../data-loaders/standards.data';
import { CATEGORIES } from '../metadata/categories';

/**
 * Calculates the number of tools in each category.
 * Loads all tools and counts how many belong to each category slug.
 *
 * @returns Record mapping category slugs to tool counts
 */
function getCategoryCounts(): Record<string, number> {
  const tools = toolsDataLoader.load();
  const counts: Record<string, number> = {};

  // Initialize all counts to 0
  CATEGORIES.forEach((cat) => {
    counts[cat.slug] = 0;
  });

  // Count tools in each category
  tools.forEach((tool) => {
    tool.categories.forEach((categorySlug: string) => {
      if (Object.hasOwn(counts, categorySlug)) {
        counts[categorySlug]++;
      }
    });
  });

  return counts;
}

/**
 * Generates category sidebar items with tool count badges.
 * Creates sidebar navigation items for each category, displaying title and count.
 *
 * @returns Array of sidebar items with category titles, links, and count badges
 */
function getCategoryItemsWithCounts() {
  const counts = getCategoryCounts();

  return CATEGORIES.map((cat) => ({
    text: `${cat.title} <span class="sidebar-badge">${counts[cat.slug]}</span>`,
    link: `/categories/${cat.slug}`,
  }));
}

/**
 * Calculates the number of tools implementing each standard.
 * Loads all tools and counts how many reference each standard slug.
 *
 * @returns Record mapping standard slugs to tool counts
 */
function getStandardCounts(): Record<string, number> {
  const tools = toolsDataLoader.load();
  const counts: Record<string, number> = {};

  // Count tools per standard
  tools.forEach((tool) => {
    if (tool.standards && tool.standards.length > 0) {
      tool.standards.forEach((standard: string) => {
        if (!Object.hasOwn(counts, standard)) {
          counts[standard] = 0;
        }
        counts[standard]++;
      });
    }
  });

  return counts;
}

/**
 * Generates standard sidebar items with tool count badges.
 * Creates sidebar navigation items for each standard, sorted alphabetically by title.
 *
 * @returns Array of sidebar items with standard titles, links, and count badges (sorted A-Z)
 */
function getStandardItemsWithCounts() {
  const counts = getStandardCounts();
  const standards = standardsDataLoader.load();

  // Convert to array with metadata for sorting by title
  const standardsWithMetadata = Object.keys(standards).map((slug) => {
    const standard = standards[slug];
    return {
      slug,
      title: standard?.title || slug, // Fallback to slug if not found
      count: counts[slug] || 0,
      endorsed: standard?.endorsed ? '🏆' : '',
    };
  });

  // Sort standards: endorsed first, then alphabetically by title
  standardsWithMetadata.sort((a, b) => {
    // First, sort by endorsed status (endorsed items first)
    if (a.endorsed && !b.endorsed) return -1;
    if (!a.endorsed && b.endorsed) return 1;

    // If both have same endorsed status, sort alphabetically by title
    return a.title.localeCompare(b.title);
  });

  return standardsWithMetadata.map(({ slug, title, count, endorsed }) => ({
    text: `${endorsed} ${title} <span class="sidebar-badge">${count}</span>`,
    link: `/standards/${slug}`,
  }));
}

/**
 * Generates sidebar configuration for the /tools/ section.
 * Includes category navigation with counts and featured tools list.
 *
 * @returns Sidebar configuration array for tools pages
 */
export function getToolsSidebar() {
  return [
    {
      text: 'By Category',
      items: getCategoryItemsWithCounts(),
    },
    {
      text: 'NAPCORE Endorsed',
      items: [
        { text: 'DATEX II Browser', link: '/tools/datex-browser' },
        { text: 'DATEX II Schema Tool', link: '/tools/datex-schema-tool' },
        { text: 'mobilityDCAT-AP Generator', link: '/tools/mobilitydcat-generator' },
        { text: 'ALERT-C Locations Tester', link: '/tools/alert-c-tester' },
      ],
    },
  ];
}

/**
 * Generates sidebar configuration for the /categories/ section.
 * Includes navigation by category and standard, both with tool counts.
 *
 * @returns Sidebar configuration array for category and standard pages
 */
export function getCategoriesSidebar() {
  return [
    {
      text: 'Tools',
      collapsed: false,
      items: [
        { text: 'By Categories', link: 'categories/' },
        { text: 'By Standards', link: 'standards/' },
        { text: 'NAPCORE Endorsed', link: 'categories/endorsed/' },
        { text: 'All', link: 'all/' },
      ],
    },
    {
      text: 'By Category',
      collapsed: false,
      items: [...getCategoryItemsWithCounts()],
    },
    {
      text: 'By Standard',
      collapsed: false,
      items: [...getStandardItemsWithCounts()],
    },
  ];
}
