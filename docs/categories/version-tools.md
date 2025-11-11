---
document: category
contributeTip: Created or used a migration or upgrade tool for mobility standards?
---

# Version Upgrade Tools

Utilities and scripts that help migrate or convert datasets and systems between different versions of mobility and transport data standards.

::: details Click for more

### What Are Version Upgrade Tools?

Version upgrade tools automate the process of **updating data or interfaces** from older to newer standard versions — ensuring compatibility, data integrity, and compliance.
They're essential when standards evolve (e.g., DATEX II v2 → v3, NeTEx profile updates) and systems need to stay interoperable.

They're typically used by:

- **Data providers** upgrading published datasets
- **System integrators** maintaining interoperability across versions
- **Developers** adapting applications to new schema versions

### Types of Version Upgrade Tools

| Type                        | Description                                | Example                         |
| --------------------------- | ------------------------------------------ | ------------------------------- |
| **Schema Migrators**        | Convert files between standard versions    | DATEX II v2 → v3 Converter      |
| **Transformation Scripts**  | Apply XSLT or mapping rules                | NeTEx Profile Transformer       |
| **Compatibility Checkers**  | Verify cross-version compliance            | mobilityDCAT-AP Version Checker |
| **Migration Assistants**    | Interactive tools for data migration       | XML Schema Migration Assistant  |
| **Multi-Profile Upgraders** | Handle regional or custom profile mappings | DATEX II Profile Upgrader       |

### Common Use Cases

#### Standard Migration

Convert existing datasets to newer standard versions to maintain compliance.

#### Compatibility Testing

Ensure backward compatibility when consuming mixed-version data feeds.

#### Automated Conversion

Integrate upgrade utilities in pipelines to process datasets dynamically.

#### Metadata Synchronization

Update catalog metadata to align with new schema profiles.

### Example Tool

**DATEX II Version Migration Tool**

- Converts legacy DATEX II v2 datasets to v3 format
- Preserves key elements and mappings
- Command-line utility with configurable profiles
- Used by several European NAPs

### Related Categories

<RelatedCategories />

:::

## Available Tools

<ToolsGrid />
