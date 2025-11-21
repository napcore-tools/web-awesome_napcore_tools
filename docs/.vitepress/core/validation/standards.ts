/**
 * Standard Metadata Validation
 *
 * Validates standard metadata and tool standard references to catch typos and invalid data early.
 * Ensures all standards referenced in tools exist in STANDARDS with complete information.
 */

import standardsDataLoader from '../data-loaders/standards.data';
import type { Standard } from '../data-loaders/standards.data';
import type { Tool } from '../data-loaders/tools.data';
import { type ValidationError, type ValidationResult } from './utils';

/**
 * Validate standard slug format (kebab-case, lowercase, alphanumeric + hyphens only)
 *
 * @param slug - Standard slug to validate
 * @returns Array of validation errors (empty if valid)
 */
function validateStandardSlug(slug: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check if lowercase
  if (slug !== slug.toLowerCase()) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' must be lowercase`,
      severity: 'error',
    });
  }

  // Check for valid characters (alphanumeric and hyphens only)
  const invalidChars = /[^a-z0-9-]/;
  if (invalidChars.test(slug)) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' contains invalid characters (only lowercase letters, numbers, and hyphens allowed)`,
      severity: 'error',
    });
  }

  // Check for kebab-case format (no consecutive hyphens, no leading/trailing hyphens)
  if (slug.startsWith('-') || slug.endsWith('-')) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' cannot start or end with a hyphen`,
      severity: 'error',
    });
  }

  if (slug.includes('--')) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' contains consecutive hyphens (use single hyphens)`,
      severity: 'error',
    });
  }

  return errors;
}

/**
 * Validate standard metadata completeness
 *
 * @param slug - Standard slug being validated
 * @param standard - Standard object to validate
 * @param allStandards - Record of all standards for cross-reference validation
 * @returns Array of validation errors (empty if valid)
 */
function validateStandardMetadata(
  slug: string,
  standard: Standard,
  allStandards: Record<string, Standard>
): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check required fields
  const requiredFields: (keyof Standard)[] = [
    'title',
    'icon',
    'domain',
    'purpose',
    'format_technology',
    'maintainer_origin',
    'status',
  ];

  for (const field of requiredFields) {
    const value = standard[field];
    if (!value || typeof value !== 'string' || value.trim() === '') {
      errors.push({
        field,
        message: `Standard '${slug}' missing required '${field}' field in standards.yaml`,
        severity: 'error',
      });
    }
  }

  // description is optional, no validation needed

  // Validate related_standards if present
  if (standard.related_standards) {
    const validStandardSlugs = new Set(Object.keys(allStandards));

    // Check if it's an array
    if (!Array.isArray(standard.related_standards)) {
      errors.push({
        field: 'related_standards',
        message: `Standard '${slug}' has invalid 'related_standards' field - must be an array`,
        severity: 'error',
      });
    } else {
      // Check for invalid standard slugs
      const invalidStandards = standard.related_standards.filter(
        (relatedSlug: string) => !validStandardSlugs.has(relatedSlug)
      );

      if (invalidStandards.length > 0) {
        const validList = Array.from(validStandardSlugs).sort().join(', ');
        errors.push({
          field: 'related_standards',
          message: `Standard '${slug}' has invalid related_standards: ${invalidStandards.join(', ')}\n   Valid standards are: ${validList}`,
          severity: 'error',
        });
      }

      // Check for duplicates
      const uniqueRelated = new Set(standard.related_standards);
      if (uniqueRelated.size < standard.related_standards.length) {
        const duplicates = standard.related_standards.filter(
          (std: string, index: number) => standard.related_standards!.indexOf(std) !== index
        );
        errors.push({
          field: 'related_standards',
          message: `Standard '${slug}' has duplicate related_standards: ${[...new Set(duplicates)].join(', ')}`,
          severity: 'error',
        });
      }

      // Validate slug format for each related standard
      standard.related_standards.forEach((relatedSlug: string) => {
        const slugErrors = validateStandardSlug(relatedSlug);
        slugErrors.forEach((err) => {
          errors.push({
            ...err,
            message: `Standard '${slug}' related_standards: ${err.message}`,
          });
        });
      });
    }
  }

  return errors;
}

/**
 * Validate tool standards array against STANDARDS
 *
 * @param tool - Partial tool object containing standards field
 * @param _filename - Filename for error reporting (unused)
 * @returns Array of validation errors (empty if valid)
 */
export function validateStandards(tool: Partial<Tool>, _filename: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const standards = standardsDataLoader.load();
  const validStandardSlugs = new Set(Object.keys(standards));

  // Standards field is optional
  if (!tool.standards) {
    return errors;
  }

  // Check if standards is an array
  if (!Array.isArray(tool.standards)) {
    errors.push({
      field: 'standards',
      message: 'Field "standards" must be an array',
      severity: 'error',
    });
    return errors;
  }

  // Warn if standards array is empty
  if (tool.standards.length === 0) {
    errors.push({
      field: 'standards',
      message: 'Standards array is empty - tool will not appear in any standard page',
      severity: 'warning',
    });
    return errors;
  }

  // Check for invalid standard slugs
  const invalidStandards = tool.standards.filter((std: string) => !validStandardSlugs.has(std));

  if (invalidStandards.length > 0) {
    const validList = Array.from(validStandardSlugs).sort().join(', ');
    errors.push({
      field: 'standards',
      message: `Unknown standards: ${invalidStandards.join(', ')}\n   Valid standards are: ${validList}\n   Add missing standards to standards.yaml`,
      severity: 'error',
    });
  }

  // Check for duplicate standards
  const standardsArray = tool.standards;
  const uniqueStandards = new Set(standardsArray);
  if (uniqueStandards.size < standardsArray.length) {
    const duplicates = standardsArray.filter((std: string, index: number) => standardsArray.indexOf(std) !== index);
    errors.push({
      field: 'standards',
      message: `Duplicate standards found: ${[...new Set(duplicates)].join(', ')}`,
      severity: 'error',
    });
  }

  // Validate slug format for each standard
  standardsArray.forEach((slug: string) => {
    errors.push(...validateStandardSlug(slug));
  });

  return errors;
}

/**
 * Validate all standards in STANDARDS (loaded from standards.yaml)
 *
 * @returns Validation result with errors and warnings
 */
export function validateAllStandards(): ValidationResult {
  const allErrors: ValidationError[] = [];
  const standards = standardsDataLoader.load();

  // Validate each standard entry
  for (const [slug, standard] of Object.entries(standards)) {
    // Validate slug format
    allErrors.push(...validateStandardSlug(slug));

    // Validate standard completeness and related_standards
    allErrors.push(...validateStandardMetadata(slug, standard, standards));
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
