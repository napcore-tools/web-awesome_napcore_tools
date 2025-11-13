import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock tools.data BEFORE importing
vi.mock('../../../docs/.vitepress/tools.data', () => ({
  data: [
    {
      slug: 'tool-1',
      title: 'Validator Tool',
      description: 'A tool for validation',
      categories: ['validators'],
      status: 'active',
      standards: ['datex-ii'],
      tags: [],
    },
    {
      slug: 'tool-2',
      title: 'Converter Tool',
      description: 'A tool for conversion',
      categories: ['converters'],
      status: 'active',
      standards: ['datex-ii'],
      tags: [],
    },
    {
      slug: 'tool-3',
      title: 'DATEX Validator',
      description: 'DATEX specific validator',
      categories: ['validators'],
      status: 'active',
      standards: ['datex-ii', 'netex'],
      tags: [],
    },
  ],
}));

// Mock useRoute from vitepress BEFORE importing
vi.mock('vitepress', () => ({
  useRoute: vi.fn(() => ({
    path: '/categories/validators',
  })),
}));

// Mock utils BEFORE importing
vi.mock('../../../docs/.vitepress/utils', () => ({
  createSlug: vi.fn((text) => text.toLowerCase().replace(/\s+/g, '-')),
}));

// Mock ToolCard component BEFORE importing
vi.mock('../../../docs/.vitepress/theme/components/ToolCard.vue', () => ({
  default: {
    name: 'ToolCard',
    props: ['tool', 'subtitle'],
    template: '<div class="tool-card-mock">{{ tool.title }}</div>',
  },
}));

// Import after mocking
import ToolsGrid from '../../../docs/.vitepress/theme/components/ToolsGrid.vue';

describe('ToolsGrid Component', () => {
  beforeEach(() => {
    delete (window as any).location;
    window.location = { href: 'http://localhost/', search: '' } as any;
  });

  describe('Rendering', () => {
    it('should render grid container', () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.find('.feature-grid').exists()).toBe(true);
    });

    it('should render without errors', () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('Tool Display', () => {
    it('should display all tools when showAll is true', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      expect(toolCards.length).toBeGreaterThan(0);
    });

    it('should render ToolCard components', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      expect(toolCards.length).toBeGreaterThan(0);
    });

    it('should pass tool props to ToolCard', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      toolCards.forEach((card) => {
        expect(card.props('tool')).toBeDefined();
        expect(card.props('tool').slug).toBeTruthy();
      });
    });
  });

  describe('Filtering', () => {
    it('should filter tools by category', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { category: 'validators' },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      expect(toolCards.length).toBeGreaterThan(0);
    });

    it('should filter tools by standard', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { standard: 'datex-ii' },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      expect(toolCards.length).toBeGreaterThan(0);
    });

    it('should filter tools by selected tools array', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { selectedTools: ['tool-1', 'tool-3'] },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const toolCards = wrapper.findAllComponents({ name: 'ToolCard' });
      expect(toolCards.length).toBeGreaterThan(0);
    });

    it('should show no tools message when no tools match filters', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { selectedTools: ['nonexistent-tool'] },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      const noToolsMessage = wrapper.find('.no-tools-message');
      expect(noToolsMessage.exists()).toBe(true);
      expect(noToolsMessage.text()).toContain('No tools available');
    });
  });

  describe('Props Validation', () => {
    it('should accept category prop', () => {
      const wrapper = mount(ToolsGrid, {
        props: { category: 'validators' },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.props('category')).toBe('validators');
    });

    it('should accept standard prop', () => {
      const wrapper = mount(ToolsGrid, {
        props: { standard: 'datex-ii' },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.props('standard')).toBe('datex-ii');
    });

    it('should accept selectedTools prop', () => {
      const selectedTools = ['tool-1', 'tool-2'];
      const wrapper = mount(ToolsGrid, {
        props: { selectedTools },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.props('selectedTools')).toEqual(selectedTools);
    });

    it('should accept showAll prop', () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.props('showAll')).toBe(true);
    });

    it('should work with no props', () => {
      const wrapper = mount(ToolsGrid, {
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('Component Structure', () => {
    it('should have feature-grid class for tools', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { showAll: true },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.feature-grid').exists()).toBe(true);
    });

    it('should have no-tools-message element when empty', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { selectedTools: ['nonexistent'] },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.no-tools-message').exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty selectedTools array', async () => {
      const wrapper = mount(ToolsGrid, {
        props: { selectedTools: [] },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('div').exists()).toBe(true);
    });

    it('should handle undefined props gracefully', () => {
      const wrapper = mount(ToolsGrid, {
        global: {
          stubs: { ToolCard: true },
        },
      });

      expect(wrapper.vm).toBeDefined();
    });

    it('should handle mixed filters', async () => {
      const wrapper = mount(ToolsGrid, {
        props: {
          category: 'validators',
          standard: 'datex-ii',
        },
        global: {
          stubs: { ToolCard: true },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('div').exists()).toBe(true);
    });
  });
});
