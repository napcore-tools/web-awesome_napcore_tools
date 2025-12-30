# Development Guide

**Project:** Awesome NAPCORE Tools  
**Framework:** VitePress (Vue 3 + Vite)  
**Language:** TypeScript 5.9  
**Generated:** 2025-12-30

---

## Prerequisites

### Required

- **Node.js:** 18+ (LTS recommended)
- **npm:** Comes with Node.js
- **Git:** For version control

### Recommended

- **VS Code:** With Vue, TypeScript, ESLint, Prettier extensions
- **Chrome/Chromium:** For E2E testing with Playwright

---

## Initial Setup

### 1. Clone Repository

```bash
git clone https://github.com/napcore-tools/web-awesome_napcore_tools.git
cd web-awesome_napcore_tools
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies from `package.json`:

- VitePress, Vue, TypeScript (core)
- Vitest, Playwright (testing)
- ESLint, Prettier (code quality)
- Feed, gray-matter, yaml (utilities)

---

## Development Workflow

### Start Development Server

```bash
npm run dev
```

**What it does:**

- Starts VitePress dev server on `http://localhost:5173`
- Enables Hot Module Replacement (HMR)
- Watches for file changes and auto-reloads
- Command: `vitepress dev docs`

**Access:** Open browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

**What it does:**

- Runs VitePress production build
- Compiles Vue components to static HTML
- Optimizes assets (CSS, images)
- Generates RSS feed (via buildEnd hook)
- Runs validation (tools, categories, standards)
- Output: `docs/.vitepress/dist/`

**Build time:** ~30-60 seconds (depending on content)

### Preview Production Build

```bash
npm run preview
```

**What it does:**

- Serves production build locally
- Tests production configuration
- Verifies asset paths and links
- Command: `vitepress preview docs`

---

## Code Quality Tools

### Linting

```bash
# Check for linting errors
npm run lint

# Auto-fix linting errors
npm run lint:fix
```

**ESLint Configuration:** `eslint.config.js` (flat config format)

- Base: JavaScript recommended rules
- Vue: `eslint-plugin-vue` (flat/recommended)
- TypeScript: `@typescript-eslint` with strict rules
- Prettier integration: `eslint-config-prettier`

**Custom Rules:**

- Unused vars prefixed with `_` are allowed
- `no-console` disabled (build-time logging)
- Indent: 2 spaces, always semicolons

### Type Checking

```bash
npm run type-check
```

**What it does:**

- Runs `vue-tsc` to check TypeScript types
- Checks Vue Single File Components (SFCs)
- No emit, just validation
- Command: `vue-tsc --noEmit`

**TypeScript Config:** `tsconfig.json`

- Target: ES2022
- Strict mode enabled (all strict flags on)
- Path aliases: `@/*` → `docs/.vitepress/*`

### Formatting

```bash
# Check formatting
npm run format

# Auto-fix formatting
npm run format:fix
```

**Prettier Configuration:** `prettier.config.js`

- Single quotes
- Trailing commas (ES5)
- 2-space indent
- 120-character line width

### Pre-commit Hooks

**Configured:** `simple-git-hooks` + `lint-staged`

**On commit:**

1. Runs on staged files only
2. Executes: `eslint --fix` and `prettier --write`
3. If errors → commit blocked
4. If success → files auto-formatted and committed

**Setup:**

```bash
npm run prepare
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all unit tests
npm run test:unit

# Run with watch mode
npm run test:unit -- --watch

# Run with UI
npm run test:unit:ui

# Generate coverage report
npm run test:unit:coverage
```

**Test Location:** `tests/unit/`
**Environment:** jsdom (DOM simulation)
**Coverage Target:** Not enforced (commented in vitest.config.ts)

**Test Structure:**

```
tests/unit/
├── components/         # Component tests
│   ├── blog/           # Blog component tests
│   └── common/         # Shared component tests
└── core/               # Core logic tests
    ├── data-loaders/   # Data loader tests
    ├── validation/     # Validator tests
    └── utils/          # Utility tests
```

### E2E Tests (Playwright)

