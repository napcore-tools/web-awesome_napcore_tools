# DATEX II Schema Generation Tool

<span class="tool-status active">🟢 Active</span>

Web-based wizard for creating custom DATEX II profiles.

## Quick Info

- **Status**: 🟢 Actively Maintained
- **License**: Proprietary (possible future open source)
- **Live Demo**: [webtool.datex2.eu](https://webtool.datex2.eu)
- **Developer**: DATEX II community (datex2.eu)
- **Primary Maintainer**: Jonas Jäderberg (@jonas-jaderberg)

## Overview

The DATEX II Schema Generation Tool is a web-based wizard that helps you create custom DATEX II profiles by selecting only the elements you need from the full model. Instead of working with the complete DATEX II specification, you can generate a tailored subset for your specific use case.

## Key Features

- **Profile Selection**: Choose specific DATEX II elements, profiles, and constraints
- **Multiple Format Export**: Generate XML Schema, JSON Schema, or ASN.1 schemas
- **Model Import**: Import your own XMI files or use standard DATEX II models
- **Wizard Interface**: Step-by-step guidance through profile creation
- **Simplification**: Focus on only what you need from the comprehensive DATEX II model

## How to Use

1. Visit [webtool.datex2.eu](https://webtool.datex2.eu)
2. Click **[Wizard]** to start the profile creation process
3. Select a DATEX II model (or import your own XMI file)
4. Choose which elements, profiles, and constraints you want
5. Export your custom schema in your preferred format (XML Schema, JSON Schema, or ASN.1)

## Why It's Useful

The full DATEX II model is comprehensive but can be overwhelming for specific implementations. This tool helps you:

- **Reduce Complexity**: Work with only the parts of DATEX II you actually need
- **Simplify Implementation**: Smaller schemas are easier to implement and maintain
- **Focus Development**: Clear scope helps teams focus on relevant functionality
- **Generate Documentation**: Custom schemas serve as implementation documentation
- **Ensure Compliance**: Generated schemas maintain DATEX II standard compliance

## Use Cases

### 1. Traffic Information Services
Create a profile with only traffic events and situations for a traffic information app.

### 2. Parking Data Exchange
Generate a schema focused on parking-related DATEX II elements.

### 3. Road Weather Information
Select weather-related elements for road weather services.

### 4. Variable Message Signs
Create a profile for VMS control and status information.

## Standards Supported

- ✅ DATEX II (multiple versions)
- ✅ XML Schema output
- ✅ JSON Schema output
- ✅ ASN.1 output

## Target Audience

- DATEX II implementers
- Traffic management system developers
- NAP operators
- Data publishers working with DATEX II
- System integrators
- Technical consultants

## Technical Details

**Input Formats:**
- DATEX II UML model (XMI)
- Standard DATEX II model versions

**Output Formats:**
- XML Schema Definition (XSD)
- JSON Schema
- ASN.1 schema definitions

**Architecture:**
- Web-based application
- No installation required
- Browser-based wizard interface

## Source Code

Currently not publicly available. There are discussions about potential open source release in the future.

## Related Tools

This tool works well with:
- [DATEX II Browser](/categories/development-tools/datex-browser) - Reference documentation while creating profiles
- DATEX II Validators - Validate data against your custom profiles
- XML/JSON editors - Edit generated schemas if needed

## Community & Support

- **Developer**: Jonas Jäderberg (@jonas-jaderberg)
- **Organization**: DATEX II community via datex2.eu
- **Support**: Through DATEX II community channels

## Future Roadmap

Potential future enhancements:
- Open source release
- Additional export formats
- Profile sharing and reuse
- Integration with validation tools

---

## Additional Resources

- **DATEX II Homepage**: [datex2.eu](https://datex2.eu)
- **DATEX II Specifications**: Available on datex2.eu
- **User Forum**: DATEX II User Forum discussions

---

*Last updated: October 2025*

*Know something we missed? [Suggest an edit](https://github.com/napcore/napcore-web-store/edit/main/docs/categories/converters/datex-schema-tool.md)*
