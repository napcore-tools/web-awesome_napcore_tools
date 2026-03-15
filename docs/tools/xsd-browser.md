---
document: tool
title: XSD-Browser
description: Generates interactive, self-contained HTML documentation from XSD (XML Schema Definition)
fullDescription:
categories:
  - converters
  - development
status: active
endorsed: false
license: AGPL-3.0-or-later
repository: https://github.com/tamtamresearch/xsd-browser
website: https://tamtamresearch.github.io/xsd-browser/
documentation: https://github.com/tamtamresearch/xsd-browser#readme
demo: null
developer: TamTam Research s.r.o.
technology: Python, CLI, HTML, WebAssembly, Pyodide
language: Python, JavaScript, TypeScript
type: CLI Tool, Web Application
standards: null
tags:
  - XML Schema
  - XSD
  - CLI
  - Web Application
lastUpdated: 2026-02-10
---

## Overview

A tool that generates interactive, self-contained HTML documentation from XSD (XML Schema Definition) files,
enabling developers to visually explore and navigate complex schema hierarchies used in European mobility data standards.

## Key Features:

- No install required: open the web app (e.g., from https://tamtamresearch.github.io/xsd-browser/), drag and drop a single XSD file, a folder of schema files, or a ZIP archive — the schema is rendered instantly in the browser
- Download the result as a fully self-contained HTML file with no external dependencies, or browse it directly in the browser
- Recursively resolves all <xsd:import> / <xsd:include> references with automatic namespace prefix handling
- Cross-reference linking between elements, types, and groups, with "Used by" sections showing where each definition appears
- Hash-based navigation (#element-Name, #type-Name, #group-Name) with collapsible, lazy-loaded views and persistent UI state
- CLI (python based) conversion script is available too.

## Target Audience

Developers and data modelers working with XSD-based European mobility data standards (DATEX II, NeTEx, SIRI) who need to understand, document, or onboard others to complex schema structures.

## Use Cases

Exploring DATEX II, NeTEx, or SIRI schemas interactively without any setup; generating shareable offline documentation from a multi-file XSD set; onboarding new developers to an unfamiliar schema; producing single-file schema docs for distribution alongside a data product.

## Additional Information

Processing runs entirely in the browser via WebAssembly (Pyodide) — no data is sent to any server. A command-line version is also available: uv tool install "git+https://github.com/tamtamresearch/xsd-browser.git".

Developed by [TamTam Research s.r.o.](https://www.tamtamresearch.com)

---

<ToolMetadata />
