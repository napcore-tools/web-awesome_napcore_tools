/**
 * VitePress Data Loader for Standards
 *
 * Loads standard definitions from standards.yaml at build time.
 * This is a VitePress data loader - the load() function only runs in Node.js at build time,
 * and the returned data gets serialized for use in both SSR and client code.
 */

import fs from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'

/**
 * Complete standard definition interface
 */
export interface Standard {
  title: string                  // Display name of the standard
  longTitle?: string             // Optional long/full title
  icon: string                   // Emoji icon for visual identification
  description?: string           // Optional short description for UI
  domain: string                 // Domain/category (e.g., "Public transport")
  purpose: string                // Detailed purpose description
  format_technology: string      // Technology/format (e.g., "XML", "JSON")
  maintainer_origin: string      // Maintainer organization
  related_standards?: string[]   // Array of related standard slugs
  status: string                 // Status (e.g., "EU standard", "W3C")
}

declare const data: Record<string, Standard>
export { data }

export default {
  // VitePress will watch this file for changes and trigger HMR
  watch: ['../data/standards.yaml'],

  // This function only runs at build time in Node.js environment
  load(): Record<string, Standard> {
    const yamlPath = path.resolve(__dirname, '../data/standards.yaml')

    try {
      const content = fs.readFileSync(yamlPath, 'utf-8')
      const standards = parseYaml(content) as Record<string, Standard>
      return standards
    } catch (e) {
      console.error('Error loading standards.yaml:', e)
      return {}
    }
  }
}
