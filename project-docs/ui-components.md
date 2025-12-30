# UI Component Inventory

**Project:** Awesome NAPCORE Tools  
**Component Architecture:** Vue 3 Single File Components (SFC)  
**Generated:** 2025-12-30

---

## Component Organization

All custom components are located in `docs/.vitepress/theme/components/` and organized by feature domain.

### Component Categories

#### Blog Components (`components/blog/`)

| Component                 | Purpose                               | Key Features                                    |
| ------------------------- | ------------------------------------- | ----------------------------------------------- |
| **BlogCard.vue**          | Displays individual blog post cards   | Title, date, author, description, resolved tags |
| **BlogGrid.vue**          | Grid layout for blog posts            | Tag filtering, responsive grid                  |
| **BlogPostMeta.vue**      | Metadata display for individual posts | Date, author, resolved tag links                |
| **BlogTagFilter.vue**     | Interactive tag cloud for filtering   | URL parameter sync, tag resolution              |
| **BlogPreviewBanner.vue** | Shows banner in preview mode          | Environment variable detection                  |

#### Tool Components (`components/tools/`)

| Component             | Purpose                     | Key Features                                                   |
| --------------------- | --------------------------- | -------------------------------------------------------------- |
| **ToolCard.vue**      | Tool listing card           | Title, description, subtitle, NAPCORE endorsement badge        |
| **ToolsGrid.vue**     | Main tool listing component | Multi-level filtering (category, standard, text), debug mode   |
| **ToolsFilter.vue**   | Tool filter controls        | Category/standard selection                                    |
| **ToolQuickInfo.vue** | Quick info metadata table   | Auto-generates from frontmatter, conditional rendering         |
| **ToolMetadata.vue**  | Comprehensive tool metadata | Categories, standards, license, technology, maintenance status |
| **ToolStats.vue**     | Tool statistics display     | Category counts, endorsed tools count                          |

#### Category Components (`components/categories/`)

| Component                 | Purpose                       | Key Features                    |
| ------------------------- | ----------------------------- | ------------------------------- |
| **CategoryGrid.vue**      | Category listing grid         | Category cards with tool counts |
| **RelatedCategories.vue** | Related categories navigation | Cross-category discovery        |

#### Standards Components (`components/standards/`)

| Component             | Purpose                | Key Features                 |
| --------------------- | ---------------------- | ---------------------------- |
| **StandardsGrid.vue** | Standards listing grid | Standard cards with metadata |

#### Index Components (`components/index/`)

| Component        | Purpose                 | Key Features                              |
| ---------------- | ----------------------- | ----------------------------------------- |
| **StatsBar.vue** | Homepage statistics bar | Total tools, categories, standards counts |

---

## State Management Patterns

### VitePress Data Loaders (Build-time State)

Located in `docs/.vitepress/core/data-loaders/`:

| Data Loader           | Purpose                                       | Export Type            |
| --------------------- | --------------------------------------------- | ---------------------- |
| **tools.data.ts**     | Parses tool markdown frontmatter              | `Tool[]` interface     |
| **blog.data.ts**      | Loads blog posts with VitePress ContentLoader | `BlogPost[]` interface |
| **blogTags.data.ts**  | Loads blog tag metadata from YAML             | `BlogTags` interface   |
| **standards.data.ts** | Loads standards metadata                      | `Standard[]` interface |
| **stats.data.ts**     | Combines manual and dynamic statistics        | `Stats` interface      |

### Vue Composition API (Runtime State)

**No global state management** (Vuex/Pinia) - uses:

- VitePress `useData()` composable for frontmatter access
- Vue `computed()` for derived state
- Vue `ref()` for local component state
- URL query parameters for shareable filter state

### State Flow Pattern

```
Markdown Files (*.md)
    ↓ (Build time)
VitePress Data Loaders (*.data.ts)
    ↓ (Parse YAML frontmatter)
Static Data Objects (Tool[], BlogPost[], etc.)
    ↓ (Runtime)
Vue Components (*.vue)
    ↓ (Reactive computed properties)
Rendered UI
```

---

## Component Communication Patterns

### Props Down, Events Up

- Parent components pass data via props
- Child components emit events for user actions
- Example: `ToolsGrid` receives `category` prop, emits filter changes

### Route-based State

- Filter state synchronized with URL query parameters
- Example: `/blog?tag=datex-ii` filters blog posts
- Enables shareable filtered views

### Computed Properties for Filtering

- Components use `computed()` for reactive filtering logic
- Example: `ToolsGrid.filteredTools` recomputes when filters change
- Multi-level filter priority system (showAll > selectedTools > category/standards > text)

---

## Validation and Type Safety

### Build-time Validation

Located in `docs/.vitepress/core/validation/`:

| Validator         | Purpose                                                   |
| ----------------- | --------------------------------------------------------- |
| **tools.ts**      | Validates tool frontmatter against schema, caches results |
| **standards.ts**  | Validates standards metadata                              |
| **categories.ts** | Validates category metadata                               |
| **utils.ts**      | Shared validation utilities                               |

### TypeScript Interfaces

**Key interfaces:**

- `Tool` - Tool metadata structure (tools.data.ts:11)
- `BlogPost` - Blog post structure (blog.data.ts)
- `ResolvedTag` - Tag resolution result (tagResolver.ts:18)
- `Standard` - Standard metadata structure
- `Category` - Category metadata structure

