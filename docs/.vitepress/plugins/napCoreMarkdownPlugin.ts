import type MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

interface FrontmatterData {
  document?: string
  title?: string
  description?: string
  fullDescription?: string
  [key: string]: unknown
}

function processToolDocument(data: FrontmatterData): string {
  let header = ''

  // Add main title
  if (data.title) {
    header += `# ${data.title}\n\n`
  }

  // Add description as blockquote (prefer fullDescription over description)
  const description = data.fullDescription || data.description
  if (description) {
    header += `> ${description}\n\n`
  }

  // Add Quick Info section with component
  header += `## Quick Info\n\n<QuickInfo />\n\n`

  return header
}

export function napCoreMarkdownPlugin(md: MarkdownIt) {
  const originalRender = md.render.bind(md)

  md.render = (src: string, env: Record<string, unknown>) => {
    const { data, content } = matter(src)

    let header = ''

    if (data.document === 'tool') {
      header = processToolDocument(data as FrontmatterData)
    }
    // Add more document types here:
    // else if (data.document === 'guide') {
    //   header = processGuideDocument(data)
    // }

    if (header) {
      src = src.replace(content, header + content)
    }

    return originalRender(src, env)
  }
}
