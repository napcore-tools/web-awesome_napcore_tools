# Awesome NAPCORE Tools - AI Assistant Context

**Purpose:** Quick reference for active development. See `project-docs/index.md` for comprehensive docs.  
**Last Updated:** 2025-12-30

---

## Project Overview

VitePress documentation site for Awesome NAPCORE Tools - a curated catalog of European mobility data tools.

**Tech Stack:**
- VitePress 2.0 (Vue 3 SSG)
- TypeScript 5.9 (strict mode)
- Vitest + Playwright
- GitHub Pages deployment

**Architecture:** Static Site Generation (JAMstack)

---

## Code Conventions

### TypeScript Patterns

✅ **Always use existing interfaces:**
```typescript
import type { Tool } from '@/core/data-loaders/tools.data';
// Use Tool or Partial<Tool>, not Record<string, unknown>
```

✅ **Prototype safety:**
```typescript
Object.hasOwn(obj, key)  // ✅ Use this
obj.hasOwnProperty(key)  // ❌ Avoid this
```

✅ **Unused parameters:**
```typescript
enhanceApp({ app, _router, _siteData }) {
  // Prefix unused with underscore
}
```

✅ **Avoid `any` types:**
```typescript
const data: unknown = parseYaml(content);  // ✅
const data: any = parseYaml(content);      // ❌
```

### ESLint Configuration

**File:** `eslint.config.js` (flat config format)

**Unused variable rule:**
```javascript
'@typescript-eslint/no-unused-vars': ['warn', {
  argsIgnorePattern: '^_',
  varsIgnorePattern: '^_'
}]
```

---

## Key File Locations

### Components
```
docs/.vitepress/theme/components/
├── blog/           # 5 blog components
├── tools/          # 6 tool components  
├── categories/     # 2 category components
├── standards/      # 1 standards component
└── index/          # 1 index component
```

**Global Registration:** `docs/.vitepress/theme/index.ts`

### Data Loaders
```
docs/.vitepress/core/data-loaders/
├── tools.data.ts      # Tool[] - parses tool frontmatter
├── blog.data.ts       # BlogPost[] - uses createContentLoader()
├── blogTags.data.ts   # BlogTags - YAML tag metadata
├── standards.data.ts  # Standard{} - YAML standards
└── stats.data.ts      # Stats - aggregated statistics
```

### Validation
```
docs/.vitepress/core/validation/
├── tools.ts           # Tool frontmatter validation
├── categories.ts      # Category metadata validation
├── standards.ts       # Standards metadata validation
└── utils.ts           # Shared validation utilities
```

### Utilities
```
docs/.vitepress/core/utils/
├── tagResolver.ts     # Tag resolution (category → standard → blog)
├── slugify.ts         # URL slug generation
├── detailsNavigation.ts  # Collapsible section navigation
└── index.ts           # Utility exports
```

---

## Common Workflows

### Adding a New Tool

1. **Create tool file:**
   ```bash
   docs/tools/my-tool.md
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   document: tool
   title: My Tool
   description: Brief description
   categories:
     - validators
   standards:
     - datex-ii
   status: active
   license: MIT
   repository: https://github.com/...
   ---
   ```

3. **Add QuickInfo component:**
   ```markdown
   ## Quick Info
   
   <ToolQuickInfo />
   ```

4. **Tool auto-appears** in catalog (data loader picks it up)

### Creating a Blog Post

1. **Create post file:**
   ```bash
   docs/blog/posts/2025-12-30-my-post.md
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   title: Post Title
   description: Short description
   date: 2025-12-30
   author: Your Name
   tags:
     - datex-ii
     - technical
   published: true
   ---
   ```

3. **Add metadata component:**
   ```markdown
   <BlogPostMeta />
   
   # Post Title
   
   Content here...
   ```

4. **Preview scheduled posts:**
   ```bash
   VITE_PREVIEW_MODE=1 npm run dev
   ```

### Adding a Vue Component

1. **Create component:**
   ```bash
   docs/.vitepress/theme/components/MyComponent.vue
   ```

2. **Register globally:**
   ```typescript
   // docs/.vitepress/theme/index.ts
   import MyComponent from './components/MyComponent.vue';
   
   enhanceApp({ app }) {
     app.component('MyComponent', MyComponent);
   }
   ```

3. **Use in markdown:**
   ```markdown
   <MyComponent />
   ```

### Modifying Validation Rules

Edit `docs/.vitepress/core/validation/tools.ts` - return `ValidationResult` with errors array.

