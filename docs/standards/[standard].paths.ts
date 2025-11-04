// Dynamic path generator for standard pages
import toolsDataLoader from '../.vitepress/tools.data';
import standardsDataLoader from '../.vitepress/standards.data';

export default {
  paths() {
    // Collect all unique standards (already slugified in tool frontmatter)
    const standardSlugsSet = new Set<string>();
    const tools = toolsDataLoader.load();

    for (const tool of tools) {
      if (tool.standards && tool.standards.length > 0) {
        for (const standardSlug of tool.standards) {
          standardSlugsSet.add(standardSlug);
        }
      }
    }

    // Load standards data
    const standards = standardsDataLoader.load();

    // Create paths for each standard with title and details
    return Object.keys(standards).map((slug) => {
      const standard = standards[slug];
      const title = standard?.title || slug; // Fallback to slug if not found

      // Enhance related standards with titles
      let enhancedDetails = standard;
      if (standard && standard.related_standards) {
        enhancedDetails = {
          ...standard,
          related_standards_with_titles: standard.related_standards.map((relatedSlug) => {
            const relatedStandard = standards[relatedSlug];
            return {
              slug: relatedSlug,
              title: relatedStandard?.title || relatedSlug,
            };
          }),
        };
      }

      return {
        params: {
          standard: slug,
          standardName: title,
          title: `Tools supporting ${title}`, // For transformPageData hook
          details: enhancedDetails || null, // Pass details or null if not found
        },
      };
    });
  },
};
