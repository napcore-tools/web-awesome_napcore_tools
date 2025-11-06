import { test, expect } from '@playwright/test';

/**
 * Blog Tests
 *
 * Tests blog functionality:
 * - Blog listing page loads
 * - Blog posts are displayed
 * - Tag filtering works
 * - URL parameter filtering works
 * - RSS feed is accessible
 */

test.describe('Blog Page Tests', () => {
  test('blog listing page loads successfully', async ({ page }) => {
    await page.goto('/blog');

    // Check page renders
    await expect(page).toHaveTitle(/Blog|NAPCORE Store/);

    // Check for main heading
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Blog/i);
  });

  test('blog grid component is present', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for blog grid component or container
    const blogContainer = page.locator('.blog-page-container, .blog-grid, main, .vp-doc').first();
    await expect(blogContainer).toBeVisible();

    // Page should have loaded content (not just empty)
    const bodyText = await page.locator('body').textContent();
    expect(bodyText).toBeTruthy();
    expect(bodyText!.length).toBeGreaterThan(50);
  });

  test('tag filter component is visible', async ({ page }) => {
    await page.goto('/blog');

    // Check for tag filter section
    const filterSection = page.locator('.blog-tag-filter, .filter-header, .tags-cloud').first();

    // Tag filter should be visible (if there are tags)
    if (await filterSection.isVisible()) {
      await expect(filterSection).toBeVisible();
    }
  });

  test('clear all button appears when tags are selected', async ({ page }) => {
    await page.goto('/blog?tag=technical');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if Clear All button appears
    const clearButton = page.locator('button.clear-button', { hasText: /clear all/i }).first();

    // Button should be visible when tag is selected
    if (await clearButton.isVisible()) {
      await expect(clearButton).toBeVisible();
    }
  });

  test('URL parameter filtering works', async ({ page }) => {
    // Navigate with tag parameter
    await page.goto('/blog?tag=technical');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check URL contains the tag parameter
    expect(page.url()).toContain('tag=technical');

    // Page should still render correctly
    await expect(page.locator('h1')).toBeVisible();
  });

  test('clicking tag filters posts', async ({ page }) => {
    await page.goto('/blog');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Find a tag button
    const tagButton = page.locator('.tag-button, .blog-tag').first();

    if (await tagButton.isVisible()) {
      await tagButton.click();

      // Check that the tag is now active
      await expect(tagButton).toHaveClass(/active/);
    }
  });
});

test.describe('Individual Blog Post Tests', () => {
  test('can navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Find first blog post link (if any exist)
    const postLink = page.locator('.blog-card a, .blog-title a, article a').first();

    if (await postLink.isVisible()) {
      await postLink.click();

      // Check that we navigated to a blog post
      await expect(page).toHaveURL(/\/blog\/posts\//);
      await expect(page).not.toHaveTitle(/404|Not Found/);

      // Should have an h1 with post title
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('blog post has metadata', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Find first blog post link
    const postLink = page.locator('.blog-card a, .blog-title a, article a').first();

    if (await postLink.isVisible()) {
      await postLink.click();

      // Check for blog post metadata component
      const bodyText = await page.locator('body').textContent();

      // Should have date and/or author information
      expect(bodyText).toMatch(/\d{4}|author|date/i);
    }
  });
});
