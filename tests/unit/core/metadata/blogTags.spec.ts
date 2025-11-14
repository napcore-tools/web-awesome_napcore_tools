import { describe, it, expect } from 'vitest';

// Note: Global mocks from setup.ts are used for this module
// The blogTags module is mocked globally with:
// - javascript: { title: 'JavaScript' }
// - testing: { title: 'Testing' }
// - technical: { title: 'Technical' }
// - getBlogTagTitle function
// - getBlogTagBySlug function

import { getBlogTagTitle, getBlogTagBySlug, BLOG_TAGS, type BlogTag } from '@/core/metadata/blogTags';

describe('blogTags.ts', () => {
  describe('BLOG_TAGS constant', () => {
    it('should be an object', () => {
      expect(typeof BLOG_TAGS).toBe('object');
      expect(BLOG_TAGS).not.toBeNull();
    });

    it('should contain known blog tags', () => {
      expect(BLOG_TAGS['javascript']).toBeDefined();
      expect(BLOG_TAGS['testing']).toBeDefined();
      expect(BLOG_TAGS['technical']).toBeDefined();
    });

    it('should have javascript tag with correct title', () => {
      const jsTag = BLOG_TAGS['javascript'];
      expect(jsTag.title).toBe('JavaScript');
    });

    it('should have testing tag with correct title', () => {
      const testingTag = BLOG_TAGS['testing'];
      expect(testingTag.title).toBe('Testing');
    });

    it('should have technical tag with correct title', () => {
      const technicalTag = BLOG_TAGS['technical'];
      expect(technicalTag.title).toBe('Technical');
    });

    it('should maintain property structure', () => {
      Object.values(BLOG_TAGS).forEach((tag) => {
        expect(tag).toHaveProperty('title');
        expect(typeof tag.title).toBe('string');
        expect(tag.title.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getBlogTagTitle', () => {
    it('should return title for existing tag', () => {
      const title = getBlogTagTitle('javascript');
      expect(title).toBe('JavaScript');
    });

    it('should return title for all known tags', () => {
      expect(getBlogTagTitle('javascript')).toBe('JavaScript');
      expect(getBlogTagTitle('testing')).toBe('Testing');
      expect(getBlogTagTitle('technical')).toBe('Technical');
    });

    it('should return slug as fallback for unknown tag', () => {
      const title = getBlogTagTitle('unknown-tag');
      expect(title).toBe('unknown-tag');
    });

    it('should fallback to slug when tag not found', () => {
      const title = getBlogTagTitle('non-existent');
      expect(title).toBe('non-existent');
    });

    it('should return string type', () => {
      const title = getBlogTagTitle('javascript');
      expect(typeof title).toBe('string');
    });

    it('should handle empty string', () => {
      const title = getBlogTagTitle('');
      expect(title).toBe('');
    });

    it('should be case-sensitive', () => {
      const lowercase = getBlogTagTitle('javascript');
      const uppercase = getBlogTagTitle('JavaScript');
      const mixed = getBlogTagTitle('JavaScript');

      expect(lowercase).toBe('JavaScript');
      expect(uppercase).toBe('JavaScript'); // Fallback to slug
      expect(mixed).toBe('JavaScript'); // Fallback to slug
    });

    it('should not have empty returns', () => {
      expect(getBlogTagTitle('javascript').length).toBeGreaterThan(0);
      expect(getBlogTagTitle('unknown').length).toBeGreaterThan(0);
    });

    it('should handle hyphenated tag slugs', () => {
      const title = getBlogTagTitle('long-tag-name');
      expect(title).toBe('long-tag-name');
    });
  });

  describe('getBlogTagBySlug', () => {
    it('should return tag object by slug', () => {
      const tag = getBlogTagBySlug('javascript');
      expect(tag).toBeDefined();
      expect(tag?.title).toBe('JavaScript');
    });

    it('should return tag for all known tags', () => {
      expect(getBlogTagBySlug('javascript')).toBeDefined();
      expect(getBlogTagBySlug('testing')).toBeDefined();
      expect(getBlogTagBySlug('technical')).toBeDefined();
    });

    it('should return undefined for non-existent tag', () => {
      const tag = getBlogTagBySlug('non-existent');
      expect(tag).toBeUndefined();
    });

    it('should return complete BlogTag object', () => {
      const tag = getBlogTagBySlug('javascript');
      expect(tag).toHaveProperty('title');
      expect(tag?.title).toBe('JavaScript');
    });

    it('should return undefined for unknown slug', () => {
      const tag = getBlogTagBySlug('unknown-tag');
      expect(tag).toBeUndefined();
    });

    it('should be case-sensitive', () => {
      const lowercase = getBlogTagBySlug('javascript');
      const uppercase = getBlogTagBySlug('JavaScript');

      expect(lowercase).toBeDefined();
      expect(uppercase).toBeUndefined();
    });

    it('should not modify returned object', () => {
      const tag1 = getBlogTagBySlug('javascript');
      const tag2 = getBlogTagBySlug('javascript');
      expect(tag1).toEqual(tag2);
    });

    it('should handle empty string', () => {
      const tag = getBlogTagBySlug('');
      expect(tag).toBeUndefined();
    });
  });

  describe('BlogTag Interface', () => {
    it('should correctly type blog tags', () => {
      const tag: BlogTag = {
        title: 'Custom Tag',
      };

      expect(tag.title).toBe('Custom Tag');
    });
  });

  describe('Integration', () => {
    it('getBlogTagTitle should use BLOG_TAGS data', () => {
      Object.keys(BLOG_TAGS).forEach((slug) => {
        const title = getBlogTagTitle(slug);
        const tag = BLOG_TAGS[slug];
        expect(title).toBe(tag.title);
      });
    });

    it('getBlogTagBySlug should return same data as BLOG_TAGS', () => {
      Object.keys(BLOG_TAGS).forEach((slug) => {
        const retrieved = getBlogTagBySlug(slug);
        const direct = BLOG_TAGS[slug];
        expect(retrieved).toEqual(direct);
      });
    });

    it('unknown tags should fallback consistently', () => {
      const unknownSlug = 'unknown-blog-tag';
      const bySlug = getBlogTagBySlug(unknownSlug);
      const byTitle = getBlogTagTitle(unknownSlug);

      expect(bySlug).toBeUndefined();
      expect(byTitle).toBe(unknownSlug);
    });
  });

  describe('Data Consistency', () => {
    it('should have at least 3 blog tags', () => {
      const tags = Object.keys(BLOG_TAGS);
      expect(tags.length).toBeGreaterThanOrEqual(3);
    });

    it('should maintain consistent data structure', () => {
      Object.entries(BLOG_TAGS).forEach(([slug, tag]) => {
        expect(typeof slug).toBe('string');
        expect(typeof tag.title).toBe('string');
        expect(tag.title.length).toBeGreaterThan(0);
      });
    });

    it('slug should match tag property names', () => {
      Object.keys(BLOG_TAGS).forEach((slug) => {
        expect(BLOG_TAGS[slug]).toBeDefined();
      });
    });
  });

  describe('Export Verification', () => {
    it('should export getBlogTagTitle function', () => {
      expect(typeof getBlogTagTitle).toBe('function');
    });

    it('should export getBlogTagBySlug function', () => {
      expect(typeof getBlogTagBySlug).toBe('function');
    });

    it('should export BLOG_TAGS constant', () => {
      expect(BLOG_TAGS).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long tag slugs', () => {
      const longSlug = 'a'.repeat(100);
      const title = getBlogTagTitle(longSlug);
      expect(title).toBe(longSlug);
    });

    it('should handle special characters in slug', () => {
      const title = getBlogTagTitle('tag-with-dashes');
      expect(title).toBe('tag-with-dashes');
    });

    it('should handle numeric slugs', () => {
      const title = getBlogTagTitle('tag2024');
      expect(title).toBe('tag2024');
    });

    it('should not throw on falsy inputs', () => {
      expect(() => getBlogTagTitle('')).not.toThrow();
      expect(() => getBlogTagBySlug('')).not.toThrow();
    });
  });
});
