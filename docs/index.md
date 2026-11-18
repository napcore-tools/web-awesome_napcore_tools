---
layout: home
hero:
  name: Awesome NAPCORE Tools
  text: European Mobility Data Tools Catalogue
  tagline: Discover tools from NAPCORE and the wider community
  image:
    src: /napcore-wheel.webp
    alt: ""
  actions:
    - theme: brand
      text: See Tools by NAPCORE
      link: /by-napcore/
    - theme: alt
      text: Browse All Tools
      link: /all/
    - theme: alt
      text: Submit a Tool
      link: /contribute

features:
  - icon:
      src: /icons/open-access.svg
      alt: Open padlock representing open access
      width: "48"
      height: "48"
    title: Openly Accessible Tools
    details: Only openly accessible tools are included.
    link: /contribute#open-tool-criteria
  - icon:
      light: /napcore-logo.png
      dark: /napcore-logo-dark.png
      alt: NAPCORE logo
      width: "64"
      height: "64"
    title: By NAPCORE
    details: Lists tools built by the NAPCORE project.
    link: /by-napcore/
  - icon:
      src: /icons/community.svg
      alt: Honeycomb representing community collaboration
      width: "48"
      height: "48"
    title: Community Provided
    details: Community provided tools enlisted too.
    link: /contribute

# Cards of the Get Involved section, in the same shape as `features`
involved:
  - icon:
      src: /icons/submit-tool.svg
      alt: Page with a plus sign representing a new tool
      width: "48"
      height: "48"
    title: Submit a Tool
    details: Have a tool that helps with mobility data? Submit it for review by the NAPCORE team.
    link: /contribute
    linkText: Learn how to contribute
  - icon:
      src: /icons/discussion.svg
      alt: Speech bubbles representing a discussion
      width: "48"
      height: "48"
    title: Join the Discussion
    details: Ask questions and share your experience with other mobility data professionals.
    link: https://github.com/napcore-tools/web-awesome_napcore_tools/discussions
    linkText: GitHub Discussions
  - icon:
      src: /icons/blog.svg
      alt: Newspaper representing the blog
      width: "48"
      height: "48"
    title: Read the Blog
    details: News, technical articles and updates from the NAPCORE team.
    link: /blog/
    linkText: Go to the blog
---

<script setup>
import { VPFeatures } from 'vitepress/theme';
</script>

<div class="hp-sections">

<div class="hp-section hp-panel">

<div class="hp-section-header">

<h2>Official NAPCORE Tools</h2>

Tools developed directly by the NAPCORE team

</div>

<HomePageToolsGrid />

<div class="hp-section-cta">

[Browse All Tools](/all/)

</div>

</div>

<div class="hp-section hp-panel hp-panel--slim">
  <StatsBar />
</div>

<div class="hp-section hp-panel">

<div class="hp-section-header">

## Get Involved

</div>

<VPFeatures class="hp-features" :features="$frontmatter.involved" />

</div>

</div>
