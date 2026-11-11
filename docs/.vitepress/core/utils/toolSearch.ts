import type { Tool } from '../data-loaders/tools.data';

/** Looks up a display title by slug; returns undefined for unknown slugs. */
export type TitleLookup = (slug: string) => string | undefined;

/**
 * Lower-cased text the tools filter matches a search term against.
 *
 * Categories and standards are included by both slug and display title, so
 * "data-editors", "registries", "netex" and "NeTEx" all match.
 */
export function toolSearchText(tool: Tool, categoryTitle: TitleLookup, standardTitle: TitleLookup): string {
  const terms = [
    tool.title,
    tool.description,
    ...(tool.tags ?? []),
    ...tool.categories,
    ...tool.categories.map(categoryTitle),
    ...(tool.standards ?? []),
    ...(tool.standards ?? []).map(standardTitle),
    tool.developer,
    tool.maintainedBy,
    tool.language,
    tool.technology,
  ];
  return terms.filter(Boolean).join(' \n ').toLowerCase();
}

/** True when the tool matches a (trimmed, non-empty) search term. */
export function toolMatchesSearch(
  tool: Tool,
  searchTerm: string,
  categoryTitle: TitleLookup,
  standardTitle: TitleLookup
): boolean {
  return toolSearchText(tool, categoryTitle, standardTitle).includes(searchTerm.trim().toLowerCase());
}
