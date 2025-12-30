# Source Tree Analysis

**Project:** Awesome NAPCORE Tools  
**Architecture:** VitePress Static Site Generator  
**Generated:** 2025-12-30

---

## Annotated Directory Structure

```
web-awesome_napcore_tools/
│
├── docs/                           # VitePress source directory (website content)
│   ├── .vitepress/                 # VitePress configuration & customization
│   │   ├── config.ts               # ⚙️ Main VitePress configuration (ENTRY POINT)
│   │   ├── buildEnd.ts             # 🔨 Build hook for RSS feed generation
│   │   │
│   │   ├── core/                   # 🧠 Core business logic and utilities
│   │   │   ├── config/
│   │   │   │   └── sidebar.ts      # Dynamic sidebar configuration
│   │   │   ├── data-loaders/       # 📊 VitePress data loaders (build-time)
│   │   │   │   ├── tools.data.ts   # Parses tool frontmatter → Tool[]
│   │   │   │   ├── blog.data.ts    # Loads blog posts → BlogPost[]
│   │   │   │   ├── blogTags.data.ts # Blog tag metadata
│   │   │   │   ├── standards.data.ts # Standards metadata
│   │   │   │   └── stats.data.ts   # Statistics aggregation
│   │   │   ├── metadata/           # 📋 Static metadata definitions
│   │   │   │   ├── categories.ts   # Category definitions & validation
│   │   │   │   ├── standards.ts    # Standard definitions
│   │   │   │   └── blogTags.ts     # Blog tag title mappings
│   │   │   ├── utils/              # 🛠️ Shared utilities
│   │   │   │   ├── tagResolver.ts  # Tag resolution logic (category → standard → blog)
│   │   │   │   ├── slugify.ts      # URL slug generation
│   │   │   │   ├── detailsNavigation.ts # Collapsible section navigation
│   │   │   │   └── index.ts        # Utility exports
│   │   │   └── validation/         # ✅ Build-time validators
│   │   │       ├── tools.ts        # Tool frontmatter validation
│   │   │       ├── categories.ts   # Category metadata validation
│   │   │       ├── standards.ts    # Standards metadata validation
│   │   │       └── utils.ts        # Validation utilities
│   │   │
│   │   ├── plugins/                # 🔌 Custom markdown-it plugins
│   │   │   ├── napCoreMarkdownPlugin.ts # Document type handler
│   │   │   ├── chapterPlugin.ts    # `+++ chapter` directive
│   │   │   └── collapsePlugin.ts   # `+++ collapse` directive
│   │   │
│   │   └── theme/                  # 🎨 Vue theme customization
│   │       ├── index.ts            # Theme entry point & component registration
│   │       ├── custom.css          # NAPCORE brand styling
│   │       ├── blog.css            # Blog-specific styles
│   │       ├── markdown-sections.css # Markdown plugin styles
│   │       └── components/         # Vue SFC components
│   │           ├── blog/           # Blog components (5 files)
│   │           │   ├── BlogCard.vue
│   │           │   ├── BlogGrid.vue
│   │           │   ├── BlogPostMeta.vue
│   │           │   ├── BlogTagFilter.vue
│   │           │   └── BlogPreviewBanner.vue
│   │           ├── tools/          # Tool components (6 files)
│   │           │   ├── ToolCard.vue
│   │           │   ├── ToolsGrid.vue
│   │           │   ├── ToolsFilter.vue
│   │           │   ├── ToolQuickInfo.vue
│   │           │   ├── ToolMetadata.vue
│   │           │   └── ToolStats.vue
│   │           ├── categories/     # Category components (2 files)
│   │           │   ├── CategoryGrid.vue
│   │           │   └── RelatedCategories.vue
│   │           ├── standards/      # Standards components (1 file)
│   │           │   └── StandardsGrid.vue
│   │           └── index/          # Homepage components (1 file)
│   │               └── StatsBar.vue
│   │
│   ├── data/                       # 📄 YAML data sources
│   │   ├── standards.yaml          # Standards metadata (titles, descriptions)
│   │   └── blogTags.yaml           # Blog-specific tag titles
│   │
│   ├── tools/                      # 📝 Tool documentation (markdown)
│   │   ├── index.md                # Tool catalog landing page
│   │   ├── datex-browser.md        # DATEX II Browser tool
│   │   ├── datex-schema-tool.md    # DATEX II Schema Tool
│   │   ├── datex-2.md              # DATEX 2 Documentation
│   │   ├── alert-c-tester.md       # ALERT-C Tester
│   │   ├── mobilitydcat-generator.md # mobilityDCAT-AP Generator
│   │   └── motis.md                # MOTIS journey planner
│   │
│   ├── categories/                 # 📂 Category pages (markdown)
│   │   ├── index.md                # Category overview
│   │   ├── validators.md
│   │   ├── converters.md
│   │   ├── development.md
│   │   ├── endorsed.md
│   │   ├── metadata.md
│   │   ├── reference-implementations.md
│   │   ├── references.md
│   │   ├── route-planners.md
│   │   ├── sdks.md
│   │   ├── testing.md
│   │   ├── data-quality.md
│   │   └── version-tools.md
│   │
│   ├── standards/                  # 📐 Standards pages (dynamic routes)
│   │   ├── [standard].md           # Dynamic standard template
│   │   ├── [standard].paths.ts     # Path generation for standards
│   │   └── index.md                # Standards overview
│   │
│   ├── blog/                       # 📰 Blog section
│   │   ├── index.md                # Blog listing page
│   │   └── posts/                  # Blog post markdown files
│   │       ├── 2025-12-18-proof-of-concept.md
│   │       ├── 2025-12-01-future-post-example.md
│   │       └── 2026-08-01-welcome-to-napcore-blog.md
│   │
│   ├── all/                        # 🔍 "All tools" view
│   │   └── index.md
│   │
│   ├── public/                     # 🌐 Static assets
│   │   └── favicon.png
│   │
│   ├── index.md                    # 🏠 Homepage
│   ├── about.md                    # About page
│   └── contribute.md               # Contribution guidelines
│
├── tests/                          # 🧪 Test suites
│   ├── unit/                       # Unit tests (Vitest)
│   │   ├── components/             # Component tests
│   │   │   ├── blog/
│   │   │   │   ├── BlogCard.spec.ts
│   │   │   │   └── BlogTagFilter.spec.ts
│   │   │   └── common/
│   │   │       ├── QuickInfo.spec.ts
│   │   │       └── ToolsGrid.spec.ts
│   │   └── core/                   # Core logic tests
│   │       ├── config/
│   │       │   └── sidebar.spec.ts
│   │       ├── data-loaders/
│   │       │   ├── blog.data.spec.ts
│   │       │   └── tools.data.spec.ts
│   │       ├── metadata/
│   │       │   ├── blogTags.spec.ts
│   │       │   ├── categories.spec.ts
│   │       │   └── standards.spec.ts
│   │       ├── utils/
│   │       │   └── tagResolver.spec.ts
│   │       └── validation/
│   │           ├── blog.spec.ts
│   │           └── tools.spec.ts
│   ├── e2e/                        # E2E tests (Playwright)
│   │   ├── smoke.spec.ts           # Basic page load tests
│   │   └── dynamic-routes.spec.ts  # Dynamic route tests
│   └── setup.ts                    # Test setup & utilities
│
├── project-docs/                   # 📚 Project documentation (this folder)
│   ├── project-scan-report.json    # Workflow state file
│   └── ui-components.md            # Component inventory
│
├── .github/                        # 🤖 GitHub configuration
│   └── workflows/
│       └── deploy.yml              # CI/CD: Build & deploy to GitHub Pages
│
├── .claude/                        # 📖 AI assistant context
│   └── CLAUDE.md                   # Technical architecture guide
│
├── _bmad-output/                   # 🗂️ BMAD workflow outputs
│   ├── planning-artifacts/
│   └── implementation-artifacts/
│
├── package.json                    # 📦 NPM dependencies & scripts
├── package-lock.json               # NPM lock file
├── tsconfig.json                   # TypeScript configuration
├── vitest.config.ts                # Vitest (unit test) configuration
├── playwright.config.ts            # Playwright (E2E test) configuration
├── eslint.config.js                # ESLint flat config
├── prettier.config.js              # Prettier formatting config
├── .prettierignore                 # Prettier ignore patterns
├── .gitignore                      # Git ignore patterns
├── .gitlab-ci.yml                  # GitLab CI (unused, using GitHub Actions)
├── env.d.ts                        # TypeScript environment types
└── README.md                       # 📄 Project README

```

