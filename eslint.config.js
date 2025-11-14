import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // Config 1: Ignore patterns
  {
    ignores: ['node_modules/**', 'docs/.vitepress/cache/**', 'docs/.vitepress/dist/**', 'docs/public/**', '.claude/**'],
  },

  // Config 2: Base JavaScript rules
  js.configs.recommended,

  // Config 3: Vue rules
  ...pluginVue.configs['flat/recommended'],

  // Config 4: General project settings
  {
    files: ['docs/**/*.{js,ts,vue}', '../*.{js,ts}', '../package.json'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',

      // 👇 Your style preferences
      indent: ['error', 4, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
    },
  },

  // Config 5: TypeScript-specific
  {
    files: ['docs/**/*.ts', 'tests/**/*.ts', '../*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-unused-vars': 'off',
    },
  },

  // Config 6: TypeScript in Vue
  {
    files: ['docs/**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsparser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },

  // Config 7: Test files specific globals
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        vi: 'readonly',
      },
    },
    rules: {
      // Allow 'any' types in test mocks and test utilities
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Config 8: Prettier integration — MUST be last
  prettierConfig,
];
