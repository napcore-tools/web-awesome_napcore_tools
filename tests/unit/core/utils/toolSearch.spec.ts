import { describe, expect, it } from 'vitest';
import type { Tool } from '@/core/data-loaders/tools.data';
import { toolMatchesSearch } from '@/core/utils/toolSearch';

const tool: Tool = {
  slug: 'abzu',
  title: 'Abzu',
  description: 'Map-based stop place editor',
  categories: ['data-editors'],
  status: 'active',
  standards: ['netex'],
  tags: ['Stops'],
  developer: 'Entur AS',
  maintainedBy: 'Entur ROR',
  language: 'TypeScript',
  technology: 'React',
};

const categoryTitle = (s: string) => ({ 'data-editors': 'Data Editors & Registries' })[s];
const standardTitle = (s: string) => ({ netex: 'NeTEx' })[s];
const matches = (term: string) => toolMatchesSearch(tool, term, categoryTitle, standardTitle);

describe('toolMatchesSearch', () => {
  it.each(['abzu', 'stop place', 'stops'])('matches title, description and tags: %s', (term) => {
    expect(matches(term)).toBe(true);
  });

  it('matches categories by slug and display title', () => {
    expect(matches('data-editors')).toBe(true);
    expect(matches('Registries')).toBe(true);
  });

  it('matches standards by slug and display title', () => {
    expect(matches('netex')).toBe(true);
    expect(matches('NeTEx')).toBe(true);
  });

  it('matches developer and maintainer', () => {
    expect(matches('entur')).toBe(true);
    expect(matches('ROR')).toBe(true);
  });

  it('matches language and technology', () => {
    expect(matches('typescript')).toBe(true);
    expect(matches('react')).toBe(true);
  });

  it('ignores surrounding whitespace and rejects non-matches', () => {
    expect(matches('  abzu  ')).toBe(true);
    expect(matches('datex')).toBe(false);
  });

  it('does not match across field boundaries', () => {
    expect(matches('editor data-editors')).toBe(false);
  });
});
