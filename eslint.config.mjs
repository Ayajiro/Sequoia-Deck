import js from '@eslint/js'
import nxEslintPlugin from '@nx/eslint-plugin'
import stylisticEslintPlugin from '@stylistic/eslint-plugin'
import stylisticEslintPluginTs from '@stylistic/eslint-plugin-ts'
import playwrightPlugin from 'eslint-plugin-playwright'
import globals from 'globals'
import tsEslintPlugin from 'typescript-eslint'

export default [
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      '@nx': nxEslintPlugin,
      '@stylistic': stylisticEslintPlugin,
      '@stylistic/ts': stylisticEslintPluginTs,
      '@typescript-eslint': tsEslintPlugin.plugin,
    },
  },
  {
    ...playwrightPlugin.configs['flat/recommended'],
    files: ['**/*.ts', '**/*.mjs', '**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tsEslintPlugin.parser,
      parserOptions: {
        project: '{rootDir}/tsconfig.json',
      },
    },
    rules: {
      ...tsEslintPlugin.plugin.configs.strict.rules,
      ...tsEslintPlugin.plugin.configs.stylistic.rules,
      ...js.configs.recommended.rules,
      ...playwrightPlugin.configs['flat/recommended'].rules,
      ...stylisticEslintPlugin.configs.recommended.rules,
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/keyword-spacing': 'error',
      '@stylistic/ts/type-annotation-spacing': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'no-unused-vars': 'off',
      'arrow-spacing': 'error',
      'eqeqeq': ['error', 'smart'],
    },
  },
]
