---
document: tool
title: NPlan
description: Open-source editor and backend system for creating and maintaining demand-responsive transport (DRT), flexible transport services, and timetable-based route planning
fullDescription: NPlan is an open-source editor and backend system designed for small and medium-sized public transport operators and authorities to create and maintain demand-responsive transport (DRT), flexible transport services, and timetable-based route planning. It consists of the Enki web editor (frontend) and the Uttu backend services, forming a complete toolchain for planning, editing, and exporting transport data in NeTEx format.
categories:
  - reference-implementations
status: active
endorsed: false
license: EUPL-1.2
repository: https://github.com/entur/Transportdata-open-source-intro#nplan
website: null
documentation: null
demo: null
developer: Entur (Norway) & Fintraffic (Finland)
technology: Java, TypeScript
language: Java, TypeScript
type: Editor
standards:
  - netex
tags:
  - NeTEx
  - DRT
  - Editor
  - Planning Tool
  - Public Transport
  - Flexible Services
lastUpdated: 2025-01-16
---

## Overview

NPlan is an open-source editor and backend system for creating and maintaining demand-responsive transport (DRT), flexible transport services, and timetable-based route planning. Designed primarily for small and medium-sized public transport operators and authorities, NPlan fills an important gap between complex enterprise planning systems and manual data preparation.

The system consists of two main components:

- **Enki**: Web-based editor (frontend) for planning and editing transport services
- **Uttu**: Backend services for data management and NeTEx export

Together, they form a complete toolchain for planning, editing, and exporting transport data in standard-compliant formats.

## Key Features

- **Flexible service planning**: Support for demand-responsive transport, booking-based services, and scheduled routes
- **NeTEx export**: Native support for exporting data in NeTEx format with Nordic profile compliance
- **User-friendly interface**: Web-based editor designed for non-technical transport planners
- **Small-scale optimization**: Tailored for operators managing up to 30 flexible or scheduled lines
- **Complete workflow**: Integrated planning, editing, and export in a single system
- **Open source**: Community-driven development with contributions from multiple countries
- **Production-proven**: Active use across multiple Nordic countries with real-world validation

## Use Cases

1. **Demand-responsive transport planning**: Design and maintain DRT services that adapt to passenger demand
2. **Flexible service management**: Plan booking-based and on-demand transport services
3. **Small route network planning**: Manage scheduled services for small and medium-sized operators
4. **Data standardization**: Ensure transport data meets NeTEx requirements for National Access Points
5. **Gap filling**: Bridge the gap between manual planning and enterprise-scale systems
6. **Nordic profile compliance**: Create NeTEx data conforming to Nordic profile specifications

## Target Audience

- Small and medium-sized public transport operators
- Regional transport authorities managing flexible services
- Demand-responsive transport service providers
- National Access Points requiring NeTEx-compliant data from smaller operators
- Transport planners working with flexible and on-demand services
- Organizations transitioning from manual planning to standardized data formats

## Technical Details

### Technology Stack

- **Frontend (Enki)**: TypeScript-based web editor
- **Backend (Uttu)**: Java-based backend services
- **Data Format**: NeTEx XML with Nordic profile support
- **Deployment**: Can be self-hosted by organizations

### System Architecture

NPlan consists of two integrated components:

1. **Enki (Frontend)**: Provides the user interface for transport planners to design routes, define service patterns, set operating hours, and configure flexible service parameters

2. **Uttu (Backend)**: Handles data persistence, validation, and export functionality, ensuring data consistency and NeTEx compliance

### Supported Service Types

- Demand-responsive transport (DRT)
- Booking-based services
- Flexible routes with conditional stops
- Traditional scheduled services
- Mixed service patterns

## Production Deployment

NPlan is actively used in production environments across the Nordic region:

- **Norway**: 10–15 operators currently using the system
- **Finland**: Approximately 20 operators managing flexible services
- **Typical scale**: Operators manage up to 30 flexible or scheduled lines per deployment
- **Joint development**: Maintained collaboratively by Entur (Norway) and Fintraffic (Finland)

## Why This Tool Matters

### Accessibility for Smaller Operators

NPlan makes standardized transport data creation accessible to operators who cannot justify the cost and complexity of enterprise planning systems.

### Standards Compliance Made Easy

The tool handles NeTEx complexity behind a user-friendly interface, enabling operators to publish high-quality, standard-compliant data without deep technical expertise.

### Filling a Critical Gap

Many flexible and DRT services across Europe lack proper digital representation due to tool limitations. NPlan addresses this gap, enabling better integration into multi-modal journey planning and National Access Points.

### Open Governance Model

As an open-source project with multi-country governance, NPlan benefits from shared development costs, diverse use cases, and community-driven improvements.

### Nordic Profile Leadership

Norway and Finland have pioneered NeTEx implementation for flexible services. NPlan embodies this expertise, providing a reference implementation for other countries.

## Community & Contributions

NPlan is developed under an open governance model:

- **Joint maintenance**: Entur (Norway) and Fintraffic (Finland)
- **Open participation**: Additional organizations welcome to contribute
- **Community-driven**: Issues, features, and improvements guided by real-world operator needs
- **Shared costs**: Development burden distributed across participating countries

::: info Open for Collaboration
Organizations interested in contributing to NPlan development or adopting the system are encouraged to engage with the project maintainers through GitHub.
:::

## Getting Started

### Component Repositories

- **Enki (Frontend)**: [github.com/entur/enki](https://github.com/entur/enki)
- **Uttu (Backend)**: [github.com/entur/uttu](https://github.com/entur/uttu)
- **Overview**: [Entur Transport Data Open Source Intro](https://github.com/entur/Transportdata-open-source-intro#nplan)

### Prerequisites

- Java runtime environment (for Uttu backend)
- Modern web browser (for Enki frontend)
- Understanding of public transport planning concepts
- Familiarity with NeTEx concepts (helpful but not required)

### Typical Deployment

1. Deploy Uttu backend services in your infrastructure
2. Configure Enki frontend to connect to Uttu
3. Set up user authentication and access controls
4. Train transport planners on the editor interface
5. Begin planning flexible services and export NeTEx data

## Related Tools

NPlan complements other mobility data tools in the ecosystem:

- **NeTEx validators**: For validating exported NeTEx data
- **Journey planning systems**: Consuming NPlan's NeTEx output
- **National Access Point platforms**: Publishing data generated by NPlan

## Support

- **Source Code**:
  - [Enki Frontend](https://github.com/entur/enki)
  - [Uttu Backend](https://github.com/entur/uttu)
- **Project Overview**: [Transportdata Open Source Intro](https://github.com/entur/Transportdata-open-source-intro#nplan)
- **Issues**: Report issues in the respective GitHub repositories

---

<ToolMetadata />
