import { describe, it, expect } from 'vitest';

// Global mocks in setup.ts provide tools.data, standards.data, and categories mocks

// Import after global mocks are set up
import { getCategoriesSidebar } from '@/core/config/sidebar';

describe('sidebar.ts', () => {
  describe('getCategoriesSidebar', () => {
    it('should return sidebar configuration array', () => {
      const sidebar = getCategoriesSidebar();

      expect(Array.isArray(sidebar)).toBe(true);
      expect(sidebar.length).toBeGreaterThan(0);
    });

    it('should have Tools section with navigation items', () => {
      const sidebar = getCategoriesSidebar();
      const toolsSection = sidebar.find((item: any) => item.text === 'Tools');

      expect(toolsSection).toBeDefined();
      expect(toolsSection.collapsed).toBe(false);
      expect(Array.isArray(toolsSection.items)).toBe(true);
      expect(toolsSection.items.length).toBeGreaterThan(0);
    });

    it('should have By Category section with category items', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');

      expect(categorySection).toBeDefined();
      expect(Array.isArray(categorySection.items)).toBe(true);
      expect(categorySection.items.length).toBeGreaterThan(0);
    });

    it('should have By Standard section with standard items', () => {
      const sidebar = getCategoriesSidebar();
      const standardSection = sidebar.find((item: any) => item.text === 'By Standard');

      expect(standardSection).toBeDefined();
      expect(Array.isArray(standardSection.items)).toBe(true);
    });

    it('should include correct navigation links in Tools section', () => {
      const sidebar = getCategoriesSidebar();
      const toolsSection = sidebar.find((item: any) => item.text === 'Tools');

      const links = toolsSection.items.map((item: any) => item.link);

      expect(links).toContain('categories/');
      expect(links).toContain('standards/');
    });

    it('should have category items with proper structure', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');

      categorySection.items.forEach((item: any) => {
        expect(item).toHaveProperty('text');
        expect(item).toHaveProperty('link');
        expect(typeof item.text).toBe('string');
        expect(typeof item.link).toBe('string');
      });
    });

    it('should include category count badges in text', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');

      categorySection.items.forEach((item: any) => {
        // Count badges are HTML spans
        expect(item.text).toContain('sidebar-badge');
      });
    });

    it('should link to correct category pages', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');

      // Extract links and check they start with /categories/
      categorySection.items.forEach((item: any) => {
        expect(item.link).toMatch(/^\/categories\//);
      });
    });

    it('should have standard items with proper structure', () => {
      const sidebar = getCategoriesSidebar();
      const standardSection = sidebar.find((item: any) => item.text === 'By Standard');

      if (standardSection.items.length > 0) {
        standardSection.items.forEach((item: any) => {
          expect(item).toHaveProperty('text');
          expect(item).toHaveProperty('link');
          expect(typeof item.text).toBe('string');
          expect(typeof item.link).toBe('string');
        });
      }
    });

    it('should include standards sorted alphabetically', () => {
      const sidebar = getCategoriesSidebar();
      const standardSection = sidebar.find((item: any) => item.text === 'By Standard');

      if (standardSection.items.length > 1) {
        const items = standardSection.items;
        for (let i = 0; i < items.length - 1; i++) {
          // Extract title from text (removing HTML badges)
          const title1 = items[i].text.split('<span')[0].trim();
          const title2 = items[i + 1].text.split('<span')[0].trim();
          expect(title1.localeCompare(title2)).toBeLessThanOrEqual(0);
        }
      }
    });

    it('should link to correct standard pages', () => {
      const sidebar = getCategoriesSidebar();
      const standardSection = sidebar.find((item: any) => item.text === 'By Standard');

      if (standardSection.items.length > 0) {
        standardSection.items.forEach((item: any) => {
          expect(item.link).toMatch(/^\/standards\//);
        });
      }
    });

    it('should have consistent section structure', () => {
      const sidebar = getCategoriesSidebar();

      sidebar.forEach((section: any) => {
        expect(section).toHaveProperty('text');
        expect(section).toHaveProperty('items');
        expect(Array.isArray(section.items)).toBe(true);
      });
    });

    it('should have collapsed property for sections', () => {
      const sidebar = getCategoriesSidebar();

      sidebar.forEach((section: any) => {
        if (section.text === 'Tools') {
          expect(section.collapsed).toBe(false);
        } else {
          expect(typeof section.collapsed).toBe('boolean');
        }
      });
    });
  });

  describe('Sidebar Badge Counts', () => {
    it('should include badge with count for categories', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');

      // Each category should have a count badge
      categorySection.items.forEach((item: any) => {
        const matches = item.text.match(/sidebar-badge">(\d+)<\/span>/);
        expect(matches).not.toBeNull();
        const count = parseInt(matches[1], 10);
        expect(count).toBeGreaterThanOrEqual(0);
      });
    });

    it('should include badge with count for standards', () => {
      const sidebar = getCategoriesSidebar();
      const standardSection = sidebar.find((item: any) => item.text === 'By Standard');

      if (standardSection.items.length > 0) {
        standardSection.items.forEach((item: any) => {
          const matches = item.text.match(/sidebar-badge">(\d+)<\/span>/);
          expect(matches).not.toBeNull();
          const count = parseInt(matches[1], 10);
          expect(count).toBeGreaterThanOrEqual(0);
        });
      }
    });

    it('should have correct count for validators category', () => {
      const sidebar = getCategoriesSidebar();
      const categorySection = sidebar.find((item: any) => item.text === 'By Category');
      const validatorsItem = categorySection.items.find((item: any) => item.link.includes('validators'));

      if (validatorsItem) {
        const matches = validatorsItem.text.match(/sidebar-badge">(\d+)<\/span>/);
        const count = parseInt(matches[1], 10);
        expect(count).toBe(3); // tool-1, tool-3, and test-validator are in validators
      }
    });
  });
});
