import pluginVue from 'eslint-plugin-vue'
import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    // Config 1: Ignore patterns
    // Files and directories that ESLint should completely skip
    {
        ignores: [
            "node_modules/**",
            "docs/.vitepress/cache/**",
            "docs/.vitepress/dist/**",
            "docs/public/**"
        ],
    },

    // Config 2: Base JavaScript rules (applies to ALL files by default)
    // Provides recommended ESLint rules for JavaScript
    js.configs.recommended,

    // Config 3: Vue rules (applies to *.vue files)
    // Provides recommended ESLint rules for Vue 3 components
    ...pluginVue.configs["flat/recommended"],

    // Config 4: General project settings
    // Sets COMMON settings for all project files (JS, TS, Vue)
    // This establishes the baseline configuration that other configs will extend
    {
        files: ["docs/**/*.js", "docs/**/*.ts", "docs/**/*.vue", "../*.js", "../package.json"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                // Make browser APIs available (window, document, etc.)
                ...globals.browser,
                // Make Node.js APIs available (process, __dirname, etc.)
                ...globals.node,
            },
        },
        rules: {
            // Warn about unused variables instead of erroring
            "no-unused-vars": "warn",
            // Allow console.log statements in this project
            "no-console": "off",
        },
    },

    // Config 5: TypeScript-specific settings
    // Adds TYPESCRIPT-SPECIFIC overrides for .ts and .tsx files
    // This config merges with Config 4 for TypeScript files
    {
        files: ["docs/**/*.ts"],
        languageOptions: {
            // Use TypeScript parser to understand TS syntax (interfaces, type annotations, etc.)
            parser: tsparser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            // Enable TypeScript-specific linting rules
            '@typescript-eslint': tseslint,
        },
        rules: {
            // Apply recommended TypeScript rules
            ...tseslint.configs.recommended.rules,
            // Use TypeScript version of no-unused-vars (more accurate for TS)
            // Allow variables/args starting with underscore to be unused
            '@typescript-eslint/no-unused-vars': ['warn', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }],
            // Disable base rule to avoid conflicts with TypeScript version
            'no-unused-vars': 'off',
        },
    },

    // Config 6: TypeScript in Vue files
    // Configures Vue files to properly parse <script lang="ts"> blocks
    // This config merges with Config 3 and Config 4 for Vue files
    {
        files: ["docs/**/*.vue"],
        languageOptions: {
            parserOptions: {
                // Use TypeScript parser for <script> blocks in Vue files
                parser: tsparser,
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
    },

    // Config 7: Prettier compatibility
    // Must be LAST to override any conflicting formatting rules
    // Disables ESLint rules that conflict with Prettier formatting
    prettierConfig,
];
