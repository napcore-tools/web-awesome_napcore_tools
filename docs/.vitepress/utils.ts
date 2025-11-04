// Shared utility functions

/**
 * Create URL-friendly slug from a string
 * @param name - The string to convert to a slug
 * @returns URL-friendly slug (lowercase, hyphenated, no special chars)
 * @example
 * createSlug("DATEX II") // returns "datex-ii"
 * createSlug("mobilityDCAT-AP") // returns "mobilitydcat-ap"
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove non-word characters except hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, ''); // Remove trailing hyphens
}
