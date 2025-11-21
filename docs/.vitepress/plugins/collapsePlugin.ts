import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';

/**
 * Renders collapse container opening and closing tags.
 * Escapes title to prevent XSS attacks.
 *
 * @param tokens - Array of markdown tokens
 * @param idx - Current token index
 * @param md - MarkdownIt instance for escaping HTML
 * @returns HTML string for opening or closing tag
 */
function renderCollapse(tokens: Token[], idx: number, md: MarkdownIt): string {
  const token = tokens[idx];

  if (token.nesting === 1) {
    // Opening tag
    const info = token.info.trim().slice('collapse'.length).trim();
    const title = info || 'Click to expand';

    // Escape HTML in title to prevent XSS
    const escapedTitle = md.utils.escapeHtml(title);

    return `<details class="collapse-section">\n<summary class="collapse-title">${escapedTitle}</summary>\n<div class="collapse-body">\n`;
  } else {
    // Closing tag
    return `</div>\n</details>\n`;
  }
}

/**
 * Registers the collapse container plugin with markdown-it.
 * Enables +++ collapse syntax for plain-text collapsible sections.
 *
 * @param md - MarkdownIt instance to extend
 */
export function collapsePlugin(md: MarkdownIt) {
  md.use(container, 'collapse', {
    marker: '+',
    render: ((tokens, idx) => renderCollapse(tokens, idx, md)) as RenderRule,
  });
}
