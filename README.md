# NAPCORE Store

> Curated tools for European mobility data professionals

A community-driven catalog of open-source tools that support European mobility data standards like DATEX II, NeTEx, SIRI, and mobilityDCAT-AP.

## DEV Note

TODO: replace all links to `/napcore-store/` with the proper links when they are ready!

## 🌐 Live Site

Visit the catalog at: **[napcore-tools.eu](#)** _(coming soon)_

## 🎯 Mission

Make it easier for developers, data publishers, and mobility professionals to find and use the right tools for working with European mobility data standards.

## 📚 What's Inside

- **Tool Categories**: Validators, Converters, SDKs, and more
- **Standards Coverage**: DATEX II, NeTEx, SIRI, mobilityDCAT-AP, DCAT-AP, and more
- **Quality Curated**: Only functional, documented, maintained tools
- **Community-Driven**: Submit tools and improvements via GitHub
- **Blog**: News, insights, and updates about mobility data standards and tools

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/napcore/napcore-store.git
cd napcore-store

# Install dependencies
npm install

# Start development server
npm run docs:dev
```

Visit `http://localhost:5173` to see the site locally.

### Build for Production

```bash
npm run docs:build
npm run docs:preview
```

## 📝 Blog

The NAPCORE Store includes a blog for news, updates, and insights about European mobility data standards and tools.

### Creating a Blog Post

1. Create a new markdown file in `docs/blog/posts/` with the naming pattern `YYYY-MM-DD-post-slug.md`
2. Add frontmatter with post metadata:

```yaml
---
title: Your Post Title
description: A short description for the listing page
date: 2025-11-06
author: Your Name
tags:
  - datex-ii
  - netex
published: true
---
```

3. Add the metadata component at the top of your content:

```markdown
<BlogPostMeta />

# Your Post Title

Your content here...
```

### Scheduled Posts

Schedule posts for future publication using the `publishDate` field:

```yaml
---
title: Future Post
date: 2025-12-01
publishDate: 2025-12-01 # Post won't appear until this date
published: true
---
```

**Preview scheduled posts:**

```bash
# Development with preview mode
VITE_PREVIEW_MODE=1 npm run docs:dev

# Windows PowerShell
$env:VITE_PREVIEW_MODE="1"; npm run docs:dev
```

When preview mode is active, you'll see an orange banner and all scheduled posts will be visible.

### RSS Feed

The blog automatically generates an RSS feed at `/feed.rss` during build. Subscribe to stay updated with the latest posts.

### Blog Tag Resolution

Blog post tags are automatically enhanced with proper titles and links based on their type:

**Resolution Order:**

1. **Category tags** (e.g., `validators`) → Displays as "Validators" → Links to `/categories/validators`
2. **Standard tags** (e.g., `datex-ii`) → Displays as "DATEX II" → Links to `/standards/datex-ii`
3. **Blog-specific tags** (e.g., `technical`) → Displays as "Technical" → Links to `/blog?tag=technical`
4. **Unknown tags** → Displays as-is → Links to `/blog?tag={slug}`

**Examples:**

```yaml
tags:
  - validators # → "Validators" (links to category page)
  - datex-ii # → "DATEX II" (links to standard page)
  - technical # → "Technical" (filters blog by tag)
  - custom-tag # → "custom-tag" (filters blog by tag)
```

**Adding Custom Blog Tags:**

To add display titles for blog-specific tags, edit `docs/data/blogTags.yaml`:

```yaml
your-tag-slug:
  title: Your Tag Display Title
```

All tags are clickable and styled consistently throughout the blog.

## 📄 Document Types

The NAPCORE Store uses a custom markdown plugin (`napCoreMarkdownPlugin`) to automatically generate standardized content based on document type. This keeps content DRY (Don't Repeat Yourself) by defining metadata once in frontmatter.

### Tool Documents (`document: tool`)

Tool pages automatically get a header with title, description, and Quick Info section.

**Frontmatter example:**

```yaml
---
document: tool
title: DATEX II Browser
description: Interactive web tool for browsing DATEX II schemas
fullDescription: A comprehensive browser for exploring DATEX II data models...
categories:
  - validators
  - development
status: active
license: MIT
---
```

**Auto-generated content:**

- H1 title
- Description as blockquote
- "## Quick Info" section with `<QuickInfo />` component

The QuickInfo component automatically displays all tool metadata from frontmatter.

### Category Documents (`document: category`)

Category pages automatically get a footer with contribution tip section.

**Frontmatter example:**

```yaml
---
document: category
contributeTip: Know a validator for DATEX II, NeTEx, SIRI, or mobilityDCAT-AP?
---
```

**Auto-generated content:**

```markdown
---

::: tip Want to Contribute?

Know a validator for DATEX II, NeTEx, SIRI, or mobilityDCAT-AP?
[Submit your tool →](/contribute)
:::
```

**Benefits:**

- **Single source of truth**: Tip text lives only in frontmatter
- **Consistency**: All category pages have uniform contribution CTAs
- **Easy updates**: Change tip text in frontmatter, not in markdown body
- **Maintainability**: Plugin handles formatting and structure

**Location**: Plugin implementation in `docs/.vitepress/plugins/napCoreMarkdownPlugin.ts`

## 📝 Custom Markdown Directives

The NAPCORE Store includes custom markdown directives for creating collapsible sections.

### `chapter` Directive

Creates collapsible sections with heading support and attributes.

**Syntax:**

```markdown
+++ chapter ## Heading Title
Content goes here...
+++
```

**With attributes:**

```markdown
+++ chapter ## Open by Default {open}
This chapter is open by default.
+++

+++ chapter ### Custom ID and Class {#my-id .my-class}
Chapter with custom attributes.
+++
```

**Features:**

- Supports any heading level (##, ###, ####, etc.)
- Attributes: `{#id}` for custom ID, `{.class}` for CSS classes, `{open}` to open by default
- Triangle marker that rotates when opened
- H2 chapters have top border separator

### `collapse` Directive

Creates plain-text collapsible sections without headings.

**Syntax:**

```markdown
+++ collapse Click to expand
Content goes here...
+++
```

**Default title:**

```markdown
+++ collapse
Content with default "Click to expand" title.
+++
```

**Use case:** Collapse content after a heading without affecting the heading itself.

### `.plain` Class on `details`

Applies minimal styling to VitePress's built-in `details` directive for Wikipedia-style collapsible sections.

**Syntax:**

```markdown
::: details Section Title {.plain}
Content that blends seamlessly with text flow.
:::
```

**Features:**

- No background color or borders
- Normal font weight (not bold)
- Subtle hover effect
- Blends naturally with surrounding text

**Location**: Plugin implementations in `docs/.vitepress/plugins/`

## 📂 Project Structure

```
napcore-store/
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts          # VitePress configuration
│   │   ├── blog.data.ts       # Blog post data loader
│   │   ├── buildEnd.ts        # RSS feed generation
│   │   └── theme/             # Custom theme & components
│   │       ├── components/
│   │       │   └── blog/      # Blog-specific Vue components
│   │       └── *.css          # Styling files
│   ├── index.md               # Homepage
│   ├── tools/                 # Tool documentation pages
│   │   └── *.md               # Individual tool pages
│   ├── categories/            # Category pages (validators, converters, etc.)
│   │   └── *.md
│   ├── blog/                  # Blog
│   │   ├── index.md           # Blog listing page
│   │   └── posts/             # Blog post files
│   │       └── YYYY-MM-DD-post-slug.md
│   └── *.md                   # Other pages (contribute, about, etc.)
├── package.json
└── README.md
```

## 🤝 Contributing

We welcome contributions! Here's how:

### Submit a Tool

1. Check our [criteria](./docs/contribute.md#tool-criteria)
2. Gather [required information](./docs/contribute.md#required-information)
3. [Start a discussion](https://github.com/napcore/napcore-store/discussions) with "Tool Submission" category
4. Community review and approval
5. Tool added to catalog!

### Improve Documentation

1. Click "Suggest changes to this page" on any page
2. Make your edits
3. Submit a pull request

### Report Issues

- [Open an issue](https://github.com/napcore/napcore-store/issues)
- [Start a discussion](https://github.com/napcore/napcore-store/discussions)

See [contribute.md](./docs/contribute.md) for detailed guidelines.

## 🛠 Technology Stack

- **[VitePress](https://vitepress.dev/)**: Modern static site generator
- **[Vue 3](https://vuejs.org/)**: Progressive JavaScript framework
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Feed](https://www.npmjs.com/package/feed)**: RSS feed generation
- **Custom CSS**: NAPCORE branding and styling

## 🎨 Design

The catalog features:

- NAPCORE brand colors and official logo
- Responsive, mobile-first design
- Accessible (WCAG AA compliant)
- Fast loading and SEO optimized
- Dark mode support

## 📖 Documentation

- [About the Catalog](./docs/about.md)
- [How to Contribute](./docs/contribute.md)
- [Tool Categories](./docs/categories/index.md)
- [All Tools](./docs/tools/index.md)
- [Blog](./docs/blog/index.md) - Latest news and insights

## 🌍 About NAPCORE

**NAPCORE** (National Access Point Coordination Organisation for Europe) improves interoperability of National Access Points as the backbone of European mobility data exchange.

- **36 participants**: 33 Beneficiaries covering 26 EU Member States
- **37 Implementing Bodies**
- **Mission**: Harmonize mobility data standards across Europe

Learn more at [napcore.eu](https://napcore.eu)

## 📄 License

- **Catalog Content**: CC BY 4.0
- **Code**: MIT License
- **Individual Tools**: See respective tool licenses

## 🙏 Acknowledgments

This catalog is made possible by:

- NAPCORE partners and participating member states
- Tool developers who create and maintain these resources
- Community contributors
- European Commission through the Connecting Europe Facility

## 📬 Contact

- **GitHub**: [napcore/napcore-store](https://github.com/napcore/napcore-store)
- **Discussions**: [GitHub Discussions](https://github.com/napcore/napcore-store/discussions)
- **NAPCORE Website**: [napcore.eu](https://napcore.eu)
