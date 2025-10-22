# Metadata Tools

Tools for creating, managing, and publishing metadata that makes mobility data discoverable and reusable.

## Available Tools (1)

<div class="feature-grid">

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
    <a href="https://mobilitydcat-ap.github.io/mobilitydcatap-ui/" target="_blank" class="tool-link">Live Demo</a>
    <a href="/tools/mobilitydcat-generator" class="tool-link">Details</a>
  </div>
</div>

</div>

## What are Metadata Tools?

Metadata tools help you create, manage, and publish the descriptive information that makes your mobility datasets discoverable, understandable, and reusable. Good metadata is essential for:

- **Data Discovery**: Help users find relevant datasets
- **Data Understanding**: Explain what the data contains and how it's structured
- **Data Integration**: Enable systems to automatically consume and process data
- **Cross-border Interoperability**: Facilitate data sharing across European borders
- **Legal Compliance**: Meet regulatory requirements for data publication

## Why Metadata Matters

In the European mobility data ecosystem, metadata is critical for:

### National Access Points (NAPs)
NAPs need standardized metadata to catalog and publish datasets in a way that's discoverable across borders. mobilityDCAT-AP provides this standardization.

### Data Publishers
Clear, structured metadata helps data publishers communicate what their data contains, how often it's updated, and how it can be accessed.

### Data Consumers
Good metadata allows developers and analysts to quickly determine if a dataset meets their needs without having to download and inspect the actual data.

### Cross-border Services
Harmonized metadata enables pan-European services to discover and aggregate data from multiple NAPs automatically.

## mobilityDCAT-AP Standard

mobilityDCAT-AP is the recommended metadata standard for European mobility data:

- **Based on DCAT-AP**: Extends the European standard for data portal metadata
- **Mobility-specific**: Adds elements relevant to mobility data
- **NAPCORE endorsed**: Maintained by NAPCORE Metadata Working Group
- **Version 1.1.0**: Released January 2025
- **Growing adoption**: Implemented by multiple European NAPs

### Key Metadata Elements

mobilityDCAT-AP describes:
- Dataset titles and descriptions
- Data formats and schemas
- Access methods and endpoints
- Geographic and temporal coverage
- Update frequency and quality
- Legal information (licenses, access rights)
- Mobility-specific categories and topics

## Common Use Cases

### Creating NAP Catalogs
Generate standardized metadata for all datasets on your National Access Point, enabling cross-border discovery.

### Learning the Standard
Use interactive tools to understand what metadata is required vs. optional, and how to properly describe mobility data.

### API Documentation
Create machine-readable metadata that documents your data APIs and services.

### Testing Compliance
Experiment with metadata to ensure it meets mobilityDCAT-AP requirements before publishing.

## Standards Covered

<div class="standards-list">
  <span class="standard-badge supported">mobilityDCAT-AP</span>
  <span class="standard-badge supported">DCAT-AP</span>
  <span class="standard-badge supported">RDF</span>
  <span class="standard-badge supported">DCAT</span>
</div>

## Related Categories

- [Development Tools](/categories/development) - Tools for working with metadata in development
- [Data Quality Tools](/categories/data-quality) - Ensuring metadata quality
- [Validators](/categories/validators) - Validating metadata compliance

## Needed Tools

We're looking for additional metadata tools in these areas:

- **Metadata validators** for mobilityDCAT-AP compliance
- **Metadata harvesters** for aggregating catalogs
- **Metadata transformation tools** (DCAT to mobilityDCAT-AP)
- **Metadata quality checkers**
- **Automated metadata generators** from data sources

---

::: tip Have a Metadata Tool?
The European mobility data ecosystem needs more metadata tools! If you've built or know of one, please share it with the community. [Submit a tool →](/contribute)
:::

## Resources

- **mobilityDCAT-AP Specification**: [w3id.org/mobilitydcat-ap](https://w3id.org/mobilitydcat-ap)
- **NAPCORE Metadata Working Group**: Contact through NAPCORE channels
- **DCAT-AP Specification**: [joinup.ec.europa.eu](https://joinup.ec.europa.eu/collection/semantic-interoperability-community-semic/solution/dcat-application-profile-data-portals-europe)

## Getting Started with Metadata

1. **Learn the standard**: Read about [mobilityDCAT-AP](https://w3id.org/mobilitydcat-ap)
2. **Try the generator**: Use the [mobilityDCAT-AP Generator](/tools/mobilitydcat-generator)
3. **Publish metadata**: Integrate generated metadata into your data portal
4. **Test discoverability**: Verify your metadata works with harvesting tools
