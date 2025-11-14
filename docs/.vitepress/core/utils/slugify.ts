/**
 * Convert a string to a URL-friendly slug format
 * Converts to lowercase, replaces spaces with hyphens, removes special characters
 *
 * @param text - Text to convert to slug
 * @returns Slugified version of the text
 * @example
 * createSlug('DATEX II') => 'datex-ii'
 * createSlug('datex-ii') => 'datex-ii'
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]/g, ''); // Remove non-word characters except hyphens
}