---

## Key Interfaces

**Tool:** `docs/.vitepress/core/data-loaders/tools.data.ts:11`  
**BlogPost:** `docs/.vitepress/core/data-loaders/blog.data.ts`  
**ResolvedTag:** `docs/.vitepress/core/utils/tagResolver.ts:18`  

Use existing types - avoid `any` or `Record<string, unknown>`

---

## Tag Resolution System

**Resolution order:**
1. Check if tag matches **category** → `/categories/{slug}`
2. Check if tag matches **standard** → `/standards/{slug}`
3. Check if tag in **blogTags.yaml** → `/blog?tag={slug}` (custom title)
4. Fallback → `/blog?tag={slug}` (slug as title)

**Usage:**
```typescript
import { resolveTag, resolveTags } from '@/core/utils/tagResolver';

const tag = resolveTag('datex-ii');
// { slug: 'datex-ii', title: 'DATEX II', type: 'standard', url: '/standards/datex-ii' }
```

**Add custom blog tags:** Edit `docs/data/blogTags.yaml`

---

## Component Patterns

### Component Notes

**ToolQuickInfo:** Auto-generates metadata from frontmatter. Use `<ToolQuickInfo />` in tool pages.  
**ToolsGrid:** Multi-level filtering. Priority: `showAll` → `selectedTools` → Category+Standards → Text filter. Debug: `?debug=true`

---

## Styling Principles

**Rule:** Each component owns 100% of its styles in `<style scoped>`. Never put component styles in global CSS.

**Global CSS:**
- `custom.css` → Branding, VitePress overrides
- `blog.css` → Layout/containers only
- `markdown-sections.css` → Markdown plugins

---

## Markdown Extensions

### Document Type Plugin

**Auto-generates content based on frontmatter:**

```yaml
---
document: tool  # or 'category'
---
```

- `tool` → Adds title, description, QuickInfo section
- `category` → Adds contribution tip footer

### Chapter Plugin

**Collapsible chapters with headings:**

```markdown
+++ chapter ## Heading Title {open}
Content here...
+++
```

**Attributes:**
- `{open}` → Open by default
- `{#my-id}` → Custom ID
- `{.my-class}` → Custom CSS class

### Collapse Plugin

**Plain collapsible sections:**

```markdown
+++ collapse Click to expand
Content here...
+++
```

---

## Testing

### Run Tests

```bash
# Unit tests (Vitest)
npm run test:unit

# E2E tests (Playwright)
npm run test:e2e

# All tests
npm test
```

### Test Locations

- `tests/unit/components/` → Component tests
- `tests/unit/core/` → Data loader, validation, utility tests
- `tests/e2e/` → Smoke tests, dynamic route tests

---

## Build & Deploy

### Development

```bash
npm run dev           # Start dev server (localhost:5173)
npm run build         # Production build
npm run preview       # Preview built site
```

### Validation

```bash
npm run lint          # ESLint check
npm run type-check    # TypeScript check
npm run format        # Prettier check
```

### Deployment

**Automatic:** Push to `main` → GitHub Actions → GitHub Pages

**Manual:** See `project-docs/deployment-guide.md`

---

## Environment Variables

| Variable | Purpose | Usage |
|----------|---------|-------|
| `VITEPRESS_BASE` | Asset base path | Set by CI for GitHub Pages |
| `VITE_PREVIEW_MODE` | Show scheduled posts | `VITE_PREVIEW_MODE=1 npm run dev` |

---

## Important Notes

⚠️ **Single source of truth:** Tool metadata lives in frontmatter, never duplicate in markdown

⚠️ **Type safety:** Always use `Tool` or `Partial<Tool>`, not `any` or `Record<string, unknown>`

⚠️ **Build validation:** All frontmatter validated at build time (build fails on errors)

⚠️ **No `<style scoped>` in markdown:** Use Vue components with scoped styles instead

⚠️ **Component registration:** Register all components globally in `theme/index.ts`

---

## When to Use project-docs/

**Use project-docs/ for:**
- 📋 Feature planning and PRD workflows
- 🏗️ Architecture decisions
- 📖 Brownfield project understanding
- 🔄 Onboarding new developers

**Use .claude/CLAUDE.md for:**
- ⚡ Quick code pattern lookup
- 🛠️ Active development reference
- 💡 Common workflow examples
- 🎯 Specific conventions and rules

---

For comprehensive documentation, see `project-docs/index.md`
