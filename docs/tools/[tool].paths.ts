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

const __dirname = path.dirname(fileURLToPath(import.meta.url));

type PcRecord = Record<string, unknown>;

/** NAPCORE-specific fields from publiccode-registry.yaml that override or supplement publiccode.yml. */
interface RegistryEntry {
  source?: string;
  categories?: string[];
  standards?: string[];
  endorsed?: boolean;
  status?: string;
}

/** Maps publiccode.yml developmentStatus to the site's two-value status vocabulary. */
function mapStatus(developmentStatus: string | undefined): string {
  return developmentStatus === 'obsolete' ? 'deprecated' : 'active';
}

export default {
  paths() {
    const publiccodeDir = path.resolve(__dirname, '../data/publiccode');
    const registryPath = path.resolve(__dirname, '../data/publiccode-registry.yaml');
    // toolsDir is the same directory as this file — used to discover hand-crafted .md files
    const toolsDir = __dirname;

    // Registry is optional; missing or malformed file simply means no overrides
    let registry: Record<string, RegistryEntry> = {};
    try {
      if (fs.existsSync(registryPath)) {
        registry = (parseYaml(fs.readFileSync(registryPath, 'utf-8')) as Record<string, RegistryEntry>) ?? {};
      }
    } catch {
      // registry is optional — continue without overrides
    }

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
      const tool = entry.name;
      // Hand-crafted pages take priority — skip tools that already have one
      if (existingSlugs.has(tool)) continue;

      let pc: PcRecord = {};
      try {
        pc = (parseYaml(fs.readFileSync(path.join(publiccodeDir, tool, 'publiccode.yml'), 'utf-8')) as PcRecord) ?? {};
      } catch {
        continue;
      }

      // Registry overrides win over publiccode.yml for every NAPCORE-specific field
      const overrides: RegistryEntry = registry[tool] ?? {};
      const pcDesc = ((pc.description as PcRecord)?.en as PcRecord) ?? {};
      const pcLegal = (pc.legal as PcRecord) ?? {};
      const pcMaintenance = (pc.maintenance as PcRecord) ?? {};
      // First contact is preferred; fall back to first contractor
      const pcContact =
        ((pcMaintenance.contacts as PcRecord[]) ?? [])[0] ?? ((pcMaintenance.contractors as PcRecord[]) ?? [])[0] ?? {};

      results.push({
        params: {
          tool,
          title: (pc.name as string) ?? tool,
          description: (pcDesc.shortDescription as string)?.trim() ?? '',
          longDescription: (pcDesc.longDescription as string)?.trim() ?? null,
          features: (pcDesc.features as string[]) ?? null,
          status: overrides.status ?? mapStatus(pc.developmentStatus as string),
          categories: overrides.categories ?? [],
          standards: overrides.standards ?? [],
          endorsed: overrides.endorsed ?? null,
          softwareVersion: (pc.softwareVersion as string) ?? null,
          license: (pcLegal.license as string) ?? null,
          repository: (pc.url as string) ?? null,
          website: (pc.landingURL as string) ?? null,
          documentation: (pcDesc.documentation as string) ?? null,
          developer: (pcLegal.mainCopyrightOwner as string) ?? null,
          maintainedBy: (pcContact.name as string) ?? null,
          firstRelease: (pc.releaseDate as string) ?? null,
          tags: (pc.tags as string[]) ?? [],
          // Full parsed publiccode.yml object — available in [tool].md as p.publiccode
          publiccode: pc,
        },
      });
    }

    return results;
  },
};
