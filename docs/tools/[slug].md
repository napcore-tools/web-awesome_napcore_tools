---
layout: doc
---

<script setup>
import { useData } from 'vitepress';
const { params: p } = useData();
</script>

# {{ p.tool.title }}

<ToolPubliccodeView />
