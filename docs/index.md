---
layout: home

hero:
  name: NAPCORE Store
  text: "Status: Proof-of-concept"
  tagline: Curated catalog of European mobility data-related tools
  image:
    src: https://napcore.eu/wp-content/themes/napcore/images/napcore-logo.png
    alt: NAPCORE Logo
  actions:
    - theme: brand
      text: Browse Tools
      link: /categories/
    - theme: alt
      text: Submit a Tool
      link: /contribute

features:
  - icon: ✓
    title: Validators
    details: Schema validation and business rule checking tools for ensuring data quality and compliance
    link: /categories/validators

  - icon: ⇄
    title: Converters & Transformers
    details: Format conversion and data transformation utilities for mobility data standards
    link: /categories/converters

  - icon: ⬆
    title: Version Upgrade Tools
    details: Migration and compatibility utilities for standard version upgrades
    link: /categories/version-tools

  - icon: 📦
    title: SDKs & Libraries
    details: Programming language bindings and libraries for easier implementation
    link: /categories/sdks

  - icon: 🎯
    title: Reference Implementations
    details: Working examples and demo applications showing best practices
    link: /categories/reference-implementations

  - icon: 🛠
    title: Development Tools
    details: Browsers, editors, and generators for development workflows
    link: /categories/development

  - icon: 📊
    title: Data Quality Tools
    details: Validation, enrichment, and cleaning utilities for high-quality data
    link: /categories/data-quality

  - icon: 🧪
    title: Testing Utilities
    details: Test data generation and validation tools for robust testing
    link: /categories/testing

  - icon: 🏷
    title: Metadata Tools
    details: Catalog generation and discovery tools for better data findability
    link: /categories/metadata

  - icon: 🗺️
    title: Route planners
    details: Route planners are digital tools that help you find the best way to get from one location to another
    link: /categories/route-planners

  - icon: 📚
    title: References
    details: Technical documentation, specifications, and implementation guides
    link: /categories/references
---

---

::: warning
This site is work in progress and in a proof-of-concept stage.
:::

---

<StatsBar />

## Featured Tools

<div class="feature-grid">

<div class="tool-card">
  <div class="tool-card-header">
    <div class="tool-status active">🟢 Active</div>
    <h3 class="tool-card-title">
      <a href="/tools/datex-browser">DATEX II Browser</a>
    </h3>
    <p class="tool-card-subtitle">Reference Documentation Tool</p>
  </div>
  <div class="tool-card-body">
    <p class="tool-card-description">
      Wikipedia-style browser for exploring the DATEX II data model with 6,187 elements. Essential daily reference for DATEX II implementers.
    </p>
    <div class="tool-tags">
      <span class="tool-tag">DATEX II</span>
      <span class="tool-tag">Browser</span>
      <span class="tool-tag">Reference</span>
    </div>
  </div>
  <div class="tool-links">
    <a href="https://browser.datex2.eu" target="_blank" class="tool-link">Try Live Demo</a>
    <a href="/tools/datex-browser" class="tool-link">View Details</a>
  </div>
</div>

<div class="tool-card">
  <div class="tool-card-header">
    <div class="tool-status active">🟢 Active</div>
    <h3 class="tool-card-title">
      <a href="/tools/mobilitydcat-generator">mobilityDCAT-AP Generator</a>
    </h3>
    <p class="tool-card-subtitle">Metadata Generation Tool</p>
  </div>
  <div class="tool-card-body">
    <p class="tool-card-description">
      Form-based interface for generating RDF metadata compliant with mobilityDCAT-AP. Perfect for NAP operators and data publishers.
    </p>
    <div class="tool-tags">
      <span class="tool-tag">mobilityDCAT-AP</span>
      <span class="tool-tag">RDF</span>
      <span class="tool-tag">Metadata</span>
    </div>
  </div>
  <div class="tool-links">
    <a href="https://mobilitydcat-ap.github.io/mobilitydcatap-ui/" target="_blank" class="tool-link">Try Live Demo</a>
    <a href="/tools/mobilitydcat-generator" class="tool-link">View Details</a>
  </div>
</div>

<div class="tool-card">
  <div class="tool-card-header">
    <div class="tool-status active">🟢 Active</div>
    <h3 class="tool-card-title">
      <a href="/tools/datex-schema-tool">DATEX II Schema Tool</a>
    </h3>
    <p class="tool-card-subtitle">Profile Generation Wizard</p>
  </div>
  <div class="tool-card-body">
    <p class="tool-card-description">
      Create custom DATEX II profiles by selecting only needed elements. Export to XML Schema, JSON Schema, or ASN.1 formats.
    </p>
    <div class="tool-tags">
      <span class="tool-tag">DATEX II</span>
      <span class="tool-tag">Schema</span>
      <span class="tool-tag">Wizard</span>
    </div>
  </div>
  <div class="tool-links">
    <a href="https://webtool.datex2.eu" target="_blank" class="tool-link">Try Live Demo</a>
    <a href="/tools/datex-schema-tool" class="tool-link">View Details</a>
  </div>
</div>

</div>

## About the Catalog

The NAPCORE Store is a community-driven initiative to collect, curate, and showcase open-source tools that support European mobility data standards. Our mission is to make it easier for developers, data publishers, and mobility professionals to find and use the right tools for their needs.

::: info Community-Driven
This catalog is built and maintained by the European mobility data community. We welcome contributions from tool developers, users, and anyone passionate about improving mobility data infrastructure.
:::

## Get Involved

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
  
<div class="info-box">

### 🎯 Submit a Tool

Have a tool that helps with mobility data? Share it with the community through our contribution process.

[Learn How to Contribute →](/contribute)

</div>

<div class="info-box green">

### 💬 Join the Discussion

Connect with other mobility data professionals, ask questions, and share your experiences.

[GitHub Discussions →](https://github.com/napcore-tools/web-napcore_store/discussions)

</div>

<div class="info-box orange">

### 📚 Browse by Category

Looking for tools for a specific standard? Browse tools by the standards they support.

[View Tools →](/categories/)

</div>

</div>

---

<div style="text-align: center; padding: 2rem 0; color: var(--vp-c-text-2);">
  <p><strong>NAPCORE</strong> - National Access Point Coordination Organisation for Europe</p>
  <p style="font-size: 0.9rem; margin-top: 0.5rem;">Co-financed by the Connecting Europe Facility of the European Union</p>
</div>