---

## Critical Folders Explained

### 📁 `docs/` - VitePress Source Root

**Purpose:** Contains all website content and configuration  
**Entry Point:** `docs/index.md` (homepage)  
**Build Output:** `docs/.vitepress/dist/` (generated at build time)

### 📁 `docs/.vitepress/` - VitePress Customization

**Purpose:** Configuration, theme, components, plugins, data loaders  
**Entry Point:** `config.ts` (main configuration)  
**Key Feature:** Extends VitePress default theme with custom Vue components

### 📁 `docs/.vitepress/core/` - Business Logic Layer

**Purpose:** Centralized business logic, decoupled from UI components  
**Subfolders:**

- `data-loaders/` - Build-time data loading (markdown frontmatter → static data)
- `validation/` - Build-time validation (prevents invalid tools from being published)
- `utils/` - Shared utilities (tag resolution, slugification, navigation)
- `metadata/` - Static metadata definitions (categories, standards)
- `config/` - Dynamic configuration (sidebar generation)

### 📁 `docs/.vitepress/theme/` - Vue Theme Layer

**Purpose:** Vue 3 components and styling  
**Entry Point:** `index.ts` (registers all components globally)  
**Components:** 15 Vue SFCs organized by feature domain

### 📁 `docs/.vitepress/plugins/` - Markdown Extensions

