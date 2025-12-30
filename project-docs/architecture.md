# Architecture Documentation

**Project:** Awesome NAPCORE Tools  
**Type:** VitePress Static Site Generator  
**Architecture Pattern:** JAMstack (JavaScript, APIs, Markup)  
**Generated:** 2025-12-30

---

## Executive Summary

The Awesome NAPCORE Tools is a curated catalog of European mobility data tools built as a static website using VitePress. It follows a content-driven architecture where tool metadata is stored in markdown frontmatter, processed at build time through data loaders, validated against schemas, and rendered into static HTML with Vue 3 components.

**Key Characteristics:**

- Static site generation (no backend server)
- Build-time data processing and validation
- Component-based UI (Vue 3 SFCs)
- Content managed via Git/GitHub
- Deployed to GitHub Pages via CI/CD

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CONTENT LAYER                            │
│  Markdown Files (tools, blog, categories) + YAML Data          │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Build Time
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD PIPELINE                             │
│  VitePress Build → Data Loaders → Validation → Vue Compilation │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     STATIC OUTPUT                               │
│  HTML + CSS + JS (code-split) + RSS Feed + LLM Exports        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Deploy (GitHub Actions)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HOSTING LAYER                                │
│              GitHub Pages (CDN + HTTPS)                         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Core Framework

| Technology     | Version         | Purpose                        |
| -------------- | --------------- | ------------------------------ |
| **VitePress**  | 2.0.0-alpha.15  | Static site generator          |
| **Vue 3**      | 3.5.13          | UI framework (Composition API) |
| **Vite**       | (via VitePress) | Build tool with HMR            |
| **TypeScript** | 5.9.3           | Type safety                    |

### Development & Testing

| Technology     | Purpose                     |
| -------------- | --------------------------- |
| **Vitest**     | Unit testing (jsdom)        |
| **Playwright** | E2E testing (Chromium)      |
| **ESLint**     | Code linting (flat config)  |
| **Prettier**   | Code formatting             |
| **vue-tsc**    | TypeScript checking for Vue |

### Build & Deployment

| Technology         | Purpose            |
| ------------------ | ------------------ |
| **GitHub Actions** | CI/CD pipeline     |
| **GitHub Pages**   | Static hosting     |
| **npm**            | Package management |

### Utilities & Plugins

| Technology                   | Purpose                  |
| ---------------------------- | ------------------------ |
| **gray-matter**              | YAML frontmatter parsing |
| **yaml**                     | YAML data parsing        |
| **feed**                     | RSS feed generation      |
| **markdown-it**              | Markdown processing      |
| **vitepress-plugin-llmstxt** | LLM-friendly exports     |

---

## Architecture Patterns

### 1. Static Site Generation (SSG)

**Pattern:** Pre-render all pages at build time  
**Benefits:**

- Fast page loads (no server processing)
- SEO-friendly (fully rendered HTML)
- Secure (no dynamic backend)
- Cost-effective (static file hosting)

**Implementation:**

```
Markdown + Frontmatter
    ↓ (VitePress build)
Static HTML + Bundled Assets
    ↓ (Deploy)
GitHub Pages (CDN)
```

### 2. Data-Driven Content

**Pattern:** Separate content (data) from presentation (components)  
**Benefits:**

- Single source of truth (frontmatter)
- Easy content updates (edit markdown)
- Type-safe data contracts (TypeScript interfaces)
- Build-time validation

**Implementation:**

```
Tool Markdown Frontmatter
    ↓ (tools.data.ts)
Tool[] Interface
    ↓ (ToolsGrid.vue)
Rendered Tool Cards
```

### 3. Component-Based UI

**Pattern:** Reusable Vue 3 Single File Components  
**Benefits:**

- Encapsulation (scoped styles, logic, template)
- Reusability (used across multiple pages)
- Testability (isolated unit tests)
- Type safety (TypeScript `<script setup>`)

