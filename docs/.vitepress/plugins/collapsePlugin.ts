/**
 * Collapse Container Plugin for VitePress
 *
 * Creates a custom ::: collapse container syntax for plain-text collapsible sections.
 * Generates clean HTML without VitePress's default custom-block class.
 *
 * Usage:
 *   ::: collapse Your Title Here
 *   Content goes here...
 *   :::
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

export function collapsePlugin(md: MarkdownIt) {
  md.use(container, 'collapse', {
    marker: '+',
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
