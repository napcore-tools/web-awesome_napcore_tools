/**
 * VitePress Data Loader for Categories
 *
 * Loads category definitions from categories.yaml at build time.
 * This is a VitePress data loader - the load() function only runs in Node.js at build time,
 * and the returned data gets serialized for use in both SSR and client code.
 *
 * Mirrors standards.data.ts: categories.yaml is the single source of truth and the
 * client-safe wrapper (metadata/categories.ts) builds the public API from this data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { reportParseError } from '../validation/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Complete category definition interface (keyed by slug in the YAML, so the
 * slug itself is not a field here - the wrapper attaches it).
 */
export interface CategoryData {
  title: string; // Display name: 'Data Quality Tools'
  icon: string; // Emoji icon: '📊'
  description: string; // Short description for category cards
  related?: string[]; // Optional array of related category slugs
}

declare const data: Record<string, CategoryData>;
export { data };

export default {
  // VitePress will watch this file for changes and trigger HMR
  watch: ['../../../data/categories.yaml'],

  // This function only runs at build time in Node.js environment
  load(): Record<string, CategoryData> {
    const yamlPath = path.resolve(__dirname, '../../../data/categories.yaml');

    try {
      const content = fs.readFileSync(yamlPath, 'utf-8');
      return (parseYaml(content) as Record<string, CategoryData>) ?? {};
    } catch (e) {
      // Malformed categories.yaml fails the build in production rather than silently
      // dropping every category page; logged in dev so the server stays up.
      reportParseError(`Failed to parse categories.yaml at ${yamlPath}: ${e}`);
      return {};
    }
  },
};
