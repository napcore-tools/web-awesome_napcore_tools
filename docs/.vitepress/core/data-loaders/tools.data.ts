// Data loader for tools - reads front matter from all tool markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { validateToolWithCache, validateRegistryWithCache } from '../validation/tools';
import { reportParseError } from '../validation/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Tool {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  status: string;
  endorsed?: boolean;
  license?: string;
  repository?: string;
  website?: string;
  documentation?: string;
  demo?: string;
  developer?: string;
  maintainedBy?: string;
  mainContributor?: string;
  technology?: string;
  language?: string;
  type?: string | string[];
  standards?: string[];
  tags?: string[];
  firstRelease?: string;
  lastUpdated?: string;
  longDescription?: string;
  features?: string[];
  softwareVersion?: string;
}

/**
 * Parses YAML frontmatter from markdown content.
 * Extracts the YAML block between --- delimiters and parses it into an object.
 *
 * @param content - Raw markdown file content with frontmatter
 * @returns Object containing parsed frontmatter data and remaining markdown content
 */
export function parseFrontMatter(content: string, filename: string): { data: Partial<Tool>; content: string } {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const yamlContent = match[1];
  const markdownContent = match[2];

  try {
    const data = parseYaml(yamlContent);
    return { data, content: markdownContent };
  } catch (e) {
    // Malformed front matter fails the build in production rather than silently
    // skipping the tool with a misleading "missing required field" message.
    reportParseError(`Failed to parse front matter in ${filename}: ${e}`);
    return { data: {}, content: markdownContent };
  }
}

export type PubliccodeRecord = Record<string, unknown>;
const publiccodeDir = path.resolve(__dirname, '../../../data/publiccode');
const registryPath = path.resolve(__dirname, '../../../data/publiccode-registry.yaml');

export interface RegistryEntry {
  source?: string;
  /** NAPCORE catalogue fields layered on top of the publiccode.yml (these win on merge). */
  'napcore-tools'?: Partial<Omit<Tool, 'slug'>>;
}

/** Maps publiccode.yml `developmentStatus` to the site's two-value vocabulary. */
export function mapStatus(developmentStatus: string | undefined): string {
  return developmentStatus === 'obsolete' ? 'deprecated' : 'active';
}

/**
 * Input limits for external publiccode.yml data, applied by sanitisePubliccode().
 * Generous on purpose: they stop runaway or malicious input, not legitimate data.
 * `stringLength` matches the publiccode.yml maximum for `longDescription`.
 */
export const PUBLICCODE_LIMITS = { arrayItems: 50, objectKeys: 50, stringLength: 10_000, depth: 10 } as const;

// Keys whose values end up in `href`/`src` on the page; values with a scheme other than
// http(s) are dropped (e.g. `javascript:`). Scheme-less (relative) values are kept.
const PUBLICCODE_URL_KEYS = new Set([
  'url',
  'landingURL',
  'roadmap',
  'logo',
  'uri',
  'documentation',
  'apiDocumentation',
  'screenshots',
  'videos',
]);

function isSafeUrl(value: string): boolean {
  // Browsers ignore whitespace and control characters inside a scheme ("java\tscript:")
  // eslint-disable-next-line no-control-regex
  const compact = value.replace(/[\u0000- \u007f]/g, '');
  const scheme = /^([a-z][a-z0-9+.-]*):/i.exec(compact)?.[1].toLowerCase();
  return scheme === undefined || scheme === 'http' || scheme === 'https';
}

function sanitiseValue(value: unknown, at: string, depth: number, report: (msg: string) => void): unknown {
  if (typeof value === 'string') {
    if (value.length <= PUBLICCODE_LIMITS.stringLength) return value;
    report(`${at} truncated (${value.length} → ${PUBLICCODE_LIMITS.stringLength} characters)`);
    return value.slice(0, PUBLICCODE_LIMITS.stringLength);
  }
  if (value === null || typeof value !== 'object') return value;
  if (depth >= PUBLICCODE_LIMITS.depth) {
    report(`${at} dropped (nested deeper than ${PUBLICCODE_LIMITS.depth} levels)`);
    return undefined;
  }

  if (Array.isArray(value)) {
    if (value.length > PUBLICCODE_LIMITS.arrayItems) {
      report(`${at} truncated (${value.length} → ${PUBLICCODE_LIMITS.arrayItems} items)`);
    }
    return value
      .slice(0, PUBLICCODE_LIMITS.arrayItems)
      .map((item, i) => sanitiseValue(item, `${at}[${i}]`, depth + 1, report))
      .filter((item) => item !== undefined);
  }

  const entries = Object.entries(value);
  if (entries.length > PUBLICCODE_LIMITS.objectKeys) {
    report(`${at || 'root'} truncated (${entries.length} → ${PUBLICCODE_LIMITS.objectKeys} keys)`);
  }
  const out: PubliccodeRecord = {};
  for (const [key, item] of entries.slice(0, PUBLICCODE_LIMITS.objectKeys)) {
    const keyAt = at ? `${at}.${key}` : key;
    if (key === '__proto__') {
      report(`${keyAt} dropped (reserved key)`);
      continue;
    }
    let clean = sanitiseValue(item, keyAt, depth + 1, report);
    if (PUBLICCODE_URL_KEYS.has(key)) clean = dropUnsafeUrls(clean, keyAt, report);
    if (clean !== undefined) out[key] = clean;
  }
  return out;
}

