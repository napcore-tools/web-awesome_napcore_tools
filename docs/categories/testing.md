---
document: category
contributeTip: Know a testing framework or simulator for mobility data systems?
---

# Testing Utilities

Tools and frameworks that support testing of mobility and transport data, services, and systems — ensuring reliability, interoperability, and compliance with data exchange standards.

::: details Click for more

### What Are Testing Utilities?

Testing utilities help developers and data providers **verify the correctness and robustness** of their mobility data solutions.
They automate testing of data transformations, API endpoints, and validation workflows to catch issues early in the development or publication process.

They are commonly used by:

- **Developers** building or maintaining data exchange APIs
- **Data providers** verifying output against standard schemas
- **Quality assurance teams** running automated test suites

### Types of Testing Utilities

| Type                              | Description                                                   | Example                     |
| --------------------------------- | ------------------------------------------------------------- | --------------------------- |
| **Schema Testers**                | Validate files against XSD or JSON Schema definitions         | DATEX II Schema Tester      |
| **Integration Testers**           | Test interoperability between systems or services             | SIRI API Integration Tester |
| **Rule-based Testers**            | Check business rules and constraints beyond schema validation | NeTEx Logical Rule Tester   |
| **Mock & Simulation Tools**       | Generate mock data or simulate service responses              | Traffic Data Simulator      |
| **Continuous Testing Frameworks** | Automate validation in CI/CD pipelines                        | Mobility Data CI Runner     |

### Common Use Cases

#### Schema and Rule Testing

Validate datasets or API responses to ensure structural and logical compliance.

#### Integration Testing

Verify compatibility between different data providers or transport systems.

#### Automated Quality Assurance

Run validation tests automatically in CI/CD environments to prevent regressions.

#### Mocking and Simulation

Simulate transport data or API calls to test system behavior under controlled conditions.

### Example Tool

**SIRI Service Tester**

- Simulates SIRI StopMonitoring and VehicleMonitoring requests
- Validates XML responses against the SIRI schema
- Supports configurable scenarios for automated testing
- Used in transport system integration projects across Europe

### Related Categories

<RelatedCategories />

:::

## Available Tools

<ToolsGrid />
