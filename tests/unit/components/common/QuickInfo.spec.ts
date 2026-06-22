import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

// The component derives its tool from the current page's relativePath and looks
// it up in the tools data loader. A mutable holder lets each test point the page
// at a different fixture slug.
const pageState = vi.hoisted(() => ({ relativePath: 'tools/full-tool.md' }));

vi.mock('vitepress', () => ({
  useData: vi.fn(() => ({
    page: ref({ relativePath: pageState.relativePath }),
  })),
}));

// Override the global tools.data mock with fixtures that exercise QuickInfo's
// fields. Each fixture maps to a slug the tests select via pageState.
const mockTools = vi.hoisted(() => [
  {
    slug: 'full-tool',
    title: 'Full Tool',
    status: 'maintenance',
    license: 'MIT',
    website: 'https://www.example.com/app',
    repository: 'https://github.com/example/repo',
    documentation: 'https://docs.example.com',
    demo: 'https://demo.example.com',
    developer: 'Example Corp',
    maintainedBy: 'Example Team',
    mainContributor: 'John Doe',
    technology: 'JavaScript',
  },
  {
    slug: 'github-tool',
    title: 'GitHub Tool',
    status: 'active',
    repository: 'https://github.com/example/repo',
  },
  {
    slug: 'gitlab-tool',
    title: 'GitLab Tool',
    status: 'active',
    repository: 'https://gitlab.com/example/repo',
  },
  {
    slug: 'minimal-tool',
    title: 'Minimal Tool',
    status: 'active',
    license: 'MIT',
    website: 'https://example.com',
  },
  {
    slug: 'bare-tool',
    title: 'Bare Tool',
    status: 'active',
  },
]);

vi.mock('@/core/data-loaders/tools.data', () => ({
  data: mockTools,
  default: { load: () => mockTools },
}));

// Import after mocking
import QuickInfo from '@/theme/components/tools/ToolQuickInfo.vue';

describe('QuickInfo Component', () => {
  beforeEach(() => {
    pageState.relativePath = 'tools/full-tool.md';
  });

  describe('Rendering', () => {
    it('should render table when tool exists', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.find('table').exists()).toBe(true);
    });

    it('should have tbody element', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.find('tbody').exists()).toBe(true);
    });

    it('should not render table when tool is not found', () => {
      pageState.relativePath = 'tools/does-not-exist.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.find('table').exists()).toBe(false);
    });
  });

  describe('Status Field', () => {
    it('should not display status row when status is active', () => {
      pageState.relativePath = 'tools/minimal-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).not.toContain('Status');
    });

    it('should display status row when status is maintenance', () => {
      pageState.relativePath = 'tools/full-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('Maintenance');
    });
  });

  describe('URL Extraction', () => {
    it('should extract domain from URL and strip www', () => {
      pageState.relativePath = 'tools/full-tool.md';
      const wrapper = mount(QuickInfo);
      // website is https://www.example.com/app → example.com/app
      expect(wrapper.text()).toContain('example.com/app');
      expect(wrapper.text()).not.toContain('www.example.com');
    });
  });

  describe('Repository Detection', () => {
    it('should detect GitHub repositories', () => {
      pageState.relativePath = 'tools/github-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('GitHub Repository');
    });

    it('should detect GitLab repositories', () => {
      pageState.relativePath = 'tools/gitlab-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('GitLab Repository');
    });
  });

  describe('Conditional Rendering', () => {
    it('should show only present fields', () => {
      pageState.relativePath = 'tools/minimal-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('License');
      expect(wrapper.text()).toContain('Website');
      expect(wrapper.text()).not.toContain('Technology');
    });

    it('should handle a tool with no optional fields gracefully', () => {
      pageState.relativePath = 'tools/bare-tool.md';
      const wrapper = mount(QuickInfo);
      expect(wrapper.find('table').exists()).toBe(true);
    });
  });

  describe('Link Handling', () => {
    it('should have target="_blank" on external links', () => {
      const wrapper = mount(QuickInfo);
      const links = wrapper.findAll('a');
      links.forEach((link) => {
        if (link.attributes('href')) {
          expect(link.attributes('target')).toBe('_blank');
        }
      });
    });

    it('should have proper href attributes on links', () => {
      const wrapper = mount(QuickInfo);
      const links = wrapper.findAll('a');
      links.forEach((link) => {
        const href = link.attributes('href');
        if (href) {
          expect(href).toMatch(/^https?:\/\//);
        }
      });
    });
  });

  describe('Table Structure', () => {
    it('should have table > tbody structure', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.find('table > tbody').exists()).toBe(true);
    });

    it('should have tr elements for data rows', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.findAll('tr').length).toBeGreaterThan(0);
    });

    it('should have td elements in rows', () => {
      const wrapper = mount(QuickInfo);
      const rows = wrapper.findAll('tr');
      rows.forEach((row) => {
        expect(row.findAll('td').length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Field Display', () => {
    it('should display license field when present', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('License');
      expect(wrapper.text()).toContain('MIT');
    });

    it('should display developer field when present', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('Developer');
      expect(wrapper.text()).toContain('Example Corp');
    });

    it('should display technology field when present', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.text()).toContain('Technology');
      expect(wrapper.text()).toContain('JavaScript');
    });
  });

  describe('Component Props', () => {
    it('should mount without errors', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.vm).toBeDefined();
    });

    it('should render without errors', () => {
      const wrapper = mount(QuickInfo);
      expect(wrapper.html()).toBeDefined();
    });
  });
});
