---
document: category
contributeTip: Know a reliable converter or open-source mapping tool?
---

# Converters & Transformers

Tools that transform mobility and transport data between different formats, standards, or structures — enabling interoperability, integration, and reuse across systems.

::: details Click for more

### What Are Converters?

Converters help you translate datasets or messages from one technical or semantic format to another.
They are essential for:

- **Interoperability** – connecting systems using different data standards
- **Data exchange** – publishing or consuming data in compatible formats
- **Modernization** – migrating legacy data to current standards
- **Automation** – integrating conversions into data pipelines or APIs

Converters often include format mapping, schema translation, and metadata transformation features.

### Types of Converters

| Type                          | Description                                               | Example                      |
| ----------------------------- | --------------------------------------------------------- | ---------------------------- |
| **Schema Converters**         | Transform data from one schema or structure to another    | DATEX II ↔ JSON, XML ↔ RDF |
| **Format Converters**         | Change encoding or syntax (e.g., CSV → JSON)              | GTFS → NeTEx converter       |
| **Metadata Converters**       | Adapt dataset descriptions to standards like DCAT-AP      | DCAT-AP ↔ mobilityDCAT-AP   |
| **Geospatial Converters**     | Reproject or transform geographic coordinates or formats  | WGS84 ↔ ETRS89 converter    |
| **Multi-standard Converters** | Handle several formats and provide mapping configurations | Multi-schema data gateway    |

### Common Use Cases

#### Data Publication

Convert internal data to **DATEX II**, **NeTEx**, or **mobilityDCAT-AP** formats for publication on a National Access Point (NAP).

#### Data Integration

Transform heterogeneous inputs from different systems into a single harmonized schema.

#### Migration

Convert legacy data (CSV, XML, JSON) into standardized mobility formats for interoperability.

#### Metadata Alignment

Adapt dataset metadata between **DCAT-AP** and **mobilityDCAT-AP** profiles for consistent cataloging.

### Example Tool

**DATEX II – JSON Converter**

- Converts DATEX II XML files into lightweight JSON
- Preserves core data model semantics
- Useful for APIs and web-based applications
- Open source and standard-compliant

### Related Categories

<RelatedCategories />

:::

## Available Tools

<ToolsGrid />
