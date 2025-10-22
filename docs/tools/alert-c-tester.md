---
title: ALERT-C Locations Tester
description: Validation tool for ALERT-C location references in RDS-TMC and DATEX II traffic information
categories:
  - validators
  - data-quality
  - testing
status: active
license: MIT
sourceCode: https://github.com/tamtamresearch/alert-c-locations-tester
developer: TamTam Research s.r.o.
technology: Python, SQLite, CLI
standards:
  - DATEX II
  - ISO/DIS 14819 Part 3
  - RDS-TMC
tags:
  - ALERT-C
  - Validator
  - Python
  - CLI
  - RDS-TMC
  - Location References
lastUpdated: 2025-10-22
---

# ALERT-C Locations Tester

<div class="tool-status active" style="display: inline-block; margin-bottom: 1rem;">🟢 Active</div>

> A validation tool for ALERT-C location references used in RDS-TMC services and DATEX II traffic information.

## Quick Info

| | |
|---|---|
| **Status** | 🟢 Active (last updated October 2025) |
| **License** | MIT |
| **Source Code** | [GitHub Repository](https://github.com/tamtamresearch/alert-c-locations-tester) |
| **Technology** | Python, SQLite, CLI |
| **Developer** | TamTam Research s.r.o. |

## Overview

ALERT-C Locations Tester is a validation tool for ALERT-C location references, which were primarily used in RDS-TMC services but have become popular also in other services such as provisioning road traffic information using DATEX II data formats.

The tool generates a location index file from standard TMC format files (ISO/DIS 14819 Part 3), providing complete enumeration of all possible location references for a given version of location tables. Users can then validate their traffic information content against this index to detect invalid location references that should not be used.

## Key Features

- **Location index generation**: Creates comprehensive indices from TMC format files (.DAT)
- **Format-agnostic validation**: Works with any traffic information format once location references are extracted
- **Multiple output formats**: Generates SQLite databases and CSV files for flexible integration
- **Comprehensive validation**: Checks primary location codes, directionality (+/-), and extent values (0-31)
- **Large-scale processing**: Handles extensive location tables (45,929+ allocated locations)
- **Command-line interface**: Easy automation and integration into CI/CD pipelines
- **Extensible**: Reference implementation for DDR.xml format, adaptable to DATEX II and others

## Use Cases

1. **Data quality assurance**: Systematically validate location references before broadcasting or publishing
2. **Compliance verification**: Ensure conformance with ISO/DIS 14819 Part 3 standard
3. **Pre-publication testing**: Validate traffic information before publishing on National Access Points
4. **Continuous monitoring**: Regular validation to maintain data quality standards
5. **Format migration**: Verify location references when converting between formats
6. **Development testing**: Validate location references during application development

## How It Works

### Two-Stage Approach

#### Stage 1: Generate Location Index
```bash
# Process TMC location tables to create validation index
inv generate-index --location-table=path/to/table.DAT
```

Output: SQLite database and CSV file containing all valid location references

#### Stage 2: Validate References
```bash
# Extract location references from your traffic data
# Compare against the generated index
inv validate --content=path/to/traffic-data.xml
```

## Invalid References Detected

The tool identifies various types of invalid location references:

- **Extent values above 31**: Maximum allowed extent is 31
- **Non-existent primary location codes**: e.g., location code 0
- **Invalid combinations**: Primary location, direction, and extent that don't exist together
- **Undefined locations**: References to locations not defined in the location table version
- **Out-of-range values**: Any values outside the valid ranges defined by the standard

## Standards Supported

<div class="standards-list">
  <span class="standard-badge supported">DATEX II (with ALERT-C)</span>
  <span class="standard-badge supported">ISO/DIS 14819 Part 3</span>
  <span class="standard-badge supported">RDS-TMC</span>
</div>

## Target Audience

- Organizations operating RDS-TMC services across Europe
- National Access Points managing DATEX II traffic information with ALERT-C referencing
- Traffic information service providers
- Road infrastructure authorities
- NAP operators ensuring data quality
- Developers implementing traffic information systems

## Technical Details

### Technology Stack
- **Language**: Python
- **Database**: SQLite for efficient index storage
- **CLI Framework**: Invoke package for command-line interface
- **Input Format**: TMC location tables (.DAT files) conforming to ISO/DIS 14819 Part 3
- **Output Formats**: SQLite database, CSV files

### Location Table Format
The tool processes TMC location tables in standard .DAT format according to ISO/DIS 14819 Part 3. These tables contain:
- Primary location codes
- Direction information
- Extent specifications
- Location metadata

### Validation Components
The tool validates three key components:
1. **Primary location codes**: Must exist in the location table
2. **Directionality**: Positive (+) or negative (-) direction
3. **Extent values**: Must be between 0 and 31

## Example Implementation

The repository includes a reference implementation for DDR.xml (legacy Czech format), which can serve as a template for:
- Extracting location references from DATEX II XML
- Processing other traffic information formats
- Integrating validation into existing workflows

## Location Table Availability

::: warning Location Tables Not Included
ALERT-C location tables are not included in the repository due to licensing restrictions. They are typically available from national traffic information centers.
:::

**Example - Czech Location Tables:**
Available for free after signing a license agreement at:
[Czech NDIC TMC Location Table](https://registr.dopravniinfo.cz/en/sources/cz-ndic_tmc-location-table-v11.0/)

Contact your national traffic information center for location tables in other countries.

## Operational Use

- **Production deployment**: Currently in operational use by Czech Road and Motorway Directorate (ŘSD)
- **Initial funding**: Development funded by Ředitelství silnic a dálnic s.p. (Czech Road and Motorway Directorate)
- **Proven reliability**: Validates thousands of location references in production environment

## Why This Tool Matters

ALERT-C Locations Tester addresses a critical data quality challenge in European road traffic information systems:

### Data Quality Assurance
Systematic validation prevents broadcasting incorrect location information that could mislead drivers and compromise road safety.

### European Relevance
ALERT-C is widely used for road traffic location referencing across Europe, both in traditional RDS-TMC and modern DATEX II services.

### Format Independence
The two-stage approach (generate index → validate references) makes it adaptable to any traffic information format, including DATEX II, RDS-TMC, legacy national formats, or custom implementations.

### Operational Efficiency
Automates validation that would otherwise require manual checking of thousands of location references.

### Compliance
Ensures conformance with ISO/DIS 14819 Part 3 standard for ALERT-C location tables.

### Reusability
While developed for Czech use case, the tool can work with any country's ALERT-C location tables in standard TMC format.

## Community & Contributions

The maintainers welcome community contributions:

- **New location indices**: Contributors can add indices for additional countries
- **Format adapters**: Implementations for extracting references from different formats
- **Improvements**: Bug fixes, feature enhancements, documentation
- **Issues**: Report problems or suggest improvements on GitHub

::: info Community Extensible
If you have properly licensed ALERT-C location tables for your country, consider contributing the generated indices to help the wider community!
:::

## Getting Started

### Prerequisites
- Python 3.x
- TMC location tables for your country (.DAT format)

### Installation
```bash
git clone https://github.com/tamtamresearch/alert-c-locations-tester.git
cd alert-c-locations-tester
pip install -r requirements.txt
```

### Basic Usage

1. **Generate location index**:
   ```bash
   inv generate-index --location-table=your-table.DAT
   ```

2. **Implement reference extraction** for your format (use DDR.xml example as template)

3. **Validate your traffic data**:
   ```bash
   inv validate --content=your-traffic-data.xml
   ```

4. **Review results**: Check output for invalid location references

## Related Tools

This tool complements other DATEX II and traffic information tools:
- [DATEX II Browser](/tools/datex-browser) - For exploring DATEX II model
- [DATEX II Schema Tool](/tools/datex-schema-tool) - For creating DATEX II profiles
- Validators for DATEX II content (coming soon to catalog)

## Support

- **Issues**: [GitHub Issues](https://github.com/tamtamresearch/alert-c-locations-tester/issues)
- **Source Code**: [GitHub Repository](https://github.com/tamtamresearch/alert-c-locations-tester)
- **Documentation**: Included in repository

---

<div style="background: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
  <p style="margin: 0;"><strong>Tool Metadata</strong></p>
  <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
    <li><strong>Category</strong>: Validators, Development Tools, Data Quality Tools</li>
    <li><strong>Standards</strong>: DATEX II (with ALERT-C), ISO/DIS 14819 Part 3, RDS-TMC</li>
    <li><strong>License</strong>: MIT</li>
    <li><strong>Maintenance</strong>: Actively maintained (October 2025)</li>
    <li><strong>Type</strong>: CLI Tool, Validator, Data Quality Assurance</li>
    <li><strong>Language</strong>: Python</li>
  </ul>
</div>
