---
document: tool
title: mobilityDCAT-AP SHACL Validator
description: Validates mobilityDCAT-AP metadata against the specification's SHACL shapes, built on the ITB SHACL validator
fullDescription: A ready-to-run configuration of the EU Interoperability Test Bed (ITB) SHACL validator that checks RDF metadata against the mobilityDCAT-AP SHACL shapes for versions 1.0.0, 1.0.1, 1.1.0 and 3.0.0.
categories:
  - validators
  - metadata
  - data-quality
status: active
endorsed: false
license: EUPL-1.2
repository: https://github.com/mobilityDCAT-AP/itb-validator-mobilitydcat-ap
website: null
documentation: https://www.itb.ec.europa.eu/docs/guides/latest/validatingRDF/
demo: null
developer: Cefriel
technology: RDF, SHACL, Docker
language: Shell
type: Validator
standards:
  - mobilitydcat-ap
  - dcat-ap
  - rdf
  - shacl
tags:
  - mobilityDCAT-AP
  - SHACL
  - Metadata
  - Validator
  - Docker
lastUpdated: 2026-11-19
---

## Overview

The mobilityDCAT-AP SHACL Validator checks that catalogue metadata conforms to
mobilityDCAT-AP before it is published on a National Access Point or harvested from one.
It validates RDF in Turtle, RDF/XML, N-Triples or JSON-LD against the SHACL shapes of the
specification.

It is a configuration of the [Interoperability Test Bed SHACL validator](/tools/shacl-validator),
the European Commission's generic RDF validator. The generic validator ships without
shapes; this repository adds the mobilityDCAT-AP shapes, validation profiles and
background vocabularies, so it runs without further set-up.

## Supported Versions and Profiles

- v1.0.0 and v1.0.1, each with a default profile.
- v1.1.0 with the profiles `core`, `range`, `full` and `cv`.
- v3.0.0 with the same four profiles, an `_import` variant of each and a `deprecated` profile.

The `core` profile checks the core constraints, `range` adds value ranges, `cv` checks
controlled vocabularies and `full` combines all three. The v3.0.0 `_import` profiles also
load background knowledge: the ontologies of the reused vocabularies, the EU authority
tables and the mobilityDCAT-AP controlled vocabularies. Without it, controlled-vocabulary
checks pass only if the input itself contains the vocabulary triples. The `deprecated`
profile reports the use of properties deprecated in v3.0.0 as warnings.

## Getting Started

Run the validator from its container image:

```bash
docker run -d --name mobilitydcat-validator -p 8080:8080 \
  ghcr.io/mobilitydcat-ap/itb-validator-mobilitydcat-ap:1.0
```

Then open `http://localhost:8080/shacl/mobilitydcat-ap/upload` to validate a file in the
web interface, or call the
[REST API](https://www.itb.ec.europa.eu/docs/guides/latest/validatingRDF/index.html#validation-via-rest-web-service-api)
from your own pipeline. A public online deployment on the Interoperability Test Bed is
planned.

The repository also includes `validate-metadata.sh`, which validates a single file or every
RDF file in a directory through the REST API and saves a report for each. It exits with a
non-zero code when a validation fails, so it fits into a CI job:

```bash
./validate-metadata.sh ./metadata v3.0.0 full_import
```

## Licence

The validator configuration is licensed under EUPL 1.2, like the ITB SHACL validator. The
SHACL shapes it uses come from the
[mobilityDCAT-AP specification](https://github.com/mobilityDCAT-AP/mobilityDCAT-AP) and are
licensed under CC BY 4.0.

## Related Tools

- [Interoperability Test Bed SHACL validator](/tools/shacl-validator), the generic validator this one configures.
- [mobilityDCAT-AP Generator Tool](/tools/mobilitydcat-generator), a form that produces mobilityDCAT-AP metadata to validate.

---

<ToolMetadata />
