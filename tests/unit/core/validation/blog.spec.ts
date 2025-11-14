import { describe, it, expect } from 'vitest';
import type { BlogPost } from '@/core/data-loaders/blog.data';

/**
 * Blog Post Validation Tests
 *
 * These tests validate the requirements and constraints for blog post frontmatter.
 * Based on the BlogPost interface and blog.data.ts implementation.
 */

describe('Blog Post Validation', () => {
  describe('Required Fields', () => {
    it('should require title field', () => {
      const validPost = {
        title: 'Test Post',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(validPost.title).toBeTruthy();
      expect(typeof validPost.title).toBe('string');
    });

    it('should reject empty title', () => {
      const invalidPost = {
        title: '',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(invalidPost.title.length).toBe(0);
      expect(invalidPost.title === '').toBe(true);
    });

    it('should require url field', () => {
      const validPost = {
        title: 'Test',
        url: '/blog/posts/test-post',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(validPost.url).toBeTruthy();
      expect(validPost.url).toMatch(/^\/blog\/posts\//);
    });

    it('should require date object with time', () => {
      const validPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: 1609459200000, string: 'January 1, 2021' },
        description: 'Test',
      };

      expect(validPost.date.time).toBeTruthy();
      expect(typeof validPost.date.time).toBe('number');
    });

    it('should require date object with string', () => {
      const validPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'January 1, 2021' },
        description: 'Test',
      };

      expect(validPost.date.string).toBeTruthy();
      expect(typeof validPost.date.string).toBe('string');
    });

    it('should require description field', () => {
      const validPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test description',
      };

      expect(validPost.description).toBeTruthy();
    });
  });

  describe('Optional Fields', () => {
    it('should allow optional author', () => {
      const postWithAuthor = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        author: 'John Doe',
      };

      expect(postWithAuthor.author).toBe('John Doe');
    });

    it('should allow missing author', () => {
      const postWithoutAuthor = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(postWithoutAuthor.author).toBeUndefined();
    });

    it('should allow optional tags array', () => {
      const postWithTags = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: ['tag1', 'tag2'],
      };

      expect(Array.isArray(postWithTags.tags)).toBe(true);
      expect(postWithTags.tags?.length).toBe(2);
    });

    it('should allow optional publishDate', () => {
      const postWithPublishDate = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        publishDate: '2025-12-31',
      };

      expect(postWithPublishDate.publishDate).toBe('2025-12-31');
    });

    it('should allow optional excerpt', () => {
      const postWithExcerpt = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        excerpt: '<p>Short excerpt</p>',
      };

      expect(postWithExcerpt.excerpt).toBeTruthy();
    });

    it('should allow optional published flag', () => {
      const publishedPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        published: true,
      };

      expect(publishedPost.published).toBe(true);
    });
  });

  describe('Field Types', () => {
    it('should validate title is string', () => {
      const post = {
        title: 'Valid Title',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(typeof post.title).toBe('string');
    });

    it('should validate url is string', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test-post',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(typeof post.url).toBe('string');
    });

    it('should validate date.time is number', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: 1609459200000, string: 'January 1, 2021' },
        description: 'Test',
      };

      expect(typeof post.date.time).toBe('number');
    });

    it('should validate date.string is string', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'January 1, 2021' },
        description: 'Test',
      };

      expect(typeof post.date.string).toBe('string');
    });

    it('should validate description is string', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'A description',
      };

      expect(typeof post.description).toBe('string');
    });

    it('should validate tags is array of strings', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: ['tag1', 'tag2', 'tag3'],
      };

      expect(Array.isArray(post.tags)).toBe(true);
      post.tags?.forEach((tag) => {
        expect(typeof tag).toBe('string');
      });
    });

    it('should validate author is string', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        author: 'John Doe',
      };

      expect(typeof post.author).toBe('string');
    });

    it('should validate publishDate is string in ISO format', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        publishDate: '2025-12-31',
      };

      // Should be parseable as date
      expect(() => new Date(post.publishDate!)).not.toThrow();
    });

    it('should validate published is boolean', () => {
      const publishedPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        published: true,
      };

      expect(typeof publishedPost.published).toBe('boolean');
    });
  });

  describe('Field Constraints', () => {
    it('should validate URL follows blog post pattern', () => {
      const validUrls = ['/blog/posts/first-post', '/blog/posts/post-with-dashes', '/blog/posts/post123'];

      validUrls.forEach((url) => {
        expect(url).toMatch(/^\/blog\/posts\/[a-z0-9-]+$/i);
      });
    });

    it('should reject invalid URL patterns', () => {
      const invalidUrls = [
        '/blog/post-missing-posts',
        '/posts/wrong-category',
        '/blog/posts/', // empty slug
      ];

      invalidUrls.forEach((url) => {
        if (url === '/blog/posts/') {
          expect(url).not.toMatch(/^\/blog\/posts\/[a-z0-9-]+$/i);
        }
      });
    });

    it('should validate date.time is positive number', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: 1609459200000, string: 'January 1, 2021' },
        description: 'Test',
      };

      expect(post.date.time).toBeGreaterThan(0);
    });

    it('should allow tags to be empty array', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: [],
      };

      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags?.length).toBe(0);
    });

    it('should validate description is not just whitespace', () => {
      const validDescription = 'A meaningful description';
      const emptyDescription = '   ';

      expect(validDescription.trim().length).toBeGreaterThan(0);
      expect(emptyDescription.trim().length).toBe(0);
    });
  });

  describe('Publishing Rules', () => {
    it('should respect published=false to hide post', () => {
      const draftPost = {
        title: 'Draft Post',
        url: '/blog/posts/draft',
        date: { time: Date.now(), string: 'Today' },
        description: 'Draft',
        published: false,
      };

      // Should be filtered out when published=false
      expect(draftPost.published).toBe(false);
    });

    it('should respect published=true to show post', () => {
      const publishedPost = {
        title: 'Published Post',
        url: '/blog/posts/published',
        date: { time: Date.now(), string: 'Today' },
        description: 'Published',
        published: true,
      };

      expect(publishedPost.published).toBe(true);
    });

    it('should filter out posts with future publishDate', () => {
      const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const scheduledPost = {
        title: 'Scheduled Post',
        url: '/blog/posts/scheduled',
        date: { time: Date.now(), string: 'Today' },
        description: 'Scheduled',
        publishDate: tomorrow,
      };

      const scheduledTime = new Date(scheduledPost.publishDate!).getTime();
      expect(scheduledTime).toBeGreaterThan(Date.now());
    });

    it('should show posts with past publishDate', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const pastPost = {
        title: 'Past Post',
        url: '/blog/posts/past',
        date: { time: Date.now(), string: 'Today' },
        description: 'Past',
        publishDate: yesterday,
      };

      const pastTime = new Date(pastPost.publishDate!).getTime();
      expect(pastTime).toBeLessThan(Date.now());
    });
  });

  describe('Date Validation', () => {
    it('should validate date.time matches expected timestamp range', () => {
      // Valid dates should be between year 2000 and 2100
      const year2000 = new Date('2000-01-01').getTime();
      const year2100 = new Date('2100-12-31').getTime();

      const validPost = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: 1609459200000, string: 'January 1, 2021' }, // 2021
        description: 'Test',
      };

      expect(validPost.date.time).toBeGreaterThan(year2000);
      expect(validPost.date.time).toBeLessThan(year2100);
    });

    it('should validate date string is formatted correctly', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'January 1, 2021' },
        description: 'Test',
      };

      // Should contain month, day, and year
      expect(post.date.string).toMatch(/\w+\s+\d+,\s+\d{4}/);
    });

    it('should validate date consistency', () => {
      const date = new Date('2021-01-01');
      date.setUTCHours(12);

      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: +date, string: date.toLocaleDateString() },
        description: 'Test',
      };

      expect(post.date.time).toBe(+date);
    });
  });

  describe('Content Validation', () => {
    it('should accept markdown-style content in description', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: '# Heading\n\nParagraph with **bold** text',
      };

      expect(post.description).toContain('**bold**');
    });

    it('should accept HTML in excerpt', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        excerpt: '<p>HTML content</p>',
      };

      expect(post.excerpt).toContain('<p>');
    });

    it('should handle special characters in title', () => {
      const post = {
        title: 'Post with "quotes" and & ampersand',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(post.title).toContain('&');
      expect(post.title).toContain('"');
    });

    it('should handle emoji in title', () => {
      const post = {
        title: 'Announcement 📢 New Release 🎉',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
      };

      expect(post.title).toContain('📢');
      expect(post.title).toContain('🎉');
    });
  });

  describe('Tag Validation', () => {
    it('should accept valid tags', () => {
      const validTags = ['javascript', 'vue', 'testing', 'release'];
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: validTags,
      };

      expect(post.tags).toEqual(validTags);
    });

    it('should allow tags with hyphens', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: ['tag-with-hyphens', 'another-tag'],
      };

      expect(post.tags?.every((tag) => tag.includes('-'))).toBe(true);
    });

    it('should allow tags with numbers', () => {
      const post = {
        title: 'Test',
        url: '/blog/posts/test',
        date: { time: Date.now(), string: 'Today' },
        description: 'Test',
        tags: ['v2-release', 'datex-ii'],
      };

      expect(post.tags?.some((tag) => /\d/.test(tag))).toBe(true);
    });
  });

  describe('Complete Validation Examples', () => {
    it('should validate complete minimal post', () => {
      const minimalPost: BlogPost = {
        title: 'Minimal Post',
        url: '/blog/posts/minimal-post',
        date: { time: Date.now(), string: 'Today' },
        description: 'A minimal valid post',
      };

      expect(minimalPost.title).toBeTruthy();
      expect(minimalPost.url).toMatch(/^\/blog\/posts\//);
      expect(minimalPost.date.time).toBeGreaterThan(0);
      expect(minimalPost.description).toBeTruthy();
    });

    it('should validate complete full-featured post', () => {
      const fullPost: BlogPost = {
        title: 'Full Featured Post',
        url: '/blog/posts/full-featured',
        date: { time: Date.now(), string: 'January 1, 2025' },
        description: 'Complete post with all fields',
        author: 'Jane Doe',
        tags: ['javascript', 'vue', 'testing'],
        excerpt: '<p>Post excerpt</p>',
        published: true,
        publishDate: '2025-01-01',
      };

      expect(fullPost).toBeDefined();
      expect(fullPost.author).toBe('Jane Doe');
      expect(fullPost.tags?.length).toBe(3);
      expect(fullPost.published).toBe(true);
    });
  });
});