**Components:** 15 Vue SFCs organized by feature domain

### 4. Build-Time Validation

**Pattern:** Validate all content during build, fail fast  
**Benefits:**

- Prevents invalid data from reaching production
- Early error detection
- No runtime validation overhead
- Cached results (mtime-based)

**Validators:**

- `tools.ts` - Tool frontmatter
- `categories.ts` - Category metadata
- `standards.ts` - Standard metadata

### 5. Markdown-First Authoring

**Pattern:** Content written in markdown with YAML frontmatter  
**Benefits:**

- Human-readable content format
- Git-friendly (easy diffs, merge, history)
- No CMS needed
- IDE support (syntax highlighting, linting)

**Example:**

```yaml
---
title: DATEX II Browser
categories: [references, development]
standards: [datex-ii]
status: active
endorsed: true
---
Tool description in markdown...
```

### 6. Plugin-Based Extensibility

**Pattern:** Extend markdown-it with custom plugins  
**Benefits:**

- Custom syntax without forking VitePress
- Reusable across pages
- Maintained separately from content

**Plugins:**

- `napCoreMarkdownPlugin` - Document type auto-generation
- `chapterPlugin` - Collapsible chapters with headings
- `collapsePlugin` - Plain collapsible sections

---

## Data Architecture

### Data Flow Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                    MARKDOWN SOURCE                            │
│  docs/tools/*.md, docs/blog/posts/*.md, docs/data/*.yaml     │
└─────────────────────┬─────────────────────────────────────────┘
                      │ (Read files)
                      ▼
┌───────────────────────────────────────────────────────────────┐
│                  DATA LOADERS (.data.ts)                      │
│  - Parse YAML frontmatter (gray-matter, yaml)                │
│  - Transform to TypeScript interfaces                         │
│  - Validate against schemas                                   │
└─────────────────────┬─────────────────────────────────────────┘
                      │ (Export static data)
                      ▼
┌───────────────────────────────────────────────────────────────┐
│                STATIC DATA OBJECTS (JS)                       │
│  Tool[], BlogPost[], Standard{}, Stats                       │
│  - Bundled with pages (code-split)                           │
│  - No runtime API calls                                       │
└─────────────────────┬─────────────────────────────────────────┘
                      │ (Import in components)
                      ▼
┌───────────────────────────────────────────────────────────────┐
│                   VUE COMPONENTS (.vue)                       │
│  - Import data: `import { data as tools } from '@/...`       │
│  - Reactive filtering: `computed()`                           │
│  - Render UI: `<template>`                                    │
└─────────────────────┬─────────────────────────────────────────┘
                      │ (Render to HTML)
                      ▼
┌───────────────────────────────────────────────────────────────┐
│                    STATIC HTML                                │
│  Fully rendered pages with embedded data                     │
└───────────────────────────────────────────────────────────────┘
```

### Data Loaders

| Loader                | Input                       | Output       | Purpose            |
| --------------------- | --------------------------- | ------------ | ------------------ |
| **tools.data.ts**     | `docs/tools/*.md`           | `Tool[]`     | Tool metadata      |
| **blog.data.ts**      | `docs/blog/posts/*.md`      | `BlogPost[]` | Blog posts         |
| **blogTags.data.ts**  | `docs/data/blogTags.yaml`   | `BlogTags`   | Tag display names  |
| **standards.data.ts** | `docs/data/standards.yaml`  | `Standard{}` | Standard metadata  |
| **stats.data.ts**     | Computed from other loaders | `Stats`      | Catalog statistics |

### Data Schemas (TypeScript Interfaces)

**Tool Interface:**

```typescript
interface Tool {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  status: string;
  endorsed?: boolean;
  license?: string;
  repository?: string;
  website?: string;
  standards?: string[];
  tags?: string[];
  // ... additional optional fields
}
```

**BlogPost Interface:**

```typescript
interface BlogPost {
  title: string;
  url: string;
  date: { time: number; string: string };
  author?: string;
  tags?: string[];
  description: string;
  published?: boolean;
  publishDate?: string;
}
```

---

## Component Architecture

### Component Hierarchy

```
VitePress Default Theme
    │
    └─── Custom Theme Extension (theme/index.ts)
            │
            ├─── Blog Components (5)
            │    ├── BlogCard
            │    ├── BlogGrid
            │    ├── BlogPostMeta
            │    ├── BlogTagFilter
            │    └── BlogPreviewBanner
            │
            ├─── Tool Components (6)
            │    ├── ToolCard
            │    ├── ToolsGrid (complex filtering logic)
            │    ├── ToolsFilter
            │    ├── ToolQuickInfo
            │    ├── ToolMetadata
            │    └── ToolStats
            │
            ├─── Category Components (2)
            │    ├── CategoryGrid
            │    └── RelatedCategories
            │
            ├─── Standards Components (1)
            │    └── StandardsGrid
            │
            └─── Index Components (1)
                 └── StatsBar
```

### Component Communication

**Props Down, Events Up (where needed):**

```vue
<!-- Parent -->
<ToolsGrid :category="validators" :textFilter="searchTerm" @filter-change="handleFilterChange" />
```

**Route-Based State:**

- Category detection from route: `/categories/validators` → `category="validators"`
- Standard detection from route: `/standards/datex-ii` → `standard="datex-ii"`
- URL query parameters: `?tag=technical` → filter blog posts

**Computed Reactive State:**

```vue
const filteredTools = computed(() => { return tools.filter(/* filtering logic */); });
```

**Global Component Registration:**

```typescript
// theme/index.ts
app.component("ToolsGrid", ToolsGrid);
// Now available in ALL markdown files
```

---

## API Design

### No Backend API

This is a **static site** with **no backend API**. All data is:

- Stored in markdown frontmatter and YAML files
- Processed at build time
- Bundled with static pages
- No runtime database queries
- No authentication/authorization

### "API" via Data Loaders (Build-Time)

Data loaders act as a build-time "API":

**Input:** File system (markdown, YAML)  
**Processing:** Parse, validate, transform  
**Output:** Static JavaScript data objects

**Example:**

```typescript
// Data loader "API"
export default {
  watch: ['../../../tools/*.md'],
  load() {
    // Read, parse, validate, transform
    return Tool[];
  }
}

