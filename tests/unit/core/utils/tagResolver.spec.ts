import { describe, it, expect, vi } from 'vitest';

// Mock categories module BEFORE importing
vi.mock('@/core/metadata/categories', () => ({
  getCategoryBySlug: vi.fn((slug: string) => {
    const categories: Record<string, { title: string; slug: string }> = {
      validators: { slug: 'validators', title: 'Validators' },
      converters: { slug: 'converters', title: 'Converters' },
    };
    return categories[slug] || null;
  }),
  CATEGORIES: [
    { slug: 'validators', title: 'Validators' },
    { slug: 'converters', title: 'Converters' },
  ],
}));

// Mock standards module BEFORE importing
vi.mock('@/core/metadata/standards', () => ({
  STANDARDS: {
    'datex-ii': { title: 'DATEX II' },
    netex: { title: 'NeTEx' },
  },
}));

// Mock blogTags module BEFORE importing
vi.mock('@/core/metadata/blogTags', () => ({
  getBlogTagTitle: vi.fn((slug: string) => {
    const blogTags: Record<string, string> = {
      technical: 'Technical',
      release: 'Release',
    };
    return blogTags[slug] || slug;
  }),
}));

// Import after mocking
import { resolveTag, resolveTags } from '@/core/utils/tagResolver';

