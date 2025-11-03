// Dynamic path generator for standard pages
import toolsDataLoader from '../.vitepress/tools.data'
import { getStandardMetadata } from '../.vitepress/standards'
import standardDetailsLoader from '../.vitepress/standardDetails.data'

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

    // Load standard details from YAML
    const standardDetails = standardDetailsLoader.load()

    // Create paths for each standard with title and details
    return Array.from(standardSlugsSet).map(slug => {
      const metadata = getStandardMetadata(slug)
      const details = standardDetails[slug] // May be undefined if not in YAML

      // Enhance related standards with titles
      let enhancedDetails = details
      if (details && details.related_standards) {
        enhancedDetails = {
          ...details,
          related_standards_with_titles: details.related_standards.map(relatedSlug => ({
            slug: relatedSlug,
            title: getStandardMetadata(relatedSlug).title
          }))
        }
      }

      return {
        params: {
          standard: slug,
          standardName: metadata.title,
          title: `Tools supporting ${metadata.title}`, // For transformPageData hook
          details: enhancedDetails || null // Pass details or null if not found
        }
      }
    })
  }
}
