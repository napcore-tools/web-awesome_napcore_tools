import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  test: {
    // Use jsdom for DOM testing
    environment: 'jsdom',

    // Setup files for test utilities
    setupFiles: ['./tests/setup.ts'],

    // Include pattern for test files (only unit tests)
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],

    // Exclude directories and E2E tests
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', '.vitepress', 'tests/*.spec.ts'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'json', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        'tests/setup.ts',
        '**/*.config.ts',
        '**/types/**',
        'docs/.vitepress/plugins/**',
      ],
      // lines: 70,
      // functions: 70,
      // branches: 70,
      // statements: 70,
    },

    // Global test timeout
    testTimeout: 10000,

    // Globals to avoid importing describe, it, etc.
    globals: true,

    // Disable isolation for data loaders
    isolate: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './docs/.vitepress'),
    },
  },
});
