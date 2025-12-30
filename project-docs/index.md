# Project Documentation Index

**Project:** Awesome NAPCORE Tools  
**Type:** VitePress Documentation Site / Tool Catalog  
**Architecture:** Static Site Generator (JAMstack)  
**Status:** Proof of Concept → Initial Release (January 2026)  
**Generated:** 2025-12-30

---

## Project Overview

- **Type:** Monolith (single cohesive codebase)
- **Primary Language:** TypeScript
- **Framework:** VitePress 2.0 (Vue 3)
- **Architecture Pattern:** Static Site Generation with Build-Time Data Processing

---

## Quick Reference

### Technology Stack

- **Framework:** VitePress (Vue 3-based static site generator)
- **Language:** TypeScript 5.9 (strict mode)
- **UI:** Vue 3 Composition API + 15 custom components
- **Testing:** Vitest (unit) + Playwright (E2E)
- **CI/CD:** GitHub Actions → GitHub Pages
- **Hosting:** GitHub Pages (CDN + HTTPS)

### Entry Points

- **Homepage:** `docs/index.md`
- **VitePress Config:** `docs/.vitepress/config.ts`
- **Theme Entry:** `docs/.vitepress/theme/index.ts`
- **Build Hook:** `docs/.vitepress/buildEnd.ts`

### Architecture Pattern

**Static Site Generation (SSG)**

- Content stored in markdown frontmatter (Git-based)
- Processed at build time through data loaders
- Validated against schemas (build fails on errors)
- Rendered to static HTML with Vue components
- No backend server or database

---

## Generated Documentation

### Core Documentation

#### 1. [Project Overview](./project-overview.md)

**Purpose:** High-level introduction to the project  
**Contents:**

- Mission and problem statement
- Key features and target audience
- Project timeline (PoC → v1.0 → Growth)
- Success metrics and stakeholders
- Links and contact information

#### 2. [Architecture Documentation](./architecture.md)

**Purpose:** Comprehensive technical architecture  
**Contents:**

- Architecture overview and patterns (SSG, Data-Driven, Component-Based)
- Technology stack deep-dive
- Data architecture and flow diagrams
- Component architecture and communication
- Build pipeline and deployment architecture
- Security and performance considerations
- Trade-offs and design decisions

#### 3. [Source Tree Analysis](./source-tree-analysis.md)

**Purpose:** Annotated directory structure and organization  
**Contents:**

- Complete annotated directory tree
- Critical folders explained (`docs/`, `.vitepress/`, `core/`, `theme/`)
- Entry points (config, theme, data loaders)
- Data flow architecture diagrams
- Integration points and configuration

### Component & UI Documentation

#### 4. [UI Component Inventory](./ui-components.md)

**Purpose:** Complete catalog of Vue components  
**Contents:**

- 15 Vue SFC components by category (Blog: 5, Tools: 6, Categories: 2, Standards: 1, Index: 1)
- State management patterns (Composition API, no Vuex/Pinia)
- Component communication (props, routes, computed)
- Validation and type safety (build-time validators)
- Utility functions and markdown plugins
- Testing coverage

### Development & Operations

#### 5. [Development Guide](./development-guide.md)

**Purpose:** Setup, workflows, and best practices  
**Contents:**

- Prerequisites and initial setup
- Development workflow (`npm run dev`, `npm run build`)
- Code quality tools (ESLint, Prettier, TypeScript)
- Testing (Vitest unit tests, Playwright E2E)
- Common development tasks (add tool, add blog post, add component)
- Debugging tips and troubleshooting

#### 6. [Deployment Guide](./deployment-guide.md)

**Purpose:** CI/CD and deployment procedures  
**Contents:**

- Automatic deployment via GitHub Actions
- Manual deployment procedures
- Configuration (GitHub Pages, custom domain)
- Build output and optimization
- Troubleshooting common issues
- Rollback procedures
- Performance monitoring

### Governance & Process

#### 7. [Governance Framework](./governance.md)

**Purpose:** Tool submission and endorsement process  
**Contents:**

- Two-tier system (Listed vs. NAPCORE Endorsed)
- Inclusion criteria (accessibility, relevance, documentation)
- Endorsement criteria (quality, standards compliance)
- NAPCORE Endorsed Standards (DATEX II, SIRI, NeTEx, TN-ITS, mobilityDCAT-AP)
- Content submission process via GitHub Discussions
- Review cycles and governance roles
- Tool status management and appeals

