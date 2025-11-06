# NAPCORE Store - Project Context

## Project Overview

This is a VitePress documentation site for the NAPCORE Store - a catalog of tools, standards, and resources for European mobility data exchange and Intelligent Transport Systems (ITS).

## Technology Stack

- **Framework**: VitePress (Vue 3-based static site generator)
- **Language**: TypeScript with strict typing
- **Styling**: CSS with VitePress theming
- **Linting**: ESLint with flat config format (`eslint.config.js`)

## Code Conventions

### TypeScript Patterns

- **Always use existing interfaces**: The `Tool` interface in `docs/.vitepress/tools.data.ts` is the canonical type for tool metadata
- **Use `Partial<Tool>`** for validation and partial data contexts (not `Record<string, unknown>` or `any`)
- **Prototype safety**: Use `Object.hasOwn(obj, key)` instead of `obj.hasOwnProperty(key)`
- **Unused parameters**: Prefix with underscore (e.g., `_router`, `_filename`) to satisfy ESLint

### ESLint Configuration

- Uses flat config format in `eslint.config.js`
- Configured to ignore underscore-prefixed unused variables:
  ```javascript
  '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
  }]
  ```
- Avoids `any` types - use proper TypeScript types or `unknown` with type guards

## Architecture Patterns

### Tool Documentation

Tool pages live in `docs/tools/*.md` with YAML frontmatter containing metadata:
- `title`, `description`, `categories`, `status`, `license`
- Optional: `repository`, `website`, `documentation`, `demo`, `developer`, `maintainedBy`, `mainContributor`, `technology`
- Arrays: `standards`, `tags`

### Components

**QuickInfo Component** (`docs/.vitepress/theme/components/QuickInfo.vue`):
- Auto-generates metadata tables from frontmatter (single source of truth)
- Uses VitePress `useData()` composable to access frontmatter
- Conditional rendering with `v-if` for optional fields
- Include in tool pages with: `<QuickInfo />`

**Global Component Registration**:
All custom components are registered in `docs/.vitepress/theme/index.ts`:
```typescript
enhanceApp({ app, _router, _siteData }) {
  app.component('ComponentName', ComponentName)
}
```

### Data Loaders

VitePress data loaders (files ending in `.data.ts`):
- `tools.data.ts`: Parses tool markdown frontmatter, exports `Tool` interface
- `stats.data.ts`: Combines manual and dynamic statistics
- `sidebar.ts`: Dynamic sidebar with tool counts per category
- `blog.data.ts`: Loads blog posts using `createContentLoader()`, exports `BlogPost` interface

**Tool Validation** (`toolValidation.ts`):
- Validates tool frontmatter using `Partial<Tool>` type
- Caches validation results globally
- Checks required fields, categories, and status values

### Blog Architecture

**Blog Implementation** (Added 2025):
- Located in `docs/blog/` with posts in `docs/blog/posts/*.md`
- Uses VitePress `createContentLoader()` API for efficient data loading
- Custom components in `docs/.vitepress/theme/components/blog/`
- Separate CSS file: `docs/.vitepress/theme/blog.css`

**Blog Components**:
- `BlogCard.vue`: Displays individual post cards (title, date, author, description, tags)
- `BlogGrid.vue`: Grid layout with tag filtering support
- `BlogPostMeta.vue`: Metadata display for individual posts (date, author, tags)
- `BlogTagFilter.vue`: Interactive tag cloud for filtering posts
- `BlogPreviewBanner.vue`: Shows banner when preview mode is active

**Blog Post Interface** (`blog.data.ts`):
```typescript
interface BlogPost {
  title: string
  url: string
  date: { time: number; string: string }
  author?: string
  tags?: string[]
  description: string
  excerpt?: string
  published?: boolean
  publishDate?: string  // For scheduled posts
}
```

**Blog Post Frontmatter**:
```yaml
---
title: Post Title
description: Short description
date: 2025-11-06          # Display date for sorting
publishDate: 2025-11-06   # Optional: hide until this date
author: Author Name
tags:
  - tag1
  - tag2
published: true           # Set to false for drafts
---
```

**Preview Mode** (Environment Variable):
- Set `VITE_PREVIEW_MODE` (any value) to show scheduled posts
- Checks: `typeof process.env.VITE_PREVIEW_MODE !== 'undefined'`
- Used in both `blog.data.ts` and `buildEnd.ts`
- Shows visual banner when active (BlogPreviewBanner component)

**RSS Feed Generation** (`buildEnd.ts`):
- Generated at build time using `buildEnd` hook
- Uses `feed` npm package
- Respects `published` and `publishDate` fields
- Respects preview mode environment variable
- Output: `feed.rss` in build directory

### Blog Tag Resolution System

**Architecture Overview:**
The blog uses a smart tag resolution system that maps tag slugs to proper display titles and URLs based on their type. Tags automatically link to category pages, standard pages, or blog filtering.

**Tag Types:**
1. **Category tags** (`type: 'category'`) - Link to `/categories/{slug}` (e.g., "validators" → "Validators")
2. **Standard tags** (`type: 'standard'`) - Link to `/standards/{slug}` (e.g., "datex-ii" → "DATEX II")
3. **Blog-specific tags** (`type: 'blog-tag'`) - Link to `/blog?tag={slug}` (e.g., "technical" → "Technical")

