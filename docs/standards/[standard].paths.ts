// Dynamic path generator for standard pages
import toolsDataLoader from '../.vitepress/tools.data'
import { getStandardMetadata } from '../.vitepress/standards'

export default {
  paths() {
    // Collect all unique standards (already slugified in tool frontmatter)
    const standardSlugsSet = new Set<string>()
    const tools = toolsDataLoader.load()

    for (const tool of tools) {
      if (tool.standards && tool.standards.length > 0) {
        for (const standardSlug of tool.standards) {
          standardSlugsSet.add(standardSlug)
        }
      }
    }

    // Create paths for each standard with title param
    return Array.from(standardSlugsSet).map(slug => {
      const metadata = getStandardMetadata(slug)
      return {
        params: {
          standard: slug,
          standardName: metadata.title,
          title: `Tools supporting ${metadata.title}` // For transformPageData hook
        }
      }
    })
  }
}
