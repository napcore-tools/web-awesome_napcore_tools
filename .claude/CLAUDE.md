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
- Optional: `liveDemo`, `sourceCode`, `developer`, `maintainedBy`, `mainContributor`, `technology`
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

**Tool Validation** (`toolValidation.ts`):
- Validates tool frontmatter using `Partial<Tool>` type
- Caches validation results globally
- Checks required fields, categories, and status values

## File Organization

```
docs/
├── .vitepress/
│   ├── theme/
│   │   ├── components/     # Vue components
│   │   └── index.ts        # Theme customization
│   ├── sidebar.ts          # Sidebar configuration
│   ├── tools.data.ts       # Tool interface & parser
│   ├── stats.data.ts       # Statistics loader
│   └── toolValidation.ts   # Frontmatter validator
├── tools/                  # Tool documentation pages
└── categories/             # Category pages
```

## Common Workflows

### Adding a New Tool

1. Create `docs/tools/tool-name.md` with frontmatter
2. Add `<QuickInfo />` in Quick Info section
3. Tool automatically appears in catalog and category pages
4. Validation runs automatically during build

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
