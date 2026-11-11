---
document: category
---

<script setup>
// Dynamic category page template. A hand-crafted docs/categories/<slug>.md takes
// precedence over this generated route (see [category].paths.ts), so the existing
// prose pages are unaffected; this renders categories defined only in categories.yaml.
//
// Keep "# " comments out of the frontmatter: vitepress-plugin-llmstxt does not strip
// CRLF frontmatter and takes the first "# " line as the page title in llms.txt.
//
// This import ensures VitePress watches categories.yaml for changes
import { data as _categoriesData } from '../.vitepress/core/data-loaders/categories.data'
</script>

# {{ $params.categoryName }}

<p v-if="$params.description">{{ $params.description }}</p>

<div v-if="$params.details && $params.details.related_with_titles && $params.details.related_with_titles.length > 0">

## Related Categories

<RelatedCategories />

</div>

## Available Tools

<ToolsFilter />
