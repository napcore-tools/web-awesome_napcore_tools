<script setup>
import { withBase } from 'vitepress';
</script>

# Data & AI

The whole catalogue is published in machine-readable forms, rebuilt every time the site is built. Use them to give the catalogue to an AI assistant, a knowledge base or your own scripts.

## Which File to Use {#formats}

Pick the form that suits your tool:

| You use                                  | Give it                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------- |
| A chat assistant that can open web links | the link to [llms.txt](/llms.txt), the catalogue index with links to every page    |
| A chat assistant without web access      | [llms-full.txt](/llms-full.txt), downloaded and uploaded as a file                 |
| An AI agent that browses                 | [llms.txt](/llms.txt), an index that links to a Markdown copy of every page        |
| A knowledge base or an agent of your own | the [OKF bundle](/napcore-tools-okf.zip), one file per tool, standard and category |

## OKF Bundle {#okf}

The catalogue is also published as an [OKF](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/README.md) bundle (Open Knowledge Format v0.2):

- [Download the bundle](/napcore-tools-okf.zip) as a single zip
- Or read the files one by one, as plain Markdown, starting from <a :href="withBase('/okf/index.md')" target="_self">the bundle index</a>

Every tool, standard and category is one Markdown file, with its fields in YAML frontmatter and links to the entries it relates to. People and AI agents read the same file.

## Example Prompts {#prompts}

For a chat assistant:

- Read https://awesome.napcore.eu/llms.txt. Which open-source tools validate NeTEx files, and under which licences?
- Using https://awesome.napcore.eu/llms.txt, which tools work with DATEX II, and what does each one do?
- We run a National Access Point publishing GTFS and NeTEx. Based on https://awesome.napcore.eu/llms.txt, which tools could check our data before we publish it?
- Using https://awesome.napcore.eu/llms.txt, list the tools made by NAPCORE, one sentence each.
- Here is my project: _repository URL_. Following https://awesome.napcore.eu/contribute.md, draft a catalogue entry for it.

For agents that can run code or follow links, the OKF bundle gives exact fields to filter on and links between tools, standards and categories:

- Download https://awesome.napcore.eu/napcore-tools-okf.zip and unpack it. From the frontmatter of the files in `tools/`, make a table of every actively maintained tool that supports NeTEx, with its licence and repository.
- Start at https://awesome.napcore.eu/okf/index.md and follow its links. Which standards are related to NeTEx, and which tools support each of them?

The files are rebuilt with every site update. Check the tool's own page before you rely on an answer.
