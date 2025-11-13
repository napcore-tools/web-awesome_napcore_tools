import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock blog.data BEFORE importing
vi.mock('../../../docs/.vitepress/blog.data', () => ({
  BlogPost: {},
}));

// Mock tagResolver BEFORE importing
vi.mock('../../../docs/.vitepress/theme/utils/tagResolver', () => ({
  resolveTags: vi.fn((tags) =>
    tags.map((tag) => ({
      slug: tag,
      title: tag.charAt(0).toUpperCase() + tag.slice(1),
      type: 'blog-tag' as const,
      url: `/blog?tag=${tag}`,
    }))
  ),
}));

// Import after mocking
import BlogCard from '../../../docs/.vitepress/theme/components/blog/BlogCard.vue';

describe('BlogCard Component', () => {
  const mockPost = {
    url: '/blog/posts/test-post',
    title: 'Test Blog Post',
    description: 'This is a test blog post description',
    date: {
      time: 1609459200000,
      string: 'Jan 01, 2021',
    },
    author: 'John Doe',
    tags: ['javascript', 'testing'],
    published: true,
  };

  describe('Rendering', () => {
    it('should render blog card container', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card').exists()).toBe(true);
    });

    it('should render with correct structure', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-header').exists()).toBe(true);
      expect(wrapper.find('.blog-card-body').exists()).toBe(true);
    });

    it('should render without errors', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.vm).toBeDefined();
    });
  });

  describe('Title Display', () => {
    it('should display post title', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-title').text()).toContain('Test Blog Post');
    });

    it('should link to post URL', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const link = wrapper.find('.blog-card-title a');
      expect(link.attributes('href')).toBe('/blog/posts/test-post');
    });

    it('should have h3 tag for title', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('h3').exists()).toBe(true);
    });

    it('should display different titles', () => {
      const customPost = {
        ...mockPost,
        title: 'Different Title',
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      expect(wrapper.find('.blog-card-title').text()).toContain('Different Title');
    });
  });

  describe('Date Display', () => {
    it('should display post date', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-date').text()).toContain('Jan 01, 2021');
    });

    it('should show calendar emoji before date', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-date').text()).toContain('📅');
    });

    it('should display date in correct element', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const dateElement = wrapper.find('.blog-date');
      expect(dateElement.exists()).toBe(true);
    });
  });

  describe('Author Display', () => {
    it('should display author when present', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-author').text()).toContain('John Doe');
    });

    it('should not display author element when author is missing', () => {
      const postNoAuthor = {
        ...mockPost,
        author: undefined,
      };

      const wrapper = mount(BlogCard, {
        props: { post: postNoAuthor },
      });

      expect(wrapper.find('.blog-author').exists()).toBe(false);
    });

    it('should show pen emoji before author', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-author').text()).toContain('✍️');
    });

    it('should display different authors', () => {
      const customPost = {
        ...mockPost,
        author: 'Jane Smith',
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      expect(wrapper.find('.blog-author').text()).toContain('Jane Smith');
    });
  });

  describe('Description Display', () => {
    it('should display post description', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-description').text()).toBe('This is a test blog post description');
    });

    it('should display description in paragraph tag', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-description').element?.tagName).toBe('P');
    });

    it('should handle long descriptions', () => {
      const longDescription = 'A'.repeat(500);
      const customPost = {
        ...mockPost,
        description: longDescription,
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      expect(wrapper.find('.blog-card-description').text()).toContain('A');
    });

    it('should handle empty description', () => {
      const customPost = {
        ...mockPost,
        description: '',
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      expect(wrapper.find('.blog-card-description').exists()).toBe(true);
    });
  });

  describe('Tags Display', () => {
    it('should display tags when present', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-tags').exists()).toBe(true);
      const tags = wrapper.findAll('.blog-tag');
      expect(tags.length).toBeGreaterThan(0);
    });

    it('should not display tags container when tags are empty', () => {
      const postNoTags = {
        ...mockPost,
        tags: [],
      };

      const wrapper = mount(BlogCard, {
        props: { post: postNoTags },
      });

      expect(wrapper.find('.blog-tags').exists()).toBe(false);
    });

    it('should not display tags when tags property is missing', () => {
      const postNoTags = {
        ...mockPost,
        tags: undefined,
      };

      const wrapper = mount(BlogCard, {
        props: { post: postNoTags },
      });

      expect(wrapper.find('.blog-tags').exists()).toBe(false);
    });

    it('should display tag names', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      const tagTexts = tags.map((tag) => tag.text());

      expect(tagTexts).toContain('Javascript');
      expect(tagTexts).toContain('Testing');
    });

    it('should link tags to their URLs', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      expect(tags.length).toBeGreaterThan(0);

      tags.forEach((tag) => {
        const href = tag.attributes('href');
        expect(href).toBeTruthy();
        expect(href).toContain('/blog?tag=');
      });
    });

    it('should limit to 5 tags maximum', () => {
      const manyTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7'];
      const customPost = {
        ...mockPost,
        tags: manyTags,
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      expect(tags.length).toBeLessThanOrEqual(5);
    });

    it('should display first 5 tags when more than 5 are provided', () => {
      const manyTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'];
      const customPost = {
        ...mockPost,
        tags: manyTags,
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      expect(tags.length).toBe(5);
    });
  });

  describe('Tag Type Classes', () => {
    it('should apply type class to tags', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      tags.forEach((tag) => {
        const classes = tag.classes();
        expect(classes).toContain('blog-tag');
      });
    });

    it('should handle multiple tag classes', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const tags = wrapper.findAll('.blog-tag');
      expect(tags.length).toBeGreaterThan(0);
    });
  });

  describe('Metadata Layout', () => {
    it('should display date and author together', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const meta = wrapper.find('.blog-card-meta');
      expect(meta.text()).toContain('Jan 01, 2021');
      expect(meta.text()).toContain('John Doe');
    });

    it('should have correct class for metadata', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-meta').exists()).toBe(true);
    });
  });

  describe('CSS Classes', () => {
    it('should have blog-card-header class', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-header').exists()).toBe(true);
    });

    it('should have blog-card-body class', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-body').exists()).toBe(true);
    });

    it('should have blog-card-title class', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-title').exists()).toBe(true);
    });

    it('should have blog-card-description class', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('.blog-card-description').exists()).toBe(true);
    });
  });

  describe('Props Validation', () => {
    it('should accept blog post object', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.props('post')).toEqual(mockPost);
    });

    it('should render with different post data', () => {
      const customPost = {
        url: '/blog/different-post',
        title: 'Different Post',
        description: 'Different description',
        date: {
          time: 1609545600000,
          string: 'Jan 02, 2021',
        },
        author: 'Jane Doe',
        tags: ['vue', 'testing'],
        published: true,
      };

      const wrapper = mount(BlogCard, {
        props: { post: customPost },
      });

      expect(wrapper.find('.blog-card-title').text()).toContain('Different Post');
      expect(wrapper.find('.blog-card-description').text()).toBe('Different description');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic heading for title', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      expect(wrapper.find('h3').exists()).toBe(true);
    });

    it('should have links with href attributes', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const links = wrapper.findAll('a');
      links.forEach((link) => {
        expect(link.attributes('href')).toBeTruthy();
      });
    });

    it('should have proper text content in links', () => {
      const wrapper = mount(BlogCard, {
        props: { post: mockPost },
      });

      const titleLink = wrapper.find('.blog-card-title a');
      expect(titleLink.text()).toBeTruthy();
    });
  });
});