// Component "consumes API"
import { data as tools } from '@/core/data-loaders/tools.data';
```

---

## State Management

### No Global State Library

**No Vuex, No Pinia** - uses Vue Composition API

### State Management Strategies

| Type                 | Strategy               | Example                               |
| -------------------- | ---------------------- | ------------------------------------- |
| **Static Data**      | Data loaders           | `tools.data.ts` exports `Tool[]`      |
| **Derived State**    | `computed()`           | `filteredTools = computed(() => ...)` |
| **Local State**      | `ref()`, `reactive()`  | `const searchTerm = ref('')`          |
| **URL State**        | Query parameters       | `?tag=datex-ii`                       |
| **Persistent State** | localStorage (minimal) | N/A (not used)                        |

### State Flow Example: Tool Filtering

```
User Input (text search)
    ↓
Local State (ref)
    ↓
Computed Property (filteredTools)
    ↓
Reactive Re-render
```

---

## Build Pipeline

### Build Stages

```
1. Pre-Build Validation
   ├── Load standards.yaml → Validate
   ├── Load categories.ts → Validate
   └── Load tools frontmatter → Validate

2. Data Loading
   ├── tools.data.ts → Parse frontmatter → Tool[]
   ├── blog.data.ts → Parse posts → BlogPost[]
   ├── standards.data.ts → Load YAML → Standard{}
   └── stats.data.ts → Aggregate → Stats

3. Vue Compilation
   ├── Compile .vue SFCs → JavaScript
   ├── Extract <style> → CSS
   └── TypeScript → JavaScript

