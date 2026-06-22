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
import {
  type PubliccodeRecord,
  type Tool,
  loadRegistry,
  toolFromPubliccode,
} from '../.vitepress/core/data-loaders/tools.data';
import { reportParseError } from '../.vitepress/core/validation/utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Builds a hidden, search-only text block from a tool's metadata.
 *
 * These pages are rendered entirely by <ToolPubliccodeView> from route params, so
 * their content is invisible to VitePress local search, which indexes the rendered
 * markdown, not Vue component output. Returning this block as the page `content`
 * gives the indexer real text to find. It is visually hidden (display:none), so it
 * doesn't duplicate what the component already shows on screen, but the indexer —
 * which reads the HTML string and ignores CSS — still picks it up.
 */
function buildSearchContent(tool: Tool, pc: PubliccodeRecord): string {
  const loc = (pc.localisation as PubliccodeRecord) ?? {};
  const org = (pc.organisation as PubliccodeRecord) ?? {};
  const funded = (pc.fundedBy as PubliccodeRecord[]) ?? [];

  const terms = [
    tool.title,
    tool.description,
    tool.longDescription,
    tool.developer,
    tool.maintainedBy,
    tool.license,
    pc.softwareType as string,
    org.name as string,
    ...(tool.features ?? []),
    ...(tool.categories ?? []),
    ...(tool.standards ?? []),
    ...(tool.tags ?? []),
    ...((pc.platforms as string[]) ?? []),
    ...((loc.availableLanguages as string[]) ?? []),
    ...((pc.usedBy as string[]) ?? []),
    ...funded.map((f) => f.name as string),
  ].filter(Boolean) as string[];

  const text = terms.join(' · ').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Kept on a single line so markdown-it treats it as one HTML block and the text
  // stays inside the hidden div.
  return `\n<div style="display: none">${text}</div>\n`;
}

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
      } catch (e) {
        reportParseError(`Failed to parse publiccode.yml for ${dirName}: ${e}`);
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
        // Hidden text block so VitePress local search can index these component-only pages
        content: buildSearchContent(tool, publiccodeRecord),
      });
    }

    return results;
  },
};
