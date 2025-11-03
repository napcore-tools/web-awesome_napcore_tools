---
document: tool
title: DATEX II (example 1)
description: Platform Independent data model for the exchange of traffic and travel information (TTI) for Intelligent Transport Systems (ITS).
fullDescription: DATEX II is a robust, platform-independent data model and exchange standard used primarily in Europe for the real-time sharing of traffic and travel information (TTI) between traffic management centers, service providers, and end-users.
categories:
  - references
status: active
license: Open Standard
liveDemo: https://docs.datex2.eu/
sourceCode: https://docs.datex2.eu/downloads/
developer: DATEX II Project
standards:
  - datex-ii
tags:
  - Data Model
  - Documentation
  - ITS
  - Road Traffic Data
  - Data Exchange
  - Mobility
lastUpdated: 2025-10-22
---

## Overview

DATEX II is the essential data exchange standard for Intelligent Transport Systems (ITS), mandated by the European Commission for the exchange of road traffic data. It provides a formal, platform-independent data model (based on UML) that can be implemented using standard formats like XML Schema and JSON.

The goal of DATEX II is to achieve semantic interoperability—ensuring that systems exchanging data understand the meaning of the information being transferred, regardless of the underlying technical infrastructure.

## Key Data Domains

The standard is highly comprehensive, covering a wide array of traffic and travel information types:

- **Road Traffic Data**: Traffic volume, speed, travel times, location and length of traffic queues.
- **Situations**: Accidents, incidents, roadworks, temporary traffic management measures, weather conditions affecting the road.
- **Traffic Regulation**: Speed limits, road closures, lane closures, variable road user charges.
- **VMS (Variable Message Signs)**: Information and status of VMS.
- **Parking & Fuel**: Availability of parking places and service areas, location of alternative fuel and charging points.

## Location Referencing

A key strength of DATEX II is its support for various location referencing methods to precisely define the position of traffic events and data:

- **Alert-C**: A simple, established coding system.
- **TPEG-Loc**: The standardised location referencing method for TPEG (Transport Protocol Experts Group).
- **OpenLR**: Open source dynamic location referencing standard.
- **Linear Referencing**: Referencing relative to a known point along a road link.
- **Point Coordinates**: Standard latitude/longitude coordinates (GML).

## Technical Architecture

- **Core Model**: A single, comprehensive Platform Independent Model (PIM) defined in UML.
- **Exchange Mechanisms**: Supports the exchange of data as `PayloadPublication` messages.
- **Profiles**: The standard is modular, utilizing **Recommended Reference Profiles** (e.g., RTTI, SRTI, MMTIS) to define subsets of the full model required for specific use cases, simplifying implementation.
- **Implementation**: The model is provided via XML Schemas and supports the emerging use of **JSON** for light-weight data exchange.

## Target Audience

- **Road and Traffic Authorities/Operators**: For sharing real-time data within and across national borders.
- **ITS Application Developers**: Creating services like navigation, journey planning, and dynamic information display.
- **Mobility Data Platform Providers**: Building National Access Points (NAPs) for TTI data.
- **System Integrators**: Implementing data exchange solutions for Intelligent Transport Systems.

## Why This Standard Matters

1.  **Interoperability**: It is the foundation for seamless TTI data exchange across Europe, facilitating the creation of pan-European services.
2.  **Mandated Compliance**: Adherence to DATEX II is often a regulatory requirement for public bodies sharing TTI data within the EU.
3.  **Comprehensive Coverage**: Covers nearly every aspect of road-related mobility data, from accidents to charging station availability.
4.  **Flexibility**: The use of Profiles (like RTTI and MMTIS) ensures implementations are tailored and efficient for specific deployment scenarios.

## Getting Started

1.  Visit the [DATEX II Documentation Portal](https://docs.datex2.eu/).
2.  Navigate to the **Levels** section to find tailored information for **Basics**, **Using**, **Mastering**, and **Expert** users.
3.  Review the **Recommended Reference Profiles** to understand the specific data sets required for standard use cases (e.g., RTTI).
4.  Download the necessary XML schemas or JSON specifications from the [Downloads section](https://docs.datex2.eu/downloads/).

---

<div style="background: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
  <p style="margin: 0;"><strong>Standard Metadata</strong></p>
  <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
    <li><strong>Category</strong>: Data Standard, Reference Implementation</li>
    <li><strong>Data Model</strong>: Platform Independent Model (UML)</li>
    <li><strong>Key Profiles</strong>: RTTI, SRTI, MMTIS</li>
    <li><strong>Supported Formats</strong>: XML Schema, JSON</li>
    <li><strong>Maintenance</strong>: Actively maintained</li>
  </ul>
</div>