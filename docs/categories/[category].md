---
# Dynamic category page template. A hand-crafted docs/categories/<slug>.md takes
# precedence over this generated route (see [category].paths.ts), so the existing
# prose pages are unaffected; this renders categories defined only in categories.yaml.
document: category
---

<script setup>
// This import ensures VitePress watches categories.yaml for changes
import { data as _categoriesData } from '../.vitepress/core/data-loaders/categories.data'
</script>

# {{ $params.icon }} {{ $params.categoryName }}

<p v-if="$params.description">{{ $params.description }}</p>

<div v-if="$params.details && $params.details.related_with_titles && $params.details.related_with_titles.length > 0">

## Related Categories

<RelatedCategories />

</div>

## Available Tools

<ToolsFilter />
