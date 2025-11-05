/**
 * Category Metadata Validation
 *
 * Validates category metadata to catch typos and invalid data early.
 * Ensures all categories in CATEGORIES have complete information and valid related references.
 */

import { CATEGORIES } from './categories';
import type { Category } from './categories';
import { type ValidationError, type ValidationResult } from './validationUtils';

/**
 * Validate category slug format (kebab-case, lowercase, alphanumeric + hyphens only)
 */
function validateCategorySlug(slug: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if lowercase
  if (slug !== slug.toLowerCase()) {
    errors.push({
      field: 'slug',
      message: `Category slug '${slug}' must be lowercase`,
      severity: 'error',
    });
  }

  // Check for valid characters (alphanumeric and hyphens only)
  const invalidChars = /[^a-z0-9-]/;
  if (invalidChars.test(slug)) {
    errors.push({
      field: 'slug',
      message: `Category slug '${slug}' contains invalid characters (only lowercase letters, numbers, and hyphens allowed)`,
      severity: 'error',
    });
  }

  // Check for kebab-case format (no consecutive hyphens, no leading/trailing hyphens)
  if (slug.startsWith('-') || slug.endsWith('-')) {
    errors.push({
      field: 'slug',
      message: `Category slug '${slug}' cannot start or end with a hyphen`,
      severity: 'error',
    });
  }

  if (slug.includes('--')) {
    errors.push({
      field: 'slug',
      message: `Category slug '${slug}' contains consecutive hyphens (use single hyphens)`,
      severity: 'error',
    });
  }

  return errors;
}

/**
 * Validate category metadata completeness
 */
function validateCategoryMetadata(category: Category, allCategories: Category[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const slug = category.slug;

  // Check required fields
  const requiredFields: (keyof Category)[] = ['slug', 'title', 'icon', 'description'];

  for (const field of requiredFields) {
    const value = category[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      errors.push({
        field,
        message: `Category '${slug}' missing required '${field}' field in categories.ts`,
        severity: 'error',
      });
    }
  }

  // Validate related categories if present
  if (category.related) {
    const validCategorySlugs = new Set(allCategories.map((c) => c.slug));

    // Check if it's an array
    if (!Array.isArray(category.related)) {
      errors.push({
        field: 'related',
        message: `Category '${slug}' has invalid 'related' field - must be an array`,
        severity: 'error',
      });
    } else {
      // Check for invalid category slugs
      const invalidCategories = category.related.filter((relatedSlug: string) => !validCategorySlugs.has(relatedSlug));

      if (invalidCategories.length > 0) {
        const validList = Array.from(validCategorySlugs).sort().join(', ');
        errors.push({
          field: 'related',
          message: `Category '${slug}' has invalid related categories: ${invalidCategories.join(', ')}\n   Valid categories are: ${validList}`,
          severity: 'error',
        });
      }

      // Check for self-references
      if (category.related.includes(slug)) {
        errors.push({
          field: 'related',
          message: `Category '${slug}' cannot reference itself in related categories`,
          severity: 'error',
        });
      }

      // Check for duplicates
      const uniqueRelated = new Set(category.related);
      if (uniqueRelated.size < category.related.length) {
        const duplicates = category.related.filter(
          (cat: string, index: number) => category.related!.indexOf(cat) !== index
        );
        errors.push({
          field: 'related',
          message: `Category '${slug}' has duplicate related categories: ${[...new Set(duplicates)].join(', ')}`,
          severity: 'error',
        });
      }

      // Validate slug format for each related category
      category.related.forEach((relatedSlug: string) => {
        const slugErrors = validateCategorySlug(relatedSlug);
        slugErrors.forEach((err) => {
          errors.push({
            ...err,
            message: `Category '${slug}' related: ${err.message}`,
          });
        });
      });
    }
  }

  return errors;
}

/**
 * Validate all categories in CATEGORIES
 */
export function validateAllCategories(): ValidationResult {
  const allErrors: ValidationError[] = [];

  // Validate each category entry
  for (const category of CATEGORIES) {
    // Validate slug format
    allErrors.push(...validateCategorySlug(category.slug));

    // Validate category completeness and related categories
    allErrors.push(...validateCategoryMetadata(category, CATEGORIES));
  }

  // Separate errors and warnings
  const errors = allErrors.filter((e) => e.severity === 'error');
  const warnings = allErrors.filter((e) => e.severity === 'warning');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