describe('tagResolver.ts', () => {
  describe('resolveTag', () => {
    describe('Category Tag Resolution', () => {
      it('should resolve category tag correctly', () => {
        const resolved = resolveTag('validators');

        expect(resolved.slug).toBe('validators');
        expect(resolved.title).toBe('Validators');
        expect(resolved.type).toBe('category');
        expect(resolved.url).toBe('/categories/validators');
      });

      it('should resolve multiple category tags', () => {
        const validators = resolveTag('validators');
        const converters = resolveTag('converters');

        expect(validators.type).toBe('category');
        expect(converters.type).toBe('category');
        expect(validators.title).toBe('Validators');
        expect(converters.title).toBe('Converters');
      });

      it('should have correct URL for category tag', () => {
        const resolved = resolveTag('validators');
        expect(resolved.url).toMatch(/^\/categories\//);
      });
    });

    describe('Standard Tag Resolution', () => {
      it('should resolve standard tag correctly', () => {
        const resolved = resolveTag('datex-ii');

        expect(resolved.slug).toBe('datex-ii');
        expect(resolved.title).toBe('DATEX II');
        expect(resolved.type).toBe('standard');
        expect(resolved.url).toBe('/standards/datex-ii');
      });

      it('should resolve multiple standard tags', () => {
        const datex = resolveTag('datex-ii');
        const netex = resolveTag('netex');

        expect(datex.type).toBe('standard');
        expect(netex.type).toBe('standard');
        expect(datex.title).toBe('DATEX II');
        expect(netex.title).toBe('NeTEx');
      });

      it('should have correct URL for standard tag', () => {
        const resolved = resolveTag('datex-ii');
        expect(resolved.url).toMatch(/^\/standards\//);
      });
    });

    describe('Blog Tag Resolution', () => {
      it('should resolve blog-specific tag correctly', () => {
        const resolved = resolveTag('technical');

        expect(resolved.slug).toBe('technical');
        expect(resolved.title).toBe('Technical');
        expect(resolved.type).toBe('blog-tag');
        expect(resolved.url).toContain('/blog?tag=');
      });

      it('should fallback to slug for unknown blog tags', () => {
        const resolved = resolveTag('unknown-tag');

        expect(resolved.slug).toBe('unknown-tag');
        expect(resolved.title).toBe('unknown-tag');
        expect(resolved.type).toBe('blog-tag');
        expect(resolved.url).toContain('unknown-tag');
      });

      it('should URL-encode blog tag in URL', () => {
        const resolved = resolveTag('tag with spaces');

        expect(resolved.url).toContain(encodeURIComponent('tag with spaces'));
      });

      it('should have correct URL format for blog tag', () => {
        const resolved = resolveTag('technical');
        expect(resolved.url).toMatch(/^\/blog\?tag=/);
      });
    });

    describe('Resolution Priority', () => {
      it('should prioritize category over standard if both exist', () => {
        // Create a scenario where tag could match both (hypothetically)
        // In practice, categories and standards have different slugs
        const resolved = resolveTag('validators');
        expect(resolved.type).toBe('category');
      });

      it('should resolve to category before blog-tag', () => {
        const resolved = resolveTag('validators');
        expect(resolved.type).toBe('category');
        expect(resolved.type).not.toBe('blog-tag');
      });

      it('should resolve to standard before blog-tag', () => {
        const resolved = resolveTag('datex-ii');
        expect(resolved.type).toBe('standard');
        expect(resolved.type).not.toBe('blog-tag');
      });
    });

    describe('Return Value Structure', () => {
      it('should return ResolvedTag interface', () => {
        const resolved = resolveTag('validators');

        expect(resolved).toHaveProperty('slug');
        expect(resolved).toHaveProperty('title');
        expect(resolved).toHaveProperty('type');
        expect(resolved).toHaveProperty('url');
      });

      it('should have non-empty string properties', () => {
        const resolved = resolveTag('validators');

        expect(typeof resolved.slug).toBe('string');
        expect(resolved.slug.length).toBeGreaterThan(0);

        expect(typeof resolved.title).toBe('string');
        expect(resolved.title.length).toBeGreaterThan(0);

        expect(typeof resolved.url).toBe('string');
        expect(resolved.url.length).toBeGreaterThan(0);
      });

      it('should have valid TagType', () => {
        const validTypes = ['category', 'standard', 'blog-tag'];

        const categoryTag = resolveTag('validators');
        expect(validTypes).toContain(categoryTag.type);

        const standardTag = resolveTag('datex-ii');
        expect(validTypes).toContain(standardTag.type);

        const blogTag = resolveTag('technical');
        expect(validTypes).toContain(blogTag.type);
      });
    });
  });

  describe('resolveTags', () => {
    it('should resolve empty array', () => {
      const resolved = resolveTags([]);

      expect(Array.isArray(resolved)).toBe(true);
      expect(resolved).toHaveLength(0);
    });

    it('should resolve array of tags', () => {
      const resolved = resolveTags(['validators', 'datex-ii', 'technical']);

      expect(Array.isArray(resolved)).toBe(true);
      expect(resolved).toHaveLength(3);
    });

    it('should resolve multiple category tags', () => {
      const resolved = resolveTags(['validators', 'converters']);

      expect(resolved).toHaveLength(2);
      expect(resolved[0].type).toBe('category');
      expect(resolved[1].type).toBe('category');
    });

    it('should resolve mixed tag types', () => {
      const resolved = resolveTags(['validators', 'datex-ii', 'technical']);

      expect(resolved[0].type).toBe('category');
      expect(resolved[1].type).toBe('standard');
      expect(resolved[2].type).toBe('blog-tag');
    });

    it('should preserve order of tags', () => {
      const tags = ['datex-ii', 'validators', 'technical'];
      const resolved = resolveTags(tags);

      expect(resolved[0].slug).toBe('datex-ii');
      expect(resolved[1].slug).toBe('validators');
      expect(resolved[2].slug).toBe('technical');
    });

    it('should handle duplicate tags', () => {
      const resolved = resolveTags(['validators', 'validators']);

      expect(resolved).toHaveLength(2);
      expect(resolved[0]).toEqual(resolved[1]);
    });

    it('should return array of ResolvedTag objects', () => {
      const resolved = resolveTags(['validators', 'datex-ii']);

      resolved.forEach((tag) => {
        expect(tag).toHaveProperty('slug');
        expect(tag).toHaveProperty('title');
        expect(tag).toHaveProperty('type');
        expect(tag).toHaveProperty('url');
      });
    });
  });

  describe('URL Generation', () => {
    it('should generate absolute URLs starting with /', () => {
      const categoryTag = resolveTag('validators');
      const standardTag = resolveTag('datex-ii');
      const blogTag = resolveTag('technical');

      expect(categoryTag.url).toMatch(/^\//);
      expect(standardTag.url).toMatch(/^\//);
      expect(blogTag.url).toMatch(/^\//);
    });

    it('should handle special characters in tag slugs', () => {
      const resolved = resolveTag('tag-with-dashes');

      expect(resolved.slug).toBe('tag-with-dashes');
      expect(resolved.url).toContain('tag-with-dashes');
    });

    it('should properly encode spaces in blog tag URLs', () => {
      const resolved = resolveTag('tag with spaces');
      const encoded = encodeURIComponent('tag with spaces');

      expect(resolved.url).toContain(encoded);
      expect(resolved.url).not.toContain(' ');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string tag', () => {
      const resolved = resolveTag('');

      expect(resolved.slug).toBe('');
      expect(resolved.type).toBe('blog-tag');
    });

    it('should handle tag with special characters', () => {
      const resolved = resolveTag('tag@special#chars');

      expect(resolved.slug).toBe('tag@special#chars');
    });

    it('should handle case-sensitive tags', () => {
      const lowercase = resolveTag('validators');
      const uppercase = resolveTag('VALIDATORS');

      // Categories are lowercase, so uppercase should be blog-tag
      expect(lowercase.type).toBe('category');
      expect(uppercase.type).toBe('blog-tag');
    });

    it('should handle very long tag slugs', () => {
      const longTag = 'a'.repeat(100);
      const resolved = resolveTag(longTag);

      expect(resolved.slug).toBe(longTag);
      expect(typeof resolved.title).toBe('string');
    });
  });
});
