<script setup lang="ts">
import { onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();

const NAV_KEYS: Record<string, string> = {
  h: '/',
  t: '/all/',
  s: '/standards/',
  c: '/categories/',
  n: '/categories/napcore-provided',
  a: '/about',
};

const G_WINDOW_MS = 1000;
let gPressedAt = 0;

function onKeyDown(e: KeyboardEvent) {
  const tag = (e.target as Element).tagName;
  const editable = (e.target as HTMLElement).isContentEditable;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || editable) return;
  if (e.metaKey || e.ctrlKey || e.altKey) return;

  if (e.key === 'g') {
    gPressedAt = Date.now();
    return;
  }

  if (gPressedAt > 0 && Date.now() - gPressedAt < G_WINDOW_MS && NAV_KEYS[e.key]) {
    e.preventDefault();
    gPressedAt = 0;
    router.go(NAV_KEYS[e.key]);
    nextTick(() => {
      document.querySelector<HTMLInputElement>('.search-input')?.focus();
    });
    return;
  }

  gPressedAt = 0;
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', onKeyDown);
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
});
</script>
