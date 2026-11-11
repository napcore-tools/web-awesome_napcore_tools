import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import type { Tool } from '@/core/data-loaders/tools.data';
import type { Standard } from '@/core/data-loaders/standards.data';
import { type OkfInput, loadOkfInput, okfBundle } from '@/core/okf/okfBundle';

const SITE = 'https://example.org';

const tool = (slug: string, extra: Partial<Tool> = {}): Tool => ({
  slug,
  title: slug.toUpperCase(),
  description: `${slug} description`,
  categories: ['validators'],
  status: 'active',
  standards: ['netex'],
  ...extra,
});

const input = (extra: Partial<OkfInput> = {}): OkfInput => ({
  tools: [tool('motis'), tool('antu')],
  standards: {
    netex: {
      title: 'NeTEx',
      icon: '🚇',
      logo: '/icons/standards/netex.png',
      description: 'Public transport network data',
      domain: 'Public transport',
      purpose: 'Exchanges timetables.',
      format_technology: 'XML',
      maintainer_origin: 'CEN',
      related_standards: ['siri', 'unknown-standard'],
      status: 'EU standard (CEN)',
      link: 'https://netex-cen.eu/',
    },
    siri: { title: 'SIRI' } as Standard,
  },
  categories: {
    validators: { title: 'Validators', icon: '✓', description: 'Check data', related: ['converters', 'missing'] },
    converters: { title: 'Converters', icon: '⇄', description: 'Convert data' },
  },
  toolPage: () => undefined,
  ...extra,
});

/** Splits a concept document into parsed frontmatter and body. */
function read(document: string | undefined): { frontmatter: Record<string, unknown>; body: string } {
  const match = /^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/.exec(document ?? '');
  if (!match) throw new Error('not a concept document');
  return { frontmatter: parseYaml(match[1]) as Record<string, unknown>, body: match[2] };
}

/** True when a null sits anywhere in the value. */
function hasNull(value: unknown): boolean {
  if (value === null) return true;
  if (typeof value !== 'object') return false;
  return Object.values(value as object).some(hasNull);
}

