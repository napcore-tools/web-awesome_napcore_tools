# Project Overview

**Project Name:** Awesome NAPCORE Tools  
**Project Type:** VitePress Documentation Site / Tool Catalog  
**Status:** Proof of Concept → Initial Release (January 2026)  
**Repository:** https://github.com/napcore-tools/web-awesome_napcore_tools  
**Generated:** 2025-12-30

---

## Executive Summary

The Awesome NAPCORE Tools is a curated catalog of open-source and freely accessible tools supporting European mobility data standards (DATEX II, SIRI, NeTEx, TN-ITS, mobilityDCAT-AP). It serves as a central discovery platform for developers, data publishers, and mobility professionals working with European Intelligent Transport Systems (ITS) data.

**Mission:** Make it easier to find and use the right tools for working with European mobility data standards.

---

## Project Purpose

### Problem Statement

European mobility data professionals face challenges:

- **Tool Discovery:** Hard to find relevant tools scattered across organizations
- **Quality Assessment:** Uncertain which tools are reliable and maintained
- **Standards Alignment:** Unclear which tools support specific European standards
- **Best Practices:** Limited guidance on recommended tools for common tasks

### Solution

A community-driven catalog that:

- ✅ Curates high-quality tools in one place
- ✅ Provides clear quality signals (NAPCORE Endorsed badge)
- ✅ Links tools to relevant standards
- ✅ Enables community contributions via GitHub
- ✅ Maintains quality through governance framework

---

## Key Features

### Tool Catalog

- **6-10 initial tools** (v1.0), growing to 20-30+ tools
- **Categorized:** Validators, Converters, SDKs, Route Planners, etc.
- **Filterable:** By category, standard, status
- **Searchable:** Full-text search across tool metadata

### Quality Signals

- **NAPCORE Endorsed Badge:** Domain expert-validated tools
- **Active Maintenance Status:** Clear indication of tool maturity
- **Standards Compliance:** Which European standards are supported
- **License Information:** Open source vs. proprietary

### Community Features

- **Blog:** News, updates, insights about mobility data standards
- **GitHub Discussions:** Submit tools, provide feedback, ask questions
- **RSS Feed:** Subscribe to blog updates
- **LLM-Friendly Exports:** AI assistant integration (llms.txt)

### Developer Experience

- **Quick Info Sections:** Instant access to key tool metadata
- **Direct Links:** Repository, documentation, demos
- **Related Tools:** Discover similar or complementary tools
- **Contribution Guide:** Clear process for submitting new tools

---

## Tech Stack Summary

| Category      | Technology          | Purpose                |
| ------------- | ------------------- | ---------------------- |
| **Framework** | VitePress 2.0       | Static site generation |
| **UI**        | Vue 3               | Component-based UI     |
| **Language**  | TypeScript 5.9      | Type-safe development  |
| **Testing**   | Vitest + Playwright | Unit & E2E testing     |
| **CI/CD**     | GitHub Actions      | Automated deployment   |
| **Hosting**   | GitHub Pages        | Static hosting + CDN   |

**Architecture Type:** JAMstack (JavaScript, APIs, Markup)

---

## Project Classification

### Repository Structure

**Type:** Monolith (single cohesive codebase)

**Organization:**

```
web-awesome_napcore_tools/
├── docs/                  # VitePress source (website content)
├── tests/                 # Unit & E2E tests
├── project-docs/          # Project documentation (brownfield reference)
├── .github/workflows/     # CI/CD pipelines
└── Configuration files
```

### Technology Classification

**Primary:** Web Application (VitePress)  
**Secondary:** Static Site Generator  
**Deployment:** GitHub Pages (CDN)

---

## Target Audience

### Primary Users

1. **Developers**
   - Building mobility data applications
   - Integrating European standards (DATEX II, SIRI, NeTEx)
   - Seeking validators, converters, SDKs

2. **Data Publishers**
   - National Access Points (NAPs)
   - Public transport authorities
   - Road operators
   - Need tools for data validation and publication

3. **Mobility Professionals**
   - ITS specialists
   - Traffic management centers
   - Public transport planners
   - Exploring available tools and capabilities

### Secondary Users

4. **Standards Bodies**
   - Promoting tool adoption
   - Showcasing reference implementations

5. **Researchers**
   - Exploring European mobility data ecosystem
   - Finding tools for academic projects

---

## Project Timeline

### Phase 1: Proof of Concept (October-December 2025)

**Status:** ✅ Complete

**Achievements:**

- VitePress site developed
- 6-10 tools cataloged
- Blog functionality implemented
- GitHub Discussions workflow established
- Technical architecture validated

**URL:** https://napcore-tools.github.io/web-awesome_napcore_tools/

### Phase 2: Initial Release v1.0 (January 2026)

**Status:** 🚧 In Progress

**Goals:**

- Governance framework approved (mid-January meeting)
- NAPCORE Endorsed standards defined
- NAPCORE Endorsed tools validated
- Custom domain configured: `awesome.napcore.eu`
- Linked from main NAPCORE website
- Announced to NAPCORE partners

**Target Date:** End of January 2026

### Phase 3: FOSDEM Demonstration (Jan 31 - Feb 1, 2026)

**Event:** FOSDEM 2026 (Brussels)

**Objectives:**

- Demonstrate catalog to European mobility data community
- Gather feedback on usefulness and content gaps
- Recruit potential contributors
- Promote NAPCORE tools and standards

### Phase 4: Content Growth (February-May 2026)

**Goals:**

