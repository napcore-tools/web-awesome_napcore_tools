/**
 * The catalogue as an OKF bundle: Open Knowledge Format v0.2, one concept per
 * Markdown file with YAML frontmatter.
 *
 * https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md
 *
 * A tool, a standard and a category are each a concept, and each kind is a directory.
 * Structured fields stay in frontmatter; the body carries the prose the catalogue
 * already has, followed by links to the concepts it relates to.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { stringify } from 'yaml';
import categoriesDataLoader, { type CategoryData } from '../data-loaders/categories.data';
import standardsDataLoader, { type Standard } from '../data-loaders/standards.data';
import toolsDataLoader, { type Tool, parseFrontMatter } from '../data-loaders/tools.data';
import { replaceComponents } from '../llms/llmsMarkdown';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toolsDir = path.resolve(__dirname, '../../../tools');

const OKF_VERSION = '0.2';

/** Basename of the one-file form of the bundle, `<name>.zip` beside `/okf/`. */
export const OKF_ARCHIVE = 'napcore-tools-okf';

const CATALOGUE = 'Awesome NAPCORE Tools';
const INTRO =
  'The Awesome NAPCORE Tools catalogue as an OKF bundle: tools for European mobility data, ' +
  'the standards they support and the categories they are filed under. Every entry is one ' +
  'Markdown file, with its fields in YAML frontmatter and links to the entries it relates to.';

const SPEC_URL = 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md';

// Actor convention from the spec: an automated process is `process:<id>`
const GENERATED_BY = 'process:napcore-tools-build';

// index.md and log.md are reserved by the spec and cannot be concept documents
const RESERVED = new Set(['index', 'log']);

/**
 * Frontmatter keys the spec gives a meaning to. A catalogue field with the same name
 * means something else (a tool's `type` is "Web Application", its `status` is
 * "active"), so it is exported as `catalogue_<key>`.
 */
const OKF_KEYS = new Set([
  'type',
  'title',
  'description',
  'resource',
  'tags',
  'sources',
  'usage_window',
  'generated',
  'verified',
  'status',
  'stale_after',
]);

type Kind = 'tools' | 'standards' | 'categories';

/** The kinds that become concept directories, with the `type` each concept declares. */
const KINDS: Record<Kind, { type: string; title: string; summary: string }> = {
  tools: { type: 'Software Tool', title: 'Tools', summary: 'Software tools for working with European mobility data' },
  standards: { type: 'Data Standard', title: 'Standards', summary: 'Data standards the tools support' },
  categories: { type: 'Tool Category', title: 'Categories', summary: 'Categories the tools are filed under' },
};

/** The hand-written page of a tool: its Markdown without frontmatter. */
export interface ToolPage {
  body: string;
  fullDescription?: string;
}

/** Everything the bundle is built from. */
export interface OkfInput {
  tools: Tool[];
  standards: Record<string, Standard>;
  categories: Record<string, CategoryData>;
  /** Returns undefined for registry (publiccode) tools, which have no page file. */
  toolPage: (slug: string) => ToolPage | undefined;
}

/** Loads the catalogue from the same data loaders the site renders from. */
export function loadOkfInput(): OkfInput {
  return {
    tools: toolsDataLoader.load(),
    standards: standardsDataLoader.load(),
    categories: categoriesDataLoader.load(),
    toolPage: (slug) => {
      const file = path.join(toolsDir, `${slug}.md`);
      if (!fs.existsSync(file)) return undefined;

      const { data, content } = parseFrontMatter(fs.readFileSync(file, 'utf-8'), `${slug}.md`);
      // `fullDescription` is page frontmatter that the Tool interface does not carry
      const fullDescription = (data as { fullDescription?: unknown } | null)?.fullDescription;
      return { body: content, fullDescription: typeof fullDescription === 'string' ? fullDescription : undefined };
    },
  };
}

interface Context extends OkfInput {
  siteUrl: string;
  /** Bundle-relative paths of all concept documents. */
  concepts: Set<string>;
}

/** A concept's filename, from its slug. Slashes would silently become directories. */
function fileName(slug: string): string {
  return slug.replace(/[\\/]+/g, '_').replace(/\s+/g, '-');
}

function conceptPath(kind: Kind, slug: string): string {
  return `${kind}/${fileName(slug)}.md`;
}

function pageUrl(kind: Kind, slug: string, ctx: Context): string {
  return `${ctx.siteUrl}/${kind}/${slug}.html`;
}

/** A description as one line, for frontmatter and index entries. */
function oneLine(text: string | undefined): string {
  return (text ?? '').replace(/\s+/g, ' ').trim();
}

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

/** Drops empty values and prefixes keys that would collide with an OKF key. */
function catalogueFields(record: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(record)
      .filter(([, value]) => !isEmpty(value))
      .map(([key, value]) => [OKF_KEYS.has(key) ? `catalogue_${key}` : key, value])
  );
}

/**
 * Rewrites site-absolute links for use outside the site: a link to a page that is a
 * concept becomes a bundle-absolute link to that concept, any other becomes a full URL.
 */