4. Markdown Processing
   ├── Parse markdown → AST
   ├── Apply plugins (napCore, chapter, collapse)
   ├── Render to HTML
   └── Inject Vue components

5. Asset Bundling
   ├── Code-split per route
   ├── Minify JavaScript
   ├── Bundle CSS
   └── Optimize images

6. Static Generation
   ├── Render all pages to HTML
   ├── Generate sitemap
   ├── Generate RSS feed (buildEnd hook)
   └── Generate LLM exports (plugin)

7. Output
   └── docs/.vitepress/dist/
```

### Build Optimization

- **Code Splitting:** Automatic per-route chunking
- **Tree Shaking:** Removes unused code
- **Minification:** Terser for JS, cssnano for CSS
- **Caching:** Dependency caching in CI, build cache in `.vitepress/cache/`

---

## Deployment Architecture

### Deployment Flow

```
Developer Push
    ↓
GitHub (main branch)
    ↓
GitHub Actions Trigger
    ↓
┌──────────────────────┐
│  Build Environment   │
│  - Ubuntu Latest     │
│  - Node.js 20        │
│  - npm install       │
│  - npm run build     │
└──────────┬───────────┘
           ↓
   Build Artifact
   (dist/ folder)
           ↓
    Upload to GitHub
           ↓
   GitHub Pages
   (gh-pages branch)
           ↓
   CDN Distribution
           ↓
   awesome.napcore.eu
```

### Infrastructure

| Layer       | Technology                 | Purpose                   |
| ----------- | -------------------------- | ------------------------- |
| **Hosting** | GitHub Pages               | Static file hosting       |
| **CDN**     | GitHub's CDN               | Global content delivery   |
| **SSL/TLS** | Let's Encrypt (via GitHub) | HTTPS encryption          |
| **DNS**     | (External)                 | Domain routing            |
| **CI/CD**   | GitHub Actions             | Build & deploy automation |

---

## Security Architecture

### Security Model

**Static Site = Minimal Attack Surface**

✓ **No Backend:** No server-side code to exploit  
✓ **No Database:** No SQL injection, data breaches  
✓ **No User Auth:** No password storage, session hijacking  
✓ **No User Input:** No XSS, CSRF (static content only)  
✓ **HTTPS Enforced:** GitHub Pages forces HTTPS  
✓ **Content Validation:** Build-time validation prevents malformed data

### Content Security

**Build-Time Validation:**

- All tools validated before publication
- Invalid frontmatter rejected (build fails)
- Categories/standards checked against allow-list

**Version Control:**

- All content in Git (audit trail)
- Pull request reviews for contributions
- Signed commits (optional, recommended)

**Dependency Security:**

- npm audit run in CI
- Dependabot alerts enabled
- Minimal dependencies

---

## Testing Architecture

### Test Strategy

```
Unit Tests (Vitest)
    │
    ├── Component Tests
    │   ├── Blog components
    │   └── Tool components
    │
    ├── Data Loader Tests
    │   ├── Frontmatter parsing
    │   └── Validation logic
    │
    └── Utility Tests
        ├── Tag resolution
        └── Slugification

E2E Tests (Playwright)
    │
    ├── Smoke Tests
    │   ├── Homepage loads
    │   └── Navigation works
    │
    └── Dynamic Route Tests
        ├── Tool pages render
        ├── Category pages functional
        └── Standard pages accessible
