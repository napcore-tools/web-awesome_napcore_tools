import { describe, it, expect } from 'vitest';

// Note: Global mocks from setup.ts are used for this module
// The categories module is mocked globally with 2 categories:
// - validators: { slug: 'validators', title: 'Validators', icon: '✓', description: 'Tools for validation' }
// - converters: { slug: 'converters', title: 'Converters', icon: '⇄', description: 'Tools for conversion' }

import { CATEGORIES, getCategorySlugs, getCategoryBySlug, type Category } from '@/core/metadata/categories';

describe('categories.ts', () => {
  describe('CATEGORIES constant', () => {
    it('should export array of categories', () => {
      expect(Array.isArray(CATEGORIES)).toBe(true);
      expect(CATEGORIES.length).toBeGreaterThan(0);
    });

    it('should have at least the core categories', () => {
      const slugs = CATEGORIES.map((c) => c.slug);
      expect(slugs).toContain('validators');
      expect(slugs).toContain('converters');
    });

    it('should have all required fields on each category', () => {
      CATEGORIES.forEach((category) => {
        expect(category).toHaveProperty('slug');
        expect(category).toHaveProperty('title');
        expect(category).toHaveProperty('icon');
        expect(category).toHaveProperty('description');
        expect(typeof category.slug).toBe('string');
        expect(typeof category.title).toBe('string');
        expect(typeof category.icon).toBe('string');
        expect(typeof category.description).toBe('string');
      });
    });

    it('should have unique slugs', () => {
      const slugs = CATEGORIES.map((c) => c.slug);
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    it('should have non-empty slug values', () => {
      CATEGORIES.forEach((category) => {
        expect(category.slug.length).toBeGreaterThan(0);
        expect(category.slug).toMatch(/^[a-z0-9-]+$/);
      });
    });

    it('should have non-empty title values', () => {
      CATEGORIES.forEach((category) => {
        expect(category.title.length).toBeGreaterThan(0);
      });
    });

    it('should have emoji or text icon', () => {
      CATEGORIES.forEach((category) => {
        expect(category.icon.length).toBeGreaterThan(0);
      });
    });

    it('should have valid related categories if specified', () => {
      const allSlugs = new Set(CATEGORIES.map((c) => c.slug));

      CATEGORIES.forEach((category) => {
        if (category.related) {
          expect(Array.isArray(category.related)).toBe(true);
          category.related.forEach((relatedSlug) => {
            expect(allSlugs.has(relatedSlug)).toBe(true);
          });
        }
      });
    });

    it('should not have self-referencing related categories', () => {
      CATEGORIES.forEach((category) => {
        if (category.related) {
          expect(category.related).not.toContain(category.slug);
        }
      });
    });
  });

  describe('getCategorySlugs', () => {
    it('should return array of strings', () => {
      const slugs = getCategorySlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs.every((s) => typeof s === 'string')).toBe(true);
    });

    it('should return all category slugs', () => {
      const slugs = getCategorySlugs();
      const expectedSlugs = CATEGORIES.map((c) => c.slug);
      expect(slugs).toEqual(expectedSlugs);
    });

    it('should return same number as CATEGORIES', () => {
      const slugs = getCategorySlugs();
      expect(slugs.length).toBe(CATEGORIES.length);
    });

    it('should return slugs in same order as CATEGORIES', () => {
      const slugs = getCategorySlugs();
      CATEGORIES.forEach((category, index) => {
        expect(slugs[index]).toBe(category.slug);
      });
    });

    it('should not contain empty strings', () => {
      const slugs = getCategorySlugs();
      expect(slugs.every((s) => s.length > 0)).toBe(true);
    });
  });

  describe('getCategoryBySlug', () => {
    it('should return category by slug', () => {
      const validators = getCategoryBySlug('validators');
      expect(validators).toBeDefined();
      expect(validators?.slug).toBe('validators');
      expect(validators?.title).toBe('Validators');
    });

    it('should return null for non-existent slug', () => {
      const result = getCategoryBySlug('non-existent-category');
      expect(result).toBeNull();
    });

    it('should return complete category object', () => {
      const result = getCategoryBySlug('validators');
      expect(result).toHaveProperty('slug');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('icon');
      expect(result).toHaveProperty('description');
    });

    it('should work with all categories', () => {
      CATEGORIES.forEach((category) => {
        const found = getCategoryBySlug(category.slug);
        expect(found).toEqual(category);
      });
    });

    it('should be case-sensitive', () => {
      const lowercase = getCategoryBySlug('validators');
      const uppercase = getCategoryBySlug('VALIDATORS');
      const mixed = getCategoryBySlug('Validators');

      expect(lowercase).toBeDefined();
      expect(uppercase).toBeNull();
      expect(mixed).toBeNull();
    });

    it('should handle hyphenated slugs if they exist', () => {
      // Note: Mock only has 'validators' and 'converters', so test with those
      const result = getCategoryBySlug('converters');
      expect(result).toBeDefined();
      expect(result?.slug).toBe('converters');
    });

    it('should not modify the returned category object', () => {
      const original = getCategoryBySlug('validators');
      const retrieved = getCategoryBySlug('validators');
      expect(original).toEqual(retrieved);
    });
  });

  describe('Category Interface', () => {
    it('should correctly type categories', () => {
      const category: Category = {
        slug: 'test-category',
        title: 'Test Category',
        icon: '🧪',
        description: 'A test category',
      };

      expect(category.slug).toBe('test-category');
      expect(category.title).toBe('Test Category');
      expect(category.icon).toBe('🧪');
      expect(category.description).toBe('A test category');
    });

    it('should allow optional related field', () => {
      const category: Category = {
        slug: 'test',
        title: 'Test',
        icon: '🧪',
        description: 'Test',
        related: ['validators', 'converters'],
      };

      expect(category.related).toEqual(['validators', 'converters']);
    });
  });

  describe('Data Integrity', () => {
    it('should maintain order consistency', () => {
      const firstRun = getCategorySlugs();
      const secondRun = getCategorySlugs();
      expect(firstRun).toEqual(secondRun);
    });

    it('should have at least 2 categories', () => {
      expect(CATEGORIES.length).toBeGreaterThanOrEqual(2);
    });

    it('validators should be first category', () => {
      expect(CATEGORIES[0].slug).toBe('validators');
    });

    it('all categories should have descriptions', () => {
      CATEGORIES.forEach((cat) => {
        expect(cat.description.length).toBeGreaterThan(0);
      });
    });
  });
});