function dropUnsafeUrls(value: unknown, at: string, report: (msg: string) => void): unknown {
  if (typeof value === 'string') {
    if (isSafeUrl(value)) return value;
    report(`${at} dropped (URL scheme not allowed)`);
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.filter(
      (item, i) => typeof item !== 'string' || dropUnsafeUrls(item, `${at}[${i}]`, report) !== undefined
    );
  }
  return value;
}

/**
 * Bounds a parsed publiccode.yml record, which comes from a third-party repository:
 * caps array lengths, object key counts, string lengths and nesting depth (see
 * PUBLICCODE_LIMITS), and drops URLs with a scheme other than http(s). Returns a new
 * record; the input is not modified. Each cut is passed to `report`.
 */
export function sanitisePubliccode(
  record: PubliccodeRecord,
  report: (msg: string) => void = () => {}
): PubliccodeRecord {
  return sanitiseValue(record, '', 0, report) as PubliccodeRecord;
}

// The loader, the dynamic route and the search indexer all load the same files, each from
// its own bundled copy of this module; a Set on the Node.js global reports each cut once.
interface GlobalWithReportedCuts {
  __publiccodeReportedCuts?: Set<string>;
}
const globalWithReportedCuts = global as unknown as GlobalWithReportedCuts;
const reportedCuts = (globalWithReportedCuts.__publiccodeReportedCuts ??= new Set<string>());

/**
 * Reads, parses and sanitises `docs/data/publiccode/<slug>/publiccode.yml`.
 * The only entry point for publiccode.yml data; nothing should parse those files directly.
 *
 * @returns The sanitised record, or null if the file is missing or unparseable.
 */
export function loadPubliccode(slug: string): PubliccodeRecord | null {
  const filePath = path.join(publiccodeDir, slug, 'publiccode.yml');
  if (!fs.existsSync(filePath)) return null;

  let parsed: unknown;
  try {
    parsed = parseYaml(fs.readFileSync(filePath, 'utf-8')) ?? {};
  } catch (e) {
    reportParseError(`Failed to parse publiccode.yml for ${slug}: ${e}`);
    return null;
  }
  if (typeof parsed !== 'object' || Array.isArray(parsed)) {
    reportParseError(`publiccode.yml for ${slug} is not a YAML mapping`);
    return null;
  }

  return sanitisePubliccode(parsed as PubliccodeRecord, (msg) => {
    const line = `⚠️  publiccode.yml for ${slug}: ${msg}`;
    if (reportedCuts.has(line)) return;
    reportedCuts.add(line);
    console.warn(line);
  });
}

/** Maximum number of maintainers listed by name; the rest are summarised as "+N more". */
const MAX_MAINTAINERS = 10;

/**
 * Returns the maintainers from a publiccode.yml `maintenance` block: the named `contacts`,
 * falling back to `contractors` when there are none. ToolPubliccodeView mirrors this selection.
 */
export function publiccodeMaintainers(maintenance: PubliccodeRecord | undefined): PubliccodeRecord[] {
  const named = (list: unknown): PubliccodeRecord[] =>
    ((list as PubliccodeRecord[]) ?? []).filter((m) => typeof m?.name === 'string' && m.name.trim() !== '');
  const contacts = named(maintenance?.contacts);
  return contacts.length ? contacts : named(maintenance?.contractors);
}

/** Joins maintainer names for `Tool.maintainedBy`, capped at MAX_MAINTAINERS, e.g. "Alice, Bob +2 more". */
function formatMaintainers(maintainers: PubliccodeRecord[]): string | undefined {
  if (!maintainers.length) return undefined;
  const names = maintainers.slice(0, MAX_MAINTAINERS).map((m) => (m.name as string).trim());
  const more = maintainers.length - MAX_MAINTAINERS;
  return names.join(', ') + (more > 0 ? ` +${more} more` : '');
}

/**
 * Reads and parses `publiccode-registry.yaml`. Returns an empty object if the file is absent.
 * A malformed registry throws in production (so overrides are never silently dropped) and is
 * logged in dev.
 */
export function loadRegistry(registryPath: string): Record<string, RegistryEntry> {
  try {
    if (fs.existsSync(registryPath)) {
      return (parseYaml(fs.readFileSync(registryPath, 'utf-8')) as Record<string, RegistryEntry>) ?? {};
    }
  } catch (e) {
    reportParseError(`Failed to parse registry at ${registryPath}: ${e}`);
  }
  return {};
}

