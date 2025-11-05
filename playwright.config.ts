import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for NAPCORE Store
 *
 * Tests the built VitePress site to ensure:
 * - All pages build successfully
 * - All dynamic routes work (tools, categories, standards)
 * - Dev server starts correctly
 */
export default defineConfig({
  testDir: './tests',

  // Run tests in parallel for faster execution
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL for testing
    baseURL: 'http://localhost:5173',

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm run docs:dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes to start server
  },
});
