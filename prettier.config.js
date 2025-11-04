export default {
  semi: true, // Use semicolons (default & most common)
  singleQuote: true, // Use single quotes
  tabWidth: 2, // 2 spaces for indentation (your preference)
  useTabs: false,
  trailingComma: 'es5', // Trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 120, // Line length (default)
  arrowParens: 'always', // Always wrap arrow function arguments in parens (default)
  endOfLine: 'auto', // Preserve existing line endings
  bracketSpacing: true,
  overrides: [
    {
      files: ['*.yaml', '*.yml', '*.md'],
      options: {
        singleQuote: false,
      },
    },
  ],
};