function rewriteLinks(line: string, ctx: Context): string {
  return line.replace(/\]\((\/[^)\s#?]*)([#?][^)\s]*)?\)/g, (_match, target: string, suffix: string = '') => {
    const concept = /^\/(tools|standards|categories)\/([^/]+?)(?:\.md|\.html)?\/?$/.exec(target);
    const bundlePath = concept ? conceptPath(concept[1] as Kind, concept[2]) : undefined;
    return bundlePath && ctx.concepts.has(bundlePath)
      ? `](/${bundlePath}${suffix})`
      : `](${ctx.siteUrl}${target}${suffix})`;
  });
}

/**
 * Turns the body of a hand-written page into plain Markdown: components replaced by
 * the text they show, `:::` containers turned into blockquotes, headings raised one
 * level (the page's `#` title is in frontmatter here) and site links rewritten.
 * Fenced code is left untouched.
 */
function portableMarkdown(body: string, slug: string, ctx: Context): string {
  const source = replaceComponents(
    body.replace(/\r\n/g, '\n').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''),
    'tools',
    slug,
    { ...ctx, hasSourceFile: () => true }
  );

  const lines: string[] = [];
  let fence: string | undefined;
  let quoteDepth = 0;
  const push = (line: string) => lines.push(quoteDepth > 0 ? `> ${line}`.trimEnd() : line);

  for (const line of source.split('\n')) {
    const fenceMark = /^\s*(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      if (fenceMark?.startsWith(fence) && line.trim() === fenceMark) fence = undefined;
      push(line);
      continue;
    }
    if (fenceMark) {
      fence = fenceMark;
      push(line);
      continue;
    }

    const container = /^:{3,}\s*(\w+)?\s*(.*)$/.exec(line);
    if (container) {
      const [, name, title] = container;
      if (name) {
        quoteDepth += 1;
        push(`**${title.trim() || name[0].toUpperCase() + name.slice(1)}**`);
        push('');
      } else {
        quoteDepth = Math.max(0, quoteDepth - 1);
      }
      continue;
    }

    push(rewriteLinks(line.replace(/^#(#{1,5}\s)/, '$1'), ctx));
  }

  return (
    lines
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
      // Pages end with a rule above <ToolMetadata />, which is gone by now
      .replace(/\n+(?:-{3,}|\*{3,}|_{3,})$/, '')
  );
}

/** Links to neighbouring concepts, skipping any slug that is not in the bundle. */
function links(label: string, kind: Kind, slugs: string[] | undefined, titleOf: (slug: string) => string | undefined) {
  return (slugs ?? [])
    .filter((slug) => titleOf(slug) !== undefined)
    .map((slug) => `* ${label}: [${titleOf(slug)}](/${conceptPath(kind, slug)})`);
}

function concept(frontmatter: Record<string, unknown>, body: (string | undefined)[], related: string[]): string {
  const parts = body.filter(Boolean);
  if (related.length) parts.push(`# Related\n\n${related.join('\n')}`);
  const yaml = stringify(frontmatter, { lineWidth: 100, aliasDuplicateObjects: false });
  return `---\n${yaml}---\n\n${parts.join('\n\n')}\n`;
}

function catalogueSource(kind: Kind, slug: string, ctx: Context) {
  return { id: 'catalogue', resource: pageUrl(kind, slug, ctx), title: CATALOGUE };
}

function toolConcept(tool: Tool, ctx: Context): string {
  const { slug, title, description, tags, longDescription, features, ...fields } = tool;
  const page = ctx.toolPage(slug);

  const frontmatter = {
    type: KINDS.tools.type,
    title,
    ...(oneLine(description) ? { description: oneLine(description) } : {}),
    resource: tool.website || tool.repository || pageUrl('tools', slug, ctx),
    ...(tags?.length ? { tags } : {}),
    catalogue_id: slug,
    sources: [
      catalogueSource('tools', slug, ctx),
      ...(tool.repository ? [{ id: 'repository', resource: tool.repository }] : []),
    ],
    generated: { by: GENERATED_BY },
    ...catalogueFields(fields),
  };

  const body = page
    ? [page.fullDescription || description, portableMarkdown(page.body, slug, ctx)]
    : [
        longDescription || description,
        features?.length ? `# Features\n\n${features.map((feature) => `* ${feature}`).join('\n')}` : undefined,
      ];

  return concept(frontmatter, body, [
    ...links('Category', 'categories', tool.categories, (s) => ctx.categories[s]?.title),
    ...links('Standard', 'standards', tool.standards, (s) => ctx.standards[s]?.title),
  ]);
}

function toolLinks(tools: Tool[]): string[] {
  return links(
    'Tool',
    'tools',
    tools.map((tool) => tool.slug),
    (slug) => tools.find((tool) => tool.slug === slug)?.title
  );
}

function standardConcept(slug: string, standard: Standard, ctx: Context): string {
  // icon and logo are presentation, not knowledge
  const { title, description, link, purpose, icon: _icon, logo: _logo, ...fields } = standard;

  const frontmatter = {
    type: KINDS.standards.type,
    title,
    ...(oneLine(description) ? { description: oneLine(description) } : {}),
    resource: link || pageUrl('standards', slug, ctx),
    catalogue_id: slug,
    sources: [catalogueSource('standards', slug, ctx)],
    generated: { by: GENERATED_BY },
    ...catalogueFields(fields),
  };

  return concept(
    frontmatter,
    [purpose?.trim() || description],
    [
      ...links('Related standard', 'standards', standard.related_standards, (s) => ctx.standards[s]?.title),
      ...toolLinks(ctx.tools.filter((tool) => tool.standards?.includes(slug))),
    ]
  );
}

function categoryConcept(slug: string, category: CategoryData, ctx: Context): string {
  const { title, description, icon: _icon, ...fields } = category;

  const frontmatter = {
    type: KINDS.categories.type,
    title,
    ...(oneLine(description) ? { description: oneLine(description) } : {}),
    resource: pageUrl('categories', slug, ctx),
    catalogue_id: slug,
    sources: [catalogueSource('categories', slug, ctx)],
    generated: { by: GENERATED_BY },
    ...catalogueFields(fields),
  };

  return concept(
    frontmatter,
    [description],
    [
      ...links('Related category', 'categories', category.related, (s) => ctx.categories[s]?.title),
      ...toolLinks(ctx.tools.filter((tool) => tool.categories.includes(slug))),
    ]
  );
}

interface Entry {
  slug: string;
  title: string;
  description?: string;
}

/** A directory listing, in the form the spec gives for index.md. */
function directoryIndex(kind: Kind, entries: Entry[]): string {
  const lines = entries.map(({ slug, title, description }) => {
    const summary = oneLine(description);
    return `* [${title}](${fileName(slug)}.md)${summary ? ` - ${summary}` : ''}`;
  });
  return `# ${KINDS[kind].title}\n\n${lines.join('\n')}\n`;
}

/** The bundle root listing, the only index.md the spec lets carry frontmatter. */
function bundleIndex(siteUrl: string, counts: Record<Kind, number>): string {
  const lines = (Object.keys(KINDS) as Kind[]).map(
    (kind) => `* [${KINDS[kind].title}](${kind}/index.md) - ${KINDS[kind].summary} (${counts[kind]})`
  );
  // Where the bundle comes from, for a reader who lands on this file alone
  const about = [
    `* [Catalogue website](${siteUrl}/) - The same catalogue as web pages`,
    `* [Bundle as a zip](${siteUrl}/${OKF_ARCHIVE}.zip) - All files of this bundle in one download`,
    `* [Open Knowledge Format](${SPEC_URL}) - The specification this bundle follows, v${OKF_VERSION}`,
  ];
  return [
    `---\nokf_version: "${OKF_VERSION}"\n---`,
    `# ${CATALOGUE}`,
    INTRO,
    `# Contents\n\n${lines.join('\n')}`,
    `# About This Bundle\n\n${about.join('\n')}`,
    '',
  ].join('\n\n');
}

/**
 * Builds the whole bundle.
 *
 * @param siteUrl - Site origin, without a trailing slash
 * @param input - Catalogue data; loaded from the data loaders when omitted
 * @returns Bundle-relative path mapped to file contents
 */
export function okfBundle(siteUrl: string, input: OkfInput = loadOkfInput()): Map<string, string> {
  const tools = [...input.tools].sort((a, b) => a.slug.localeCompare(b.slug));
  const entries: Record<Kind, Entry[]> = {
    tools,
    standards: Object.entries(input.standards).map(([slug, standard]) => ({ slug, ...standard })),
    categories: Object.entries(input.categories).map(([slug, category]) => ({ slug, ...category })),
  };

  const concepts = new Set<string>();
  for (const kind of Object.keys(KINDS) as Kind[]) {
    for (const { slug } of entries[kind]) {
      const conceptFile = conceptPath(kind, slug);

      // A reserved filename would replace a listing, and two slugs that differ only
      // where fileName() does not would overwrite each other. Fail the build instead.
      if (RESERVED.has(fileName(slug))) {
        throw new Error(`okfBundle: ${kind}/${slug} takes the reserved filename ${fileName(slug)}.md`);
      }
      if (concepts.has(conceptFile)) {
        throw new Error(`okfBundle: ${kind}/${slug} and another concept both map to ${conceptFile}`);
      }
      concepts.add(conceptFile);
    }
  }

  const ctx: Context = { ...input, tools, siteUrl, concepts };
  const files = new Map<string, string>();

  for (const tool of tools) {
    files.set(conceptPath('tools', tool.slug), toolConcept(tool, ctx));
  }
  for (const [slug, standard] of Object.entries(input.standards)) {
    files.set(conceptPath('standards', slug), standardConcept(slug, standard, ctx));
  }
  for (const [slug, category] of Object.entries(input.categories)) {
    files.set(conceptPath('categories', slug), categoryConcept(slug, category, ctx));
  }

  for (const kind of Object.keys(KINDS) as Kind[]) {
    files.set(`${kind}/index.md`, directoryIndex(kind, entries[kind]));
  }
  files.set(
    'index.md',
    bundleIndex(siteUrl, {
      tools: tools.length,
      standards: entries.standards.length,
      categories: entries.categories.length,
    })
  );

  return files;
}
