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
    await expect(page).toHaveTitle(/Awesome NAPCORE/);

    // Check for key sections
    await expect(page.locator('h1')).toBeVisible();
  });

  test('categories page loads', async ({ page }) => {
    await page.goto('/categories/');

    // Check page renders
    await expect(page).toHaveTitle(/Categories|Awesome NAPCORE/);

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

  test('the old /all/ page redirects to the tools listing', async ({ page }) => {
    await page.goto('/all/');

    await expect(page).toHaveURL(/\/tools\/?$/);
  });
});

test.describe('Navigation Tests', () => {
  test('can navigate from home to the tools listing', async ({ page }) => {
    await page.goto('/');

    // The top menu's "Tools" item leads to the full tools listing
    const navLink = page.locator('.VPNavBarMenu').getByRole('link', { name: 'Tools', exact: true });

    await navLink.click();
    await expect(page).toHaveURL(/\/tools\/?$/);
  });

  test('sidebar navigation exists', async ({ page }) => {
    await page.goto('/categories/validators');

    // Check sidebar exists (VitePress creates sidebar)
    const sidebar = page.locator('.VPSidebar, aside, [role="navigation"]').first();
    await expect(sidebar).toBeVisible();
  });
});