/**
 * Builds a Tool object from a publiccode.yml file, optionally enriched with NAPCORE-specific overrides.
 *
 * @param slug      - Tool identifier; becomes Tool.slug and locates `docs/data/publiccode/<slug>/publiccode.yml`.
 * @param overrides - Optional subset of Tool fields (everything except slug) from the registry's `napcore-tools:` block.
 *                    These win over publiccode.yml values — useful for fields the standard cannot express
 *                    (categories, standards, endorsed, …).
 * @param parsedPc  - publiccode.yml record from loadPubliccode(). When the caller already holds it
 *                    (e.g. [slug].paths.ts), pass it here to skip a second file read. Omit to let the
 *                    function load the file itself.
 * @returns A complete Tool object, or null if the file is missing or unparseable.
 */
export function toolFromPubliccode(
  slug: string,
  overrides?: Partial<Omit<Tool, 'slug'>>,
  parsedPc?: PubliccodeRecord
): Tool | null {
  const publiccode = parsedPc ?? loadPubliccode(slug);
  if (!publiccode) return null;

  const pcDesc = ((publiccode.description as PubliccodeRecord)?.en as PubliccodeRecord) ?? {};
  const pcLegal = (publiccode.legal as PubliccodeRecord) ?? {};
  const pcMaintenance = (publiccode.maintenance as PubliccodeRecord) ?? {};

  const base: Tool = {
    slug,
    title: (publiccode.name as string) || slug,
    description: (pcDesc.shortDescription as string)?.trim() || '',
    categories: [],
    status: mapStatus(publiccode.developmentStatus as string | undefined),
    standards: [],
    license: (pcLegal.license as string) || undefined,
    repository: (publiccode.url as string) || undefined,
    website: (publiccode.landingURL as string) || undefined,
    documentation: (pcDesc.documentation as string) || undefined,
    developer: (pcLegal.mainCopyrightOwner as string) || undefined,
    maintainedBy: formatMaintainers(publiccodeMaintainers(pcMaintenance)),
    // publiccode `releaseDate` is the date of the *latest* release, not the first.
    lastUpdated: (publiccode.releaseDate as string) || undefined,
    tags: (publiccode.tags as string[]) || [],
    longDescription: (pcDesc.longDescription as string)?.trim() || undefined,
    features: (pcDesc.features as string[]) || undefined,
    softwareVersion: (publiccode.softwareVersion as string) || undefined,
  };

  return { ...base, ...(overrides ?? {}) };
}

export default {
  watch: ['../../../tools/*.md', '../../../data/publiccode/**/*.yml', '../../../data/publiccode-registry.yaml'],
  /**
   * Loads and validates all tool markdown files from the tools directory.
   * Reads frontmatter from each .md file, validates it, and constructs Tool objects.
   * Skips invalid tools and logs validation errors.
   *
   * @returns Array of validated Tool objects with complete metadata
   */
  load() {
    const toolsDir = path.resolve(__dirname, '../../../tools');
    const tools: Tool[] = [];

    // Read all markdown files in tools directory
    const files = fs
      .readdirSync(toolsDir)
      .filter((file) => file.endsWith('.md') && file !== 'index.md' && !file.startsWith('['));

    for (const file of files) {
      const filePath = path.join(toolsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = parseFrontMatter(content, file);

      // Validate tool front matter (with mtime-based caching to prevent duplicate messages)
      // This now includes standards validation
      const validationResult = validateToolWithCache(data, file, filePath);

      // Only include files with valid front matter (title and categories required)
      if (validationResult.valid && data.title && data.categories) {
        const slug = file.replace('.md', '');

        tools.push({
          slug,
          title: data.title,
          description: data.description || '',
          categories: Array.isArray(data.categories) ? data.categories : [data.categories],
          status: data.status || 'unknown',
          endorsed: data.endorsed,
          license: data.license,
          repository: data.repository,
          website: data.website,
          documentation: data.documentation,
          demo: data.demo,
          developer: data.developer,
          maintainedBy: data.maintainedBy,
          mainContributor: data.mainContributor,
          technology: data.technology,
          language: data.language,
          type: data.type,
          standards: data.standards || [],
          tags: data.tags ?? [],
          firstRelease: data.firstRelease,
          lastUpdated: data.lastUpdated,
        });
      } else if (!validationResult.valid) {
        // Tool failed validation - skip it (error already logged)
        console.error(`   → Skipping tool "${file}" due to validation errors`);
      }
    }

    // Load publiccode-only tools — slugs that have a <slug>/publiccode.yml but no .md file
    if (fs.existsSync(publiccodeDir)) {
      const registry = loadRegistry(registryPath);
      validateRegistryWithCache(registryPath, registry);
      const mdSlugs = new Set(tools.map((t) => t.slug));
      for (const entry of fs.readdirSync(publiccodeDir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
        const slug = entry.name;
        if (mdSlugs.has(slug)) continue;
        const tool = toolFromPubliccode(slug, registry[slug]?.['napcore-tools']);
        if (tool) tools.push(tool);
      }
    }

    return tools;
  },
};
