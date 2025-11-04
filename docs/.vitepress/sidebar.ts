// Dynamic sidebar configuration with tool counts
import toolsDataLoader from './tools.data';
import standardsDataLoader from './standards.data';
import { CATEGORIES } from './categories';

// Load tools and calculate counts per category
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

// Generate category sidebar items with counts
function getCategoryItemsWithCounts() {
  const counts = getCategoryCounts();

  return CATEGORIES.map((cat) => ({
    text: `${cat.title} <span class="sidebar-badge">${counts[cat.slug]}</span>`,
    link: `/categories/${cat.slug}`,
  }));
}

// Load tools and calculate counts per standard
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

// Generate standard sidebar items with counts
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
    };
  });

  // Sort standards alphabetically by title
  standardsWithMetadata.sort((a, b) => a.title.localeCompare(b.title));

  return standardsWithMetadata.map(({ slug, title, count }) => ({
    text: `${title} <span class="sidebar-badge">${count}</span>`,
    link: `/standards/${slug}`,
  }));
}

// Sidebar for /tools/ section
export function getToolsSidebar() {
  return [
    {
      text: 'By Category',
      items: getCategoryItemsWithCounts(),
    },
    {
      text: 'Featured Tools',
      items: [
        { text: 'DATEX II Browser', link: '/tools/datex-browser' },
        { text: 'DATEX II Schema Tool', link: '/tools/datex-schema-tool' },
        { text: 'mobilityDCAT-AP Generator', link: '/tools/mobilitydcat-generator' },
        { text: 'ALERT-C Locations Tester', link: '/tools/alert-c-tester' },
      ],
    },
  ];
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
        { text: 'All', link: 'categories/all' },
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
