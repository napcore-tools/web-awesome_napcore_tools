import { test, expect } from '@playwright/test';

/**
 * Smoke Tests for Awesome NAPCORE Tools
 *
 * Tests basic functionality:
 * - Home page loads
 * - Sample category pages render
 * - Sample tool pages render
 * - Navigation works
 */

test.describe('Basic Page Tests', () => {
  test('home page loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check for main headings/content
    await expect(page).toHaveTitle(/Awesome NAPCORE Tools/);

    // Check for key sections
    await expect(page.locator('h1')).toBeVisible();
  });

  test('categories page loads', async ({ page }) => {
    await page.goto('/categories/');

    // Check page renders
    await expect(page).toHaveTitle(/Categories|Awesome NAPCORE Tools/);

    // Check for category grid or content
    await expect(page.locator('body')).toContainText(/Categories|Tools/);
  });

  test('sample category page - validators', async ({ page }) => {
    await page.goto('/categories/validators');

    // Check page renders
    await expect(page.locator('h1')).toContainText(/Validators/i);

    // Check for tools grid or content
    await expect(page.locator('body')).toContainText(/validation|tools/i);
  });

  test('sample category page - converters', async ({ page }) => {
    await page.goto('/categories/converters');

    // Check page renders
    await expect(page.locator('h1')).toContainText(/Converters/i);
  });

  test('sample tool page loads', async ({ page }) => {
    // This will be updated once we know actual tool slugs
    await page.goto('/tools/');

    // Just check it doesn't 404
    await expect(page).not.toHaveTitle(/404|Not Found/);
  });
});

test.describe('Navigation Tests', () => {
  test('can navigate from home to categories', async ({ page }) => {
    await page.goto('/');

    // Look for navigation link
    const navLink = page.locator('nav a', { hasText: /categories|tools/i }).first();

    if (await navLink.isVisible()) {
      await navLink.click();
      await expect(page).toHaveURL(/categories/);
    }
  });

  test('sidebar navigation exists', async ({ page }) => {
    await page.goto('/categories/validators');

    // Check sidebar exists (VitePress creates sidebar)
    const sidebar = page.locator('.VPSidebar, aside, [role="navigation"]').first();
    await expect(sidebar).toBeVisible();
  });
});
