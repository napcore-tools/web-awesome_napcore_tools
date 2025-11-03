/**
 * STANDARDS MODULE - Client-safe standard metadata access
 *
 * This module is safe to import in both Node.js (build time) and browser (client) code.
 * The actual data is loaded from standards.yaml via the VitePress data loader (standards.data.ts).
 */

import { data as STANDARDS } from './standards.data'
import type { Standard } from './standards.data'

// Re-export the Standard interface for convenience
export type { Standard }

/**
 * For backward compatibility - subset of Standard interface
 * Used by components that only need title, icon, description
 */
export interface StandardMetadata {
  title: string
  icon: string
  description?: string
}

/**
 * Get metadata for a standard, with fallback to default values
 * @param standardSlug - The slugified standard name (e.g., 'datex-ii')
 * @returns StandardMetadata object with title, icon, description
 *
 * Note: This function maintains backward compatibility by returning
 * only the UI-relevant fields (title, icon, description)
 */
export function getStandardMetadata(standardSlug: string): StandardMetadata {
  const standard = STANDARDS[standardSlug]

  if (standard) {
    return {
      title: standard.title,
      icon: standard.icon,
      description: standard.description
    }
  }

  // Fallback for unknown standards
  return {
    title: standardSlug,     // Use slug as title if metadata not found
    icon: '📄',              // Default icon for unknown standards
    description: undefined
  }
}

/**
 * Export the complete standards data for modules that need full details
 */
export { STANDARDS }
