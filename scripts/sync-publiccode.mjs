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

// Fail fast on a typo'd slug rather than silently syncing nothing.
if (targetSlug && !Object.hasOwn(registry, targetSlug)) {
  console.error(`Unknown slug "${targetSlug}".`);
  console.error(`Known slugs: ${Object.keys(registry).join(', ')}`);
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

const updated = [];
const failed = [];
const skipped = [];

for (const [slug, entry] of Object.entries(registry)) {
  if (targetSlug && slug !== targetSlug) continue;

  const sourceUrl = entry?.source;
  if (!sourceUrl) {
    console.warn(`  ⚠ ${slug}: no source URL in registry`);
    skipped.push({ slug, reason: 'no source URL in registry' });
    continue;
  }

  const resolvedUrl = await resolveUrl(sourceUrl);
  process.stdout.write(`Syncing ${slug} from ${resolvedUrl} ... `);

  try {
    const res = await fetch(resolvedUrl);
    if (!res.ok) {
      console.error(`✗ HTTP ${res.status}`);
      failed.push({ slug, reason: `HTTP ${res.status} from ${resolvedUrl}` });
      continue;
    }

    const text = await res.text();

    // Never overwrite a good cached file with an empty response.
    if (!text.trim()) {
      console.error('✗ empty response');
      failed.push({ slug, reason: `empty response from ${resolvedUrl}` });
      continue;
    }

    // Validate it parses as YAML before writing, so an HTML error page served
    // with a 200 status (or any malformed file) never gets cached.
    try {
      parseYaml(text);
    } catch (e) {
      console.error('✗ invalid YAML');
      failed.push({ slug, reason: `invalid YAML from ${resolvedUrl}: ${e.message}` });
      continue;
    }

    const outDir = path.join(outputBase, slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'publiccode.yml'), text, 'utf-8');
    console.log('✓');
    updated.push({ slug, source: resolvedUrl });
  } catch (e) {
    console.error(`✗ ${e.message}`);
    failed.push({ slug, reason: e.message });
  }
}

// Write a Markdown summary, consumed as the pull-request body in CI (`body-path`)
// and useful as a human-readable log locally. Always written, even on full
// success, so the workflow's PR step always has a body file to read.
const section = (title, items, render) =>
  items.length ? `### ${title}\n\n${items.map(render).join('\n')}\n` : '';

const summary = [
  '## publiccode.yml sync summary\n',
  section('Updated', updated, (i) => `- \`${i.slug}\` ← ${i.source}`),
  section('Failed', failed, (i) => `- \`${i.slug}\` — ${i.reason}`),
  section('Skipped', skipped, (i) => `- \`${i.slug}\` — ${i.reason}`),
  `\n_${updated.length} updated, ${failed.length} failed, ${skipped.length} skipped._\n`,
]
  .filter(Boolean)
  .join('\n');

fs.writeFileSync(path.resolve(__dirname, '../publiccode-sync-summary.md'), summary, 'utf-8');

console.log(`\nDone: ${updated.length} updated, ${skipped.length} skipped, ${failed.length} failed.`);

// Non-zero exit on any failure so CI turns the run red, while every file that
// did fetch successfully has still been written (partial success).
process.exit(failed.length > 0 ? 1 : 0);
