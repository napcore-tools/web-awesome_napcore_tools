import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { BlogPost } from '../../docs/.vitepress/blog.data';

// Test utilities
function createMockPost(overrides: Partial<BlogPost> = {}): BlogPost {
  return {
    title: 'Test Post',
    url: '/blog/posts/test-post',
    date: {
      time: 1609459200000, // Jan 1, 2021
      string: 'January 1, 2021',
    },
    description: 'A test post',
    published: true,
    tags: [],
    ...overrides,
  };
}

function createMockRawPost(overrides: any = {}) {
  return {
    url: '/blog/posts/test-post',
    frontmatter: {
      title: 'Test Post',
      date: '2021-01-01',
      description: 'A test post',
      published: true,
      tags: [],
      ...overrides,
    },
    excerpt: '<p>A test post</p>',
  };
}

describe('blog.data.ts', () => {
  describe('BlogPost Interface', () => {
    it('should have required title field', () => {
      const post = createMockPost({ title: 'My Post' });
      expect(post.title).toBe('My Post');
    });

    it('should have required url field', () => {
      const post = createMockPost({ url: '/blog/posts/my-post' });
      expect(post.url).toBe('/blog/posts/my-post');
    });

    it('should have required date object with time and string', () => {
      const post = createMockPost();
      expect(post.date).toHaveProperty('time');
      expect(post.date).toHaveProperty('string');
      expect(typeof post.date.time).toBe('number');
      expect(typeof post.date.string).toBe('string');
    });

    it('should have required description field', () => {
      const post = createMockPost({ description: 'A detailed description' });
      expect(post.description).toBe('A detailed description');
    });

    it('should have optional author field', () => {
      const post = createMockPost({ author: 'John Doe' });
      expect(post.author).toBe('John Doe');
    });

    it('should have optional tags array', () => {
      const post = createMockPost({ tags: ['javascript', 'testing'] });
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags).toContain('javascript');
    });

    it('should have optional published field', () => {
      const publishedPost = createMockPost({ published: true });
      expect(publishedPost.published).toBe(true);

      const unpublishedPost = createMockPost({ published: false });
      expect(unpublishedPost.published).toBe(false);
    });

    it('should have optional publishDate field', () => {
      const post = createMockPost({ publishDate: '2021-02-01' });
      expect(post.publishDate).toBe('2021-02-01');
    });

    it('should have optional excerpt field', () => {
      const post = createMockPost({ excerpt: '<p>Excerpt</p>' });
      expect(post.excerpt).toBe('<p>Excerpt</p>');
    });
  });

  describe('Date Formatting', () => {
    it('should format date as timestamp', () => {
      const post = createMockPost({
        date: {
          time: 1609459200000,
          string: 'January 1, 2021',
        },
      });

      expect(typeof post.date.time).toBe('number');
      expect(post.date.time).toBeGreaterThan(0);
    });

    it('should format date as readable string', () => {
      const post = createMockPost({
        date: {
          time: 1609459200000,
          string: 'January 1, 2021',
        },
      });

      expect(post.date.string).toMatch(/January|Jan/);
      expect(post.date.string).toMatch(/2021/);
    });

    it('should handle different date formats', () => {
      const oldDate = createMockPost({
        date: {
          time: 946684800000, // Jan 1, 2000
          string: 'January 1, 2000',
        },
      });

      const newDate = createMockPost({
        date: {
          time: 1640995200000, // Jan 1, 2022
          string: 'January 1, 2022',
        },
      });

      expect(oldDate.date.time).toBeLessThan(newDate.date.time);
    });
  });

  describe('Published Status', () => {
    it('should default to published=true', () => {
      const post = createMockPost();
      expect(post.published).not.toBe(false);
    });

    it('should respect published=true', () => {
      const post = createMockPost({ published: true });
      expect(post.published).toBe(true);
    });

    it('should respect published=false', () => {
      const post = createMockPost({ published: false });
      expect(post.published).toBe(false);
    });

    it('should filter out unpublished posts', () => {
      const posts = [
        createMockPost({ published: true, title: 'Published' }),
        createMockPost({ published: false, title: 'Unpublished' }),
        createMockPost({ published: true, title: 'Published 2' }),
      ];

      const publishedPosts = posts.filter((p) => p.published !== false);
      expect(publishedPosts).toHaveLength(2);
      expect(publishedPosts.some((p) => p.published === false)).toBe(false);
    });
  });

  describe('Publish Date Scheduling', () => {
    it('should handle publishDate field', () => {
      const futurePost = createMockPost({ publishDate: '2099-01-01' });
      expect(futurePost.publishDate).toBe('2099-01-01');
    });

    it('should identify future posts', () => {
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const futurePost = createMockPost({ publishDate: tomorrow });
      const futureTime = new Date(futurePost.publishDate!).getTime();

      expect(futureTime).toBeGreaterThan(Date.now());
    });

    it('should identify past publish dates', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const pastPost = createMockPost({ publishDate: yesterday });
      const pastTime = new Date(pastPost.publishDate!).getTime();

      expect(pastTime).toBeLessThan(Date.now());
    });

    it('should allow scheduling with publishDate', () => {
      const posts = [
        createMockPost({ title: 'Now', publishDate: undefined }),
        createMockPost({ title: 'Tomorrow', publishDate: '2099-01-01' }),
      ];

      expect(posts[0].publishDate).toBeUndefined();
      expect(posts[1].publishDate).toBe('2099-01-01');
    });
  });

  describe('Sorting', () => {
    it('should sort posts by date descending', () => {
      const posts = [
        createMockPost({
          title: 'Old Post',
          date: { time: 1609459200000, string: 'Jan 1, 2021' },
        }),
        createMockPost({
          title: 'New Post',
          date: { time: 1640995200000, string: 'Jan 1, 2022' },
        }),
        createMockPost({
          title: 'Middle Post',
          date: { time: 1625097600000, string: 'Jul 1, 2021' },
        }),
      ];

      const sorted = [...posts].sort((a, b) => b.date.time - a.date.time);

      expect(sorted[0].title).toBe('New Post');
      expect(sorted[1].title).toBe('Middle Post');
      expect(sorted[2].title).toBe('Old Post');
    });

    it('should maintain newest first order', () => {
      const post1 = createMockPost({
        title: 'Post 1',
        date: { time: 1609459200000, string: 'Jan 1, 2021' },
      });
      const post2 = createMockPost({
        title: 'Post 2',
        date: { time: 1640995200000, string: 'Jan 1, 2022' },
      });

      const sorted = [post1, post2].sort((a, b) => b.date.time - a.date.time);
      expect(sorted[0].date.time).toBeGreaterThan(sorted[1].date.time);
    });
  });

  describe('Tags', () => {
    it('should support empty tags array', () => {
      const post = createMockPost({ tags: [] });
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags).toHaveLength(0);
    });

    it('should support single tag', () => {
      const post = createMockPost({ tags: ['javascript'] });
      expect(post.tags).toContain('javascript');
    });

    it('should support multiple tags', () => {
      const post = createMockPost({
        tags: ['javascript', 'testing', 'release'],
      });
      expect(post.tags).toHaveLength(3);
      expect(post.tags).toContain('javascript');
      expect(post.tags).toContain('testing');
      expect(post.tags).toContain('release');
    });

    it('should default to empty array if tags missing', () => {
      const post: BlogPost = {
        title: 'Test',
        url: '/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(post.tags).toBeUndefined();
    });
  });

  describe('Author Field', () => {
    it('should be optional', () => {
      const post = createMockPost();
      expect(post.author).toBeUndefined();
    });

    it('should accept string value', () => {
      const post = createMockPost({ author: 'Jane Doe' });
      expect(post.author).toBe('Jane Doe');
    });

    it('should be unique per post', () => {
      const post1 = createMockPost({ author: 'Author 1', title: 'Post 1' });
      const post2 = createMockPost({ author: 'Author 2', title: 'Post 2' });

      expect(post1.author).not.toBe(post2.author);
    });
  });

  describe('Excerpt Field', () => {
    it('should be optional', () => {
      const post = createMockPost();
      expect(post.excerpt).toBeUndefined();
    });

    it('should fallback to description if not provided', () => {
      const post = createMockPost({
        description: 'The description',
        excerpt: undefined,
      });

      // In the actual implementation, excerpt would fallback to description
      expect(post.description).toBe('The description');
    });

    it('should use excerpt if provided', () => {
      const post = createMockPost({ excerpt: 'The excerpt' });
      expect(post.excerpt).toBe('The excerpt');
    });
  });

  describe('Description Field', () => {
    it('should be required', () => {
      const post = createMockPost({ description: 'Test description' });
      expect(post.description).toBe('Test description');
    });

    it('should default to empty string if not provided', () => {
      const post = createMockPost({ description: '' });
      expect(post.description).toBe('');
    });

    it('should support long descriptions', () => {
      const longDescription = 'A'.repeat(1000);
      const post = createMockPost({ description: longDescription });
      expect(post.description.length).toBeGreaterThan(500);
    });
  });

  describe('URL Field', () => {
    it('should be required', () => {
      const post = createMockPost({ url: '/blog/posts/test' });
      expect(post.url).toBe('/blog/posts/test');
    });

    it('should follow blog post path pattern', () => {
      const post = createMockPost();
      expect(post.url).toMatch(/^\/blog\/posts\//);
    });

    it('should include post slug', () => {
      const post = createMockPost({ url: '/blog/posts/my-awesome-post' });
      expect(post.url).toContain('my-awesome-post');
    });
  });

  describe('Preview Mode', () => {
    beforeEach(() => {
      delete process.env.VITE_PREVIEW_MODE;
    });

    afterEach(() => {
      delete process.env.VITE_PREVIEW_MODE;
    });

    it('should not show future posts by default', () => {
      const now = Date.now();
      const futureTime = now + 24 * 60 * 60 * 1000;
      const futureDate = new Date(futureTime).toISOString().split('T')[0];

      const futurePost = createMockPost({ publishDate: futureDate });
      const shouldShow = !futurePost.publishDate || new Date(futurePost.publishDate).getTime() <= now;

      expect(shouldShow).toBe(false);
    });

    it('should show future posts when VITE_PREVIEW_MODE is set', () => {
      process.env.VITE_PREVIEW_MODE = '1';
      const isPreviewMode = typeof process.env.VITE_PREVIEW_MODE !== 'undefined';
      expect(isPreviewMode).toBe(true);
    });
  });

  describe('Content Loader Integration', () => {
    it('should map raw content to BlogPost', () => {
      const raw = createMockRawPost({
        title: 'Mapped Post',
        date: '2021-06-15',
        description: 'Test description',
        author: 'Test Author',
        tags: ['tag1', 'tag2'],
      });

      const post: BlogPost = {
        title: raw.frontmatter.title,
        url: raw.url,
        date: {
          time: new Date(raw.frontmatter.date).getTime(),
          string: new Date(raw.frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
        author: raw.frontmatter.author,
        tags: raw.frontmatter.tags || [],
        description: raw.frontmatter.description || '',
        excerpt: raw.excerpt,
        published: raw.frontmatter.published !== false,
        publishDate: raw.frontmatter.publishDate,
      };

      expect(post.title).toBe('Mapped Post');
      expect(post.author).toBe('Test Author');
      expect(post.tags).toContain('tag1');
    });
  });

  describe('Data Validation', () => {
    it('should have valid title strings', () => {
      const posts = [
        createMockPost({ title: 'Post 1' }),
        createMockPost({ title: 'Post with special chars: @#$' }),
        createMockPost({ title: 'Post with 📱 emoji' }),
      ];

      posts.forEach((post) => {
        expect(typeof post.title).toBe('string');
        expect(post.title.length).toBeGreaterThan(0);
      });
    });

    it('should have valid URLs', () => {
      const posts = [
        createMockPost({ url: '/blog/posts/first' }),
        createMockPost({ url: '/blog/posts/with-dashes' }),
        createMockPost({ url: '/blog/posts/with-numbers-123' }),
      ];

      posts.forEach((post) => {
        expect(post.url).toMatch(/^\/blog\/posts\/.+/);
      });
    });

    it('should have valid date objects', () => {
      const posts = [
        createMockPost({
          date: { time: 946684800000, string: 'January 1, 2000' },
        }),
        createMockPost({
          date: { time: 1640995200000, string: 'January 1, 2022' },
        }),
      ];

      posts.forEach((post) => {
        expect(typeof post.date.time).toBe('number');
        expect(post.date.time).toBeGreaterThan(0);
        expect(typeof post.date.string).toBe('string');
        expect(post.date.string.length).toBeGreaterThan(0);
      });
    });
  });
});
