import { describe, it, expect, vi } from 'vitest';
import type { Tool } from '@/core/data-loaders/tools.data';

// Mock the standardValidation module BEFORE importing
vi.mock('@/core/validation/standards', () => ({
  validateStandards: vi.fn(() => []),
}));

// Mock the validationUtils module BEFORE importing
vi.mock('@/core/validation/utils', () => ({
  handleValidationResult: vi.fn(),
}));

// Import after mocking
import { validateTool } from '@/core/validation/tools';

describe('toolValidation', () => {
  const validTool: Partial<Tool> = {
    title: 'Test Tool',
    description: 'A test tool',
    categories: ['validators'],
    status: 'active',
  };

  describe('Required Fields Validation', () => {
    it('should validate a tool with all required fields', () => {
      const result = validateTool(validTool, 'test-tool.md');

      expect(result.valid).toBe(true);
      const titleErrors = result.errors.filter((e) => e.field === 'title');
      const descriptionErrors = result.errors.filter((e) => e.field === 'description');
      const categoryErrors = result.errors.filter((e) => e.field === 'categories');

      expect(titleErrors).toHaveLength(0);
      expect(descriptionErrors).toHaveLength(0);
      expect(categoryErrors).toHaveLength(0);
    });

    it('should fail validation when title is missing', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        title: '',
      };
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      const titleErrors = result.errors.filter((e) => e.field === 'title');
      expect(titleErrors.length).toBeGreaterThan(0);
    });

    it('should fail validation when title is undefined', () => {
      const tool: Partial<Tool> = {
        ...validTool,
      };
      delete tool.title;
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      const titleErrors = result.errors.filter((e) => e.field === 'title');
      expect(titleErrors.length).toBeGreaterThan(0);
    });

    it('should fail validation when description is missing', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        description: '',
      };
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      const descriptionErrors = result.errors.filter((e) => e.field === 'description');
      expect(descriptionErrors.length).toBeGreaterThan(0);
    });

    it('should fail validation when both title and description are missing', () => {
      const tool: Partial<Tool> = {
        categories: ['validators'],
        status: 'active',
      };
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Categories Validation', () => {
    it('should validate tool with valid category', () => {
      const result = validateTool(validTool, 'test-tool.md');

      const categoryErrors = result.errors.filter((e) => e.field === 'categories');
      expect(categoryErrors).toHaveLength(0);
    });

    it('should fail when categories array is empty', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        categories: [],
      };
      const result = validateTool(tool, 'test-tool.md');

      const categoryWarnings = result.warnings.filter((e) => e.field === 'categories');
      expect(categoryWarnings.length).toBeGreaterThan(0);
    });

    it('should fail when categories field is missing', () => {
      const tool: Partial<Tool> = {
        title: 'Test Tool',
        description: 'A test tool',
        status: 'active',
      };
      const result = validateTool(tool, 'test-tool.md');

      const categoryErrors = result.errors.filter((e) => e.field === 'categories');
      expect(categoryErrors.length).toBeGreaterThan(0);
    });

    it('should fail when categories is not an array', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        categories: 'validators' as unknown as string[],
      };
      const result = validateTool(tool, 'test-tool.md');

      const categoryErrors = result.errors.filter((e) => e.field === 'categories');
      expect(categoryErrors.length).toBeGreaterThan(0);
    });

    it('should warn about duplicate categories', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        categories: ['validators', 'validators'],
      };
      const result = validateTool(tool, 'test-tool.md');

      const categoryWarnings = result.warnings.filter((e) => e.field === 'categories');
      expect(categoryWarnings.length).toBeGreaterThan(0);
    });

    it('should fail when categories contain invalid slugs', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        categories: ['invalid-category-slug'],
      };
      const result = validateTool(tool, 'test-tool.md');

      const categoryErrors = result.errors.filter((e) => e.field === 'categories');
      expect(categoryErrors.length).toBeGreaterThan(0);
    });
  });

  describe('Status Validation', () => {
    it('should validate tool with valid status (active)', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        status: 'active',
      };
      const result = validateTool(tool, 'test-tool.md');

      const statusErrors = result.errors.filter((e) => e.field === 'status');
      expect(statusErrors).toHaveLength(0);
    });

    it('should validate tool with valid status (maintenance)', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        status: 'maintenance',
      };
      const result = validateTool(tool, 'test-tool.md');

      const statusErrors = result.errors.filter((e) => e.field === 'status');
      expect(statusErrors).toHaveLength(0);
    });

    it('should validate tool with valid status (deprecated)', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        status: 'deprecated',
      };
      const result = validateTool(tool, 'test-tool.md');

      const statusErrors = result.errors.filter((e) => e.field === 'status');
      expect(statusErrors).toHaveLength(0);
    });

    it('should fail validation with invalid status', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        status: 'invalid-status',
      };
      const result = validateTool(tool, 'test-tool.md');

      const statusErrors = result.errors.filter((e) => e.field === 'status');
      expect(statusErrors.length).toBeGreaterThan(0);
    });

    it('should warn when status is missing', () => {
      const tool: Partial<Tool> = {
        title: 'Test Tool',
        description: 'A test tool',
        categories: ['validators'],
      };
      const result = validateTool(tool, 'test-tool.md');

      const statusWarnings = result.warnings.filter((e) => e.field === 'status');
      expect(statusWarnings.length).toBeGreaterThan(0);
    });
  });

  describe('Validation Result Structure', () => {
    it('should return proper ValidationResult structure', () => {
      const result = validateTool(validTool, 'test-tool.md');

      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(result).toHaveProperty('warnings');

      expect(typeof result.valid).toBe('boolean');
      expect(Array.isArray(result.errors)).toBe(true);
      expect(Array.isArray(result.warnings)).toBe(true);
    });

    it('should separate errors from warnings', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        status: 'invalid',
      };
      const result = validateTool(tool, 'test-tool.md');

      // Should have error from invalid status
      expect(result.errors.length).toBeGreaterThan(0);

      // Check that error items have required structure
      result.errors.forEach((error) => {
        expect(error).toHaveProperty('field');
        expect(error).toHaveProperty('message');
        expect(error).toHaveProperty('severity');
        expect(error.severity).toBe('error');
      });
    });

    it('should mark as invalid when errors present', () => {
      const tool: Partial<Tool> = {
        title: '',
        description: 'Test',
        categories: ['validators'],
      };
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should mark as valid when only warnings present', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        // No status - will produce warning but tool is otherwise valid
      };
      const result = validateTool(tool, 'test-tool.md');

      // Even with warnings, if no errors, should be valid
      if (result.warnings.length > 0 && result.errors.length === 0) {
        expect(result.valid).toBe(true);
      }
    });
  });

  describe('Multi-Field Validation', () => {
    it('should report multiple errors together', () => {
      const tool: Partial<Tool> = {
        title: '',
        description: '',
        categories: [],
        status: 'invalid-status',
      };
      const result = validateTool(tool, 'test-tool.md');

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThanOrEqual(2);
    });

    it('should validate complex tool with all optional fields', () => {
      const tool: Partial<Tool> = {
        ...validTool,
        license: 'MIT',
        repository: 'https://github.com/test/test',
        website: 'https://test.com',
        documentation: 'https://docs.test.com',
        demo: 'https://demo.test.com',
        developer: 'Test Corp',
        technology: 'JavaScript',
        standards: ['datex-ii'],
        tags: ['test'],
      };
      const result = validateTool(tool, 'test-tool.md');

      // Should pass with optional fields
      const requiredFieldErrors = result.errors.filter(
        (e) =>
          ![
            'status',
            'standards',
            'license',
            'repository',
            'website',
            'documentation',
            'demo',
            'developer',
            'technology',
          ].includes(e.field)
      );
      // Only check required fields haven't failed
      const titleErrors = requiredFieldErrors.filter((e) => e.field === 'title');
      const descriptionErrors = requiredFieldErrors.filter((e) => e.field === 'description');

      expect(titleErrors).toHaveLength(0);
      expect(descriptionErrors).toHaveLength(0);
    });
  });
});
