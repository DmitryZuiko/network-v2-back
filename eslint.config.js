/* eslint-disable @typescript-eslint/no-require-imports */
const {
  defineConfig,
  globalIgnores,
} = require('eslint/config');

const globals = require('globals');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const rules = {
  strict: [ 'error', 'global' ],

  quotes: [ 'error', 'single', { allowTemplateLiterals: true } ],

  semi: [ 'error', 'always' ],
  curly: [ 'error', 'all' ],

  'dot-notation': [ 'error', { allowKeywords: true } ],

  'no-multi-spaces': [
    'error', {
      exceptions: { Property: false },

      ignoreEOLComments: false,
    }
  ],

  'no-restricted-syntax': 'off',

  'no-plusplus': [ 'error', { allowForLoopAfterthoughts: true } ],

  'no-await-in-loop': 'off',
  'no-promise-executor-return': 'off',
  'no-param-reassign': 'off',
  'no-loop-func': 'off',
  'import/no-import-module-exports': 'off',

  'no-console': [ 'warn', { allow: [ 'info', 'warn', 'error' ] } ],

  'import/no-extraneous-dependencies': [ 'error', { devDependencies: true } ],

  'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],

  indent: [ 'error', 2, { 'SwitchCase': 1 } ],

  'array-bracket-spacing': [ 'error', 'always', { objectsInArrays: true } ],

  'padding-line-between-statements': [
    'error', {
      blankLine: 'always',
      prev: '*',
      next: 'return',
    }, {
      blankLine: 'always',
      prev: [ 'const', 'let', 'var' ],
      next: '*',
    }, {
      blankLine: 'any',
      prev: [ 'const', 'let', 'var' ],
      next: [ 'const', 'let', 'var' ],
    }, {
      blankLine: 'always',
      prev: '*',
      next: 'block-like',
    }, {
      blankLine: 'always',
      prev: 'block-like',
      next: '*',
    }
  ],

  'padded-blocks': [ 'error', 'never' ],
  'object-curly-spacing': [ 'error', 'always' ],
  'comma-dangle': [ 'error', 'only-multiline' ],

  'comma-spacing': [
    'error', {
      before: false,
      after: true,
    }
  ],

  'array-bracket-newline': [ 'error', { multiline: true } ],

  'function-paren-newline': [ 'error', 'consistent' ],

  'object-curly-newline': [ 'error', { multiline: true } ],

  'eol-last': [ 'error', 'always' ],
  'prefer-const': 'error',
  'no-var': 'error',

  'space-before-function-paren': [
    'error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }
  ],

  'multiline-comment-style': [ 'error', 'separate-lines' ],

  'lines-around-comment': [
    'error', {
      beforeBlockComment: true,
      afterBlockComment: false,
      beforeLineComment: true,
      afterLineComment: false,
      allowBlockStart: true,
    }
  ],

  'space-before-blocks': [ 'error', 'always' ],

  'keyword-spacing': [
    'error', {
      before: true,
      after: true,
    }
  ],

  'arrow-spacing': [
    'error', {
      before: true,
      after: true,
    }
  ],

  'no-self-assign': [ 'error', { props: true } ],

  'space-infix-ops': [ 'error', { int32Hint: false } ],

  'import/extensions': [
    'error', 'ignorePackages', {
      js: 'never',
      ts: 'never',
    }
  ],

  'no-underscore-dangle': 'off',
  'no-use-before-define': 'off',
  'class-methods-use-this': 'off',
  'no-multiple-empty-lines': 'error',
  'consistent-return': 'off',
  'array-callback-return': 'off',
  'import/prefer-default-export': 'off',
  '@typescript-eslint/no-unused-vars': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
};

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      ecmaVersion: 11,
      parserOptions: {},
    },

    extends: compat.extends('airbnb-base', 'prettier'),
    rules,
  }, globalIgnores([ '**/dist', '**/build', '**/migrations' ]), {
    extends: compat.extends('airbnb-base', 'prettier', 'plugin:@typescript-eslint/recommended'),

    plugins: { '@typescript-eslint': typescriptEslint },

    languageOptions: { parser: tsParser },

    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },

        node: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
      },
    },

    files: [ './**/*.{j,t}s?(x)' ],

    rules: {
      ...rules,
      'no-shadow': 'off',
      'guard-for-in': 'off',
      '@typescript-eslint/no-shadow': [ 'error' ],
      '@/indent': [ 'error', 2 ],

      'lines-between-class-members': [ 'error', 'always', { exceptAfterSingleLine: true } ],

      'no-underscore-dangle': 'off',

      'import/extensions': [
        'error', 'ignorePackages', {
          js: 'never',
          ts: 'never',
        }
      ],
    },
  }
]);
