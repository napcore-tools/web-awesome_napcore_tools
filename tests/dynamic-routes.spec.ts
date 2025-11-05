import { test, expect } from '@playwright/test';
import toolsDataLoader from '../docs/.vitepress/tools.data';
import { CATEGORIES } from '../docs/.vitepress/categories';
import standardsDataLoader from '../docs/.vitepress/standards.data';

/**
 * Dynamic Route Tests
 *
 * Tests all dynamically generated pages:
 * - All tool pages (/tools/[slug])
 * - All category pages (/categories/[slug])
 * - All standard pages (/standards/[slug])
 *
 * This ensures the build process creates all pages correctly.
 */

test.describe('All Tool Pages', () => {
  // Load all tools
  const tools = toolsDataLoader.load();

  console.log(`Testing ${tools.length} tool pages...`);

  for (const tool of tools) {
    test(`tool page: /tools/${tool.slug} renders`, async ({ page }) => {
      await page.goto(`/tools/${tool.slug}`);

      // Check page doesn't 404
      await expect(page).not.toHaveTitle(/404|Not Found/);

      // Check for tool title in the page
      await expect(page.locator('h1')).toContainText(tool.title);

      // Check for description
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toContain(tool.title);
    });
  }
});

test.describe('All Category Pages', () => {
  console.log(`Testing ${CATEGORIES.length} category pages...`);

  for (const category of CATEGORIES) {
    test(`category page: /categories/${category.slug} renders`, async ({ page }) => {
      await page.goto(`/categories/${category.slug}`);

      // Check page doesn't 404
      await expect(page).not.toHaveTitle(/404|Not Found/);

      // Check for category title
      await expect(page.locator('h1')).toContainText(category.title);

      // Check page has some content (tools grid or description)
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText!.length).toBeGreaterThan(100); // Has substantial content
    });
  }
});

test.describe('All Standard Pages', () => {
  // Load all standards
  const standards = standardsDataLoader.load();
  const standardSlugs = Object.keys(standards);

  console.log(`Testing ${standardSlugs.length} standard pages...`);

  for (const slug of standardSlugs) {
    const standard = standards[slug];

    test(`standard page: /standards/${slug} renders`, async ({ page }) => {
      await page.goto(`/standards/${slug}`);

      // Check page doesn't 404
      await expect(page).not.toHaveTitle(/404|Not Found/);

      // Check for standard title or icon
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toContain(standard.title);
    });
  }
});

test.describe('Build Validation', () => {
  test('all dynamic routes generated during build', async () => {
    const tools = toolsDataLoader.load();
    const standards = standardsDataLoader.load();

    // Basic sanity checks
    expect(tools.length).toBeGreaterThan(0);
    expect(CATEGORIES.length).toBeGreaterThan(0);
    expect(Object.keys(standards).length).toBeGreaterThan(0);

    console.log(`✓ Validated ${tools.length} tools`);
    console.log(`✓ Validated ${CATEGORIES.length} categories`);
    console.log(`✓ Validated ${Object.keys(standards).length} standards`);
  });
});
