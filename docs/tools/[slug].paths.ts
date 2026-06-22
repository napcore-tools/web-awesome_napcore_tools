/**
 * VitePress dynamic route paths generator for publiccode-only tool pages.
 *
 * Generates one route per tool that exists in docs/data/publiccode/ but has
 * no hand-crafted .md file in docs/tools/. Tools with a dedicated .md take
 * priority and are excluded here.
 *
 * Params are a merge of two sources (registry overrides win):
 *   1. publiccode.yml  — upstream metadata fetched by sync-publiccode.mjs
 *   2. publiccode-registry.yaml — NAPCORE-specific overrides (categories,
 *      standards, endorsed, etc.) that have no equivalent in the standard
 *
 * See PUBLICCODE.md for the full field reference and override documentation.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { type PubliccodeRecord, loadRegistry, toolFromPubliccode } from '../.vitepress/core/data-loaders/tools.data';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  paths() {
    const publiccodeDir = path.resolve(__dirname, '../data/publiccode');
    const registryPath = path.resolve(__dirname, '../data/publiccode-registry.yaml');
    // toolsDir is the same directory as this file — used to discover hand-crafted .md files
    const toolsDir = __dirname;

    const registry = loadRegistry(registryPath);

    // Collect slugs that already have a dedicated .md page; those tools are skipped below
    const existingSlugs = new Set(
      fs
        .readdirSync(toolsDir)
        .filter((f) => f.endsWith('.md') && !f.startsWith('[') && f !== 'index.md')
        .map((f) => f.replace('.md', ''))
    );

    if (!fs.existsSync(publiccodeDir)) return [];

    const results = [];

    for (const entry of fs.readdirSync(publiccodeDir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
      const dirName = entry.name;
      // Hand-crafted pages take priority — skip tools that already have one
      if (existingSlugs.has(dirName)) continue;

      let publiccodeRecord: PubliccodeRecord = {};
      try {
        publiccodeRecord =
          (parseYaml(
            fs.readFileSync(path.join(publiccodeDir, dirName, 'publiccode.yml'), 'utf-8')
          ) as PubliccodeRecord) ?? {};
      } catch {
        continue;
      }

      const tool = toolFromPubliccode(dirName, registry[dirName]?.['napcore-tools'], publiccodeRecord);
      if (!tool) continue;

      results.push({
        params: {
          slug: tool.slug, // VitePress route parameter — matches [slug] in filename
          title: tool.title, // picked up by transformPageData in config.ts to set <title>
          tool, // full typed Tool object
          publiccode: publiccodeRecord, // raw publiccode.yml — for fields beyond Tool
        },
      });
    }

    return results;
  },
};
