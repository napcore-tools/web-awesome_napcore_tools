import { vi, beforeEach } from 'vitest';

// ============================================================================
// GLOBAL DATA LOADER MOCKS
// ============================================================================
// Mock all data loaders before any tests run to ensure they're available
// throughout the test suite

// Mock tools.data
const mockTools = [
  {
    slug: 'tool-1',
    title: 'Validator Tool',
    description: 'A tool for validation',
    categories: ['validators'],
    status: 'active',
    standards: ['datex-ii'],
    tags: ['Validator', 'Test'],
  },
  {
    slug: 'tool-2',
    title: 'Converter Tool',
    description: 'A tool for conversion',
    categories: ['converters'],
    status: 'active',
    standards: ['datex-ii'],
    tags: ['Converter', 'Test'],
  },
  {
    slug: 'tool-3',
    title: 'DATEX Validator',
    description: 'DATEX specific validator',
    categories: ['validators'],
    status: 'active',
    standards: ['datex-ii', 'netex'],
    tags: ['Validator', 'DATEX'],
  },
  {
    slug: 'test-validator',
    title: 'Test Validator',
    description: 'A test validation tool',
    categories: ['validators'],
    status: 'active',
    standards: ['datex-ii'],
    tags: ['Validator', 'Test'],
  },
  {
    slug: 'test-converter',
    title: 'Test Converter',
    description: 'A test conversion tool',
    categories: ['converters'],
    status: 'active',
    standards: ['datex-ii', 'netex'],
    tags: ['Converter', 'Test'],
  },
];

vi.mock('@/core/data-loaders/tools.data', () => ({
  data: mockTools,
  default: {
    load: () => mockTools,
  },
}));

// Mock blog.data
const mockBlogPosts = [
  {
    url: '/blog/posts/2025-01-01-test-post',
    title: 'Test Blog Post',
    description: 'A test blog post',
    date: { time: 1735689600000, string: 'Jan 01, 2025' },
    author: 'Test Author',
    tags: ['javascript', 'testing'],
    published: true,
  },
];

vi.mock('@/core/data-loaders/blog.data', () => ({
  data: mockBlogPosts,
  default: {
    load: () => mockBlogPosts,
  },
}));

// Mock standards.data
const mockStandards = {
  'datex-ii': {
    title: 'DATEX II',
    icon: '📋',
    description: 'Data Exchange Format for Traffic and Travel Information',
  },
  netex: {
    title: 'NeTEx',
    icon: '📊',
    description: 'Network and Schedule Timetable Exchange',
  },
};

vi.mock('@/core/data-loaders/standards.data', () => ({
  data: mockStandards,
  default: {
    load: () => mockStandards,
  },
}));

// Mock blogTags.data (located in data-loaders, not metadata)
const mockBlogTags = {
  javascript: { title: 'JavaScript' },
  testing: { title: 'Testing' },
  technical: { title: 'Technical' },
};

vi.mock('@/core/data-loaders/blogTags.data', () => ({
  data: mockBlogTags,
  default: {
    load: () => mockBlogTags,
  },
}));

// Mock categories.ts (which imports from standards.data)
vi.mock('@/core/metadata/categories', () => ({
  CATEGORIES: [
    { slug: 'validators', title: 'Validators', icon: '✓', description: 'Tools for validation' },
    { slug: 'converters', title: 'Converters', icon: '⇄', description: 'Tools for conversion' },
  ],
  getCategoryBySlug: vi.fn((slug) => {
    const categories = {
      validators: { slug: 'validators', title: 'Validators', icon: '✓', description: 'Tools for validation' },
      converters: { slug: 'converters', title: 'Converters', icon: '⇄', description: 'Tools for conversion' },
    };
    return categories[slug] || null;
  }),
  getCategorySlugs: vi.fn(() => ['validators', 'converters']),
}));

// Mock standards.ts (which imports from standards.data)
vi.mock('@/core/metadata/standards', () => ({
  STANDARDS: {
    'datex-ii': { title: 'DATEX II', icon: '📋', description: 'Data Exchange Format' },
    netex: { title: 'NeTEx', icon: '📊', description: 'Network and Schedule Timetable' },
  },
  getStandardMetadata: vi.fn((slug) => {
    const standards = {
      'datex-ii': { title: 'DATEX II', icon: '📋', description: 'Data Exchange Format' },
      netex: { title: 'NeTEx', icon: '📊', description: 'Network and Schedule Timetable' },
    };
    const standard = standards[slug];
    return standard || { title: slug, icon: '📄', description: undefined };
  }),
}));

// Mock blogTags.ts (wrapper for blogTags.data)
vi.mock('@/core/metadata/blogTags', () => ({
  BLOG_TAGS: {
    javascript: { title: 'JavaScript' },
    testing: { title: 'Testing' },
    technical: { title: 'Technical' },
  },
  getBlogTagTitle: vi.fn((slug) => {
    const tags = {
      javascript: 'JavaScript',
      testing: 'Testing',
      technical: 'Technical',
    };
    return tags[slug] || slug;
  }),
  getBlogTagBySlug: vi.fn((slug) => {
    const tags = {
      javascript: { title: 'JavaScript' },
      testing: { title: 'Testing' },
      technical: { title: 'Technical' },
    };
    return tags[slug] || undefined;
  }),
}));

// Mock utils
vi.mock('@/core/utils', () => ({
  resolveTag: vi.fn((slug) => {
    // Simulate tag resolution
    const categorySlugs = ['validators', 'converters'];
    const standardSlugs = ['datex-ii', 'netex'];

    if (categorySlugs.includes(slug)) {
      return {
        slug,
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        type: 'category',
        url: `/categories/${slug}`,
      };
    }
    if (standardSlugs.includes(slug)) {
      return {
        slug,
        title: slug.toUpperCase(),
        type: 'standard',
        url: `/standards/${slug}`,
      };
    }
    return {
      slug,
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      type: 'blog-tag',
      url: `/blog?tag=${slug}`,
    };
  }),
  resolveTags: vi.fn((tags = []) =>
    tags.map((tag) => ({
      slug: tag,
      title: tag.charAt(0).toUpperCase() + tag.slice(1),
      type: 'blog-tag' as const,
      url: `/blog?tag=${tag}`,
    }))
  ),
  createSlug: vi.fn((text) => text.toLowerCase().replace(/\s+/g, '-')),
  initializeDetailsNavigation: vi.fn(),
}));

// ============================================================================
// END GLOBAL DATA LOADER MOCKS
// ============================================================================

// Reset mocks and state before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock window.history.replaceState to avoid SecurityError in jsdom
if (typeof window !== 'undefined') {
  const mockHistory = {
    ...window.history,
    replaceState: vi.fn((state, title, url) => {
      // Mock implementation that doesn't throw SecurityError
      try {
        Object.defineProperty(window, 'location', {
          value: new URL(url || '', window.location.href),
          writable: true,
        });
      } catch {
        // Silently ignore errors - in real browser this works
      }
    }),
    pushState: vi.fn((state, title, url) => {
      try {
        Object.defineProperty(window, 'location', {
          value: new URL(url || '', window.location.href),
          writable: true,
        });
      } catch {
        // Silently ignore errors
      }
    }),
  };

  Object.defineProperty(window, 'history', {
    value: mockHistory,
    writable: true,
  });
}
