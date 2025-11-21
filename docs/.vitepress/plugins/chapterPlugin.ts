/**
 * Chapter Container Plugin for VitePress
 *
 * Creates a custom +++ chapter container syntax for collapsible chapter sections.
 * Uses HTML <details>/<summary> elements with heading support and markdown-it-attrs syntax.
 *
 * Usage:
 *   +++ chapter ## Chapter Title
 *   Content goes here...
 *   +++
 *
 *   +++ chapter ## Chapter Title {#custom-id .my-class open}
 *   Chapter open by default with custom attributes...
 *   +++
 *
 * Generated HTML (basic):
 *   <details class="chapter">
 *     <summary>
 *       <span class="chapter-marker"></span>
 *       <h2 id="chapter-title">Chapter Title</h2>
 *     </summary>
 *     <p>Content goes here...</p>
 *   </details>
 *
 * Generated HTML (with attributes):
 *   <details class="chapter my-class" open>
 *     <summary>
 *       <span class="chapter-marker"></span>
 *       <h2 id="custom-id">Chapter Title</h2>
 *     </summary>
 *     <p>Chapter open by default with custom attributes...</p>
 *   </details>
 *
 * Attributes syntax (via markdown-it-attrs):
 *   {.class}           - Adds class to <details> element
 *   {#id}              - Sets id on heading (or <details> if no heading)
 *   {open}             - Adds 'open' attribute to <details>
 *   {attr="value"}     - Adds custom attribute to <details>
 *
 * Heading support:
 *   - Any heading level (##, ###, ####, etc.)
 *   - Inline markdown in title (backticks, bold, italic, links)
 *   - Auto-generated slugs or custom IDs
 *   - Fallback: plain text if no heading markers
 */

import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import container from 'markdown-it-container';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';

/**
 * Renders chapter container opening and closing tags.
 * Processes attributes from markdown-it-attrs and generates HTML details/summary elements.
 *
 * @param tokens - Array of markdown tokens
 * @param idx - Current token index
 * @param md - MarkdownIt instance for rendering inline content
 * @returns HTML string for opening or closing tag
 */
function renderChapter(tokens: Token[], idx: number, md: MarkdownIt): string {
  const token = tokens[idx];
  const info = token.info.trim().slice('chapter'.length).trim();

  if (token.nesting === 1) {
    // Extract attributes from token (processed by markdown-it-attrs)
    let customId: string | null = null;
    let customClass: string | null = null;
    const otherAttrs: Array<[string, string]> = [];

    if (token.attrs) {
      for (const [key, value] of token.attrs) {
        if (key === 'id') {
          customId = value;
        } else if (key === 'class') {
          customClass = value;
        } else {
          otherAttrs.push([key, value]);
        }
      }
    }

    // Build details element classes (base 'chapter' + any custom classes)
    const detailsClasses = customClass ? `chapter ${customClass}` : 'chapter';

    // Build other attributes string (excluding id and class)
    const otherAttrsStr = otherAttrs
      .map(([key, value]) => {
        if (value === '') return key; // Boolean attribute like 'open'
        return `${key}="${value}"`;
      })
      .join(' ');

    // Check if we have a heading
    const headingMatch = info.match(/^(#+)\s+(.*)$/);

    if (headingMatch) {
      // With heading
      const level = headingMatch[1].length;
      const title = headingMatch[2];
      const headingId = customId || title.toLowerCase().replace(/\s+/g, '-');

      return `<details class="${detailsClasses}"${otherAttrsStr ? ' ' + otherAttrsStr : ''}>
<summary><span class="chapter-marker"></span><h${level} id="${headingId}">${md.renderInline(title)}</h${level}></summary>\n`;
    } else {
      // Fallback: no heading - apply ID to details
      const idAttr = customId ? ` id="${customId}"` : '';

      return `<details class="${detailsClasses}"${idAttr}${otherAttrsStr ? ' ' + otherAttrsStr : ''}>
<summary><span class="chapter-marker"></span>${info ? md.renderInline(info) : 'Chapter'}</summary>\n`;
    }
  } else {
    // Closing tag
    return '</details>\n';
  }
}

/**
 * Registers the chapter container plugin with markdown-it.
 * Enables +++ chapter syntax with heading support and markdown-it-attrs integration.
 *
 * @param md - MarkdownIt instance to extend
 */
export function chapterPlugin(md: MarkdownIt) {
  md.use(container, 'chapter', {
    marker: '+',
    render: ((tokens, idx) => renderChapter(tokens, idx, md)) as RenderRule,
  });
}
