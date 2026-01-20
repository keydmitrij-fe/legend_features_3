import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: prettierPlugin,
      react: pluginReact,
    },
    extends: [
      'js/recommended',
      prettierConfig,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        React: 'readonly',
      },
    },
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
]);
