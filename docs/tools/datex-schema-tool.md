---
title: DATEX II Schema Generation Tool
description: Web-based wizard for creating custom DATEX II profiles and generating schemas
categories:
  - converters
  - development
status: active
liveDemo: https://webtool.datex2.eu
developer: DATEX II community (datex2.eu)
mainContributor: Jonas Jäderberg
standards:
  - DATEX II
tags:
  - DATEX II
  - Schema
  - Wizard
  - Profile
  - XML Schema
  - JSON Schema
  - ASN.1
lastUpdated: 2025-10-22
---

# DATEX II Schema Generation Tool (Webtool)

<div class="tool-status active" style="display: inline-block; margin-bottom: 1rem;">🟢 Active</div>

> Web-based wizard for creating custom DATEX II profiles. Generate XML Schema, JSON Schema, or ASN.1 schemas by selecting only the elements you need.

## Quick Info

| | |
|---|---|
| **Status** | 🟢 Active |
| **Live Demo** | [webtool.datex2.eu](https://webtool.datex2.eu) |
| **Developer** | DATEX II community (datex2.eu) |
| **Main Contributor** | Jonas Jäderberg ([@jonas-jaderberg](https://github.com/jonas-jaderberg)) |
| **Source Code** | Not publicly available (possible future open source release) |

## Overview

The DATEX II Schema Generation Tool is a web-based wizard that helps you create custom DATEX II profiles tailored to your specific needs. The full DATEX II model is very comprehensive - this tool lets you select only the elements, profiles, and constraints relevant to your use case, making implementation simpler and more focused.

## Key Features

- **Interactive wizard interface** for profile creation
- **Model selection**: Choose from available DATEX II models or import your own XMI file
- **Element selection**: Pick specific elements, profiles, and constraints
- **Multiple output formats**:
  - XML Schema (XSD)
  - JSON Schema
  - ASN.1
- **Profile customization**: Create tailored subsets of the DATEX II model
- **Export functionality**: Download generated schemas

## How to Use

1. Visit [webtool.datex2.eu](https://webtool.datex2.eu) and click **[Wizard]**
2. **Select a DATEX II model** (or import your own XMI file)
3. **Choose elements**: Select which elements, profiles, and constraints you want to include
4. **Export schemas**: Download in your preferred format (XSD, JSON Schema, or ASN.1)

## Why This Tool is Useful

The full DATEX II model covers a wide range of use cases and scenarios, which means it includes many elements that any single implementation may not need. This tool addresses that challenge by:

1. **Simplifying implementation**: Focus only on relevant elements for your specific use case
2. **Reducing complexity**: Smaller schemas are easier to understand and maintain
3. **Improving performance**: Validation against a subset schema is faster
4. **Better documentation**: A tailored profile serves as clear documentation of your implementation scope
5. **Facilitating interoperability**: Share your profile with partners to clarify your data exchange requirements

## Use Cases

1. **Creating NAP-specific profiles**: National Access Points can define exactly what they support
2. **Service-specific implementations**: Create profiles for specific services (parking, traffic incidents, etc.)
3. **Testing and development**: Generate simplified schemas for easier testing
4. **Documentation**: Export profiles to document implementation scope
5. **Proof of concept**: Quickly create minimal profiles for prototyping

## Standards Supported

<div class="standards-list">
  <span class="standard-badge supported">DATEX II</span>
</div>

## Target Audience

- DATEX II implementers defining their profile
- NAP operators specifying data requirements
- System integrators working with multiple DATEX II systems
- Developers creating DATEX II applications
- Traffic data managers defining data exchange specifications

## Technical Details

- **Platform**: Web-based application
- **Input formats**: DATEX II models, XMI files
- **Output formats**: XML Schema, JSON Schema, ASN.1
- **Architecture**: Client-side processing (no data leaves your browser)

## Related Tools

This schema generation tool works well with:
- [DATEX II Browser](/tools/datex-browser) - For exploring the full DATEX II model
- DATEX II validators (coming soon to catalog)
- DATEX II converters (coming soon to catalog)

## Community & Support

- **Official Website**: [datex2.eu](https://datex2.eu)
- **Community Forums**: DATEX II User Group
- **Documentation**: Available through DATEX II website

::: tip Future Development
This tool is currently not open source, but there are discussions about a possible future open source release. Check the DATEX II community channels for updates.
:::

## About DATEX II

DATEX II is a European standard for exchanging traffic information and traffic data. It provides a comprehensive model for describing various types of traffic-related information including:

- Traffic incidents and events
- Traffic conditions and flow data
- Road conditions and weather
- Traffic management actions
- Parking information
- Variable message signs
- And much more

The standard is widely used across European National Access Points and traffic management systems.

## Getting Started

1. **Explore the model**: First, use the [DATEX II Browser](/tools/datex-browser) to understand available elements
2. **Visit the tool**: Go to [webtool.datex2.eu](https://webtool.datex2.eu)
3. **Start the wizard**: Click on the Wizard button
4. **Create your profile**: Select the elements you need
5. **Export and use**: Download your custom schema

No installation or registration required!

---

<div style="background: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
  <p style="margin: 0;"><strong>Tool Metadata</strong></p>
  <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
    <li><strong>Category</strong>: Converters & Transformers, Development Tools</li>
    <li><strong>Standards</strong>: DATEX II</li>
    <li><strong>License</strong>: Proprietary (potential future open source)</li>
    <li><strong>Maintenance</strong>: Actively maintained by DATEX II community</li>
    <li><strong>Type</strong>: Web Application, Profile Generator</li>
  </ul>
</div>

::: info Quick Example
This is a brief tool description format. If you have more detailed information about this tool, we welcome contributions! [Learn how to contribute](/contribute)
:::
