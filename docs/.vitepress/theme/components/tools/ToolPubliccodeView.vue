<template>
  <div>
    <img v-if="pc.logo" :src="githubBlobToRaw(pc.logo as string)" :alt="t.title" class="tool-logo" />

    <p class="pc-notice">
      Metadata on this page is sourced automatically from the project's
      <a v-if="t.repository" :href="t.repository" target="_blank"><code>publiccode.yml</code></a
      ><code v-else>publiccode.yml</code>.
    </p>

    <p>{{ t.description }}</p>

    <p v-if="t.longDescription">{{ t.longDescription }}</p>

    <template v-if="t.features?.length">
      <h2>Features</h2>
      <ul>
        <li v-for="feature in t.features" :key="feature">{{ feature }}</li>
      </ul>
    </template>

    <h2>Quick Info</h2>

    <table>
      <tbody>
        <tr v-if="t.status && t.status !== 'active'">
          <td><strong>Status</strong></td>
          <td>🔴 Deprecated</td>
        </tr>
        <tr v-if="t.categories?.length">
          <td><strong>Categories</strong></td>
          <td>
            <span v-for="(cat, i) in t.categories" :key="cat"
              ><template v-if="i > 0">, </template><a :href="`/categories/${cat}`">{{ cat }}</a></span
            >
          </td>
        </tr>
        <tr v-if="t.standards?.length">
          <td><strong>Standards</strong></td>
          <td>
            <span v-for="(std, i) in t.standards" :key="std"
              ><template v-if="i > 0">, </template><a :href="`/standards/${std}`">{{ std }}</a></span
            >
          </td>
        </tr>
        <tr v-if="pc.softwareType">
          <td><strong>Type</strong></td>
          <td>{{ pc.softwareType }}</td>
        </tr>
        <tr v-if="t.license">
          <td><strong>License</strong></td>
          <td>{{ t.license }}</td>
        </tr>
        <tr v-if="t.website">
          <td><strong>Website</strong></td>
          <td>
            <a :href="t.website" target="_blank">{{ linkHost(t.website) }}</a>
          </td>
        </tr>
        <tr v-if="t.repository">
          <td><strong>Repository</strong></td>
          <td>
            <a :href="t.repository" target="_blank">{{ linkHost(t.repository) }}</a>
          </td>
        </tr>
        <tr v-if="t.documentation">
          <td><strong>Documentation</strong></td>
          <td>
            <a :href="t.documentation" target="_blank">{{ linkHost(t.documentation) }}</a>
          </td>
        </tr>
        <tr v-if="pcEn.apiDocumentation">
          <td><strong>API Documentation</strong></td>
          <td>
            <a :href="pcEn.apiDocumentation as string" target="_blank">{{
              linkHost(pcEn.apiDocumentation as string)
            }}</a>
          </td>
        </tr>
        <tr v-if="t.developer">
          <td><strong>Developer</strong></td>
          <td>{{ t.developer }}</td>
        </tr>
        <tr v-if="t.maintainedBy">
          <td><strong>Maintained by</strong></td>
          <td>
            {{ t.maintainedBy
            }}<template v-if="pcContact.affiliation">
              · <em>{{ pcContact.affiliation }}</em></template
            >
          </td>
        </tr>
        <tr v-if="pc.platforms?.length">
          <td><strong>Platforms</strong></td>
          <td>
            <span v-for="platform in pc.platforms as string[]" :key="platform" class="platform-badge">{{
              platform
            }}</span>
          </td>
        </tr>
        <tr v-if="t.softwareVersion">
          <td><strong>Version</strong></td>
          <td>{{ t.softwareVersion }}</td>
        </tr>
        <tr v-if="t.firstRelease">
          <td><strong>First release</strong></td>
          <td>{{ t.firstRelease }}</td>
        </tr>
      </tbody>
    </table>

    <template v-if="pc.usedBy?.length">
      <h2>Used by</h2>
      <ul>
        <li v-for="org in pc.usedBy as string[]" :key="org">{{ org }}</li>
      </ul>
    </template>

    <template v-if="pcEn.screenshots?.length">
      <h2>Screenshots</h2>
      <div class="screenshots-grid">
        <a v-for="(src, i) in pcEn.screenshots as string[]" :key="i" :href="src" target="_blank">
          <img :src="src" :alt="`Screenshot ${i + 1}`" class="screenshot" />
        </a>
      </div>
    </template>

    <template v-if="pcEn.videos?.length">
      <h2>Videos</h2>
      <div class="videos-list">
        <a v-for="(url, i) in pcEn.videos as string[]" :key="i" :href="url" target="_blank" class="video-item">
          <template v-if="youtubeId(url)">
            <img
              :src="`https://img.youtube.com/vi/${youtubeId(url)}/mqdefault.jpg`"
              :alt="`Video ${i + 1}`"
              class="video-thumb"
            />
            <span class="video-label">▶ Watch on YouTube</span>
          </template>
          <template v-else>
            <span class="video-label">▶ {{ url }}</span>
          </template>
        </a>
      </div>
    </template>

    <template v-if="t.tags?.length">
      <h2>Tags</h2>
      <div class="tool-tags">
        <span v-for="tag in t.tags" :key="tag" class="tool-tag">{{ tag }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import type { Tool } from '../../core/data-loaders/tools.data';

const { params: p } = useData();

type PubliccodeRecord = Record<string, unknown>;

const t = computed((): Tool => (p.value?.tool as Tool) ?? ({} as Tool));
const pc = computed((): PubliccodeRecord => (p.value?.publiccode as PubliccodeRecord) ?? {});
const pcEn = computed(
  (): PubliccodeRecord => ((pc.value?.description as PubliccodeRecord)?.en as PubliccodeRecord) ?? {}
);
const pcContact = computed((): PubliccodeRecord => {
  const maintenance = (pc.value?.maintenance as PubliccodeRecord) ?? {};
  return (
    ((maintenance.contacts as PubliccodeRecord[]) ?? [])[0] ??
    ((maintenance.contractors as PubliccodeRecord[]) ?? [])[0] ??
    {}
  );
});

// GitHub blob URLs point to an HTML viewer, not the raw file — rewrite to raw.githubusercontent.com
function githubBlobToRaw(url: string): string {
  const m = url.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/);
  return m ? `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}` : url;
}

function linkHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function youtubeId(url: string): string | null {
  const m = url?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}
</script>

<style scoped>
.pc-notice {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 6px;
  padding: 0.6rem 1rem;
  margin-bottom: 1.5rem;
}

.tool-logo {
  max-height: 3rem;
  width: auto;
  margin: 0 0 1.5rem;
}

.platform-badge {
  display: inline-block;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.1rem 0.45rem;
  font-size: 0.8rem;
  margin: 0.1rem 0.2rem 0.1rem 0;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.screenshot {
  width: 100%;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: opacity 0.2s;
}

.screenshot:hover {
  opacity: 0.85;
}

.videos-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
}

.video-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.video-thumb {
  width: 320px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  transition: opacity 0.2s;
}

.video-thumb:hover {
  opacity: 0.85;
}

.video-label {
  font-size: 0.875rem;
  color: var(--vp-c-brand-1);
}
</style>
