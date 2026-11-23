---
title: All Tools
search: false
editLink: false
head:
  - - meta
    - http-equiv: refresh
      content: 0; url=../tools/
---

<script setup>
import { onMounted } from 'vue';
import { useRouter, withBase } from 'vitepress';

// The tools list lives at /tools/; this page only forwards old links there
const router = useRouter();
onMounted(() => router.go(withBase('/tools/'), { replace: true }));
</script>

The tools list has moved to [All Tools](/tools/).
