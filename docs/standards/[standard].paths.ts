// Dynamic path generator for standard pages
import toolsDataLoader from '../.vitepress/tools.data'
import { createSlug } from '../.vitepress/utils'

export default {
  paths() {
    // Collect all unique standards
    const standardsSet = new Set<string>()
    const tools = toolsDataLoader.load()

    for (const tool of tools) {
      if (tool.standards && tool.standards.length > 0) {
        for (const standard of tool.standards) {
          standardsSet.add(standard)
        }
      }
    }

    // Create paths for each standard
    return Array.from(standardsSet).map(standard => ({
      params: {
        standard: createSlug(standard),
        standardName: standard
      }
    }))
  }
}