**Purpose:** Custom markdown-it plugins for enhanced markdown syntax  
**Plugins:**

- `napCoreMarkdownPlugin` - Auto-generates content based on `document` frontmatter type
- `chapterPlugin` - Collapsible chapters with headings (`+++ chapter ## Title`)
- `collapsePlugin` - Plain collapsible sections (`+++ collapse`)

### 📁 `docs/tools/` - Tool Documentation

**Purpose:** Markdown files for each tool in the catalog  
**Format:** Frontmatter (YAML) + Markdown content  
**Consumed by:** `tools.data.ts` data loader

### 📁 `docs/categories/` - Category Pages

**Purpose:** Landing pages for tool categories (validators, converters, etc.)  
**Auto-generated:** Category-specific tool listings via `ToolsGrid` component

### 📁 `docs/standards/` - Standards Pages (Dynamic Routes)

**Purpose:** Landing pages for European mobility data standards  
**Dynamic Routing:** `[standard].md` template + `[standard].paths.ts` path generator  
**Standards:** DATEX II, SIRI, NeTEx, TN-ITS, mobilityDCAT-AP, etc.

### 📁 `docs/blog/` - Blog Section

**Purpose:** News, updates, insights about mobility data standards  
**Features:** Tag filtering, scheduled posts, RSS feed, preview mode  
**Data Loader:** `blog.data.ts` (uses VitePress `createContentLoader()`)

### 📁 `tests/` - Test Suites

**Unit Tests:** Vitest (jsdom environment)  
**E2E Tests:** Playwright (Chromium browser)  
**Coverage:** Components, data loaders, utilities, validation

### 📁 `project-docs/` - Project Documentation

**Purpose:** Technical documentation about the project itself (brownfield PRD reference)  
**Separate from:** Website content in `docs/` folder

---

## Entry Points

### Build-time Entry Points

| File                               | Purpose                                           |
| ---------------------------------- | ------------------------------------------------- |
| **docs/.vitepress/config.ts**      | Main VitePress configuration, plugin registration |
| **docs/.vitepress/buildEnd.ts**    | Post-build hook (RSS feed generation)             |
| **docs/.vitepress/theme/index.ts** | Vue theme customization, component registration   |

### Runtime Entry Points (Data Loaders)

| File                  | Execution Time | Output                     |
| --------------------- | -------------- | -------------------------- |
| **tools.data.ts**     | Build time     | Static `Tool[]` array      |
| **blog.data.ts**      | Build time     | Static `BlogPost[]` array  |
| **standards.data.ts** | Build time     | Static `Standard[]` object |
| **stats.data.ts**     | Build time     | Static statistics          |
| **blogTags.data.ts**  | Build time     | Static blog tag metadata   |

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MARKDOWN SOURCE FILES                    │
│  docs/tools/*.md, docs/blog/posts/*.md, docs/data/*.yaml   │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Build time)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  VITEPRESS DATA LOADERS                     │
│  .vitepress/core/data-loaders/*.data.ts                    │
│  - Parse YAML frontmatter                                   │
│  - Validate against schemas                                 │
│  - Transform to TypeScript interfaces                       │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Build time)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    STATIC DATA OBJECTS                      │
│  Bundled with generated pages (no runtime API calls)       │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Runtime)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     VUE COMPONENTS                          │
│  .vitepress/theme/components/**/*.vue                      │
│  - Import data from data loaders                            │
│  - Use computed() for reactive filtering                    │
│  - Render UI                                                │
└─────────────────┬───────────────────────────────────────────┘
                  │ (Runtime)
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    RENDERED HTML                            │
│  Served as static files (GitHub Pages)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Integration Points