**Resolution Order** (`docs/.vitepress/theme/utils/tagResolver.ts`):
1. Check if slug matches a category in `categories.ts` → return category title and `/categories/{slug}` URL
2. Check if slug matches a standard in `standards.data.ts` → return standard title and `/standards/{slug}` URL
3. Check if slug exists in `data/blogTags.yaml` → return custom title and `/blog?tag={slug}` URL
4. Fallback: use slug as-is for title and `/blog?tag={slug}` URL

**Key Files:**
- `docs/.vitepress/theme/utils/tagResolver.ts` - Core resolution logic, exports `resolveTag()` and `resolveTags()`
- `docs/.vitepress/blogTags.ts` - Client-safe wrapper for blog tag metadata
- `docs/.vitepress/blogTags.data.ts` - VitePress data loader for `blogTags.yaml`
- `docs/data/blogTags.yaml` - YAML source for custom blog tag titles

**Adding Custom Blog Tags:**
Edit `docs/data/blogTags.yaml`:
```yaml
technical:
  title: Technical
traffic-management:
  title: Traffic Management
```

**Tag Resolution Interface:**
```typescript
interface ResolvedTag {
  slug: string;        // Original slug from frontmatter
  title: string;       // Display title (resolved)
  type: TagType;       // 'category' | 'standard' | 'blog-tag'
  url: string;         // Link URL
}
```

**CSS Styling Organization:**
- **All tag styles are component-specific** - each component owns 100% of its CSS classes in its `<style>` section
  - `BlogCard.vue` owns ALL `.blog-tag` styles (including `.blog-tag.category`, `.blog-tag.standard`, etc.)
  - `BlogPostMeta.vue` owns ALL `.tag` styles (including `.tag.category`, `.tag.standard`, etc.)
  - `BlogTagFilter.vue` owns ALL `.tag-button` styles (including `.tag-button.category`, `.tag-button.standard`, etc.)
- **blog.css contains NO tag-specific styles** - only blog-wide layout and container styles
- **Design principle:** Each component is fully self-contained and portable

**Visual Design:**
- **Blog-only tags**: Gray background, gray text → light blue on hover
- **Category/Standard tags**: Light blue background, blue text → solid blue with white text on hover
- **Design principle**: Tags linking to dedicated pages get a subtle brand-colored accent to distinguish them from filter-only tags

**URL Parameter Filtering:**
- Tags link to `/blog?tag={slug}` for blog-specific filtering
- BlogTagFilter reads `?tag=` parameter on mount and selects matching tag
- "Clear All" button removes query parameter using `window.history.replaceState()`

## File Organization

```
docs/
├── .vitepress/
│   ├── theme/
│   │   ├── components/
│   │   │   ├── blog/       # Blog-specific components
│   │   │   │   ├── BlogCard.vue
│   │   │   │   ├── BlogGrid.vue
│   │   │   │   ├── BlogPostMeta.vue
│   │   │   │   ├── BlogTagFilter.vue
│   │   │   │   └── BlogPreviewBanner.vue
│   │   │   └── ...         # Other components
│   │   ├── index.ts        # Theme customization
│   │   ├── custom.css      # NAPCORE branding
│   │   └── blog.css        # Blog-specific styles
│   ├── sidebar.ts          # Sidebar configuration
│   ├── tools.data.ts       # Tool interface & parser
│   ├── stats.data.ts       # Statistics loader
│   ├── blog.data.ts        # Blog post loader
│   ├── buildEnd.ts         # RSS feed generation
│   └── toolValidation.ts   # Frontmatter validator
├── tools/                  # Tool documentation pages
├── categories/             # Category pages
└── blog/                   # Blog
    ├── index.md            # Blog listing page
    └── posts/              # Blog post markdown files
        ├── YYYY-MM-DD-post-slug.md
        └── ...
```

## Common Workflows

### Adding a New Tool

1. Create `docs/tools/tool-name.md` with frontmatter
2. Add `<QuickInfo />` in Quick Info section
3. Tool automatically appears in catalog and category pages
4. Validation runs automatically during build

### Creating a Blog Post

1. Create `docs/blog/posts/YYYY-MM-DD-post-slug.md` with frontmatter
2. Add `<BlogPostMeta />` at the top of the post content
3. Write content in markdown
4. Post automatically appears in blog listing (respecting `publishDate`)
5. For scheduled posts: set `publishDate` in frontmatter
6. Preview scheduled posts: `VITE_PREVIEW_MODE=1 npm run docs:dev`

### Modifying QuickInfo Display

Edit `docs/.vitepress/theme/components/QuickInfo.vue` to:
- Add new frontmatter fields to display
- Modify formatting or conditional logic
- Change computed properties for status emojis/labels

## Important Notes

- **Single source of truth**: Tool metadata lives in frontmatter, not duplicated in markdown
- **Extensibility**: QuickInfo component automatically handles new frontmatter fields with `v-if`
- **Type safety**: Always use `Tool` or `Partial<Tool>` for tool-related typing
- **Build validation**: Tool frontmatter is validated at build time via data loaders
- **Styling**: Never use `<style scoped>` directly in Markdown files - use Vue components with scoped styles instead (VitePress performance guideline)
- **Blog posts are searchable**: VitePress automatically indexes blog post markdown files in search
