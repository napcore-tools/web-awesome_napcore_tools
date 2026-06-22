// Data loader for tools - reads front matter from all tool markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { validateToolWithCache, validateRegistryWithCache } from '../validation/tools';

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
function parseFrontMatter(content: string): { data: Partial<Tool>; content: string } {
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
    console.error('Error parsing YAML front matter:', e);
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

/** Reads and parses `publiccode-registry.yaml`. Returns an empty object if the file is absent or malformed. */
export function loadRegistry(registryPath: string): Record<string, RegistryEntry> {
  try {
    if (fs.existsSync(registryPath)) {
      return (parseYaml(fs.readFileSync(registryPath, 'utf-8')) as Record<string, RegistryEntry>) ?? {};
    }
  } catch {
    console.error(`Failed to parse registry at ${registryPath}`);
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
 * @param parsedPc  - Pre-parsed publiccode.yml object. When the caller already holds the parsed YAML
 *                    (e.g. [tool].paths.ts), pass it here to skip a second file read. Omit to let the
 *                    function read the file itself.
 * @returns A complete Tool object, or null if the file is missing or unparseable.
 */
export function toolFromPubliccode(
  slug: string,
  overrides?: Partial<Omit<Tool, 'slug'>>,
  parsedPc?: PubliccodeRecord
): Tool | null {
  let publiccode: PubliccodeRecord;
  if (parsedPc) {
    publiccode = parsedPc;
  } else {
    const filePath = path.join(publiccodeDir, slug, 'publiccode.yml');
    if (!fs.existsSync(filePath)) return null;
    try {
      publiccode = (parseYaml(fs.readFileSync(filePath, 'utf-8')) as PubliccodeRecord) ?? {};
    } catch {
      console.error(`Failed to parse publiccode.yml for ${slug}`);
      return null;
    }
  }

  const pcDesc = ((publiccode.description as PubliccodeRecord)?.en as PubliccodeRecord) ?? {};
  const pcLegal = (publiccode.legal as PubliccodeRecord) ?? {};
  const pcMaintenance = (publiccode.maintenance as PubliccodeRecord) ?? {};
  const pcContacts = ((pcMaintenance.contacts as PubliccodeRecord[]) ?? [])[0] ?? {};
  const pcContractors = ((pcMaintenance.contractors as PubliccodeRecord[]) ?? [])[0] ?? {};

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
    maintainedBy: ((pcContacts.name as string) ?? (pcContractors.name as string)) || undefined,
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
      const { data } = parseFrontMatter(content);

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
