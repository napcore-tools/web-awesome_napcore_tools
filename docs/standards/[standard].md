---
# Import standards module to create dependency - VitePress will watch standards.yaml
---

<script setup>
// This import ensures VitePress watches standards.yaml for changes
import { data as _standardsData } from '../.vitepress/standards.data'
</script>

# {{ $params.standardName }}

<div v-if="$params.details">

> {{ $params.details.longTitle }}

## Overview

**Domain:** {{ $params.details.domain }}

**Status:** {{ $params.details.status }}

{{ $params.details.purpose }}

## Technical Details

**Format/Technology:** {{ $params.details.format_technology }}

**Maintainer/Origin:** {{ $params.details.maintainer_origin }}

<div v-if="$params.details.related_standards_with_titles && $params.details.related_standards_with_titles.length > 0">

## Related Standards

<ul>
  <li v-for="related in $params.details.related_standards_with_titles" :key="related.slug">
    <a :href="`/standards/${related.slug}`">{{ related.title }}</a>
  </li>
</ul>

</div>

</div>

## Tools

Browse all tools that support the **{{ $params.standardName }}** standard.

<ToolsGrid :standard="$params.standard" />