/** Bundle-absolute link targets (`/kind/slug.md`) in a document. */
function bundleLinks(document: string): string[] {
  return [...document.matchAll(/\]\(\/([^)\s#]+)/g)].map((m) => m[1]);
}

describe('okfBundle', () => {
  describe('layout', () => {
    it('writes one concept per tool, standard and category, plus the listings', () => {
      expect([...okfBundle(SITE, input()).keys()].sort()).toEqual([
        'categories/converters.md',
        'categories/index.md',
        'categories/validators.md',
        'index.md',
        'standards/index.md',
        'standards/netex.md',
        'standards/siri.md',
        'tools/antu.md',
        'tools/index.md',
        'tools/motis.md',
      ]);
    });

    it('declares the OKF version in the root index and counts each kind', () => {
      const index = okfBundle(SITE, input()).get('index.md');

      expect(index).toMatch(/^---\nokf_version: "0\.2"\n---\n/);
      expect(index).toContain('* [Tools](tools/index.md) - 2 concepts');
      expect(index).toContain('* [Standards](standards/index.md) - 2 concepts');
      expect(index).toContain('* [Categories](categories/index.md) - 2 concepts');
    });

    it('lists concepts in a directory index without frontmatter, tools sorted by slug', () => {
      expect(okfBundle(SITE, input()).get('tools/index.md')).toBe(
        '# Tools\n\n* [ANTU](antu.md) - antu description\n* [MOTIS](motis.md) - motis description\n'
      );
    });

    it('refuses a slug that takes a reserved filename', () => {
      expect(() => okfBundle(SITE, input({ tools: [tool('index')] }))).toThrow(/reserved filename index\.md/);
      expect(() => okfBundle(SITE, input({ tools: [tool('log')] }))).toThrow(/reserved filename log\.md/);
    });

    it('refuses two slugs that map to the same file', () => {
      expect(() => okfBundle(SITE, input({ tools: [tool('a/b'), tool('a_b')] }))).toThrow(/both map to tools\/a_b\.md/);
    });
  });

  describe('tool concepts', () => {
    it('maps catalogue fields onto the OKF keys', () => {
      const tools = [tool('motis', { tags: ['Router'], repository: 'https://github.com/motis-project/motis' })];
      const { frontmatter } = read(okfBundle(SITE, input({ tools })).get('tools/motis.md'));

      expect(frontmatter).toMatchObject({
        type: 'Software Tool',
        title: 'MOTIS',
        description: 'motis description',
        tags: ['Router'],
        catalogue_id: 'motis',
        sources: [
          { id: 'catalogue', resource: `${SITE}/tools/motis.html`, title: 'Awesome NAPCORE Tools' },
          { id: 'repository', resource: 'https://github.com/motis-project/motis' },
        ],
        generated: { by: 'process:napcore-tools-build' },
        categories: ['validators'],
        standards: ['netex'],
      });
    });

    it('prefixes catalogue fields that collide with an OKF key', () => {
      const tools = [tool('motis', { status: 'deprecated', type: 'Web Application' })];
      const { frontmatter } = read(okfBundle(SITE, input({ tools })).get('tools/motis.md'));

      expect(frontmatter.type).toBe('Software Tool');
      expect(frontmatter.catalogue_type).toBe('Web Application');
      expect(frontmatter.catalogue_status).toBe('deprecated');
      expect(frontmatter).not.toHaveProperty('status');
    });

    it('drops null and empty values', () => {
      const tools = [
        tool('motis', { documentation: null as unknown as undefined, demo: '', tags: [], endorsed: false }),
      ];
      const { frontmatter } = read(okfBundle(SITE, input({ tools })).get('tools/motis.md'));

      expect(frontmatter).not.toHaveProperty('documentation');
      expect(frontmatter).not.toHaveProperty('demo');
      expect(frontmatter).not.toHaveProperty('tags');
      expect(frontmatter.endorsed).toBe(false);
    });

    it('takes the resource from the website, then the repository, then the catalogue page', () => {
      const tools = [
        tool('a', { website: 'https://a.example', repository: 'https://git.example/a' }),
        tool('b', { repository: 'https://git.example/b' }),
        tool('c'),
      ];
      const bundle = okfBundle(SITE, input({ tools }));

      expect(read(bundle.get('tools/a.md')).frontmatter.resource).toBe('https://a.example');
      expect(read(bundle.get('tools/b.md')).frontmatter.resource).toBe('https://git.example/b');
      expect(read(bundle.get('tools/c.md')).frontmatter.resource).toBe(`${SITE}/tools/c.html`);
    });

    it('writes a registry tool body from its long description and features', () => {
      const tools = [tool('antu', { longDescription: 'Long text.', features: ['Validates NeTEx', 'REST API'] })];
      const { frontmatter, body } = read(okfBundle(SITE, input({ tools })).get('tools/antu.md'));

      expect(body).toBe(
        [
          'Long text.',
          '# Features\n\n* Validates NeTEx\n* REST API',
          '# Related\n\n* Category: [Validators](/categories/validators.md)\n* Standard: [NeTEx](/standards/netex.md)\n',
        ].join('\n\n')
      );
      expect(frontmatter).not.toHaveProperty('longDescription');
      expect(frontmatter).not.toHaveProperty('features');
    });

    it('links only to categories and standards that are in the bundle', () => {
      const tools = [tool('motis', { categories: ['validators', 'missing'], standards: ['gtfs'] })];
      const { body } = read(okfBundle(SITE, input({ tools })).get('tools/motis.md'));

      expect(body).toContain('* Category: [Validators](/categories/validators.md)');
      expect(body).not.toContain('missing');
      expect(body).not.toContain('gtfs');
    });
  });

  describe('hand-written tool pages', () => {
    const bodyOf = (page: string, fullDescription?: string): string =>
      read(
        okfBundle(
          SITE,
          input({ toolPage: (slug) => (slug === 'motis' ? { body: page, fullDescription } : undefined) })
        ).get('tools/motis.md')
      ).body;

    it('opens with the full description, falling back to the short one', () => {
      expect(bodyOf('## Overview\n', 'The full story.')).toMatch(/^The full story\.\n\n# Overview\n/);
      expect(bodyOf('## Overview\n')).toMatch(/^motis description\n\n# Overview\n/);
    });

    it('raises headings one level', () => {
      const body = bodyOf('## Overview\n\n### Details\n');

      expect(body).toContain('\n# Overview\n\n## Details\n');
    });

    it('turns containers into blockquotes', () => {
      const body = bodyOf('::: warning Not Included\nTables are licensed.\n\nAsk the operator.\n:::\n\nAfter\n');

      expect(body).toContain('> **Not Included**\n>\n> Tables are licensed.\n>\n> Ask the operator.\n\nAfter');
    });

    it('titles an untitled container by its kind', () => {
      expect(bodyOf('::: tip\nUse it.\n:::\n')).toContain('> **Tip**\n>\n> Use it.');
    });

    it('rewrites links to concepts as bundle links and other site links as full URLs', () => {
      const body = bodyOf(
        'See [Antu](/tools/antu), [NeTEx](/standards/netex.html#purpose), [gone](/tools/gone), ' +
          '[contribute](/contribute) and [elsewhere](https://example.com/x).\n'
      );

      expect(body).toContain('[Antu](/tools/antu.md)');
      expect(body).toContain('[NeTEx](/standards/netex.md#purpose)');
      expect(body).toContain(`[gone](${SITE}/tools/gone)`);
      expect(body).toContain(`[contribute](${SITE}/contribute)`);
      expect(body).toContain('[elsewhere](https://example.com/x)');
    });

    it('leaves fenced code untouched', () => {
      const body = bodyOf('```bash\n## not a heading\n::: tip\ncurl [x](/tools/antu)\n```\n');

      expect(body).toContain('```bash\n## not a heading\n::: tip\ncurl [x](/tools/antu)\n```');
    });

    it('removes components, scripts and the closing rule', () => {
      const body = bodyOf(
        '<script setup>\nconst a = 1;\n</script>\n\n## Overview\n\nText\n\n---\n\n<ToolMetadata />\n'
      );

      expect(body).toBe(
        'motis description\n\n# Overview\n\nText\n\n# Related\n\n' +
          '* Category: [Validators](/categories/validators.md)\n* Standard: [NeTEx](/standards/netex.md)\n'
      );
    });

    it('normalises Windows line endings', () => {
      expect(bodyOf('## Overview\r\n\r\nText\r\n')).not.toContain('\r');
    });
  });

  describe('standard concepts', () => {
    it('maps the standard and links related standards and tools', () => {
      const { frontmatter, body } = read(okfBundle(SITE, input()).get('standards/netex.md'));

      expect(frontmatter).toMatchObject({
        type: 'Data Standard',
        title: 'NeTEx',
        description: 'Public transport network data',
        resource: 'https://netex-cen.eu/',
        catalogue_id: 'netex',
        catalogue_status: 'EU standard (CEN)',
        domain: 'Public transport',
      });
      expect(frontmatter).not.toHaveProperty('icon');
      expect(frontmatter).not.toHaveProperty('logo');
      expect(frontmatter).not.toHaveProperty('status');
      expect(body).toBe(
        'Exchanges timetables.\n\n# Related\n\n' +
          '* Related standard: [SIRI](/standards/siri.md)\n' +
          '* Tool: [ANTU](/tools/antu.md)\n* Tool: [MOTIS](/tools/motis.md)\n'
      );
    });

    it('falls back to the catalogue page when the standard has no link', () => {
      expect(read(okfBundle(SITE, input()).get('standards/siri.md')).frontmatter.resource).toBe(
        `${SITE}/standards/siri.html`
      );
    });
  });

  describe('category concepts', () => {
    it('maps the category and links related categories and tools', () => {
      const { frontmatter, body } = read(okfBundle(SITE, input()).get('categories/validators.md'));

      expect(frontmatter).toMatchObject({
        type: 'Tool Category',
        title: 'Validators',
        description: 'Check data',
        resource: `${SITE}/categories/validators.html`,
        catalogue_id: 'validators',
      });
      expect(frontmatter).not.toHaveProperty('icon');
      expect(body).toBe(
        'Check data\n\n# Related\n\n' +
          '* Related category: [Converters](/categories/converters.md)\n' +
          '* Tool: [ANTU](/tools/antu.md)\n* Tool: [MOTIS](/tools/motis.md)\n'
      );
    });
  });

  describe('the real catalogue', () => {
    const bundle = okfBundle(SITE, loadOkfInput());
    const concepts = [...bundle].filter(([file]) => !/(^|\/)index\.md$/.test(file));

    it('gives every concept a type, a title and no site syntax', () => {
      expect(concepts.length).toBeGreaterThan(0);
      for (const [file, document] of concepts) {
        const { frontmatter, body } = read(document);

        expect(frontmatter.type, file).toBeTruthy();
        expect(frontmatter.title, file).toBeTruthy();
        expect(hasNull(frontmatter), file).toBe(false);
        expect(body, file).not.toMatch(/^:::|<[A-Z][A-Za-z]+\s*\/>|\r/m);
      }
    });

    it('links only to concepts that exist', () => {
      for (const [file, document] of concepts) {
        for (const target of bundleLinks(document)) {
          expect(bundle.has(target), `${file} -> /${target}`).toBe(true);
        }
      }
    });
  });
});
