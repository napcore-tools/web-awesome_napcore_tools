# mobilityDCAT-AP Generator Tool

<span class="tool-status active">🟢 Active</span>

Form-based web interface for generating RDF metadata compliant with mobilityDCAT-AP.

## Quick Info

- **Status**: 🟢 Actively Maintained
- **License**: Apache-2.0
- **Live Application**: [mobilitydcat-ap.github.io/mobilitydcatap-ui](https://mobilitydcat-ap.github.io/mobilitydcatap-ui/)
- **Source Code**: [GitHub Repository](https://github.com/mobilityDCAT-AP/mobilitydcatap-ui)
- **Developer**: Cefriel (using rapid-triples framework)
- **Maintainer**: NAPCORE Metadata Working Group

## Overview

The mobilityDCAT-AP Generator Tool provides a form-based web interface for creating RDF metadata according to the mobilityDCAT-AP specification. It allows users to create structured, machine-readable metadata descriptions for mobility datasets and data services without needing to write RDF code directly.

The tool is designed to help data publishers test and experiment with different metadata elements while learning how to properly describe mobility data according to the mobilityDCAT-AP standard. The form is compliant with the minimum profile of mobilityDCAT-AP.

## Key Features

### 📝 Form-Based Interface
No need to write RDF code manually - fill out forms with guided inputs.

### 🎓 Learning Tool
Experiment with different metadata elements to understand mobilityDCAT-AP requirements.

### ✅ Minimum Profile Compliance
Ensures generated metadata meets minimum mobilityDCAT-AP requirements.

### 🔄 Instant RDF Generation
Produces machine-readable RDF output immediately.

### 🌐 Web-Based
No installation required - accessible via browser from anywhere.

### 📖 Open Source
Available for review, modification, and self-hosting (Apache-2.0 license).

### 🐳 Docker Support
Can be deployed using Docker containers for local or enterprise use.

## Use Cases

### 1. Creating NAP Metadata
Generate metadata for mobility datasets published on National Access Points.

**Example Workflow:**
1. Open the generator
2. Fill in dataset details (title, description, publisher)
3. Add mobility-specific metadata (data topic, transport mode)
4. Specify access information (distribution format, access URL)
5. Export RDF metadata
6. Integrate into NAP catalog

### 2. Learning mobilityDCAT-AP
Understand what metadata elements are required and optional by exploring the form structure.

### 3. Testing Metadata Configurations
Experiment with different metadata combinations before implementing in production systems.

### 4. Quick Prototyping
Generate sample metadata for proof-of-concept work and demonstrations.

### 5. Documentation and Examples
Create example metadata for specifications, guidelines, and training materials.

### 6. Team Training
Train teams on proper mobility data description practices.

## Standards Supported

- ✅ mobilityDCAT-AP (Mobility Data Catalogue Application Profile)
- ✅ DCAT-AP (Data Catalogue Vocabulary - Application Profile)
- ✅ RDF (Resource Description Framework)
- ✅ W3C DCAT (Data Catalog Vocabulary)

## Target Audience

- **NAP Operators**: Creating metadata catalogues for National Access Points
- **Data Publishers**: Describing mobility datasets for publication
- **Developers**: Implementing mobilityDCAT-AP in platforms
- **Metadata Specialists**: Learning the mobilityDCAT-AP specification
- **Data Portal Administrators**: Managing metadata for portals
- **Consultants**: Advising on mobility data publishing

## How to Use

### Getting Started

1. **Visit the Tool**
   - Go to [mobilitydcat-ap.github.io/mobilitydcatap-ui](https://mobilitydcat-ap.github.io/mobilitydcatap-ui/)

2. **Fill in Dataset Information**
   - Enter basic dataset details (title, description)
   - Specify publisher information
   - Add temporal and spatial coverage

3. **Add Mobility-Specific Metadata**
   - Select data topics (e.g., parking, traffic, public transport)
   - Specify transport modes
   - Choose applicable standards (DATEX II, NeTEx, SIRI)

4. **Define Access Information**
   - Add distribution formats (XML, JSON, API)
   - Provide access URLs
   - Specify license information

5. **Generate RDF**
   - Review your metadata
   - Export as RDF/XML or Turtle format
   - Use in your data catalog

### Deployment Options

**Option 1: Use Hosted Version**
- Simplest option - just visit the URL
- Always up-to-date
- No maintenance required

**Option 2: Self-Host with Docker**
```bash
docker pull [image-name]
docker run -p 8080:8080 [image-name]
```

**Option 3: Integrate into Platform**
- Clone the repository
- Customize for your needs
- Integrate into existing infrastructure

## Technical Architecture

**Framework:**
- Built using Cefriel's rapid-triples tool
- Rapid metadata form generation

**Frontend:**
- Vue.js application
- Responsive design
- Form validation

**Deployment:**
- Static hosting via GitHub Pages
- Can be containerized with Docker
- Self-hosting friendly

**Output Format:**
- RDF (Resource Description Framework)
- Multiple serialization formats (RDF/XML, Turtle)
- Valid mobilityDCAT-AP metadata

## About mobilityDCAT-AP

mobilityDCAT-AP is a metadata specification developed by NAPCORE to enhance cross-border and cross-sectorial discoverability of mobility-related datasets. It extends DCAT-AP (the European standard for data portal metadata) with mobility-specific elements.

### Key Characteristics

- **European Standard Extension**: Builds on DCAT-AP
- **Mobility-Focused**: Specific metadata for mobility data
- **Interoperability**: Enables cross-border data discovery
- **NAPCORE Initiative**: Maintained by Metadata Working Group
- **Current Version**: v1.1.0 (Released January 2025)

### mobilityDCAT-AP Elements

The specification provides precise metadata designations for:
- **Data Topics**: Public transport, parking, traffic, EV charging, etc.
- **Transport Modes**: Bus, tram, metro, rail, ferry, etc.
- **Standards**: DATEX II, NeTEx, SIRI, GTFS, etc.
- **Geographical Coverage**: Precise location and area information
- **Temporal Coverage**: Data collection periods
- **Update Frequency**: How often data is refreshed

## Why This Tool is Important

### 1. Lowers Barriers
Makes metadata creation accessible to non-technical users without RDF knowledge.

### 2. Standardization
Ensures metadata follows the recommended European standard for mobility data.

### 3. Educational Value
Helps users understand mobilityDCAT-AP requirements through hands-on experience.

### 4. NAP Adoption
Supports implementation of mobilityDCAT-AP across National Access Points.

### 5. European Initiative
Part of official NAPCORE recommendations for metadata harmonization.

### 6. Quick Start
Enables data publishers to create compliant metadata immediately.

### 7. Open Approach
Transparent, community-driven tool development.

### 8. Cross-Border Interoperability
Facilitates findability and reusability of mobility data across Europe.

## Related Resources

### mobilityDCAT-AP Resources

- **Specification v1.1.0**: [w3id.org/mobilitydcat-ap](https://w3id.org/mobilitydcat-ap)
- **GitHub Organization**: [mobilityDCAT-AP](https://github.com/mobilityDCAT-AP)
- **Specification Repository**: [mobilityDCAT-AP/mobilityDCAT-AP](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP)
- **Controlled Vocabularies**: [controlled-vocabularies](https://github.com/mobilityDCAT-AP/controlled-vocabularies)

### Publications

**"mobilityDCAT-AP: a Metadata Specification for Enhanced Cross-border Mobility Data Sharing"**
- Published: March 2025
- Available on arXiv: 2503.11535
- Describes methodology and design of mobilityDCAT-AP

### Governance

- **Maintained by**: NAPCORE Metadata Working Group
- **Requirements**: Based on 40 requirements from literature review and stakeholder input
- **Adoption**: Growing adoption across European NAPs
- **Documentation**: Comprehensive specification, wiki, and guidelines

## Implementation Support

### Getting Help

- **GitHub Issues**: [Submit questions and feedback](https://github.com/mobilityDCAT-AP/mobilitydcatap-ui/issues)
- **Wiki**: [FAQs and practical guidelines](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP/wiki)
- **NAPCORE Support**: Direct support for early adopters from Metadata Working Group

### Best Practices

1. **Start with Minimum Profile**: Begin with required elements
2. **Use Controlled Vocabularies**: Follow recommended vocabularies
3. **Test Thoroughly**: Validate generated RDF
4. **Iterate**: Refine metadata based on feedback
5. **Document**: Keep notes on metadata decisions

## Deployment Guide

### For NAP Operators

1. **Evaluate Tool**: Test with sample datasets
2. **Choose Deployment**: Hosted vs. self-hosted
3. **Customize**: Adapt forms if needed
4. **Train Team**: Educate staff on usage
5. **Integrate**: Connect to catalog system
6. **Maintain**: Keep synchronized with spec updates

### For Developers

1. **Clone Repository**: Get source code from GitHub
2. **Review Architecture**: Understand rapid-triples framework
3. **Customize Forms**: Adapt to specific needs
4. **Test Integration**: Ensure compatibility
5. **Deploy**: Choose hosting strategy
6. **Monitor**: Track usage and issues

## Community & Support

- **Developer**: Cefriel
- **Framework**: Built with rapid-triples
- **Maintainer**: NAPCORE Metadata Working Group
- **Community**: mobilityDCAT-AP GitHub organization
- **Support Channels**:
  - GitHub Issues for bug reports
  - NAPCORE forums for general questions
  - Working Group for strategic guidance

## Future Roadmap

Potential enhancements:
- Additional form validation
- More export formats
- Integration with validation tools
- Template library
- Multi-language support

---

## Example Use Case: Publishing Parking Data

**Scenario**: A city wants to publish real-time parking availability data on their NAP.

**Steps:**

1. **Open Generator**: Visit the tool
2. **Dataset Basics**:
   - Title: "Real-time Parking Availability - City Center"
   - Description: "Real-time parking space availability in city center parking facilities"
   - Publisher: City Transportation Department

3. **Mobility Metadata**:
   - Data Topic: Parking
   - Transport Mode: Car
   - Standard: DATEX II
   - Update Frequency: Real-time

4. **Access Info**:
   - Distribution Format: JSON API
   - Access URL: `https://api.city.example/parking`
   - License: CC BY 4.0

5. **Export**: Download RDF metadata
6. **Publish**: Add to NAP catalog

---

*Last updated: October 2025*

*Suggested by: NAPCORE Task 5.2 team*

*Know something we missed? [Suggest an edit](https://github.com/napcore/napcore-web-store/edit/main/docs/categories/metadata/mobilitydcat-generator.md)*
