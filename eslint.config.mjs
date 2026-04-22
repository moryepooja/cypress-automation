import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // ✅ Use recommended config properly
  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,

        // Cypress + Mocha globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly',
      },
    },

    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Disable ESLint rules conflicting with Prettier
  eslintConfigPrettier,
])
