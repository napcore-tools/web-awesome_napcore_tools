/**
 * Standard Metadata Validation
 *
 * Validates standard metadata and tool standard references to catch typos and invalid data early.
 * Ensures all standards referenced in tools exist in STANDARD_METADATA with complete information.
 */

import { STANDARD_METADATA, type StandardMetadata } from './standards'
import type { Tool } from './tools.data'
import {
  type ValidationError,
  type ValidationResult,
} from './validationUtils'

/**
 * Validate standard slug format (kebab-case, lowercase, alphanumeric + hyphens only)
 */
function validateStandardSlug(slug: string): ValidationError[] {
  const errors: ValidationError[] = []

  // Check if lowercase
  if (slug !== slug.toLowerCase()) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' must be lowercase`,
      severity: 'error'
    })
  }

  // Check for valid characters (alphanumeric and hyphens only)
  const invalidChars = /[^a-z0-9-]/
  if (invalidChars.test(slug)) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' contains invalid characters (only lowercase letters, numbers, and hyphens allowed)`,
      severity: 'error'
    })
  }

  // Check for kebab-case format (no consecutive hyphens, no leading/trailing hyphens)
  if (slug.startsWith('-') || slug.endsWith('-')) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' cannot start or end with a hyphen`,
      severity: 'error'
    })
  }

  if (slug.includes('--')) {
    errors.push({
      field: 'standards',
      message: `Standard slug '${slug}' contains consecutive hyphens (use single hyphens)`,
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validate standard metadata completeness
 */
function validateStandardMetadata(slug: string, metadata: StandardMetadata): ValidationError[] {
  const errors: ValidationError[] = []

  // Check title field
  if (!metadata.title || typeof metadata.title !== 'string' || metadata.title.trim() === '') {
    errors.push({
      field: 'title',
      message: `Standard '${slug}' missing required 'title' field in STANDARD_METADATA`,
      severity: 'error'
    })
  }

  // Check icon field
  if (!metadata.icon || typeof metadata.icon !== 'string' || metadata.icon.trim() === '') {
    errors.push({
      field: 'icon',
      message: `Standard '${slug}' missing required 'icon' field in STANDARD_METADATA`,
      severity: 'error'
    })
  }

  // Description is optional, no validation needed

  return errors
}

/**
 * Validate tool standards array against STANDARD_METADATA
 */
export function validateStandards(tool: Partial<Tool>, _filename: string): ValidationError[] {
  const errors: ValidationError[] = []
  const validStandardSlugs = new Set(Object.keys(STANDARD_METADATA))

  // Standards field is optional
  if (!tool.standards) {
    return errors
  }

  // Check if standards is an array
  if (!Array.isArray(tool.standards)) {
    errors.push({
      field: 'standards',
      message: 'Field "standards" must be an array',
      severity: 'error'
    })
    return errors
  }

  // Warn if standards array is empty
  if (tool.standards.length === 0) {
    errors.push({
      field: 'standards',
      message: 'Standards array is empty - tool will not appear in any standard page',
      severity: 'warning'
    })
    return errors
  }

  // Check for invalid standard slugs
  const invalidStandards = tool.standards.filter(
    (std: string) => !validStandardSlugs.has(std)
  )

  if (invalidStandards.length > 0) {
    const validList = Array.from(validStandardSlugs).sort().join(', ')
    errors.push({
      field: 'standards',
      message: `Unknown standards: ${invalidStandards.join(', ')}\n   Valid standards are: ${validList}\n   Add missing standards to STANDARD_METADATA in standards.ts`,
      severity: 'error'
    })
  }

  // Check for duplicate standards
  const uniqueStandards = new Set(tool.standards)
  if (uniqueStandards.size < tool.standards.length) {
    const duplicates = tool.standards.filter(
      (std: string, index: number) => tool.standards.indexOf(std) !== index
    )
    errors.push({
      field: 'standards',
      message: `Duplicate standards found: ${[...new Set(duplicates)].join(', ')}`,
      severity: 'error'
    })
  }

  // Validate slug format for each standard
  tool.standards.forEach((slug: string) => {
    errors.push(...validateStandardSlug(slug))
  })

  return errors
}

/**
 * Validate all standards in STANDARD_METADATA
 */
export function validateAllStandards(): ValidationResult {
  const allErrors: ValidationError[] = []

  // Validate each standard entry
  for (const [slug, metadata] of Object.entries(STANDARD_METADATA)) {
    // Validate slug format
    allErrors.push(...validateStandardSlug(slug))

    // Validate metadata completeness
    allErrors.push(...validateStandardMetadata(slug, metadata))
  }

  // Separate errors and warnings
  const errors = allErrors.filter(e => e.severity === 'error')
  const warnings = allErrors.filter(e => e.severity === 'warning')

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}
