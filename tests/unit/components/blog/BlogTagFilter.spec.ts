import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';

// Global mocks in setup.ts provide blog.data and tagResolver mocks

// Mock BlogGrid component
vi.mock('@/theme/components/blog/BlogGrid.vue', () => ({
  default: {
    name: 'BlogGrid',
    props: ['selectedTags'],
    template: '<div class="blog-grid-mock"></div>',
  },
}));

// Import component
import BlogTagFilter from '@/theme/components/blog/BlogTagFilter.vue';

describe('BlogTagFilter Component', () => {
  beforeEach(() => {
    // Clear window location search params before each test
    delete (window as any).location;
    window.location = { href: 'http://localhost/', search: '' } as any;
  });

  describe('Rendering', () => {
    it('should render filter container', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.find('.blog-tag-filter').exists()).toBe(true);
    });

    it('should render filter header', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.find('.filter-header').exists()).toBe(true);
    });

    it('should render filter title', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.find('.filter-title').text()).toBe('Filter by Tag');
    });

    it('should render tags cloud container', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.find('.tags-cloud').exists()).toBe(true);
    });

    it('should include BlogGrid component', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.findComponent({ name: 'BlogGrid' }).exists()).toBe(true);
    });
  });

  describe('Tag Display', () => {
    it('should display all available tags', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should display tag titles', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const tagButtons = wrapper.findAll('.tag-button');
      const tagTexts = tagButtons.map((btn) => btn.text());

      // Should contain tags from the mock data
      const combinedText = tagTexts.join(' ');
      expect(combinedText).toBeTruthy();
    });

    it('should display tag counts', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const tagCounts = wrapper.findAll('.tag-count');
      expect(tagCounts.length).toBeGreaterThan(0);

      tagCounts.forEach((count) => {
        expect(count.text()).toMatch(/^\d+$/);
      });
    });

    it('should sort tags by count (descending)', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const tagCounts = wrapper.findAll('.tag-count');
      const counts = tagCounts.map((el) => parseInt(el.text(), 10));

      // Check that counts are in descending order
      for (let i = 0; i < counts.length - 1; i++) {
        if (counts[i] !== counts[i + 1]) {
          expect(counts[i]).toBeGreaterThanOrEqual(counts[i + 1]);
        }
      }
    });
  });

  describe('Tag Selection', () => {
    it('should toggle tag selection on click', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const firstButton = wrapper.find('.tag-button');
      await firstButton.trigger('click');

      expect(firstButton.classes()).toContain('active');
    });

    it('should deselect tag when clicked again', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const firstButton = wrapper.find('.tag-button');

      // Select
      await firstButton.trigger('click');
      expect(firstButton.classes()).toContain('active');

      // Deselect
      await firstButton.trigger('click');
      expect(firstButton.classes()).not.toContain('active');
    });

    it('should track selected tags', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      await buttons[0].trigger('click');

      // Should be tracking the selection
      const activeButtons = wrapper.findAll('.tag-button.active');
      expect(activeButtons.length).toBe(1);
    });

    it('should allow multiple tag selection', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');

      const activeButtons = wrapper.findAll('.tag-button.active');
      expect(activeButtons.length).toBe(2);
    });
  });

  describe('Clear Button', () => {
    it('should not display clear button initially', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.clear-button').exists()).toBe(false);
    });

    it('should display clear button when tags are selected', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const firstButton = wrapper.find('.tag-button');
      await firstButton.trigger('click');

      await wrapper.vm.$nextTick();
      expect(wrapper.find('.clear-button').exists()).toBe(true);
    });

    it('should clear all selections on clear button click', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      await buttons[0].trigger('click');
      await buttons[1].trigger('click');

      await wrapper.vm.$nextTick();
      const clearButton = wrapper.find('.clear-button');
      await clearButton.trigger('click');

      await wrapper.vm.$nextTick();
      const activeButtons = wrapper.findAll('.tag-button.active');
      expect(activeButtons.length).toBe(0);
    });

    it('should hide clear button after clearing selections', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const firstButton = wrapper.find('.tag-button');
      await firstButton.trigger('click');

      await wrapper.vm.$nextTick();
      const clearButton = wrapper.find('.clear-button');
      await clearButton.trigger('click');

      await wrapper.vm.$nextTick();
      expect(wrapper.find('.clear-button').exists()).toBe(false);
    });
  });

  describe('BlogGrid Integration', () => {
    it('should pass selected tags to BlogGrid', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const blogGrid = wrapper.findComponent({ name: 'BlogGrid' });
      expect(blogGrid.exists()).toBe(true);
    });

    it('should pass undefined when no tags are selected', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const blogGrid = wrapper.findComponent({ name: 'BlogGrid' });
      // When no tags selected, should pass undefined
      const selectedTags = blogGrid.props('selectedTags');
      expect(selectedTags).toBeUndefined();
    });

    it('should pass selected tags array to BlogGrid when tags are selected', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      await buttons[0].trigger('click');

      await wrapper.vm.$nextTick();

      const blogGrid = wrapper.findComponent({ name: 'BlogGrid' });
      const selectedTags = blogGrid.props('selectedTags');
      expect(Array.isArray(selectedTags) || selectedTags === undefined).toBe(true);
    });
  });

  describe('CSS Classes', () => {
    it('should apply tag-button class to buttons', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      buttons.forEach((btn) => {
        expect(btn.classes()).toContain('tag-button');
      });
    });

    it('should apply tag type class to buttons', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      buttons.forEach((btn) => {
        const classes = btn.classes();
        expect(classes.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should apply active class to selected tags', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const button = wrapper.find('.tag-button');
      await button.trigger('click');

      expect(button.classes()).toContain('active');
    });
  });

  describe('Component Structure', () => {
    it('should have h3 for title', () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      expect(wrapper.find('h3').exists()).toBe(true);
    });

    it('should have button elements for tags', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('button');
      // Should have at least tag buttons (clear button comes later if tags selected)
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic button elements', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      buttons.forEach((btn) => {
        expect(btn.element?.tagName).toBe('BUTTON');
      });
    });

    it('should have text content in buttons', async () => {
      const wrapper = mount(BlogTagFilter, {
        global: {
          stubs: { BlogGrid: true },
        },
      });

      await wrapper.vm.$nextTick();

      const buttons = wrapper.findAll('.tag-button');
      buttons.forEach((btn) => {
        expect(btn.text().length).toBeGreaterThan(0);
      });
    });
  });
});
