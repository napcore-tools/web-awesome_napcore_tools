# Statistics Data

This directory contains the `stats.yaml` file that powers the dynamic statistics throughout the NAPCORE Tools Catalog.

## File: stats.yaml

Contains all statistical information about the catalog, including:

- Tool counts (total, active, maintenance, deprecated)
- Category statistics
- Standards supported
- Community metrics

## Updating Statistics

When you add or update tools in the catalog, remember to update the corresponding numbers in `stats.yaml`.

### Common Updates

#### Adding a New Tool

1. Increment `tools.total`
2. Increment the appropriate status counter (`active`, `maintenance`, or `deprecated`)
3. Increment the category counter(s) for the tool's category/categories
4. If the tool supports a new standard, add it to `standards.list` and increment `standards.total`
5. Update `lastUpdated` to today's date

#### Example:

Adding a new active DATEX II validator:

```yaml
tools:
  total: 4  # was 3
  active: 4  # was 3

categories:
  validators: 1  # was 0
  withTools: 4  # was 3 (assuming this is a new category with tools)

lastUpdated: "2025-10-23"  # update to today
```

#### Deprecating a Tool

1. Decrement `tools.active`
2. Increment `tools.deprecated`
3. Update `lastUpdated`

#### Changing Tool Status

When moving a tool from active to maintenance:

```yaml
tools:
  active: 2  # was 3
  maintenance: 1  # was 0
```

## Where Stats Are Used

The statistics from this file appear in:

- **Homepage** (`/` ) - `<StatsBar />` component
- **Tools Index** (`/tools/`) - `<ToolStats />` component
- **About Page** (`/about`) - `<StatsBar />` component

## Components

### StatsBar
Displays stats in a grid format with large numbers (used on homepage and about page).

### ToolStats
Displays stats in a list format (used on tools index page).

## Best Practices

1. **Update Regularly**: Keep stats current when adding/removing tools
2. **Be Accurate**: Double-check counts match actual tool pages
3. **Date Updates**: Always update `lastUpdated` when changing stats
4. **Consistency**: Make sure category counts add up correctly

## Validation

After updating `stats.yaml`:

1. Run the dev server: `npm run docs:dev`
2. Check homepage, tools page, and about page
3. Verify all numbers display correctly
4. Ensure no console errors

## Need Help?

If you're unsure how to update the statistics, ask in GitHub Discussions or check with the managing team.
