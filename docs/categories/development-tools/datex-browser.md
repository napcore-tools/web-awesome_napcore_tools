# DATEX II Browser

<span class="tool-status active">🟢 Active</span>

Wikipedia-style reference tool for browsing and searching the DATEX II data model.

## Quick Info

- **Status**: 🟢 Actively Maintained
- **License**: MIT License
- **Live Application**: 
  - [browser.datex2.eu](https://browser.datex2.eu) - DATEX II v3.6 (Primary)
  - [datexbrowserv34.tamtamresearch.com](https://datexbrowserv34.tamtamresearch.com) - v3.4
  - [datexbrowser.tamtamresearch.com](https://datexbrowser.tamtamresearch.com) - v2.3
- **Source Code**: [GitLab](https://gitlab.com/tamtamresearch-public/datex2/browser)
- **Developer**: TamTam Research s.r.o.

## Overview

DATEX II Browser provides Wikipedia-style ease of use for exploring the complete DATEX II specification. It covers 6,187 structural elements, terms, and definitions (DATEX II v3.6), making it an essential daily reference for anyone working with DATEX II.

The tool has been serving the DATEX II community since 2014 and has evolved to support multiple standard versions.

## Key Features

### 🔍 Full-Text Search
Search across all 6,187 DATEX II model elements instantly. Find packages, classes, enumerations, attributes, and datatypes.

### 📚 Hierarchical Browsing
Navigate through the DATEX II structure:
- Browse by packages
- Explore class relationships
- Understand inheritance hierarchies

### 🏷️ Multiple Version Support
Access different DATEX II versions:
- **v3.6**: Latest version (primary site)
- **v3.4**: Intermediate version
- **v2.3**: Legacy version

### 🎯 Category Filtering
Filter searches by element type:
- Packages
- Data types
- Enumerations
- Enumeration literals
- Classes
- Attributes

### 🔗 Direct Linking
Each element has a unique URL for easy reference in:
- Documentation
- Code comments
- Discussion forums
- Technical specifications

### 📱 Mobile-Friendly
Fully responsive design works on:
- Desktop browsers
- Tablets
- Mobile phones

### ⚡ Offline Capability
Works offline after initial load - perfect for:
- Working without internet
- Presentations
- Training sessions

### 💻 Standalone App
Can be installed as a Chrome standalone application for:
- Quick access from desktop
- App-like experience
- Faster startup

## Use Cases

### 1. Quick Reference While Implementing
Look up DATEX II elements while writing code or creating XML messages.

```
Example: "What attributes does SituationRecord have?"
→ Search "SituationRecord" → View all attributes
```

### 2. Understanding Relationships
Explore how DATEX II classes relate to each other and understand inheritance structures.

### 3. Looking Up Definitions
Find precise definitions and usage guidelines for specific terms and concepts.

### 4. Teaching and Learning
Use as a teaching aid for DATEX II training sessions and workshops.

### 5. Creating Documentation
Reference specific DATEX II elements with direct links in your documentation.

### 6. Resolving Ambiguities
Clarify uncertain aspects of the DATEX II specification during implementation.

## Standards Supported

- ✅ DATEX II v2.3
- ✅ DATEX II v3.4
- ✅ DATEX II v3.6 (latest)

## Target Audience

- **DATEX II Implementers**: Daily reference tool
- **Traffic Engineers**: Understanding traffic data standards
- **System Architects**: Designing NAP solutions
- **Developers**: Writing DATEX II applications
- **Standardization Experts**: Working with DATEX II evolution
- **Students**: Learning DATEX II standard

## Technical Architecture

**Frontend:**
- Modern JavaScript/TypeScript-based web application
- Single-page application (SPA)
- Client-side search and filtering

**Data Source:**
- DATEX II class model from Enterprise Architect
- Converted to JSON format using custom datex2json tool

**Conversion Tool:**
- [datex2json](https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json) - Extracts DATEX II model from EA files to JSON

**Deployment:**
- Static website hosting via GitLab Pages
- Fast, reliable, and highly available
- No server-side processing required

**Architecture Benefits:**
- Fast load times
- Works offline
- Easy to deploy
- Low maintenance

## Development History

- **May 2014**: Originally presented at DATEX II User Forum in Prague
- **2014-2024**: Continuously maintained and updated
- **Multiple Versions**: Evolved to support DATEX II v2.3, v3.4, and v3.6
- **2024+**: Primary domain at browser.datex2.eu

**Historical Note**: The tool has been trusted by the DATEX II community for over 10 years, demonstrating its value and reliability.

## Source Code & Repositories

**Main Group**: [tamtamresearch-public/datex2/browser](https://gitlab.com/tamtamresearch-public/datex2/browser)

**Components:**
- **Frontend**: [browser/frontend](https://gitlab.com/tamtamresearch-public/datex2/browser/frontend)
- **datex2json Converter**: [browser/datex2json](https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json)

## Why Include This Tool in NAPCORE Catalog?

### 1. Accessibility
Makes the complex DATEX II standard easily accessible without downloading specifications or opening XSD files.

### 2. Daily Use
Designed for frequent, quick consultations - similar to how developers use Wikipedia or MDN.

### 3. Proven Value
Over 10 years of community use demonstrates real-world value.

### 4. Version Support
Handles multiple DATEX II versions, accommodating different implementation needs.

### 5. European Focus
Directly supports a key European mobility data standard.

### 6. No Installation Required
Instant access via web browser - no setup barriers.

### 7. Community Resource
Benefits the entire DATEX II implementation community.

### 8. Open Source
MIT licensed, allowing community contributions and transparency.

## Related Tools

This browser complements:
- [DATEX II Schema Tool](/categories/converters/datex-schema-tool) - Generate custom profiles
- DATEX II Validators - Validate your implementations
- XML/JSON Editors - Create DATEX II messages

## Additional Resources

- **Presentation**: [DATEX II Browser on SlideShare](https://www.slideshare.net/vlcinsky/datex-ii-browser) (2014 User Forum)
- **DATEX II Homepage**: [datex2.eu](https://datex2.eu)
- **GitLab Issues**: Report bugs or request features

## Developer Notes

The datex2json converter is particularly interesting as it demonstrates how to extract and transform DATEX II model data from Enterprise Architect files into a web-friendly format. This approach could be valuable for creating similar browsers for other mobility standards.

## Community & Support

- **Original Developer**: TamTam Research s.r.o.
- **Maintainer**: Vladimír Kelner (@vlcinsky)
- **Community**: DATEX II User Forum
- **Issues**: GitLab issue tracker

---

## Version Comparison

| Feature | v2.3 | v3.4 | v3.6 |
|---------|------|------|------|
| Elements | ~4,000 | ~5,500 | 6,187 |
| Status | Legacy | Supported | Primary |
| URL | [Link](https://datexbrowser.tamtamresearch.com) | [Link](https://datexbrowserv34.tamtamresearch.com) | [Link](https://browser.datex2.eu) |

---

*Last updated: October 2025*

*Suggested by: NAPCORE Task 5.2 team*

*Know something we missed? [Suggest an edit](https://github.com/napcore/napcore-web-store/edit/main/docs/categories/development-tools/datex-browser.md)*