```bash
# Run E2E tests (headless)
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed
```

**Test Location:** `tests/e2e/`
**Browser:** Chromium (Desktop Chrome device emulation)
**Auto-starts dev server:** Yes (on port 5173)

**Test Files:**

- `smoke.spec.ts` - Homepage, navigation, basic functionality
- `dynamic-routes.spec.ts` - Tool pages, category pages, standard pages

### Run All Tests

```bash
npm test
```

Runs: `npm run test:unit && npm run test:e2e`

---

## Project Structure Understanding

### Key Directories

| Directory                  | Purpose                                          |
| -------------------------- | ------------------------------------------------ |
| `docs/`                    | VitePress source (website content)               |
| `docs/.vitepress/`         | Configuration, theme, components, plugins        |
| `docs/.vitepress/core/`    | Business logic (data loaders, validation, utils) |
| `docs/.vitepress/theme/`   | Vue components and styling                       |
| `docs/.vitepress/plugins/` | Custom markdown plugins                          |
| `docs/tools/`              | Tool documentation (markdown)                    |
| `docs/categories/`         | Category pages                                   |
| `docs/blog/`               | Blog posts                                       |
| `tests/`                   | Unit and E2E tests                               |
| `project-docs/`            | Project documentation (this folder)              |

### Entry Points

| File                             | Purpose                                      |
| -------------------------------- | -------------------------------------------- |
| `docs/.vitepress/config.ts`      | Main VitePress configuration                 |
| `docs/.vitepress/theme/index.ts` | Theme customization & component registration |
| `docs/index.md`                  | Homepage                                     |

---

## Common Development Tasks

### Adding a New Tool

1. Create markdown file: `docs/tools/my-tool.md`
2. Add frontmatter:
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
3. Add content with `<QuickInfo />` component
4. Tool appears automatically in catalog (data loader picks it up)

**Validation:** Build-time validation ensures required fields exist

### Adding a Blog Post

1. Create file: `docs/blog/posts/YYYY-MM-DD-post-slug.md`
2. Add frontmatter:
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
3. Add `<BlogPostMeta />` at top of content
4. Post appears in blog listing automatically

**Scheduled Posts:** Set `publishDate: YYYY-MM-DD` to hide until date

**Preview Mode:**

```bash
VITE_PREVIEW_MODE=1 npm run dev
```

### Adding a Custom Vue Component

1. Create component: `docs/.vitepress/theme/components/MyComponent.vue`
2. Register in `docs/.vitepress/theme/index.ts`:

   ```typescript
   import MyComponent from './components/MyComponent.vue';

   enhanceApp({ app }) {
     app.component('MyComponent', MyComponent);
   }
   ```

3. Use in markdown: `<MyComponent />`

**Best Practice:** Use scoped styles, TypeScript `<script setup>`

### Modifying Validation Rules

Edit: `docs/.vitepress/core/validation/tools.ts`

Example: Add new required field

```typescript
if (!tool.myNewField) {
  errors.push("myNewField is required");
}
```

**Validation runs:** At build time (prevents invalid data from being published)

### Adding a Markdown Plugin

1. Create plugin: `docs/.vitepress/plugins/myPlugin.ts`
2. Register in `docs/.vitepress/config.ts`:
   ```typescript
   markdown: {
     config: (md) => {
       md.use(myPlugin);
     };
   }
   ```

**Examples:** See `chapterPlugin.ts`, `collapsePlugin.ts`

---

## Environment Variables

| Variable            | Purpose              | Default    |
| ------------------- | -------------------- | ---------- |
| `VITEPRESS_BASE`    | Base path for assets | `/` (root) |
| `VITE_PREVIEW_MODE` | Show scheduled posts | undefined  |

**Set in CI/CD:** `.github/workflows/deploy.yml` sets `VITEPRESS_BASE` for GitHub Pages

---

## Build Output

### Generated Files

