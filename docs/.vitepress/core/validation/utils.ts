/**
 * Shared Validation Utilities
 *
 * Common types and functions for validation across the codebase.
 * Used by toolValidation.ts, standardValidation.ts, and potentially others.
 */

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

/**
 * Format validation results for console output
 * @param context - Context string (e.g., filename or "STANDARD_METADATA")
 * @param result - Validation result to format
 * @returns Formatted string for console output
 */
export function formatValidationResult(context: string, result: ValidationResult): string {
  const lines: string[] = [];

  if (result.errors.length > 0) {
    lines.push(`\n❌ Validation FAILED for "${context}":`);
    result.errors.forEach((err) => {
      lines.push(`   - [${err.field}] ${err.message}`);
    });
  }

  if (result.warnings.length > 0) {
    if (result.errors.length === 0) {
      lines.push(`\n⚠️  Validation warnings for "${context}":`);
    }
    result.warnings.forEach((warn) => {
      lines.push(`   - [${warn.field}] ${warn.message}`);
    });
  }

  return lines.join('\n');
}

/**
 * Handle validation result based on environment
 * - Production: throw error if validation fails
 * - Development: log error but don't throw
 * @param context - Context string (e.g., filename or "STANDARD_METADATA")
 * @param result - Validation result to handle
 */
export function handleValidationResult(context: string, result: ValidationResult): void {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!result.valid || result.warnings.length > 0) {
    const message = formatValidationResult(context, result);

    if (!result.valid && isProduction) {
      // Fail build in production
      throw new Error(`Validation failed: ${context}\n${message}`);
    } else {
      // Log to console in dev (or warnings in prod)
      console.error(message);
    }
  }
}

/**
 * Reports a malformed-data (parse) error from a data loader. In a production build
 * (`NODE_ENV=production`, i.e. `docs:build`) it throws so the build fails loudly
 * rather than silently shipping degraded data; in dev it logs and lets the caller
 * continue so the dev server stays up. Same prod-throw convention as
 * handleValidationResult, for parse sites that have no ValidationResult to hand.
 */
export function reportParseError(message: string): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(message);
  }
  console.error(message);
}
