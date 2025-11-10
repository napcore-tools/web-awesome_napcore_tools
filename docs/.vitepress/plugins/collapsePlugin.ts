/**
 * Collapse Container Plugin for VitePress
 *
 * Creates a custom +++ collapse container syntax for plain-text collapsible sections.
 * Generates clean HTML without VitePress's default custom-block class.
 *
 * Usage:
 *   +++ collapse Your Title Here
 *   Content goes here...
 *   +++
 *
 * Generated HTML:
 *   <details class="collapse-section">
 *     <summary class="collapse-title">Your Title Here</summary>
 *     <div class="collapse-body">
 *       <p>Content goes here...</p>
 *     </div>
 *   </details>
 */

import type MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';

/**
 * Registers the collapse container plugin with markdown-it.
 * Enables +++ collapse syntax for plain-text collapsible sections.
 *
 * @param md - MarkdownIt instance to extend
 */
export function collapsePlugin(md: MarkdownIt) {
  md.use(container, 'collapse', {
    marker: '+',
    /**
     * Renders collapse container opening and closing tags.
     * Escapes title to prevent XSS attacks.
     *
     * @param tokens - Array of markdown tokens
     * @param idx - Current token index
     * @param _options - Markdown-it options (unused)
     * @param _env - Markdown-it environment (unused)
     * @param _self - Markdown-it renderer instance (unused)
     * @returns HTML string for opening or closing tag
     */
    render(tokens, idx, _options, _env, _self) {
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
    },
  });
}
