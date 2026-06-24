# Adding tools via a hand-crafted page

This guide explains how to add a tool to the catalogue as a hand-crafted Markdown page
under `docs/tools/`. Use this route when you want full prose (overview, usage, examples)
rather than just catalogue metadata. For tools whose upstream project already ships a
`publiccode.yml`, the registry route is usually less work; see
[PUBLICCODE.md](PUBLICCODE.md).

It is aimed at contributors comfortable with basic Git/GitHub (fork, branch, commit,
pull request).

> **Precedence.** A hand-crafted `docs/tools/<slug>.md` always wins. If a page exists for a
> slug, any registry entry for the same slug is ignored, and the two are never merged.

---

## Quick start

1. Create `docs/tools/<slug>.md`. The slug is the file name without `.md`; it becomes the
   page URL (`/tools/<slug>`) and must match the slug used anywhere else (e.g. a registry
   entry you are replacing).
2. Add the frontmatter block (see [Frontmatter reference](#frontmatter-reference)). At
   minimum: `document: tool`, `title`, `description`, and `categories`.
3. Write the page body in Markdown.
4. End the file with `<ToolMetadata />`.
5. Verify it builds: `npm run build`. This validates your `categories`, `standards`, and
   `status` slugs.

The tool then appears in the catalogue grid, on its category and standard pages, and in
search, with a page at `/tools/<slug>`.

---

## How a page is assembled

With `document: tool` in the frontmatter, the build injects the top of the page for you, so
**you do not write these yourself**:

- The `# {title}` heading.
- A blockquote with `fullDescription` if present, otherwise `description`.
- A `## Quick Info` section containing the `<QuickInfo />` table (links, license,
  maintainer, and similar, drawn from frontmatter).

So your file starts directly with body content (e.g. `## Overview`) and ends with the
`<ToolMetadata />` box, which lists categories, standards, license, maintenance status,
type, language, technology, and tags.

Both boxes render only the fields that have values, so leaving a field out (or setting it
to `null`) simply hides it.

---

## Frontmatter reference

```yaml
---
document: tool # required: triggers the tool layout (title, blockquote, Quick Info)
title: My Tool # required: page heading and catalogue card title
description: One-line summary. # required: card text, search, and blockquote fallback
fullDescription: A longer paragraph shown as the intro blockquote. # optional
categories: # required: at least one valid category slug
  - validators
status: active # recommended: active | maintenance | deprecated
endorsed: false # optional: true marks the tool as "By NAPCORE"
license: MIT # optional
repository: https://github.com/org/my-tool # optional
website: https://my-tool.example # optional
documentation: https://docs.my-tool.example # optional
demo: https://demo.my-tool.example # optional
developer: My Org # optional
maintainedBy: My Org # optional
mainContributor: Jane Doe # optional
technology: Python, SQLite # optional
language: Python # optional
type: CLI Tool # optional: string or list, e.g. [CLI Tool, Validator]
standards: # optional: valid standard slugs
  - datex-ii
tags: # optional: free-text labels
  - Validator
  - Command-line
firstRelease: 2024-01-15 # optional: YYYY-MM-DD
lastUpdated: 2025-10-22 # optional: YYYY-MM-DD, drives the maintenance line
---
```

Notes:

- **Required**: `document: tool`, `title`, `description`, `categories`. A page missing
  `title` or `categories` is skipped; a missing or empty `description` is a build error.
- **`status`** is optional but recommended; if present it must be `active`, `maintenance`,
  or `deprecated`.
- **Omitting vs `null`**: a field you do not need can be left out entirely or set to `null`.
  Existing pages often write `repository: null` to record that the field was considered.
- **`fullDescription`** affects only the on-page blockquote; the catalogue card always uses
  `description`.

---

## Categories and standards

`categories` and `standards` use NAPCORE catalogue **slugs**, not free text. The
authoritative lists live in:

- **Categories**: [`docs/data/categories.yaml`](docs/data/categories.yaml)
- **Standards**: [`docs/data/standards.yaml`](docs/data/standards.yaml)

Use the top-level YAML key of each entry as the slug (e.g. `validators`, `route-planners`;
`datex-ii`, `netex`, `gtfs`). At least one category is expected; standards are optional.
Both are **validated at build time**, so a typo'd slug fails the build.

---

## Body content

Write the body as ordinary Markdown, starting at heading level 2 (`##`), since the H1 is
injected for you. A common shape:

```markdown
## Overview

What the tool does and who it is for.

## Features

- ...

## Getting started

1. ...

---

<ToolMetadata />
```

Keep prose in British English (catalogue, organisation, standardised). Do not use
`<style scoped>` inside Markdown; if you need custom styling, use a registered Vue
component instead.

---

## Full example

```markdown
---
document: tool
title: MobilityDCAT Generator
description: Generates mobilityDCAT-AP metadata records from a guided form.
categories:
  - metadata
  - converters
status: active
endorsed: false
license: EUPL-1.2
repository: https://github.com/example/mobilitydcat-generator
website: https://example.org/mobilitydcat
documentation: null
demo: null
developer: Example Org
language: TypeScript
type: Web Application
standards:
  - mobilitydcat-ap
  - dcat-ap
tags:
  - Metadata
  - Generator
lastUpdated: 2025-10-22
---

## Overview

The MobilityDCAT Generator walks a publisher through producing a valid
mobilityDCAT-AP metadata record, without hand-editing RDF.

## Getting started

1. Open the generator.
2. Complete the guided form.
3. Download the resulting record.

---

<ToolMetadata />
```

---

## Contributing via GitHub

1. **Fork** this repository and clone your fork.
2. Create a branch: `git checkout -b add-my-tool`.
3. Add `docs/tools/<slug>.md` (steps under [Quick start](#quick-start)).
4. Verify it builds: `npm run build`, which validates your category/standard/status slugs.
5. Commit the new page.
6. Push your branch and open a **pull request** against `main`.
