# Validators

Schema validation and business rule checking tools for ensuring data quality and compliance.

## Available Tools (1)

<div class="feature-grid">

<div class="tool-card">
  <div class="tool-card-header">
    <div class="tool-status active">🟢 Active</div>
    <h3 class="tool-card-title">
      <a href="/tools/alert-c-tester">ALERT-C Locations Tester</a>
    </h3>
    <p class="tool-card-subtitle">Location Reference Validator</p>
  </div>
  <div class="tool-card-body">
    <p class="tool-card-description">
      Validation tool for ALERT-C location references used in RDS-TMC services and DATEX II traffic information. Detects invalid location codes and extent values.
    </p>
    <div class="tool-tags">
      <span class="tool-tag">ALERT-C</span>
      <span class="tool-tag">RDS-TMC</span>
      <span class="tool-tag">DATEX II</span>
      <span class="tool-tag">Python</span>
    </div>
  </div>
  <div class="tool-links">
    <a href="https://github.com/tamtamresearch/alert-c-locations-tester" target="_blank" class="tool-link">Source Code</a>
    <a href="/tools/alert-c-tester" class="tool-link">Details</a>
  </div>
</div>

</div>

## What are Validators?

Validators are essential tools that help ensure your mobility data meets specification requirements by:

- **Schema validation**: Checking data structure against XSD, JSON Schema, or other formats
- **Business rule validation**: Verifying domain-specific rules and constraints
- **Data quality checks**: Identifying issues with data completeness, consistency, and accuracy
- **Compliance verification**: Ensuring data meets regulatory requirements
- **Reference validation**: Verifying location codes, identifiers, and other reference data

## Common Use Cases

### Pre-Publication Validation
Validate data before publishing on a National Access Point to ensure quality and compliance.

### Development Testing
Continuously validate data during development to catch issues early.

### Quality Assurance
Regular validation to maintain data quality standards over time.

### Debugging
Identify and diagnose specific data issues with detailed error messages.

### Location Reference Validation
Ensure ALERT-C location codes and references are valid and comply with ISO/DIS 14819 Part 3.

## Needed Validators

We're looking for validator tools for:

- **DATEX II validators** (XML, JSON)
- **NeTEx validators**
- **SIRI validators**
- **mobilityDCAT-AP metadata validators**
- **Multi-standard validators**
- **Business rule validators**
- **Geographic data validators**

## Standards

<div class="standards-list">
  <span class="standard-badge supported">DATEX II</span>
  <span class="standard-badge supported">ISO/DIS 14819 Part 3</span>
  <span class="standard-badge supported">RDS-TMC</span>
  <span class="standard-badge">NeTEx</span>
  <span class="standard-badge">SIRI</span>
  <span class="standard-badge">mobilityDCAT-AP</span>
</div>

## Related Categories

- [Data Quality Tools](/categories/data-quality) - Broader quality checking
- [Testing Utilities](/categories/testing) - Testing frameworks
- [Converters](/categories/converters) - Conversion validation
- [Development Tools](/categories/development) - Tools using validators

## Tool Spotlight: ALERT-C Locations Tester

The ALERT-C Locations Tester is particularly valuable because:

- **Production proven**: In operational use by Czech Road and Motorway Directorate
- **Format independent**: Works with DATEX II, RDS-TMC, and custom formats
- **European relevance**: ALERT-C is widely used across European traffic systems
- **Open source**: MIT licensed, adaptable to any country's location tables

---

::: tip Have a Validator?
Help the community by submitting validator tools you've built or know about! [Submit a tool →](/contribute)
:::
