// Data loader for tools - reads front matter from all tool markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse as parseYaml } from 'yaml';
import { validateToolWithCache } from '../validation/tools';

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

type PubliccodeRecord = Record<string, unknown>;
const publiccodeDir = path.resolve(__dirname, '../../../data/publiccode');
const registryPath = path.resolve(__dirname, '../../../data/publiccode-registry.yaml');

interface RegistryEntry {
  source?: string;
  categories?: string[];
  standards?: string[];
  endorsed?: boolean;
  status?: string;
  technology?: string;
  language?: string;
  type?: string | string[];
  demo?: string;
  mainContributor?: string;
  lastUpdated?: string;
}

/**
 * Merges a local publiccode.yml file into tool frontmatter data.
 * Reads `docs/data/publiccode/<slug>.yml` if present and fills in any fields
 * that are absent or null in the frontmatter. Frontmatter always wins.
 *
 * Field mapping (publiccode.yml → Tool):
 * - `description.en.shortDescription` → `description`
 * - `url`                             → `repository`
 * - `landingURL`                      → `website`
 * - `description.en.documentation`    → `documentation`
 * - `legal.license`                   → `license`
 * - `legal.mainCopyrightOwner`        → `developer`
 * - `maintenance.contacts[0].name`    → `maintainedBy` (falls back to contractors[0])
 * - `releaseDate`                     → `firstRelease`
 * - `tags`                            → `tags` (only when frontmatter tags are empty)
 *
 * Fields with no publiccode.yml equivalent (always from frontmatter):
 * `categories`, `status`, `endorsed`, `standards`, `technology`, `language`,
 * `type`, `demo`, `mainContributor`, `lastUpdated`
 *
 * @param slug - Tool slug, used to locate `docs/data/publiccode/<slug>/publiccode.yml`
 * @param data - Parsed frontmatter for the tool
 * @returns Decorated copy of `data` with publiccode fallbacks applied
 */
function applyPubliccode(slug: string, data: Partial<Tool>): Partial<Tool> {
  const filePath = path.join(publiccodeDir, slug, 'publiccode.yml');
  if (!fs.existsSync(filePath)) return data;

  let publiccode: PubliccodeRecord = {};
  try {
    publiccode = (parseYaml(fs.readFileSync(filePath, 'utf-8')) as PubliccodeRecord) ?? {};
  } catch {
    console.error(`Failed to parse publiccode.yml for ${slug}`);
    return data;
  }

  const pcDesc = ((publiccode.description as PubliccodeRecord)?.en as PubliccodeRecord) ?? {};
  const pcLegal = (publiccode.legal as PubliccodeRecord) ?? {};
  const pcMaintenance = (publiccode.maintenance as PubliccodeRecord) ?? {};
  const pcContacts = ((pcMaintenance.contacts as PubliccodeRecord[]) ?? [])[0] ?? {};
  const pcContractors = ((pcMaintenance.contractors as PubliccodeRecord[]) ?? [])[0] ?? {};

  return {
    ...data,
    description: data.description || (pcDesc.shortDescription as string) || undefined,
    license: data.license ?? (pcLegal.license as string),
    repository: data.repository ?? (publiccode.url as string),
    website: data.website ?? (publiccode.landingURL as string),
    documentation: data.documentation ?? (pcDesc.documentation as string),
    developer: data.developer ?? (pcLegal.mainCopyrightOwner as string),
    maintainedBy: data.maintainedBy ?? (pcContacts.name as string) ?? (pcContractors.name as string),
    firstRelease: data.firstRelease ?? (publiccode.releaseDate as string),
    tags: data.tags?.length ? data.tags : ((publiccode.tags as string[]) ?? undefined),
  };
}

/**
 * Builds a Tool object entirely from a local publiccode.yml, with no .md file.
 * Used for tools that are registered via publiccode only — no hand-crafted page.
 *
 * Fields with no publiccode.yml equivalent are left empty or undefined unless set
 * via registry overrides in `docs/data/publiccode-registry.yaml`.
 *
 * @param slug - Tool slug, must match a directory `docs/data/publiccode/<slug>/publiccode.yml`
 * @param overrides - Optional NAPCORE-specific overrides from the registry
 * @returns A Tool object, or null if the file is missing or unparseable
 */
