# Validators

Tools and services that **check the structure and quality of mobility and transport data**, ensuring it complies with European standards such as DATEX II, NeTEx, SIRI, and mobilityDCAT-AP.

::: details Click for more

### What Are Validators?

Validators automatically verify whether datasets conform to technical and business specifications.
They are essential for maintaining **data quality, interoperability, and regulatory compliance** in digital mobility ecosystems.

Validators typically perform:

- **Schema validation** – Checks if files match required XML, JSON, or RDF schemas (e.g., XSD, JSON Schema)
- **Business rule validation** – Tests domain-specific logic, cardinality, or value constraints
- **Data quality checks** – Detects missing, inconsistent, or implausible values
- **Compliance checks** – Confirms datasets meet European standards for publication or exchange

### Types of Validators

| Type                          | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| **Schema Validators**         | Validate structure and syntax against XSD/JSON schemas    |
| **Business Rule Validators**  | Apply rules beyond the schema (e.g., logical consistency) |
| **Multi-standard Validators** | Handle several transport formats together                 |
| **Geographic Validators**     | Verify geospatial and reference integrity                 |

### Common Use Cases

#### Pre-Publication Validation

Ensure datasets comply with DATEX II, NeTEx, or mobilityDCAT-AP before submission to a **National Access Point (NAP)**.

#### Development & Testing

Integrate validators in your CI/CD workflow to catch schema or logical errors early.

#### Quality Monitoring

Run scheduled validations to monitor dataset quality and detect degradation over time.

#### Location Reference Validation

Validate ALERT-C or RDS-TMC location codes for correctness and alignment with reference tables.

### Example Tool: ALERT-C Locations Tester

The **ALERT-C Locations Tester** validates the consistency and correctness of location codes used in traffic messages.

- **Operational use**: Czech Road and Motorway Directorate
- **Multi-format support**: DATEX II, RDS-TMC, custom XML
- **European coverage**: ALERT-C widely used across Europe
- **License**: Open source (MIT)

### Related Categories

<RelatedCategories />

:::

## Available Tools

<ToolsGrid />

---

::: tip Want to Contribute?
Know a validator for DATEX II, NeTEx, SIRI, or mobilityDCAT-AP?
Help the community improve data quality by submitting your tool! [Submit a tool →](/contribute)
:::
