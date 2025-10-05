import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import css from '@eslint/css'
import tailwindcss from '@poupe/eslint-plugin-tailwindcss'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.css'],
    language: 'css/css',
    plugins: {
      css,
      tailwindcss,
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
    },
    settings: {
      tailwindcss: {
        config: 'tailwind.config.js', // om du har config, annars kan du låta det vara
        cssFiles: ['**/*.css', '!**/node_modules/**', '!dist/**'],
        // valfritt, anpassa efter behov
      },
    },
  },
])
