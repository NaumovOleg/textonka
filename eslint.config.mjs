import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import sort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      js,
      prettier,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      'simple-import-sort': sort,
    },
    extends: ['js/recommended'],
    rules: {
      'max-len': ['error', { code: 100 }],
      ...typescriptEslint.configs.rules,
      'prettier/prettier': 'error',
      'brace-style': ['error', '1tbs', { allowSingleLine: true }],
      'no-duplicate-imports': 'error',
      // 'unused-imports/no-unused-imports': 'error',
      // 'simple-import-sort/imports': 'error',
      // 'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
      'lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'never', prev: '*', next: 'field' },
            { blankLine: 'never', prev: 'field', next: '*' },
            { blankLine: 'always', prev: '*', next: 'method' },
          ],
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '_[a-z-A-Z]',
          caughtErrorsIgnorePattern: '_[a-z-A-Z]',
          destructuredArrayIgnorePattern: '_[a-z-A-Z]',
          varsIgnorePattern: '_[a-z-A-Z]',

          // ignoreRestSiblings: true,
        },
      ],
      'no-unused-vars': 'off',
    },
    ignores: ['node_modules', 'dist'],
    languageOptions: { globals: globals.node },
  },
]);
