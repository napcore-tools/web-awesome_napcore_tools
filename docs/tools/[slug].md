---
layout: doc
---

<script setup>
// Use $params (not useData) in the template: vitepress-plugin-llmstxt only substitutes
// {{ $params.<key> }}, so anything else leaks into llms.txt verbatim. Keep "# " comments
// out of the frontmatter too: the plugin does not strip CRLF frontmatter and takes the
// first "# " line as the page title.
</script>

# {{ $params.title }}

<ToolPubliccodeView />