```

### Test Coverage

| Area             | Coverage Level | Tool                     |
| ---------------- | -------------- | ------------------------ |
| **Components**   | High           | Vitest + @vue/test-utils |
| **Data Loaders** | Medium         | Vitest                   |
| **Utilities**    | High           | Vitest                   |
| **E2E Flows**    | Basic          | Playwright               |

---

## Performance Architecture

### Build-Time Optimizations

1. **Data Loaders:** Process data once at build time
2. **Static Generation:** All pages pre-rendered
3. **Code Splitting:** Automatic per-route chunking
4. **Tree Shaking:** Remove unused code
5. **Minification:** Compress JS/CSS
6. **Cache:** Build artifacts cached

### Runtime Optimizations

1. **No API Calls:** All data bundled (no network latency)
2. **CDN Delivery:** GitHub Pages CDN (global distribution)
3. **Lazy Components:** VitePress loads components on-demand
4. **Prefetching:** VitePress prefetches visible page links
5. **Image Optimization:** (Manual, no automatic processing)

### Performance Metrics

**Target:**

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

---

## Extensibility & Customization

### Extension Points

| Extension Point      | Mechanism                   | Example                                  |
| -------------------- | --------------------------- | ---------------------------------------- |
| **Components**       | Vue SFC + registration      | Add new component in `theme/components/` |
| **Data Loaders**     | VitePress data loader API   | Create `*.data.ts` file                  |
| **Markdown Plugins** | markdown-it plugin API      | Create plugin in `plugins/`              |
| **Validators**       | Custom validation functions | Add to `core/validation/`                |
| **Utilities**        | Shared utility modules      | Add to `core/utils/`                     |
| **Styles**           | CSS files + scoped styles   | Import in `theme/index.ts`               |

### Adding New Features

**Example: Add "Tool Comparison" Feature**

1. **Create data loader** (if needed): `toolComparison.data.ts`
2. **Create component**: `theme/components/tools/ToolComparison.vue`
3. **Register component**: `theme/index.ts`
4. **Add page**: `docs/tools/compare.md`
5. **Test**: Unit tests + E2E tests
6. **Deploy**: Push to main

---

## Architecture Trade-Offs

### Chosen: Static Site Generation

**Pros:**

- ✅ Fast page loads (pre-rendered)
- ✅ Secure (no backend)
- ✅ Cost-effective (free hosting)
- ✅ SEO-friendly (fully rendered HTML)
- ✅ Git-based workflow (version control)

**Cons:**

- ❌ Rebuild required for content updates
- ❌ No dynamic user-generated content
- ❌ No personalization (same for all users)
- ❌ Build time increases with content size

### Alternatives Considered

| Alternative       | Rejected Because                                             |
| ----------------- | ------------------------------------------------------------ |
| **WordPress**     | Overhead of PHP/MySQL, security concerns, maintenance burden |
| **Next.js (SSR)** | Requires Node.js server, more complex deployment             |
| **Pure SPA**      | SEO challenges, slower initial load                          |
| **Gatsby**        | More complex than needed, GraphQL overhead                   |

---

## Architecture Principles

1. **Simplicity First:** Choose simple solutions over complex ones
2. **Build-Time Over Runtime:** Process data at build time when possible
3. **Type Safety:** Use TypeScript for all code
4. **Separation of Concerns:** Content (markdown) separate from presentation (Vue)
5. **Fail Fast:** Validate at build time, fail before deployment
6. **Developer Experience:** Fast dev server, hot reload, good error messages
7. **Performance:** Pre-render, code-split, minimize runtime work
8. **Extensibility:** Plugin-based architecture for custom features

---

## Future Architecture Considerations

### Potential Enhancements

1. **Content API:**
   - Export JSON API for external consumption
   - Enable mobile app integration

2. **Search Optimization:**
   - Consider Algolia for better search
   - Add search analytics

3. **Preview Deployments:**
   - Deploy PR previews to Netlify/Vercel
   - Test changes before merging

4. **Performance Monitoring:**
   - Add Lighthouse CI
   - Track Core Web Vitals

5. **Incremental Static Regeneration:**
   - Explore partial rebuilds
   - Reduce build time for large catalogs

---

## Related Documentation

- Source Tree Analysis: `source-tree-analysis.md`
- UI Components: `ui-components.md`
- Development Guide: `development-guide.md`
- Deployment Guide: `deployment-guide.md`
