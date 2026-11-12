<script setup>
import { withBase } from 'vitepress';
</script>

# About Awesome NAPCORE Tools

Awesome NAPCORE Tools is a [NAPCORE](https://napcore.eu)-led catalogue of tools for the European mobility data ecosystem. It helps developers, data publishers, NAP operators and National Bodies find the right tool for working with standards such as DATEX II, NeTEx, SIRI and mobilityDCAT-AP.

## Why This Catalogue Exists

Tools for European mobility data are scattered across websites, repositories and organisations, so finding the right one for a task takes time. The catalogue brings them together in one place, described in the same way, sorted by [category](/categories/) and [standard](/standards/), and reviewed by the NAPCORE team.

## Project Background

The catalogue was created in NAPCORE Task 5.2 as a shared toolbox for National Access Points and National Bodies, one step towards a harmonised data ecosystem.

NAPCORE (National Access Point Coordination Organisation for Europe) is the coordination mechanism through which National Access Points share experience, best practices and expertise. It is co-financed by a Programme Support Action under the European Commission's Connecting Europe Facility. It involves 33 beneficiaries, covering 26 EU Member States and 3 associated partners, and over 30 mobility data platforms. Learn more at [napcore.eu](https://napcore.eu).

## Governance

The NAPCORE Task 5.2 team builds and maintains the catalogue, with contributions from the wider NAPCORE community. The team reviews every tool suggestion in public, in GitHub Discussions. See the [Contribution Guide](/contribute) for the process and the [inclusion criteria](/contribute#open-tool-criteria).

## Statistics

<StatsBar />

## Machine-Readable Export

The whole catalogue is also published as an [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/README.md) bundle (Open Knowledge Format v0.2), regenerated every time the site is built:

- [Download the bundle](/napcore-tools-okf.zip) as a single zip
- Or read the files one by one, as plain Markdown, starting from <a :href="withBase('/okf/index.md')" target="_self">the bundle index</a>

Every tool, standard and category is one Markdown file, with its fields in YAML frontmatter and links to the entries it relates to. People and AI agents read the same file.

For AI assistants the site also publishes [llms.txt](/llms.txt), an index that links to a Markdown copy of every page, and [llms-full.txt](/llms-full.txt), all pages in one file.

## Keyboard Shortcuts {#keyboard-shortcuts}

Press **`g`** followed by a second key to move between pages:

| Shortcut          | Action                                                     |
| ----------------- | ---------------------------------------------------------- |
| `g` `h`           | Go to Home                                                 |
| `g` `t`           | Go to All Tools                                            |
| `g` `n`           | Go to Tools by NAPCORE                                     |
| `g` `s`           | Go to Standards                                            |
| `g` `c`           | Go to Categories                                           |
| `g` `a`           | Go to About                                                |
| `?`               | Go to keyboard shortcuts                                   |
| `Ctrl` `K` or `/` | Open site-wide search                                      |
| `Escape`          | Clear the filter search box (press again to release focus) |

## Roadmap

- Short term: wider tool coverage, better search and filtering, tool comparison.
- Medium term: user ratings and reviews, usage statistics, integration guides, an API.
- Long term: a tool certification programme, testing infrastructure, automated tool discovery, more standards.

## Get Involved

Suggest a tool, fix a page or share an idea: see [Contribute](/contribute). News is on the [blog](/blog/) and its <a :href="withBase('/feed.rss')" target="_blank">RSS feed</a>.

- [GitHub Discussions](https://github.com/napcore-tools/web-awesome_napcore_tools/discussions) for questions, ideas and tool suggestions
- [GitHub repository](https://github.com/napcore-tools/web-awesome_napcore_tools) for the source of this site, built with VitePress and hosted on GitHub Pages

The catalogue content is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and the code of the site under the MIT licence. The listed tools keep their own licences.

## Acknowledgements

The catalogue is made possible by the NAPCORE partners and participating Member States, the developers who build and maintain the tools, the contributors who suggest tools and improvements, and the European Commission through the Connecting Europe Facility.

---

<div style="text-align: center; padding: 2rem 0; color: var(--vp-c-text-2);">
  <p><strong>NAPCORE</strong> - National Access Point Coordination Organisation for Europe</p>
  <p style="font-size: 0.9rem; margin-top: 0.5rem;">Co-financed by the Connecting Europe Facility of the European Union</p>
</div>
