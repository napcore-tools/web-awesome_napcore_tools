---
# Import standards module to create dependency - VitePress will watch standards.yaml
---

<script setup>
// This import ensures VitePress watches standards.yaml for changes
import { data as _standardsData } from '../.vitepress/core/data-loaders/standards.data'
import { withBase } from 'vitepress'
</script>

# {{ $params.standardName }}

<div v-if="$params.details">

{{ $params.details.longTitle }}

::: details Click for more

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
