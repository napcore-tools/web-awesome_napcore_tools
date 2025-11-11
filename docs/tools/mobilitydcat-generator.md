---
document: tool
title: mobilityDCAT-AP Generator Tool
description: Form-based web interface for generating RDF metadata according to mobilityDCAT-AP
fullDescription: Form-based web interface that generates RDF metadata according to the mobilityDCAT-AP specification. Perfect for NAP operators and data publishers.
categories:
  - metadata
  - development
status: active
license: Apache-2.0
repository: https://github.com/mobilityDCAT-AP/mobilitydcatap-ui
website: https://mobilitydcat-ap.github.io/mobilitydcatap-ui/
documentation: null
demo: null
developer: Cefriel
technology: RDF, JSON
language: JavaScript, Vue
type: Web Application, Generator
maintainedBy: NAPCORE Metadata Working Group
standards:
  - mobilitydcat-ap
  - dcat-ap
  - rdf
tags:
  - mobilityDCAT-AP
  - RDF
  - Metadata
  - Generator
  - Form
lastUpdated: 2025-10-22
---

## Overview

The mobilityDCAT-AP Generator Tool is a form-based web interface that generates RDF metadata according to the mobilityDCAT-AP specification. This tool allows users to create structured, machine-readable metadata descriptions for mobility datasets and data services **without needing to write RDF code directly**.

It's designed to help data publishers test and experiment with different metadata elements while learning how to properly describe mobility data according to the mobilityDCAT-AP standard. The form is compliant with the **minimum profile of mobilityDCAT-AP**.

## Key Features

- **Form-based interface**: No need to write RDF code manually
- **Guided metadata creation**: Step-by-step approach to creating compliant metadata
- **Learning tool**: Experiment with different metadata elements to understand mobilityDCAT-AP
- **Instant RDF generation**: Produces machine-readable RDF output
- **Minimum profile compliance**: Ensures generated metadata meets minimum requirements
- **Web-based**: No installation required, accessible via browser
- **Open source**: Available for review, modification, and self-hosting
- **Docker support**: Can be deployed using Docker containers

## Use Cases

1. **Creating metadata** for mobility datasets on National Access Points
2. **Learning mobilityDCAT-AP**: Understanding what metadata elements are required and optional
3. **Testing metadata**: Experimenting with different metadata configurations
4. **Quick prototyping**: Generating sample metadata for proof-of-concept work
5. **Documentation**: Creating example metadata for specifications and guidelines
6. **Training**: Teaching teams how to properly describe mobility data

## Standards Supported

<div class="standards-list">
  <span class="standard-badge supported">mobilityDCAT-AP</span>
  <span class="standard-badge supported">DCAT-AP</span>
  <span class="standard-badge supported">RDF</span>
</div>

## Target Audience

- NAP operators creating metadata catalogues
- Data publishers describing mobility datasets
- Developers implementing mobilityDCAT-AP in their platforms
- Metadata specialists learning the mobilityDCAT-AP specification
- Data portal administrators
- Anyone needing to create standardized metadata for mobility data

## About mobilityDCAT-AP

mobilityDCAT-AP is a metadata specification developed by NAPCORE to enhance cross-border and cross-sectorial discoverability of mobility-related datasets. It extends DCAT-AP (the European standard for data portal metadata) with mobility-specific elements, providing precise metadata designations for:

- Data topics and categories
- Data providers and publishers
- Data formats and access methods
- Geographical coverage
- Temporal coverage
- Update frequency
- Mobility-relevant aspects

The specification addresses the fragmented European mobility data ecosystem by enabling harmonized, platform-independent metadata descriptions in both human-readable and machine-readable formats.

### mobilityDCAT-AP Key Info

- **Specification v1.1.0**: Released January 2025
- **Governance**: Maintained by NAPCORE Metadata Working Group
- **Requirements**: Based on 40 requirements from literature review and stakeholder input
- **Adoption**: Early adopters include several European NAPs
- **Documentation**: [w3id.org/mobilitydcat-ap](https://w3id.org/mobilitydcat-ap)

## Related Resources

- **mobilityDCAT-AP Specification**: [w3id.org/mobilitydcat-ap](https://w3id.org/mobilitydcat-ap)
- **Main GitHub Organization**: [github.com/mobilityDCAT-AP](https://github.com/mobilityDCAT-AP)
- **Specification Repository**: [github.com/mobilityDCAT-AP/mobilityDCAT-AP](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP)
- **Controlled Vocabularies**: [github.com/mobilityDCAT-AP/controlled-vocabularies](https://github.com/mobilityDCAT-AP/controlled-vocabularies)

## Technical Architecture

- **Framework**: Built using Cefriel's rapid-triples tool
- **Frontend**: Vue.js application
- **Deployment**: Static hosting via GitHub Pages
- **Output format**: RDF (Resource Description Framework)
- **Docker support**: Can be deployed using Docker containers

## Deployment Options

1. **Use the hosted version**: [mobilitydcat-ap.github.io/mobilitydcatap-ui](https://mobilitydcat-ap.github.io/mobilitydcatap-ui/)
2. **Self-host using Docker**
3. **Integrate into existing data portal infrastructure**

## Why This Tool Matters

mobilityDCAT-AP Generator Tool addresses critical needs in the European mobility data ecosystem:

1. **Lowers barriers**: Makes metadata creation accessible to non-technical users
2. **Standardization**: Ensures metadata follows the recommended European standard
3. **Educational value**: Helps users understand mobilityDCAT-AP requirements through hands-on experience
4. **NAP adoption**: Supports implementation of mobilityDCAT-AP across National Access Points
5. **European initiative**: Part of official NAPCORE recommendations for metadata harmonization
6. **Quick start**: Enables data publishers to create compliant metadata immediately
7. **Open approach**: Transparent, community-driven tool development
8. **Cross-border interoperability**: Facilitates findability and reusability of mobility data across Europe

## Recent Publication

The methodology and design of mobilityDCAT-AP was published in March 2025:

**"mobilityDCAT-AP: a Metadata Specification for Enhanced Cross-border Mobility Data Sharing"**  
Available on arXiv: [2503.11535](https://arxiv.org/abs/2503.11535)

## Getting Started

1. **Visit the tool**: [mobilitydcat-ap.github.io/mobilitydcatap-ui](https://mobilitydcat-ap.github.io/mobilitydcatap-ui/)
2. **Fill in the form**: Provide information about your dataset or data service
3. **Generate RDF**: Click to generate machine-readable metadata
4. **Download or copy**: Use the generated RDF in your data portal or catalog

No installation or registration required!

## Implementation Support

- **GitHub Issues**: For questions and feedback
- **Wiki**: FAQs and practical guidelines
- **Direct support**: From NAPCORE Metadata Working Group for early adopters
- **Community**: Connect through NAPCORE channels

::: tip Learning Resource
This tool is an excellent way to learn mobilityDCAT-AP by doing. Start with a simple dataset description and explore optional fields to understand the full specification capabilities.
:::

## Source Code

- **Tool Repository**: [github.com/mobilityDCAT-AP/mobilitydcatap-ui](https://github.com/mobilityDCAT-AP/mobilitydcatap-ui)
- **Specification**: [github.com/mobilityDCAT-AP/mobilityDCAT-AP](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP)
- **License**: Apache-2.0 (open source)

## Community & Support

- **Issues & Questions**: [GitHub Issues](https://github.com/mobilityDCAT-AP/mobilitydcatap-ui/issues)
- **Discussions**: NAPCORE Metadata Working Group
- **Documentation**: [mobilityDCAT-AP Wiki](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP/wiki)

---

<ToolMetadata />
