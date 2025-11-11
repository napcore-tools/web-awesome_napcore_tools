import type MarkdownIt from 'markdown-it';
import matter from 'gray-matter';

interface FrontmatterData {
  document?: string;
  title?: string;
  description?: string;
  fullDescription?: string;
  contributeTip?: string;
  [key: string]: unknown;
}

/**
 * Generates markdown header for tool documents.
 * Creates a standardized header with title, description (as blockquote), and QuickInfo component.
 *
 * @param data - Frontmatter data from the tool markdown file
 * @returns Markdown string with formatted header content
 */
function processToolDocument(data: FrontmatterData): string {
  let header = '';

  // Add main title
  if (data.title) {
    header += `# ${data.title}\n\n`;
  }

  // Add description as blockquote (prefer fullDescription over description)
  const description = data.fullDescription || data.description;
  if (description) {
    header += `> ${description}\n\n`;
  }

  // Add Quick Info section with component
  header += `## Quick Info\n\n<QuickInfo />\n\n`;

  return header;
}

/**
 * Generates markdown footer for category documents.
 * Creates a standardized footer with separator and contribution tip.
 *
 * @param data - Frontmatter data from the category markdown file
 * @returns Markdown string with formatted footer content
 */
function processCategoryDocument(data: FrontmatterData): string {
  let footer = '\n\n---\n\n';

  // Add contribution tip if provided
  if (data.contributeTip) {
    footer += `::: tip Want to Contribute?\n\n${data.contributeTip}\n[Submit your tool →](/contribute)\n:::\n`;
  }

  return footer;
}

/**
 * Custom markdown-it plugin for NAPCORE documentation.
 * Intercepts markdown rendering to inject document-specific headers and footers based on frontmatter.
 * Currently supports 'tool' and 'category' document types, with extensibility for additional types.
 *
 * @param md - MarkdownIt instance to extend
 */
export function napCoreMarkdownPlugin(md: MarkdownIt) {
  const originalRender = md.render.bind(md);

  md.render = (src: string, env: Record<string, unknown>) => {
    const { data, content } = matter(src);

    let header = '';
    let footer = '';

    if (data.document === 'tool') {
      header = processToolDocument(data as FrontmatterData);
    } else if (data.document === 'category') {
      footer = processCategoryDocument(data as FrontmatterData);
    }
    // Add more document types here:
    // else if (data.document === 'guide') {
    //   header = processGuideDocument(data)
    // }

    if (header || footer) {
      src = src.replace(content, header + content + footer);
    }

    return originalRender(src, env);
  };
}