---

## Existing Documentation

### From Repository Root

#### [README.md](../README.md)

- Project introduction and quick start
- Installation and development server
- Blog functionality (creating posts, scheduled posts, RSS feed)
- Document types and markdown directives
- Project structure overview
- Contribution guidelines summary

### From `.claude/` Directory

#### [CLAUDE.md](../.claude/CLAUDE.md)

- Technical architecture context for AI assistants
- TypeScript patterns and ESLint conventions
- Component architecture details
- Data loaders pattern explanation
- Blog architecture and tag resolution system
- File organization and common workflows

### From `docs/` Directory

#### [contribute.md](../docs/contribute.md)

- How to submit a tool (detailed process)
- Tool criteria (essential requirements, preferred characteristics)
- Required information for submissions
- Submission template
- Other ways to contribute
- Review process and rejection reasons

#### [about.md](../docs/about.md)

- About the Awesome NAPCORE Tools catalog
- NAPCORE organization background
- Mission and objectives

---

## Getting Started

### For New Developers

**Recommended reading order:**

1. **Start here:** [Project Overview](./project-overview.md) - Understand the mission and context
2. **Then read:** [Architecture Documentation](./architecture.md) - Grasp the technical design
3. **Next:** [Source Tree Analysis](./source-tree-analysis.md) - Navigate the codebase
4. **Setup:** [Development Guide](./development-guide.md) - Get your environment running
5. **Reference:** [UI Component Inventory](./ui-components.md) - Understand the components

### For Content Contributors

1. [Project Overview](./project-overview.md) - Context
2. [Governance Framework](./governance.md) - Submission process
3. [contribute.md](../docs/contribute.md) - Detailed submission guide

### For DevOps / Deployment

1. [Architecture Documentation](./architecture.md) - Understand the stack
2. [Deployment Guide](./deployment-guide.md) - CI/CD procedures
3. `.github/workflows/deploy.yml` - GitHub Actions workflow

### For Stakeholders / Product Owners

1. [Project Overview](./project-overview.md) - High-level summary
2. [Governance Framework](./governance.md) - Quality control process
3. [README.md](../README.md) - Quick reference

---

## Key Statistics

### Documentation Generated

- **Files Created:** 8 documents
- **Total Lines:** ~3,500+ lines of documentation
- **Categories:** Architecture, Development, Governance, Components

### Project Metrics

- **Components:** 15 Vue SFCs
- **Data Loaders:** 5 build-time loaders
- **Markdown Plugins:** 3 custom plugins
- **Test Files:** ~16 unit tests + 2 E2E test suites
- **Configuration Files:** 7 major configs (tsconfig, eslint, vitest, playwright, etc.)

### Codebase Structure

- **Total Folders:** 27+ directories
- **Key Source Files:** 60+ (excluding node_modules, dist)
- **Documentation Standards:** DATEX II, SIRI, NeTEx, TN-ITS, mobilityDCAT-AP
- **Tool Categories:** 12 categories

---

## Technology Highlights

### Build-Time Processing

✓ **Data Loaders:** Parse markdown frontmatter → Static data objects  
✓ **Validation:** Build-time schema validation (fails fast)  
✓ **Code Generation:** Dynamic routes for standards  
✓ **RSS Feed:** Generated via buildEnd hook  
✓ **LLM Exports:** AI-friendly documentation (llms.txt)

### Runtime Features

✓ **Vue 3 Composition API:** Reactive state management  
✓ **Route-Based Filtering:** Category/standard detection from URL  
✓ **Client-Side Search:** VitePress local search  
✓ **Tag Resolution:** Smart tag mapping (category → standard → blog)  
✓ **Responsive Design:** Mobile-first, WCAG AA compliant

### Developer Experience

✓ **Hot Module Replacement:** Instant updates during development  
✓ **TypeScript Strict Mode:** Full type safety  
✓ **ESLint Flat Config:** Modern linting setup  
✓ **Vitest + Playwright:** Comprehensive testing  
✓ **Pre-commit Hooks:** Auto-format and lint on commit

---

## Architecture Strengths

