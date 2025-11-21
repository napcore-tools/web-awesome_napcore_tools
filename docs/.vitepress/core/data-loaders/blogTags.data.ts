/**
 * VitePress Data Loader for Blog Tags
 *
 * Loads blog tag definitions from blogTags.yaml at build time.
 * This is a VitePress data loader - the load() function only runs in Node.js at build time,
 * and the returned data gets serialized for use in both SSR and client code.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Blog tag definition interface
 * Currently only has title, but extensible for future fields like description, color, icon
 */
export interface BlogTag {
  title: string; // Display title of the tag
}

declare const data: Record<string, BlogTag>;
export { data };

export default {
  // VitePress will watch this file for changes and trigger HMR
  watch: ['../../../data/blogTags.yaml'],

  // This function only runs at build time in Node.js environment
  load(): Record<string, BlogTag> {
    const yamlPath = path.resolve(__dirname, '../../../data/blogTags.yaml');

    try {
      const content = fs.readFileSync(yamlPath, 'utf-8');
      return parseYaml(content) as Record<string, BlogTag>;
    } catch (e) {
      console.error('Error loading blogTags.yaml:', e);
      return {};
    }
  },
};
