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
    files: ['docs/**/*.{js,ts,vue}', '../*.js', '../package.json'],
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
    files: ['docs/**/*.ts'],
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

  // Config 7: Prettier integration — MUST be last
  prettierConfig,
];