function toolFromPubliccode(slug: string, overrides?: RegistryEntry): Tool | null {
  const filePath = path.join(publiccodeDir, slug, 'publiccode.yml');
  if (!fs.existsSync(filePath)) return null;

  let publiccode: PubliccodeRecord = {};
  try {
    publiccode = (parseYaml(fs.readFileSync(filePath, 'utf-8')) as PubliccodeRecord) ?? {};
  } catch {
    console.error(`Failed to parse publiccode.yml for ${slug}`);
    return null;
  }

  const pcDesc = ((publiccode.description as PubliccodeRecord)?.en as PubliccodeRecord) ?? {};
  const pcLegal = (publiccode.legal as PubliccodeRecord) ?? {};
  const pcMaintenance = (publiccode.maintenance as PubliccodeRecord) ?? {};
  const pcContacts = ((pcMaintenance.contacts as PubliccodeRecord[]) ?? [])[0] ?? {};
  const pcContractors = ((pcMaintenance.contractors as PubliccodeRecord[]) ?? [])[0] ?? {};

  const title = (publiccode.name as string) || slug;
  const description = (pcDesc.shortDescription as string)?.trim() || '';

  const mappedStatus = (publiccode.developmentStatus as string) === 'obsolete' ? 'deprecated' : 'active';

  return {
    slug,
    title,
    description,
    categories: overrides?.categories ?? [],
    status: overrides?.status ?? mappedStatus,
    endorsed: overrides?.endorsed,
    standards: overrides?.standards ?? [],
    license: (pcLegal.license as string) || undefined,
    repository: (publiccode.url as string) || undefined,
    website: (publiccode.landingURL as string) || undefined,
    documentation: (pcDesc.documentation as string) || undefined,
    developer: (pcLegal.mainCopyrightOwner as string) || undefined,
    maintainedBy: ((pcContacts.name as string) ?? (pcContractors.name as string)) || undefined,
    firstRelease: (publiccode.releaseDate as string) || undefined,
    tags: (publiccode.tags as string[]) || [],
    technology: overrides?.technology,
    language: overrides?.language,
    type: overrides?.type,
    demo: overrides?.demo,
    mainContributor: overrides?.mainContributor,
    lastUpdated: overrides?.lastUpdated,
  };
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
        const tool = applyPubliccode(slug, data);

        tools.push({
          slug,
          title: data.title,
          description: tool.description || '',
          categories: Array.isArray(data.categories) ? data.categories : [data.categories],
          status: data.status || 'unknown',
          endorsed: data.endorsed,
          license: tool.license,
          repository: tool.repository,
          website: tool.website,
          documentation: tool.documentation,
          demo: data.demo,
          developer: tool.developer,
          maintainedBy: tool.maintainedBy,
          mainContributor: data.mainContributor,
          technology: data.technology,
          language: data.language,
          type: data.type,
          standards: data.standards || [],
          tags: tool.tags ?? [],
          firstRelease: tool.firstRelease,
          lastUpdated: data.lastUpdated,
        });
      } else if (!validationResult.valid) {
        // Tool failed validation - skip it (error already logged)
        console.error(`   → Skipping tool "${file}" due to validation errors`);
      }
    }

    // Load publiccode-only tools — slugs that have a <slug>/publiccode.yml but no .md file
    if (fs.existsSync(publiccodeDir)) {
      let registry: Record<string, RegistryEntry> = {};
      try {
        if (fs.existsSync(registryPath)) {
          registry = (parseYaml(fs.readFileSync(registryPath, 'utf-8')) as Record<string, RegistryEntry>) ?? {};
        }
      } catch {
        console.error('Failed to parse publiccode-registry.yaml');
      }

      const mdSlugs = new Set(tools.map((t) => t.slug));
      for (const entry of fs.readdirSync(publiccodeDir, { withFileTypes: true }).filter((e) => e.isDirectory())) {
        const slug = entry.name;
        if (mdSlugs.has(slug)) continue;
        const tool = toolFromPubliccode(slug, registry[slug]);
        if (tool) tools.push(tool);
      }
    }

    return tools;
  },
};
