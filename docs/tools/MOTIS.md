---
document: tool
title: MOTIS
description: Scalable high-performance intermodal travel information system with batteries included
fullDescription: Scalable high-performance intermodal travel information system / journey planner with "batteries included" - geocoding, map tiles, departure boards, and more.
categories:
  - route-planners
status: active
license: MIT
repository: https://github.com/motis-project/motis
website: https://transitous.org/
documentation: null
demo: null
developer: MOTIS Project
standards:
  - netex
  - siri
  - gtfs
  - gbfs
  - osm
tags:
  - Journey Planner
  - Router
  - Intermodal
  - Real-time
  - Geocoding
  - GTFS-RT
lastUpdated: 2025-10-22
---

## Overview

MOTIS is a comprehensive intermodal travel information system and journey planner designed for scalability and high performance. Unlike many routing engines that require external services, MOTIS comes with "batteries included" - providing geocoding, map tiles, departure boards, and many other functionalities out of the box.

The system can serve multiple purposes beyond routing: it functions as a real-time data quality monitoring tool (metrics), a conversion utility (SIRI to GTFS-RT), and a modular platform where features can be enabled or disabled based on specific needs, allowing for specialized low-resource configurations.

## Key Features

- **Intermodal routing**: Seamless journey planning across multiple transport modes
- **Built-in geocoding**: No need for external geocoding services
- **Map tile serving**: Integrated map rendering capabilities
- **Departure boards**: Real-time departure information displays
- **Real-time monitoring**: Quality metrics for real-time data feeds
- **Format conversion**: SIRI to GTFS-RT transformation
- **Modular architecture**: Enable/disable features as needed for optimized resource usage
- **High performance**: Designed for scalability and speed
- **Specialized configurations**: Distribute tailored setups with minimal overhead

## Use Cases

1. **Journey planning applications** requiring intermodal routing capabilities
2. **Real-time data quality monitoring** for transport operators
3. **Format conversion** from SIRI to GTFS-RT for data standardization
4. **Low-resource deployments** with customized feature sets
5. **Community routing services** like Transitous
6. **Development and testing** of mobility applications

## Available Standards

<div class="standards-list">
  <span class="standard-badge supported">NeTEx</span>
  <span class="standard-badge supported">SIRI</span>
  <span class="standard-badge supported">GTFS</span>
  <span class="standard-badge supported">GBFS</span>
  <span class="standard-badge supported">OpenStreetMap (OSM)</span>
</div>

## Target Audience

- Journey planning application developers
- Transport operators and authorities
- Mobility data platform providers
- Real-time data quality analysts
- Open source mobility communities
- System integrators building NAP solutions

## Technical Architecture

- **Core**: High-performance routing engine with modular design
- **Data formats**: NeTEx, SIRI, GTFS, GBFS, OSM
- **Capabilities**:
  - Routing and journey planning
  - Geocoding services
  - Map tile generation
  - Real-time data processing
  - Format conversion (SIRI → GTFS-RT)
- **Deployment**: Configurable modules for resource-optimized setups
- **Architecture**: Scalable multi-modal routing with optional services

## Source Code

The tool is open source and available on GitHub:

- **MOTIS**: [github.com/motis-project/motis](https://github.com/motis-project/motis)
- **Transitous Platform**: [transitous.org](https://transitous.org/)

## Transitous: Community-Powered Global Routing

**Transitous** is an open data community initiative that crowd-sources a global mobility data catalog. This community-maintained catalog feeds into a hosted MOTIS router instance, making it available for FOSS (Free and Open Source Software) client applications worldwide.

This collaboration demonstrates MOTIS's real-world capability to power large-scale, community-driven mobility services.

## Why This Tool Matters

MOTIS addresses key challenges in the European and global mobility ecosystem:

1. **Complete solution**: "Batteries included" approach eliminates dependency on multiple external services
2. **Flexibility**: Modular architecture allows tailored deployments for different use cases
3. **Performance**: Built for high-performance, scalable routing
4. **Open source**: MIT license enables wide adoption and community contributions
5. **Multi-standard support**: Works with major European (NeTEx, SIRI) and global (GTFS) standards
6. **Real-world proven**: Powers production services like Transitous and MOBIDROM
7. **Quality monitoring**: Built-in metrics for real-time data quality assessment
8. **Format bridge**: Converts between SIRI and GTFS-RT, facilitating interoperability

## Related Tools

MOTIS complements other mobility tools in the ecosystem:

- Real-time validators for SIRI and GTFS-RT feeds
- NeTEx converters and validators
- Other journey planning engines and routing services

::: tip Developer Note
MOTIS's modular architecture is particularly valuable - you can deploy only the components you need (e.g., just the converter functionality or just the routing engine), making it suitable for both full-featured applications and specialized microservices.
:::

## Getting Started

1. Visit the [MOTIS GitHub repository](https://github.com/motis-project/motis)
2. Review documentation and deployment options
3. Configure modules based on your requirements
4. Deploy as a complete solution or specialized service
5. Try the live Transitous instance at [transitous.org](https://transitous.org/)

## Real-World Deployments

- **Transitous**: Global community routing platform
- **MOBIDROM**: Production mobility platform

## Support & Community

- **Source Code & Issues**: [GitHub Repository](https://github.com/motis-project/motis)
- **Transitous Community**: [transitous.org](https://transitous.org/)

---

<div style="background: var(--vp-c-bg-soft); padding: 1.5rem; border-radius: 8px; margin-top: 2rem;">
  <p style="margin: 0;"><strong>Tool Metadata</strong></p>
  <ul style="margin: 0.5rem 0 0 0; padding-left: 1.5rem;">
    <li><strong>Category</strong>: Routing, Converters, Reference Implementation</li>
    <li><strong>Standards</strong>: NeTEx, SIRI, GTFS, GBFS, OSM</li>
    <li><strong>Tool Types</strong>: Converter/Transformer, Reference Implementation, Routing Engine, Geocoder</li>
    <li><strong>License</strong>: MIT</li>
    <li><strong>Maintenance</strong>: Actively maintained</li>
  </ul>
</div>
