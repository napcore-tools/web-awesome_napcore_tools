import { test, expect } from '@playwright/test';
import toolsDataLoader from '@/core/data-loaders/tools.data';

/**
 * OKF Bundle Tests
 *
 * The bundle is a build product; under the dev server it is served by okfDevPlugin.
 * These check that the paths the About page links to resolve there too.
 */

test.describe('OKF bundle', () => {
  test('serves the bundle index', async ({ request }) => {
    const response = await request.get('/okf/index.md');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/plain');
    const body = await response.text();
    expect(body).toContain('okf_version: "0.2"');
    expect(body).toContain('[Tools](tools/index.md)');
  });

  test('serves a directory listing for a directory path', async ({ request }) => {
    const response = await request.get('/okf/tools/');

    expect(response.status()).toBe(200);
    expect(await response.text()).toMatch(/^# Tools\n/);
  });

  test('serves a concept for every tool', async ({ request }) => {
    for (const tool of toolsDataLoader.load()) {
      const response = await request.get(`/okf/tools/${tool.slug}.md`);

      expect(response.status(), tool.slug).toBe(200);
      expect(await response.text(), tool.slug).toContain('type: Software Tool');
    }
  });

  test('the About page links to the index and the zip', async ({ page }) => {
    await page.goto('/about');

    // A Markdown link to a .md file would have been rewritten to .html
    await expect(page.getByRole('link', { name: 'the bundle index' })).toHaveAttribute('href', '/okf/index.md');
    await expect(page.getByRole('link', { name: 'Download the bundle' })).toHaveAttribute(
      'href',
      '/napcore-tools-okf.zip'
    );
  });

  test('following the index link from the About page opens the file', async ({ page }) => {
    await page.goto('/about');

    // Without a target attribute the client router takes the click and goes to index.md.html
    await page.getByRole('link', { name: 'the bundle index' }).click();

    await expect(page).toHaveURL(/\/okf\/index\.md$/);
    await expect(page.locator('body')).toContainText('okf_version');
  });

  test('the RSS link on the About page opens in a new tab', async ({ page }) => {
    await page.goto('/about');

    // The feed only exists in a build, so the link cannot be followed on the dev server
    const link = page.getByRole('link', { name: 'RSS feed' });
    await expect(link).toHaveAttribute('href', '/feed.rss');
    await expect(link).toHaveAttribute('target', '_blank');
  });

  test('serves the bundle as a zip', async ({ request }) => {
    const response = await request.get('/napcore-tools-okf.zip');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toBe('application/zip');
    // Local file header signature: "PK\x03\x04"
    expect((await response.body()).subarray(0, 4)).toEqual(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
  });
});
