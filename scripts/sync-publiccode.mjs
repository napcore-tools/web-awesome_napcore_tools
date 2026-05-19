#!/usr/bin/env node
/**
 * Fetches and caches publiccode.yml files from the central registry.
 *
 * Registry:  docs/data/publiccode-registry.yaml
 * Cache:     docs/data/publiccode/<slug>/publiccode.yml
 *
 * GitHub repository URLs are resolved automatically — no need to supply raw URLs.
 *
 * Usage:
 *   node scripts/sync-publiccode.mjs                  # sync all entries
 *   node scripts/sync-publiccode.mjs shacl-validator  # sync one entry by slug
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const registryPath = path.resolve(__dirname, '../docs/data/publiccode-registry.yaml');
const outputBase = path.resolve(__dirname, '../docs/data/publiccode');

const targetSlug = process.argv[2] ?? null;

// Parse central registry
let registry;
try {
  registry = parseYaml(fs.readFileSync(registryPath, 'utf-8')) ?? {};
} catch (e) {
  console.error(`Failed to read registry at ${registryPath}: ${e.message}`);
  process.exit(1);
}

/**
 * Resolves a GitHub repository URL to the raw publiccode.yml URL.
 * For non-GitHub URLs, returns the URL unchanged.
 * Tries main branch first, falls back to master.
 *
 * @param {string} url - Source URL from the registry
 * @returns {Promise<string>} Resolved URL pointing directly at publiccode.yml
 */
async function resolveUrl(url) {
  const githubMatch = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/\s]+?)\/?$/);
  if (!githubMatch) return url;

  const [, owner, repo] = githubMatch;

  for (const branch of ['main', 'master']) {
    const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/publiccode.yml`;
    try {
      const res = await fetch(rawUrl, { method: 'HEAD' });
      if (res.ok) return rawUrl;
    } catch {
      // try next branch
    }
  }

  // Best guess — main branch
  return `https://raw.githubusercontent.com/${owner}/${repo}/main/publiccode.yml`;
}

let synced = 0;
let skipped = 0;
let failed = 0;

for (const [slug, entry] of Object.entries(registry)) {
  if (targetSlug && slug !== targetSlug) continue;

  const sourceUrl = entry?.source;
  if (!sourceUrl) {
    console.warn(`  ⚠ ${slug}: no source URL in registry`);
    skipped++;
    continue;
  }

  const resolvedUrl = await resolveUrl(sourceUrl);
  process.stdout.write(`Syncing ${slug} from ${resolvedUrl} ... `);

  try {
    const res = await fetch(resolvedUrl);
    if (!res.ok) {
      console.error(`✗ HTTP ${res.status}`);
      failed++;
      continue;
    }
    const text = await res.text();
    const outDir = path.join(outputBase, slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'publiccode.yml'), text, 'utf-8');
    console.log('✓');
    synced++;
  } catch (e) {
    console.error(`✗ ${e.message}`);
    failed++;
  }
}

console.log(`\nDone: ${synced} synced, ${skipped} skipped, ${failed} failed.`);