✅ **Type-Safe:** Full TypeScript coverage with strict mode  
✅ **Validated:** Build-time validation prevents invalid data from reaching production  
✅ **Tested:** Unit tests (components, utilities) + E2E tests (critical flows)  
✅ **Maintainable:** Clear separation of concerns, component-based architecture  
✅ **Performant:** Build-time data loading, code splitting, CDN delivery  
✅ **Extensible:** Plugin-based markdown extensions, data loader pattern  
✅ **Secure:** No backend, no database, HTTPS enforced, content validated  
✅ **Developer-Friendly:** Fast dev server, hot reload, excellent error messages

---

## Links and Resources

### Live Sites

- **Production (planned):** https://awesome.napcore.eu
- **Proof of Concept:** https://napcore-tools.github.io/web-awesome_napcore_tools/

### Development

- **Repository:** https://github.com/napcore-tools/web-awesome_napcore_tools
- **Discussions:** https://github.com/napcore-tools/web-awesome_napcore_tools/discussions
- **Issues:** https://github.com/napcore-tools/web-awesome_napcore_tools/issues

### NAPCORE

- **Main Website:** https://napcore.eu
- **Contact:** https://napcore.eu/contact

---

## Verification Recap

### Tests/Extractions Executed

✓ **Deep Scan (Level 2)** completed  
✓ **Project Classification:** Monolith, Web, VitePress confirmed  
✓ **Technology Stack:** Verified via package.json, config files  
✓ **Component Inventory:** 15 Vue components cataloged  
✓ **Data Loaders:** 5 loaders documented  
✓ **Directory Structure:** Complete annotated tree generated  
✓ **Configuration:** All major configs analyzed

### Outstanding Risks or Follow-Ups

⚠️ **None critical** - Project is well-structured and documented

**Minor considerations:**

- Node modules not installed (expected in brownfield scan)
- Future: Consider Lighthouse CI for performance monitoring
- Future: Add preview deployments for PRs

### Recommended Next Checks Before PR

✅ **Linting:** `npm run lint` (check code quality)  
✅ **Type Checking:** `npm run type-check` (verify TypeScript)  
✅ **Tests:** `npm test` (run unit + E2E tests)  
✅ **Build:** `npm run build` (ensure production build works)  
✅ **Preview:** `npm run preview` (test built site)

---

## Brownfield PRD Usage

When creating a brownfield PRD for new features:

### Reference This Index

**Point PRD workflows to:** `project-docs/index.md`

This index provides:

- Complete technical understanding
- Architecture patterns and constraints
- Component inventory for reuse
- Development workflow and testing strategy

### Feature-Specific References

| Feature Type              | Reference Documents                                                             |
| ------------------------- | ------------------------------------------------------------------------------- |
| **New UI Component**      | `ui-components.md`, `architecture.md` (Component Architecture)                  |
| **New Data Loader**       | `source-tree-analysis.md` (Data Loaders), `architecture.md` (Data Architecture) |
| **New Markdown Plugin**   | `source-tree-analysis.md` (Plugins), `.vitepress/plugins/`                      |
| **New Category/Standard** | `governance.md`, `core/metadata/`                                               |
| **Build/Deploy Changes**  | `deployment-guide.md`, `.github/workflows/deploy.yml`                           |
| **Testing Requirements**  | `development-guide.md` (Testing section), `tests/`                              |

---

## Document Status

**Workflow:** Completed via BMAD document-project workflow (v1.2.0)  
**Scan Level:** Deep (read critical files per project type)  
**Mode:** Initial Scan (YOLO)  
**Generated:** 2025-12-30  
**State File:** `project-scan-report.json`

---

## Next Steps

### For Development

1. Review architecture and component patterns
2. Set up development environment (see Development Guide)
3. Explore codebase using Source Tree Analysis
4. Run tests to verify setup

### For New Features

1. Review existing components for reuse
2. Check governance framework for content-related features
3. Follow architecture patterns (SSG, data-driven, component-based)
4. Add tests for new functionality

### For Documentation Updates

1. Edit relevant markdown files in `project-docs/`
2. Keep index.md updated with new sections
3. Maintain cross-references between documents

---

**👆 This index is your primary entry point for AI-assisted brownfield development and feature planning.**
