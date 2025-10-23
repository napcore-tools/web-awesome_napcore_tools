/**
 * Tool Front Matter Validation
 *
 * Validates tool metadata to catch typos and invalid data early.
 * This module is designed to grow as validation requirements expand.
 */

import fs from 'fs'
import { CATEGORIES } from './categories'

// Validation cache - maps filename to last modification time (mtime)
// Stored in Node.js global object to ensure single cache across all module instances
// (VitePress may load this module multiple times in separate contexts)
const globalAny = global as any
if (!globalAny.__toolValidationCache) {
  globalAny.__toolValidationCache = new Map<string, number>()
}
const validationCache: Map<string, number> = globalAny.__toolValidationCache

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

// Valid status values
const VALID_STATUSES = ['active', 'maintenance', 'deprecated'] as const

/**
 * Validate tool categories against defined CATEGORIES
 */
function validateCategories(tool: any, filename: string): ValidationError[] {
  const errors: ValidationError[] = []
  const validCategorySlugs = new Set(CATEGORIES.map(c => c.slug))

  // Check if categories field exists
  if (!tool.categories) {
    errors.push({
      field: 'categories',
      message: 'Missing required field "categories"',
      severity: 'error'
    })
    return errors
  }

  // Check if categories is an array
  if (!Array.isArray(tool.categories)) {
    errors.push({
      field: 'categories',
      message: 'Field "categories" must be an array',
      severity: 'error'
    })
    return errors
  }

  // Warn if categories array is empty
  if (tool.categories.length === 0) {
    errors.push({
      field: 'categories',
      message: 'Categories array is empty - tool will not appear in any category',
      severity: 'warning'
    })
    return errors
  }

  // Check for invalid category slugs
  const invalidCategories = tool.categories.filter(
    (cat: string) => !validCategorySlugs.has(cat)
  )

  if (invalidCategories.length > 0) {
    const validList = Array.from(validCategorySlugs).join(', ')
    errors.push({
      field: 'categories',
      message: `Invalid categories: ${invalidCategories.join(', ')}\n   Valid categories are: ${validList}`,
      severity: 'error'
    })
  }

  // Check for duplicate categories
  const uniqueCategories = new Set(tool.categories)
  if (uniqueCategories.size < tool.categories.length) {
    const duplicates = tool.categories.filter(
      (cat: string, index: number) => tool.categories.indexOf(cat) !== index
    )
    errors.push({
      field: 'categories',
      message: `Duplicate categories found: ${[...new Set(duplicates)].join(', ')}`,
      severity: 'warning'
    })
  }

  return errors
}

/**
 * Validate required fields are present and non-empty
 */
function validateRequiredFields(tool: any, filename: string): ValidationError[] {
  const errors: ValidationError[] = []

  // Check title
  if (!tool.title || typeof tool.title !== 'string' || tool.title.trim() === '') {
    errors.push({
      field: 'title',
      message: 'Missing or empty required field "title"',
      severity: 'error'
    })
  }

  // Check description
  if (!tool.description || typeof tool.description !== 'string' || tool.description.trim() === '') {
    errors.push({
      field: 'description',
      message: 'Missing or empty required field "description"',
      severity: 'error'
    })
  }

  return errors
}

/**
 * Validate status field
 */
function validateStatus(tool: any, filename: string): ValidationError[] {
  const errors: ValidationError[] = []

  // Status is optional, but if present should be valid
  if (tool.status) {
    if (!VALID_STATUSES.includes(tool.status)) {
      errors.push({
        field: 'status',
        message: `Invalid status "${tool.status}". Valid values: ${VALID_STATUSES.join(', ')}`,
        severity: 'error'
      })
    }
  } else {
    errors.push({
      field: 'status',
      message: `Missing status field. Recommended values: ${VALID_STATUSES.join(', ')}`,
      severity: 'warning'
    })
  }

  return errors
}

/**
 * Main validation function - aggregates all validations
 */
export function validateTool(tool: any, filename: string): ValidationResult {
  const allErrors: ValidationError[] = []

  // Run all validations
  allErrors.push(...validateRequiredFields(tool, filename))
  allErrors.push(...validateCategories(tool, filename))
  allErrors.push(...validateStatus(tool, filename))

  // Separate errors and warnings
  const errors = allErrors.filter(e => e.severity === 'error')
  const warnings = allErrors.filter(e => e.severity === 'warning')

  return {
    valid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Format validation results for console output
 */
export function formatValidationResult(
  filename: string,
  result: ValidationResult
): string {
  const lines: string[] = []

  if (result.errors.length > 0) {
    lines.push(`\n❌ Tool "${filename}" validation FAILED:`)
    result.errors.forEach(err => {
      lines.push(`   - [${err.field}] ${err.message}`)
    })
  }

  if (result.warnings.length > 0) {
    if (result.errors.length === 0) {
      lines.push(`\n⚠️  Tool "${filename}" validation warnings:`)
    }
    result.warnings.forEach(warn => {
      lines.push(`   - [${warn.field}] ${warn.message}`)
    })
  }

  return lines.join('\n')
}

/**
 * Handle validation result based on environment
 * - Production: throw error if validation fails
 * - Development: log error but don't throw
 */
export function handleValidationResult(
  filename: string,
  result: ValidationResult
): void {
  const isProduction = process.env.NODE_ENV === 'production'

  if (!result.valid || result.warnings.length > 0) {
    const message = formatValidationResult(filename, result)

    if (!result.valid && isProduction) {
      // Fail build in production
      throw new Error(`Tool validation failed: ${filename}\n${message}`)
    } else {
      // Log to console in dev (or warnings in prod)
      console.error(message)
    }
  }
}

/**
 * Validate tool with mtime-based caching
 *
 * Checks if file has been modified since last validation.
 * If unchanged, skips validation to prevent duplicate messages.
 * If changed or new, runs full validation.
 *
 * @param tool - Tool front matter data
 * @param filename - Tool filename (e.g., 'datex-browser.md')
 * @param filepath - Full path to tool file (for mtime check)
 * @returns ValidationResult
 */
export function validateToolWithCache(
  tool: any,
  filename: string,
  filepath: string
): ValidationResult {
  // Get file modification time
  const stats = fs.statSync(filepath)
  const mtime = stats.mtimeMs
  const cachedMtime = validationCache.get(filename)

  // Check if file unchanged since last validation
  if (cachedMtime === mtime) {
    // File not modified - skip validation, assume previously valid
    return { valid: true, errors: [], warnings: [] }
  }

  // File is new or modified - run full validation
  const result = validateTool(tool, filename)
  handleValidationResult(filename, result)

  // Cache the mtime for next check
  validationCache.set(filename, mtime)

  return result
}