### Build-time Integrations

| System             | Integration Point                       | Purpose                       |
| ------------------ | --------------------------------------- | ----------------------------- |
| **GitHub Actions** | `.github/workflows/deploy.yml`          | Automated build & deployment  |
| **VitePress**      | `docs/.vitepress/config.ts`             | Site generation configuration |
| **RSS Feed**       | `buildEnd.ts` → `feed.rss`              | Blog syndication              |
| **LLM Export**     | `vitepress-plugin-llmstxt` → `llms.txt` | AI-friendly documentation     |

### Runtime Integrations

| System                 | Integration Method      | Purpose                  |
| ---------------------- | ----------------------- | ------------------------ |
| **GitHub Pages**       | Static file hosting     | Website deployment       |
| **GitHub Discussions** | External link           | Tool submission workflow |
| **NAPCORE Website**    | External link (planned) | Main site integration    |

### No Backend API

- Static site generator (no server-side code)
- All data bundled at build time
- No database connections
- No authentication system

---

## Shared Code Patterns

### Utility Modules

- `core/utils/` - Shared across components and data loaders
- Exported via `core/utils/index.ts` barrel file
- Examples: `createSlug()`, `resolveTag()`, `initializeDetailsNavigation()`

### Type Definitions

- `Tool` interface (tools.data.ts:11) - Used across 6+ components
- `BlogPost` interface (blog.data.ts) - Used in blog components
- `ResolvedTag` interface (tagResolver.ts:18) - Used in tag rendering

### Validation Utilities

- `core/validation/utils.ts` - Shared validation helpers
- Cached validation results (mtime-based) to prevent duplicate messages
- Used in all data loaders

---

## Configuration Management

### Environment Variables

| Variable            | Purpose                      | Default                                  |
| ------------------- | ---------------------------- | ---------------------------------------- |
| `VITEPRESS_BASE`    | Base path for assets/routing | `/` (root) or `/${repo}/` (GitHub Pages) |
| `VITE_PREVIEW_MODE` | Show scheduled blog posts    | undefined (disabled)                     |

### Configuration Files

| File                          | Purpose                     | Format     |
| ----------------------------- | --------------------------- | ---------- |
| **package.json**              | NPM dependencies, scripts   | JSON       |
| **tsconfig.json**             | TypeScript compiler options | JSON       |
| **eslint.config.js**          | Linting rules (flat config) | ES Module  |
| **prettier.config.js**        | Code formatting rules       | ES Module  |
| **vitest.config.ts**          | Unit test configuration     | TypeScript |
| **playwright.config.ts**      | E2E test configuration      | TypeScript |
| **docs/.vitepress/config.ts** | VitePress site config       | TypeScript |

### Data Configuration Files

| File                         | Purpose            | Format |
| ---------------------------- | ------------------ | ------ |
| **docs/data/standards.yaml** | Standards metadata | YAML   |
| **docs/data/blogTags.yaml**  | Blog tag titles    | YAML   |

---

## Build Artifacts

### Generated Directories (Git-ignored)

| Directory                  | Generator  | Purpose                                 |
| -------------------------- | ---------- | --------------------------------------- |
| **node_modules/**          | npm        | Dependencies                            |
| **docs/.vitepress/dist/**  | VitePress  | Build output (deployed to GitHub Pages) |
| **docs/.vitepress/cache/** | VitePress  | Build cache                             |
| **.vitepress/.temp/**      | VitePress  | Temporary files                         |
| **coverage/**              | Vitest     | Test coverage reports                   |
| **playwright-report/**     | Playwright | E2E test results                        |

---

## Architecture Highlights

✓ **Clear Separation of Concerns**

- `core/` - Business logic
- `theme/` - Presentation layer
- `plugins/` - Markdown extensions

✓ **Type-Safe Data Flow**

- TypeScript interfaces for all data structures
- Build-time validation prevents runtime errors

✓ **Component-Based Architecture**

- 15 reusable Vue SFCs
- Global registration for markdown usage
- Scoped styling

✓ **Build-time Optimization**

- Data loaded once at build time
- No runtime API calls
- Static HTML output

✓ **Testable Design**

- Unit tests for components and utilities
- E2E tests for critical user flows
- Test coverage tracking

---

## Related Documentation

- UI Components: `ui-components.md`
- Technology Stack: `technology-stack.md`
- Development Guide: `development-guide.md`
