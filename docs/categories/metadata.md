# Metadata Tools

Tools that help create, manage, and validate metadata for mobility and transport datasets — ensuring discoverability, interoperability, and compliance with European data catalog standards.

## Available Tools

<ToolsGrid />

## What Are Metadata Tools?

Metadata tools assist in describing datasets in a structured and standardized way, enabling users to **find, understand, and reuse** mobility data.
They often implement profiles such as **DCAT-AP** and **mobilityDCAT-AP**, required for data publication on National Access Points and open data portals.

They are used by:

- **Data publishers** – to describe datasets and APIs
- **Catalog administrators** – to manage metadata repositories
- **Developers and integrators** – to automate metadata generation and harvesting

## Types of Metadata Tools

| Type                         | Description                                                | Example                           |
| ---------------------------- | ---------------------------------------------------------- | --------------------------------- |
| **Metadata Editors**         | Create or edit dataset descriptions manually               | DCAT-AP Metadata Editor           |
| **Metadata Validators**      | Check metadata against DCAT-AP or mobilityDCAT-AP profiles | mobilityDCAT-AP Validator         |
| **Catalog Management Tools** | Manage and publish metadata catalogs                       | CKAN, GeoNetwork                  |
| **Metadata Converters**      | Transform metadata between different profiles              | DCAT ↔ mobilityDCAT-AP Converter |
| **Harvesting Tools**         | Automate metadata synchronization between catalogs         | DCAT Harvester                    |

## Common Use Cases

### Dataset Publication

Create compliant metadata to publish datasets on National Access Points and open data portals.

### Metadata Validation

Check dataset descriptions for completeness and compliance with DCAT-AP or mobilityDCAT-AP requirements.

### Catalog Management

Maintain collections of datasets with version control, search, and linked data capabilities.

### Metadata Conversion

Transform or map metadata between internal and public catalog formats.

## Example Tool

**mobilityDCAT-AP Validator**

- Validates metadata records for compliance with the mobilityDCAT-AP profile
- Checks mandatory fields, controlled vocabularies, and references
- Supports JSON-LD, Turtle, and RDF/XML
- Open source, actively maintained

## Related Categories

- [Validators](./validators)
- [Converters](./converters)
- [Data Quality Tools](./data-quality)
- [Development Tools](./development)

---

::: tip Want to Contribute?
Know a metadata editor, validator, or catalog management tool for mobility datasets?
[Submit your tool →](/contribute)
:::
