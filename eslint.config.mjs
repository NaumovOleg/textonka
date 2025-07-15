import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js, prettier, '@typescript-eslint': typescriptEslint },
    extends: ['js/recommended'],
    rules: {
      'prettier/prettier': 'error',
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
    },
    ignores: ['node_modules', 'dist'],
    languageOptions: { globals: globals.node },
  },
]);