```
docs/.vitepress/dist/
├── index.html              # Homepage
├── tools/                  # Tool pages
│   ├── datex-browser.html
│   └── ...
├── categories/             # Category pages
├── blog/                   # Blog pages
├── assets/                 # CSS, JS, images
├── feed.rss                # RSS feed
├── llms.txt                # LLM-friendly docs
└── llms-full.txt           # Complete LLM docs
```

### Asset Optimization

- **CSS:** Bundled and minified
- **JavaScript:** Code-split per page, minified
- **Images:** Optimized (if processed by Vite)
- **HTML:** Minified

---

## Debugging

### Debug Mode (ToolsGrid)

Add `?debug=true` to URL:

```
http://localhost:5173/categories/validators?debug=true
```

**Shows:**

- Active filters
- Loaded tools count
- Filtered tools count
- Route information

### Build Errors

**Common Issues:**

- **Validation errors:** Check frontmatter in tool markdown files
- **TypeScript errors:** Run `npm run type-check` to identify issues
- **Missing dependencies:** Run `npm install`

**Logs:** Build-time validation errors appear in console during `npm run build`

### Dev Server Issues

**Port already in use:**

```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

**HMR not working:**

- Check browser console for errors
- Restart dev server: `Ctrl+C`, then `npm run dev`

---

## Performance Tips

### Build Performance

- **Skip type checking during dev:** VitePress dev server doesn't run `vue-tsc`
- **Incremental builds:** VitePress caches build artifacts in `docs/.vitepress/cache/`
- **Parallel processing:** VitePress builds pages in parallel

### Runtime Performance

- **Code splitting:** VitePress automatically splits code per route
- **Lazy loading:** Components loaded on-demand
- **Static data:** Data loaders run at build time (no runtime API calls)

---

## Troubleshooting

### Issue: Build fails with "Tool validation error"

**Cause:** Invalid frontmatter in tool markdown file

**Solution:**

1. Check error message for file name
2. Verify required fields: `title`, `categories`, `status`
3. Ensure categories match valid values (see `core/metadata/categories.ts`)

### Issue: Component not rendering in markdown

**Cause:** Component not registered globally

**Solution:**

1. Import in `docs/.vitepress/theme/index.ts`
2. Register via `app.component('ComponentName', ComponentName)`

### Issue: TypeScript errors in Vue files

**Cause:** Missing type definitions or incorrect imports

**Solution:**

1. Run `npm run type-check` to see all errors
2. Check import paths (use `@/` alias for `.vitepress/` directory)
3. Ensure `<script setup lang="ts">` is used

---

## Git Workflow

### Branch Strategy

- `main` - Production branch (deployed to GitHub Pages)
- Feature branches: `feature/my-feature`
- Hotfix branches: `hotfix/issue-123`

### Commit Convention

**Format:** `type: description`

**Types:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Test additions/updates
- `chore:` Build/tooling changes

**Examples:**

```bash
git commit -m "feat: add new tool validation rule"
git commit -m "fix: resolve tag resolution bug in BlogCard"
git commit -m "docs: update development guide"
```

### Pre-commit Checks

**Automatic:**

- ESLint auto-fix
- Prettier auto-format

**Manual (recommended):**

```bash
npm run lint
npm run type-check
npm test
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Triggers:**

- Push to `main` branch
- Manual dispatch via GitHub UI

**Steps:**

1. Checkout code (full history for lastUpdated dates)
2. Setup Node.js 20
3. Configure GitHub Pages
4. Check for custom domain (sets `VITEPRESS_BASE`)
5. Install dependencies (`npm install`)
6. Build site (`npm run build`)
7. Upload artifact (`docs/.vitepress/dist/`)
8. Deploy to GitHub Pages

**Deployment URL:**

- Custom domain: `https://awesome.napcore.eu` (when configured)
- GitHub Pages: `https://napcore-tools.github.io/web-awesome_napcore_tools/`

**Permissions:**

- `contents: read`
- `pages: write`
- `id-token: write`

---

## Related Documentation

- Source Tree: `source-tree-analysis.md`
- UI Components: `ui-components.md`
- Deployment: `deployment-guide.md` (generated next)
- Architecture: `architecture.md` (generated next)