---

## Utility Functions

Located in `docs/.vitepress/core/utils/`:

| Utility                  | Purpose                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------- |
| **tagResolver.ts**       | Resolves tag slugs to display titles and URLs (categories → standards → blog tags) |
| **slugify.ts**           | Creates URL-safe slugs from titles                                                 |
| **detailsNavigation.ts** | Initializes collapsible section navigation                                         |
| **index.ts**             | Exports common utilities (`createSlug`, etc.)                                      |

---

## Markdown Extension Plugins

Located in `docs/.vitepress/plugins/`:

| Plugin                       | Purpose                            | Syntax                                                              |
| ---------------------------- | ---------------------------------- | ------------------------------------------------------------------- |
| **napCoreMarkdownPlugin.ts** | Document type handler              | Auto-generates headers/footers based on frontmatter `document` type |
| **chapterPlugin.ts**         | Collapsible chapters with headings | `+++ chapter ## Title ... +++`                                      |
| **collapsePlugin.ts**        | Plain collapsible sections         | `+++ collapse Title ... +++`                                        |

---

## Styling Architecture

### CSS Organization

| File                      | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| **custom.css**            | NAPCORE branding, VitePress theme overrides |
| **blog.css**              | Blog-specific layout and container styles   |
| **markdown-sections.css** | Markdown plugin styles (chapter, collapse)  |

### Component-Scoped Styles

- All tag-related styles are component-scoped (no global tag CSS)
- Each component owns 100% of its CSS classes
- Example: `BlogCard.vue` owns `.blog-tag.*` classes
- Design principle: Self-contained, portable components

### CSS Variable Usage

Uses VitePress CSS variables:

- `--vp-c-brand` - Primary brand color (#0066cc - NAPCORE blue)
- `--vp-c-text-1`, `--vp-c-text-2` - Text colors
- `--vp-c-bg-soft` - Soft background

---

## Key Design Patterns

### Single Source of Truth

- Tool metadata lives in markdown frontmatter only
- Components read from data loaders, never duplicate data
- Avoids sync issues between markdown and components

### Conditional Rendering

- Components use `v-if` for optional fields
- Auto-adapts to available frontmatter data
- Example: QuickInfo only shows fields that have values

### Tag Resolution System

- Centralized tag resolution logic (tagResolver.ts)
- Consistent tag display across all components
- Three-tier resolution: category → standard → blog tag

### Filter Priority System (ToolsGrid)

1. `showAll` prop - overrides all filters
2. `selectedTools` prop - explicit tool selection
3. Category + Standards - combined filtering
4. Text filter - applies to result from above

### Debug Mode Support

- Components support `?debug=true` URL parameter
- Displays filter state, loaded data, computed values
- Example: ToolsGrid shows active filters, tool counts

---

## Component Registration

All components are globally registered in `docs/.vitepress/theme/index.ts` via the `enhanceApp` function.

**Benefits:**

- Available in all markdown files without imports
- Single registration point
- Type-safe with TypeScript

---

## Performance Considerations

### Build-time Optimization

- Data loaders run at build time (not runtime)
- Static data objects bundled with pages
- No runtime API calls needed

### Caching Strategies

- Tool validation results cached by file mtime
- Prevents duplicate validation messages
- Reduces build time

### Lazy Loading

- VitePress automatically code-splits components
- Components loaded on-demand per route
- Reduces initial bundle size

---

## Testing Coverage

### Unit Tests (`tests/unit/components/`)

| Test File                 | Component Tested | Coverage                            |
| ------------------------- | ---------------- | ----------------------------------- |
| **BlogCard.spec.ts**      | BlogCard         | Tag resolution, metadata display    |
| **BlogTagFilter.spec.ts** | BlogTagFilter    | Filtering logic, URL sync           |
| **QuickInfo.spec.ts**     | ToolQuickInfo    | Conditional rendering, data display |
| **ToolsGrid.spec.ts**     | ToolsGrid        | Multi-level filtering, empty states |

### E2E Tests (`tests/e2e/`)

| Test File                  | Coverage                                   |
| -------------------------- | ------------------------------------------ |
| **smoke.spec.ts**          | Homepage loads, nav links work             |
| **dynamic-routes.spec.ts** | Tool pages, category pages, standard pages |

---

## Future Component Candidates

Based on current architecture, potential new components:

1. **ToolComparisonTable** - Side-by-side tool comparison
2. **StandardsTimeline** - Visual timeline of standard releases
3. **ContributionWidget** - GitHub Discussions integration
4. **EndorsementBadge** - Reusable NAPCORE endorsement badge component

---

## Architecture Strengths

✓ **Type-safe** - Full TypeScript coverage with strict mode  
✓ **Validated** - Build-time validation prevents invalid data  
✓ **Tested** - Unit and E2E test coverage  
✓ **Maintainable** - Clear component boundaries, single source of truth  
✓ **Performant** - Build-time data loading, code splitting  
✓ **Extensible** - Easy to add new components, data loaders, validators

---

## Related Documentation

- Technology Stack: `technology-stack.md`
- Data Architecture: `data-architecture.md`
- Development Guide: `development-guide.md`