- Add 10-15 new tools via community submissions
- Publish 3-5 blog posts
- Gather user feedback
- Monitor catalog usage and engagement

**Governance:** Stable framework, listed tools added continuously

### Phase 5: Governance Review (May 2026)

**Goals:**

- Review new tools for endorsement
- Evaluate governance framework effectiveness
- Refine processes based on operational experience
- Plan next review cycle (quarterly)

**Outcome:** Governance v2.0, updated endorsements

### Future Phases (2026 and Beyond)

- Expand catalog to 50+ tools
- Add more NAPCORE-developed tools
- Integrate with NAPCORE training materials
- Develop mobile companion app (exploration)
- Establish catalog as European standard reference

---

## Key Stakeholders

### NAPCORE Organization

**Overall Governance:**

- 36 participants across 33 beneficiaries
- 26 EU Member States represented
- 37 Implementing Bodies

**Domain Stakeholders:**

- **WG2:** Public Transport domain experts
- **WG3:** Road & Traffic domain experts
- **T4.x:** Standards & Metadata experts
- **T5.2:** Digital Tools leadership (catalog owners)

### Contributing Communities

- **Tool Developers:** Open source and organizational
- **Standards Bodies:** CEN, DATEX II Forum, Transmodel
- **Research Institutions:** Universities, research projects
- **Industry Partners:** Software vendors, consultancies

### End Users

- National Access Point operators (26+ countries)
- Public transport authorities across Europe
- Road traffic management centers
- Mobility data publishers and consumers

---

## Success Metrics

### Initial Release (v1.0)

**Targets:**

- ✅ 6-10 tools cataloged
- ✅ 5 NAPCORE Endorsed standards defined
- ✅ 5-6 NAPCORE Endorsed tools validated
- ✅ Governance framework approved
- ✅ Website live at `awesome.napcore.eu`

### 6-Month Goals (Mid-2026)

- 20-25 tools cataloged
- 10-15 community submissions
- 1000+ unique visitors/month
- 5-10 blog posts published
- Active GitHub Discussions community

### 12-Month Goals (End 2026)

- 30-50 tools cataloged
- 10+ NAPCORE Endorsed tools
- 3000+ unique visitors/month
- Referenced by National Access Points
- Integrated with NAPCORE training programs

---

## Governance Summary

### Two-Tier System

| Tier                 | Badge   | Meaning                               |
| -------------------- | ------- | ------------------------------------- |
| **Listed**           | None    | Meets basic criteria, in catalog      |
| **NAPCORE Endorsed** | ✓ Badge | Domain expert-validated, high quality |

### Submission Process

**Open to all:**

1. Submit via GitHub Discussions (Tool Submission category)
2. Content editors review (1-2 weeks)
3. Approved → Added as Listed
4. Endorsement consideration (batch review cycles)

**Details:** See `governance.md`

---

## Links and Resources

### Live Site

- **Production (planned):** https://awesome.napcore.eu
- **Proof of Concept:** https://napcore-tools.github.io/web-awesome_napcore_tools/

### Development

- **Repository:** https://github.com/napcore-tools/web-awesome_napcore_tools
- **Discussions:** https://github.com/napcore-tools/web-awesome_napcore_tools/discussions
- **Issues:** https://github.com/napcore-tools/web-awesome_napcore_tools/issues

### NAPCORE

- **Main Website:** https://napcore.eu
- **Contact:** https://napcore.eu/contact

### Documentation

- **Contribution Guide:** `../docs/contribute.md`
- **About Page:** `../docs/about.md`
- **Governance:** `governance.md`
- **Architecture:** `architecture.md`

---

## Licensing

### Catalog Content

**License:** Creative Commons Attribution 4.0 (CC BY 4.0)

**Includes:**

- Tool descriptions and metadata
- Blog posts
- Category descriptions
- Documentation pages

### Code

**License:** MIT License

**Includes:**

- VitePress configuration
- Vue components
- TypeScript utilities
- Build scripts
- Tests

### Individual Tools

**License:** Varies by tool (see tool pages)

**Examples:**

- MIT (most open source tools)
- Apache 2.0
- GPL v3
- Proprietary/Free (some web tools)

---

## Acknowledgments

### NAPCORE Partners

- All 33 beneficiaries across 26 EU Member States
- Work Group 2 (Public Transport) representatives
- Work Group 3 (Road & Traffic) representatives
- Task 4.x (Standards & Metadata) contributors

### Tool Developers

- DATEX II community
- NeTEx implementers
- SIRI developers
- mobilityDCAT-AP adopters
- All open source contributors

### Funding

**Co-financed by:**

- Connecting Europe Facility (CEF) of the European Union
- NAPCORE consortium partners

---

## Contact Information

### General Inquiries

**Email:** [T5.2 contact email]  
**Website:** https://napcore.eu

### Tool Submissions

**GitHub Discussions:** https://github.com/napcore-tools/web-awesome_napcore_tools/discussions

**Category:** Tool Submission

### Technical Issues

**GitHub Issues:** https://github.com/napcore-tools/web-awesome_napcore_tools/issues

---

## Related Documentation

- **Architecture:** `architecture.md` - Technical architecture details
- **Governance:** `governance.md` - Tool submission and endorsement process
- **Development Guide:** `development-guide.md` - Setup and development workflow
- **Deployment Guide:** `deployment-guide.md` - CI/CD and deployment process
- **Source Tree:** `source-tree-analysis.md` - Codebase structure
- **UI Components:** `ui-components.md` - Component inventory and patterns
