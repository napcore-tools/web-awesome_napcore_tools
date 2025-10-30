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

  if (data.title) {
    header += `# ${data.title}\n\n`
  }

  const description = data.fullDescription || data.description
  if (description) {
    header += `> ${description}\n\n`
  }

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
