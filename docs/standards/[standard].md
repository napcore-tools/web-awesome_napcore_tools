<script setup>
// Keep "# " comments out of the frontmatter: vitepress-plugin-llmstxt does not strip
// CRLF frontmatter and takes the first "# " line as the page title in llms.txt.
//
// This import ensures VitePress watches standards.yaml for changes
import { data as _standardsData } from '../.vitepress/core/data-loaders/standards.data'
import { withBase } from 'vitepress'
</script>

# {{ $params.standardName }}

<div v-if="$params.details">

::: details {{ $params.details.longTitle }}

<img
  v-if="$params.details.logo"
  :src="withBase($params.details.logo)"
  :alt="$params.standardName"
  style="display: block; height: 4rem; width: auto; margin: 1.25rem 0 -0.75rem; padding: 0;"
/>

### Overview

**Domain:** {{ $params.details.domain }}

**Status:** {{ $params.details.status }}

**More info:** <a :href="$params.details.link" target="_blank">{{ $params.details.link }}</a>

{{ $params.details.purpose }}

### Technical Details

**Format/Technology:** {{ $params.details.format_technology }}

**Maintainer/Origin:** {{ $params.details.maintainer_origin }}

<div v-if="$params.details.related_standards_with_titles && $params.details.related_standards_with_titles.length > 0">

### Related Standards

<ul>
  <li v-for="related in $params.details.related_standards_with_titles" :key="related.slug">
    <a :href="withBase(`/standards/${related.slug}`)">{{ related.title }}</a>
  </li>
</ul>

</div>
:::

</div>

## Tools

Browse all tools that support the **{{ $params.standardName }}** standard.

<ToolsFilter :standard="$params.standard" />
