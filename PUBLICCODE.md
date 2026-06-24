# Adding tools via publiccode.yml

This guide explains how to add a tool to the catalogue through the **publiccode.yml
registry**, with no Markdown file required. It is aimed at contributors comfortable with
basic Git/GitHub (fork, branch, commit, pull request).

Reference standard: [publiccode.yml Standard v0.5.0](https://yml.publiccode.tools/) ·
[examples](https://yml.publiccode.tools/example.html)

> **Two ways to add a tool.** A tool can be added either through the registry described
> here (best when the upstream project already ships a `publiccode.yml`), or as a
> hand-crafted `docs/tools/<slug>.md` page. A `.md` page always takes precedence: if
> `docs/tools/<slug>.md` exists, the registry entry for that slug is ignored entirely and
> the two are never merged. The hand-crafted route is documented in [TOOLS.md](TOOLS.md).

---

## Architecture

Two files matter:

```
docs/data/publiccode-registry.yaml
    The registry. Each entry maps a slug to its upstream source URL and any
    NAPCORE catalogue fields.

docs/data/publiccode/<slug>/publiccode.yml
    A cached copy of the tool's upstream publiccode.yml. The build reads only
    these local files, never the network.
```

The registry is the file you edit. The cached copy is generated for you (locally with the
sync script, or by a GitHub workflow) and committed alongside it.

---

## Slugs

Every tool has a **slug**: a short, lowercase, hyphenated identifier (e.g. `shacl-validator`,
`open-trip-planner`). The slug is the tool's unique key in the registry, names its cache
directory (`docs/data/publiccode/<slug>/`), and becomes part of its page URL
(`/tools/<slug>`). Choose it once; changing it later changes the tool's URL.

---

## Adding a tool

1. **Add an entry** to `docs/data/publiccode-registry.yaml`, keyed by the slug:

   ```yaml
   my-tool:
     source: https://github.com/SomeOrg/my-tool
   ```

   GitHub repository URLs are resolved to the raw `publiccode.yml` automatically (it tries
   the `main` branch first, then `master`). A direct raw URL also works:

   ```yaml
   my-tool:
     source: https://example.org/path/to/publiccode.yml
   ```

2. **Add the NAPCORE catalogue fields** the standard cannot express, at minimum
   `categories` (see [Categories and standards](#categories-and-standards)):

   ```yaml
   my-tool:
     source: https://github.com/SomeOrg/my-tool
     napcore-tools:
       categories:
         - validators
       standards:
         - datex-ii
   ```

3. **Run the sync script** to fetch and cache the upstream file:

   ```bash
   npm run sync:publiccode              # all entries
   npm run sync:publiccode -- my-tool   # one entry (note the -- separator)
   ```

   This creates `docs/data/publiccode/my-tool/publiccode.yml`. The script refuses to cache
   an empty response or anything that is not valid YAML, so a broken upstream never
   overwrites a good cache.

4. **Commit both files**, the registry change and the cached file:

   ```
   docs/data/publiccode-registry.yaml
   docs/data/publiccode/my-tool/publiccode.yml
   ```

That's it. The tool appears in the catalogue grid and gets an auto-generated page at
`/tools/my-tool`. To replace that with a full hand-crafted page later, create
`docs/tools/my-tool.md`; it takes precedence and the auto-generated page disappears.

---

## Categories and standards

`categories` and `standards` use NAPCORE catalogue **slugs**, not free text. The
authoritative lists live in:

- **Categories**: [`docs/data/categories.yaml`](docs/data/categories.yaml)
- **Standards**: [`docs/data/standards.yaml`](docs/data/standards.yaml)

Use the top-level YAML key of each entry as the slug (e.g. `validators`, `route-planners`;
`datex-ii`, `netex`, `gtfs`). At least one category is expected; standards are optional.

These values are **validated at build time**. An unknown category, standard, or status
slug, in either a `napcore-tools` block or a `.md` page, is reported by the build, so a typo
will not slip through. Run `npm run build` (or let CI do it) to check.

---

## NAPCORE catalogue fields (`napcore-tools`)

Fields that `publiccode.yml` cannot express are set under the `napcore-tools:` key. These
values take precedence over anything derived from the `publiccode.yml` file.

```yaml
shacl-validator:
  source: https://github.com/ISAITB/shacl-validator
  napcore-tools:
    categories:
      - validators
      - data-quality
    standards:
      - mobilitydcat-ap
      - dcat-ap
      - rdf
    endorsed: false
```

The `napcore-tools` block applies to registry (publiccode-only) tools. For tools with a
hand-crafted `.md` page, set these fields in the page frontmatter instead.

---

## publiccode.yml → catalogue field mapping

When a tool is built **from the registry** (no `.md` page), these `publiccode.yml` fields
populate the catalogue. Values set in `napcore-tools` take precedence over the mapped
values below.

| publiccode.yml field              | Catalogue field                            |
| --------------------------------- | ------------------------------------------ |
| `name`                            | `title` (falls back to the slug)           |
| `description.en.shortDescription` | `description`                              |
| `description.en.longDescription`  | `longDescription`                          |
| `description.en.documentation`    | `documentation`                            |
| `description.en.features`         | `features`                                 |
| `url`                             | `repository`                               |
| `landingURL`                      | `website`                                  |
| `legal.license`                   | `license`                                  |
| `legal.mainCopyrightOwner`        | `developer`                                |
| `maintenance.contacts[0].name`    | `maintainedBy` (or `contractors[0].name`)  |
| `developmentStatus`               | `status` (see notes)                       |
| `releaseDate`                     | `lastUpdated` (it is the _latest_ release) |
| `softwareVersion`                 | `softwareVersion`                          |
| `tags`                            | `tags`                                     |

Fields with no `publiccode.yml` equivalent (`categories`, `standards`, `endorsed`, `demo`,
`mainContributor`, `technology`, `language`, `type`, `firstRelease`) come only from the
`napcore-tools` block (or a hand-crafted `.md` page).

### Mapping notes

- **Categories**: `publiccode.yml` uses a fixed vocabulary for public-administration
  software (`financial-reporting`, `hr`, `it-development`, …), incompatible with our
  ITS/mobility taxonomy. Always assign categories in `napcore-tools`.
- **`developmentStatus`**: mapped coarsely. `obsolete` becomes `deprecated`, everything else
  becomes `active`. Set `status` in `napcore-tools` for `maintenance` or finer control.
- **`standards`, `endorsed`**: no `publiccode.yml` equivalent; set them in `napcore-tools`.

---

## Updating cached files

Re-run the sync script at any time to pull the latest upstream versions:

```bash
npm run sync:publiccode              # update all
npm run sync:publiccode -- my-tool   # update one (note the -- separator)
```

Commit the updated `publiccode.yml` files. Builds always read from the local cache, so a
change is only reflected once the refreshed cache is committed.

You don't strictly have to run the sync locally; see
[GitHub-only: no local checkout](#github-only-no-local-checkout) for letting CI rebuild the
cache for you.

---

## GitHub-only: no local checkout

You can add or update a tool entirely in the browser, without cloning the repository. A
GitHub Actions workflow (`.github/workflows/sync-publiccode.yml`) compiles the registry and
rebuilds the cached `publiccode.yml` files for you.

There are two ways to trigger it:

**1. Edit the registry on `main`.** When a change to `docs/data/publiccode-registry.yaml`
lands on the `main` branch, by editing it through the GitHub web editor or by merging a
registry-only pull request, the workflow runs automatically (the `push` trigger is scoped to
that one file).

**2. Run it manually.** From the repository's **Actions** tab, select
**"Sync publiccode.yml files"** → **Run workflow**. Leave the `slug` input as `all` to sync
every entry, or enter a single registry slug to sync just that one.

What the workflow does:

1. Runs the sync script to fetch each upstream `publiccode.yml`.
2. Opens (or updates) a review pull request on the `chore/sync-publiccode` branch containing
   only the refreshed cache under `docs/data/publiccode/**`. A sync summary (what updated,
   failed, or was skipped) becomes the PR body.
3. A maintainer reviews and merges that PR.

The cache is **never committed directly to `main`**; every cache change goes through a PR a
human merges. If an upstream file fails to fetch, the run is still marked red and the failure
is listed in the PR body, but the entries that did succeed are still included.

> To disable the automatic runs and keep only the manual trigger, comment out the `push:`
> block in `.github/workflows/sync-publiccode.yml`.

---

## Contributing via GitHub (local checkout)

1. **Fork** this repository and clone your fork.
2. Create a branch: `git checkout -b add-my-tool`.
3. Edit `docs/data/publiccode-registry.yaml` (steps under
   [Adding a tool](#adding-a-tool)).
4. Run `npm run sync:publiccode -- my-tool` to generate the cached file.
5. Verify it builds: `npm run build`, which validates your category/standard/status slugs.
6. Commit both the registry change and the cached `publiccode.yml`.
7. Push your branch and open a **pull request** against `main`.
