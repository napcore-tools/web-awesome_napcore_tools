# publiccode.yml

Reference standard: [publiccode.yml Standard v0.5.0](https://yml.publiccode.tools/)
Examples: https://yml.publiccode.tools/example.html#

---

## Architecture

Three independent layers:

```
docs/data/publiccode-registry.yaml      ← slug → upstream URL + NAPCORE overrides
docs/data/publiccode/<slug>/
  publiccode.yml                        ← local cache, what builds actually read
scripts/sync-publiccode.mjs             ← fetches registry URLs, writes local files
```

### Why this layout?

- **Central registry** — one file to edit when adding or updating a tool. No `.md` file required.
- **Directory per tool** — the file is always named `publiccode.yml` (matching the standard). The directory is a natural envelope for future per-tool NAPCORE overrides (`napcore.yaml` alongside, if needed).
- **Local cache** — builds never hit the network. Reproducible, fast, offline-safe.
- **GitHub URL resolution** — supply a GitHub repository URL; the sync script resolves it to the raw file automatically.

---

## Adding a tool

1. Add an entry to `docs/data/publiccode-registry.yaml`:

   ```yaml
   my-tool:
     source: https://github.com/SomeOrg/my-tool
   ```

   GitHub repository URLs are resolved automatically. Direct raw URLs also work:

   ```yaml
   my-tool:
     source: https://example.org/path/to/publiccode.yml
   ```

2. Run the sync script:

   ```bash
   npm run sync:publiccode             # all entries
   npm run sync:publiccode -- my-tool  # one entry (note the -- separator)
   ```

   This creates `docs/data/publiccode/my-tool/publiccode.yml`.

3. Commit both the registry change and the cached file:

   ```
   docs/data/publiccode-registry.yaml
   docs/data/publiccode/my-tool/publiccode.yml
   ```

That's it — no `.md` file needed. The tool appears in the catalogue grid and gets an auto-generated page at `/tools/my-tool`.

To add a full hand-crafted page later, create `docs/tools/my-tool.md`. It takes precedence automatically and the auto-generated page disappears.

---

## Updating cached files

Re-run the sync script at any time to pull the latest upstream versions:

```bash
npm run sync:publiccode             # update all
npm run sync:publiccode -- my-tool  # update one (note the -- separator)
```

Commit the updated `publiccode.yml` files. Builds always read from the local cache.

---

## Build-time merge

When `tools.data.ts` processes a `.md` tool that has a matching `<slug>/publiccode.yml`, it automatically merges the cached file. **Frontmatter always wins** — publiccode data only fills fields that are `null` or absent:

| publiccode.yml field              | Fills our field                |
| --------------------------------- | ------------------------------ |
| `name`                            | `title` (fallback only)        |
| `description.en.shortDescription` | `description`                  |
| `url`                             | `repository`                   |
| `landingURL`                      | `website`                      |
| `description.en.documentation`    | `documentation`                |
| `legal.license`                   | `license`                      |
| `legal.mainCopyrightOwner`        | `developer`                    |
| `maintenance.contacts[0].name`    | `maintainedBy`                 |
| `releaseDate`                     | `firstRelease`                 |
| `tags`                            | `tags` (if our tags are empty) |

All remaining fields can be set via registry overrides or a hand-crafted `.md` page. See the Registry overrides section below.

---

## Registry overrides

Fields that publiccode.yml cannot express can be set under the `napcore-tools:` key in `publiccode-registry.yaml`. These values take precedence over anything derived from the publiccode.yml file.

```yaml
shacl-validator:
  source: https://github.com/ISAITB/shacl-validator
  napcore-tools:
    categories:
      - validators
    standards:
      - shacl
    status: active
    endorsed: false
```

| Override field    | Type              | Purpose                                                                 |
| ----------------- | ----------------- | ----------------------------------------------------------------------- |
| `categories`      | `string[]`        | NAPCORE catalogue categories (slugs)                                    |
| `standards`       | `string[]`        | Mobility data standards supported (slugs)                               |
| `status`          | `string`          | Override the auto-mapped status (`active`, `maintenance`, `deprecated`) |
| `endorsed`        | `boolean`         | Mark as a NAPCORE-endorsed tool                                         |
| `technology`      | `string`          | Technology stack description                                            |
| `language`        | `string`          | Primary programming language                                            |
| `type`            | `string/string[]` | Tool type(s) (e.g. `CLI Tool`, `Web Application`)                       |
| `demo`            | `string`          | URL to a live demo                                                      |
| `mainContributor` | `string`          | Name of the main contributor                                            |
| `lastUpdated`     | `string`          | Date of last known update (`YYYY-MM-DD`)                                |

Registry overrides apply to publiccode-only tools. For hybrid tools (with a `.md` page), frontmatter remains the override mechanism.

---

## Field mapping notes

**Categories** — publiccode.yml uses a fixed vocabulary for public administration software (`financial-reporting`, `hr`, `it-development`, …), incompatible with our ITS/mobility taxonomy. Use registry overrides or a hand-crafted `.md` page to assign categories.

**`developmentStatus`** — partially mapped: `obsolete` → `deprecated`, everything else → `active`. Use the `status` registry override or a hand-crafted `.md` page for finer-grained control.

**`standards`, `endorsed`** — no equivalent in publiccode.yml. Set via registry overrides or a hand-crafted `.md` page.
