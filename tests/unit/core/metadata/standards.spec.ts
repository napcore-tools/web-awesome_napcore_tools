import { describe, it, expect } from 'vitest';

// Note: Global mocks from setup.ts are used for this module
// The standards module is mocked globally with:
// - datex-ii: { title: 'DATEX II', icon: '📋', description: 'Data Exchange Format' }
// - netex: { title: 'NeTEx', icon: '📊', description: 'Network and Schedule Timetable' }

import { getStandardMetadata, STANDARDS, type StandardMetadata } from '@/core/metadata/standards';

describe('standards.ts', () => {
  describe('STANDARDS constant', () => {
    it('should be an object', () => {
      expect(typeof STANDARDS).toBe('object');
      expect(STANDARDS).not.toBeNull();
    });

    it('should contain known standards', () => {
      expect(STANDARDS['datex-ii']).toBeDefined();
      expect(STANDARDS['netex']).toBeDefined();
    });

    it('should have datex-ii with correct properties', () => {
      const datex = STANDARDS['datex-ii'];
      expect(datex.title).toBe('DATEX II');
      expect(datex.icon).toBe('📋');
      expect(datex.description).toContain('Data Exchange Format');
    });

    it('should have netex with correct properties', () => {
      const netex = STANDARDS['netex'];
      expect(netex.title).toBe('NeTEx');
      expect(netex.icon).toBe('📊');
      expect(netex.description).toContain('Network and Schedule Timetable');
    });
  });

  describe('getStandardMetadata', () => {
    it('should return metadata for existing standard', () => {
      const metadata = getStandardMetadata('datex-ii');

      expect(metadata).toHaveProperty('title');
      expect(metadata).toHaveProperty('icon');
      expect(metadata).toHaveProperty('description');
      expect(metadata.title).toBe('DATEX II');
      expect(metadata.icon).toBe('📋');
    });

    it('should return StandardMetadata interface', () => {
      const metadata = getStandardMetadata('datex-ii');

      expect(typeof metadata.title).toBe('string');
      expect(typeof metadata.icon).toBe('string');
      expect(metadata.title.length).toBeGreaterThan(0);
      expect(metadata.icon.length).toBeGreaterThan(0);
    });

    it('should work with multiple standards', () => {
      const datex = getStandardMetadata('datex-ii');
      const netex = getStandardMetadata('netex');

      expect(datex.title).toBe('DATEX II');
      expect(netex.title).toBe('NeTEx');
    });

    it('should handle unknown standard with fallback', () => {
      const metadata = getStandardMetadata('unknown-standard');

      expect(metadata.title).toBe('unknown-standard');
      expect(metadata.icon).toBe('📄');
      expect(metadata.description).toBeUndefined();
    });

    it('should use slug as title for unknown standards', () => {
      const metadata = getStandardMetadata('custom-standard');
      expect(metadata.title).toBe('custom-standard');
    });

    it('should use default icon for unknown standards', () => {
      const metadata = getStandardMetadata('unknown');
      expect(metadata.icon).toBe('📄');
    });

    it('should have undefined description for unknown standards', () => {
      const metadata = getStandardMetadata('unknown');
      expect(metadata.description).toBeUndefined();
    });

    it('should preserve original description for known standards', () => {
      const metadata = getStandardMetadata('datex-ii');
      expect(metadata.description).toBeDefined();
      expect(metadata.description).toContain('Data Exchange Format');
    });

    it('should be case-sensitive for standard slug lookup', () => {
      const lowercase = getStandardMetadata('datex-ii');
      const uppercase = getStandardMetadata('DATEX-II');

      expect(lowercase.title).toBe('DATEX II');
      expect(uppercase.title).toBe('DATEX-II'); // Fallback
      expect(uppercase.icon).toBe('📄'); // Default icon
    });

    it('should handle empty string', () => {
      const metadata = getStandardMetadata('');
      expect(metadata.title).toBe('');
      expect(metadata.icon).toBe('📄');
    });
  });

  describe('StandardMetadata Interface', () => {
    it('should correctly type metadata', () => {
      const metadata: StandardMetadata = {
        title: 'Test Standard',
        icon: '📋',
        description: 'A test standard',
      };

      expect(metadata.title).toBe('Test Standard');
      expect(metadata.icon).toBe('📋');
      expect(metadata.description).toBe('A test standard');
    });

    it('should allow optional description', () => {
      const metadata: StandardMetadata = {
        title: 'Test',
        icon: '📋',
      };

      expect(metadata.title).toBe('Test');
      expect(metadata.description).toBeUndefined();
    });
  });

  describe('Metadata Export', () => {
    it('should have all required exports', () => {
      expect(getStandardMetadata).toBeDefined();
      expect(STANDARDS).toBeDefined();
    });

    it('should export Standard type', () => {
      // Type is exported, just verify the file doesn't error on import
      expect(true).toBe(true);
    });
  });

  describe('Data Consistency', () => {
    it('should have consistent data structure for all standards', () => {
      Object.entries(STANDARDS).forEach(([_slug, standard]) => {
        expect(standard).toHaveProperty('title');
        expect(standard).toHaveProperty('icon');
        expect(typeof standard.title).toBe('string');
        expect(typeof standard.icon).toBe('string');
        expect(standard.title.length).toBeGreaterThan(0);
        expect(standard.icon.length).toBeGreaterThan(0);
      });
    });

    it('should return same data structure for known and fallback', () => {
      const known = getStandardMetadata('datex-ii');
      const unknown = getStandardMetadata('unknown');

      expect(known).toHaveProperty('title');
      expect(known).toHaveProperty('icon');
      expect(unknown).toHaveProperty('title');
      expect(unknown).toHaveProperty('icon');
    });

    it('should have at least 2 standards defined', () => {
      const standardKeys = Object.keys(STANDARDS);
      expect(standardKeys.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Edge Cases', () => {
    it('should handle standards with special characters in description', () => {
      const metadata = getStandardMetadata('datex-ii');
      // Should not throw
      expect(metadata.title).toBeDefined();
    });

    it('should handle very long slug', () => {
      const longSlug = 'a'.repeat(100);
      const metadata = getStandardMetadata(longSlug);
      expect(metadata.title).toBe(longSlug);
    });

    it('should handle hyphenated slugs', () => {
      const metadata = getStandardMetadata('datex-ii');
      expect(metadata).toBeDefined();
      expect(metadata.title).toBe('DATEX II');
    });
  });
});
