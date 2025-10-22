# DATEX II Browser

<div class="tool-status active" style="display: inline-block; margin-bottom: 1rem;">🟢 Active</div>

> Wikipedia-style browser for exploring the DATEX II data model. Essential daily reference for DATEX II implementers.

## Quick Info

| | |
|---|---|
| **Status** | 🟢 Active |
| **License** | MIT License |
| **Live Demo** | [browser.datex2.eu](https://browser.datex2.eu) |
| **Source Code** | [GitLab Repository](https://gitlab.com/tamtamresearch-public/datex2/browser) |
| **Developer** | TamTam Research s.r.o. |

## Overview

DATEX II Browser is a web-based reference tool for browsing and searching the DATEX II data model. It provides Wikipedia-style ease of use for exploring the complete DATEX II specification, including packages, classes, enumerations, enumeration literals, attributes, and data types.

The tool covers **6,187 structural elements, terms, and definitions** (DATEX II v3.6), making it an essential daily reference for anyone working with DATEX II.

## Key Features

- **Full-text search** across all DATEX II model elements
- **Hierarchical browsing** through packages, classes, and relationships
- **Multiple version support**: Browse different DATEX II model versions (v2.3, v3.4, v3.6)
- **Category filtering**: Search by packages, datatypes, enumerations, enumeration literals, classes, or attributes
- **Direct linking**: Each element has a unique URL for easy referencing in documentation or discussions
- **Offline capability**: Works offline after initial load
- **Mobile-friendly**: Accessible on mobile devices
- **Chrome standalone app**: Can be installed as a standalone application
- **Static site deployment**: Published via GitLab Pages for reliability and performance

## Use Cases

1. **Quick reference** while implementing DATEX II publications
2. **Understanding relationships** between DATEX II elements
3. **Looking up definitions** of specific terms and concepts
4. **Teaching and learning** DATEX II standard
5. **Creating documentation** with accurate references to DATEX II elements
6. **Resolving ambiguities** in DATEX II specifications

## Available Versions

<div class="standards-list">
  <span class="standard-badge supported">DATEX II v3.6 (Primary)</span>
  <span class="standard-badge supported">DATEX II v3.4</span>
  <span class="standard-badge supported">DATEX II v2.3</span>
</div>

### Version URLs

- **v3.6 (Primary)**: [browser.datex2.eu](https://browser.datex2.eu)
- **v3.4**: [datexbrowserv34.tamtamresearch.com](https://datexbrowserv34.tamtamresearch.com)
- **v2.3**: [datexbrowser.tamtamresearch.com](https://datexbrowser.tamtamresearch.com)

## Target Audience

- DATEX II implementers and developers
- Traffic engineers working with traffic information systems
- Standardization experts
- System architects designing NAP solutions
- Anyone needing to understand DATEX II terminology and structure

## Technical Architecture

- **Frontend**: Modern web application (JavaScript/TypeScript-based)
- **Data source**: DATEX II class model (from Enterprise Architect) converted to JSON format
- **Conversion tool**: [datex2json](https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json) - custom converter from EA model to JSON
- **Deployment**: Static web hosting via GitLab Pages
- **Architecture**: Client-side application with full model loaded in browser

## Source Code

The tool is open source and available on GitLab:

- **Main Group**: [gitlab.com/tamtamresearch-public/datex2/browser](https://gitlab.com/tamtamresearch-public/datex2/browser)
  - **Frontend**: [gitlab.com/tamtamresearch-public/datex2/browser/frontend](https://gitlab.com/tamtamresearch-public/datex2/browser/frontend)
  - **datex2json converter**: [gitlab.com/tamtamresearch-public/datex2/browser/datex2json](https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json)

## Development History

Originally developed by TamTam Research s.r.o. and presented at DATEX II User Forum in Prague (May 2014). The tool has evolved over the years to support multiple DATEX II versions, with the latest version (v3.6) now hosted at the primary domain browser.datex2.eu.

**Presentation**: Available on [SlideShare](https://www.slideshare.net/vlcinsky/datex-ii-browser) (from 2014 User Forum)

## Why This Tool Matters

DATEX II Browser fills a critical need in the European mobility data ecosystem:

1. **Accessibility**: Makes the complex DATEX II standard easily accessible without downloading specifications or opening XSD files
2. **Daily use**: Designed for frequent, quick consultations - similar to how developers use Wikipedia or MDN
3. **Proven value**: Has been used by the DATEX II community since 2014 (over 10 years)
4. **Version support**: Handles multiple DATEX II versions, accommodating different implementation needs
5. **European focus**: Directly supports a key European mobility data standard
6. **No installation required**: Instant access via web browser
7. **Community resource**: Benefits the entire DATEX II implementation community
8. **Open source**: MIT licensed, allowing community contributions and transparency

## Related Tools

This browser complements other DATEX II tools like:
- [DATEX II Schema Generation Tool](/tools/datex-schema-tool) - For creating custom profiles
- Validators and converters (coming soon to catalog)

::: tip Developer Note
The **datex2json converter** is particularly interesting as it demonstrates how to extract and transform DATEX II model data from Enterprise Architect files into a web-friendly format. This approach could be valuable for other standard-specific browsers.
:::

## Getting Started

1. Visit [browser.datex2.eu](https://browser.datex2.eu)
2. Use the search bar to find specific elements
3. Browse through the hierarchical structure
4. Click on any element to see its full definition and relationships

No installation or registration required!

## Support & Community

- **Issues & Questions**: [GitLab Issues](https://gitlab.com/tamtamresearch-public/datex2/browser/-/issues)
- **DATEX II Community**: [datex2.eu](https://datex2.eu)

---

<div style="background: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
  <p style="margin: 0;"><strong>Tool Metadata</strong></p>
  <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
    <li><strong>Category</strong>: Development Tools, Reference Documentation</li>
    <li><strong>Standards</strong>: DATEX II (v2.3, v3.4, v3.6)</li>
    <li><strong>License</strong>: MIT</li>
    <li><strong>Maintenance</strong>: Actively maintained</li>
    <li><strong>First Release</strong>: 2014</li>
  </ul>
</div>
