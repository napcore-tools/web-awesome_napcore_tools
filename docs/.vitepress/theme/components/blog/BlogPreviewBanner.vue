<template>
  <div v-if="isPreviewMode" class="preview-banner">
    <span class="preview-icon">👁️</span>
    <span class="preview-text">
      <strong>Preview Mode Active</strong> - Showing scheduled posts that haven't been published yet
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const isPreviewMode = computed(() => {
  return typeof import.meta.env.VITE_PREVIEW_MODE !== 'undefined';
});
</script>

<style scoped>
.preview-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ff9800 0%, #ff6b35 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}

.preview-icon {
  font-size: 1.5rem;
}

.preview-text {
  font-size: 0.95rem;
  line-height: 1.4;
}

.preview-text strong {
  font-weight: 600;
}

@media (max-width: 640px) {
  .preview-banner {
    padding: 0.875rem 1rem;
    gap: 0.5rem;
  }

  .preview-icon {
    font-size: 1.25rem;
  }

  .preview-text {
    font-size: 0.875rem;
  }
}
</style>
