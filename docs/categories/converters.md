# Converters & Transformers

Tools for converting, transforming, and profiling mobility data across different formats and versions.

## Available Tools (2)

<div class="feature-grid">

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
    <a href="https://webtool.datex2.eu" target="_blank" class="tool-link">Live Demo</a>
    <a href="/tools/datex-schema-tool" class="tool-link">Details</a>
  </div>
</div>

<div class="tool-card">
  <div class="tool-card-header">
    <div class="tool-status active">🟢 Active</div>
    <h3 class="tool-card-title">
      <a href="/tools/datex-browser">DATEX II Browser</a>
    </h3>
    <p class="tool-card-subtitle">Model Browser & Converter Foundation</p>
  </div>
  <div class="tool-card-body">
    <p class="tool-card-description">
      Includes datex2json converter that transforms DATEX II models from Enterprise Architect to JSON format for web applications.
    </p>
    <div class="tool-tags">
      <span class="tool-tag">DATEX II</span>
      <span class="tool-tag">Converter</span>
      <span class="tool-tag">JSON</span>
    </div>
  </div>
  <div class="tool-links">
    <a href="https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json" target="_blank" class="tool-link">Source Code</a>
    <a href="/tools/datex-browser" class="tool-link">Details</a>
  </div>
</div>

</div>

## What are Converters & Transformers?

Converters and transformers are essential tools that help you work with mobility data by:

- **Converting between formats**: Transform data from one standard format to another (e.g., XML to JSON)
- **Creating profiles**: Generate customized subsets of comprehensive standards
- **Schema generation**: Produce schemas in various formats (XSD, JSON Schema, ASN.1)
- **Data transformation**: Restructure data to meet specific requirements
- **Model conversion**: Transform data models between different representations

## Common Use Cases

### Profile Creation
The full DATEX II standard is comprehensive and includes many elements that specific implementations don't need. Use profile generators to create tailored subsets that match your exact requirements.

### Schema Generation
Generate schemas in the format you need - whether that's XML Schema for traditional XML validation, JSON Schema for API development, or ASN.1 for telecommunications systems.

### Format Migration
Convert between different representations of the same data - for example, converting from XML to JSON for modern web applications while maintaining semantic meaning.

### Model Transformation
Transform data models from one representation to another, such as converting Enterprise Architect models to web-friendly JSON formats.

## Benefits of Using These Tools

1. **Simplified Implementation**: Work with only the elements you need
2. **Reduced Complexity**: Smaller schemas are easier to understand and maintain
3. **Better Performance**: Validation against subset schemas is faster
4. **Improved Documentation**: Profiles clearly document your implementation scope
5. **Enhanced Interoperability**: Share profiles with partners to clarify data exchange requirements

## Standards Covered

<div class="standards-list">
  <span class="standard-badge supported">DATEX II</span>
  <span class="standard-badge">NeTEx (coming soon)</span>
  <span class="standard-badge">SIRI (coming soon)</span>
</div>

## Related Categories

- [Development Tools](/categories/development) - Often used alongside converters
- [Validators](/categories/validators) - Validate converted/transformed data
- [Version Upgrade Tools](/categories/version-tools) - Special type of conversion for version migration

## Looking for More?

We're always looking to expand this category with more conversion and transformation tools. Common needs include:

- **NeTEx to GTFS converters**
- **SIRI to JSON transformers**
- **Multi-version migration tools**
- **Format normalizers**
- **Data enrichment tools**

---

::: tip Have a Converter Tool?
If you've built or know of a converter or transformer tool that should be listed here, please let us know! [Submit a tool →](/contribute)
:::

## Tool Selection Guide

**For creating DATEX II profiles:**
- Use [DATEX II Schema Tool](/tools/datex-schema-tool) to generate custom profiles

**For model conversions:**
- Check out the [datex2json converter](https://gitlab.com/tamtamresearch-public/datex2/browser/datex2json) in the DATEX II Browser project

**For other standards:**
- More tools coming soon - help us by submitting tools you know about!
