const path = require('path')
const fabric = require('@umijs/fabric')

const OFF = 0
const ERROR = 2

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/camelcase': OFF,
    '@typescript-eslint/class-name-casing': OFF,
    'import/no-extraneous-dependencies': OFF,
    '@typescript-eslint/no-explicit-any': OFF,
    semi: ['error', 'never'],
    'space-before-function-paren': [
      ERROR,
      {
        anonymous: 'ignore',
        named: 'ignore',
        asyncArrow: 'always'
      }
    ],
    'no-unused-expressions': [
      ERROR,
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    'no-console': [ERROR, { allow: ['warn', 'error', 'log'] }],
    'no-debugger': ERROR,
    'max-len': [ERROR, { code: 150, tabWidth: 2 }],
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    'no-empty-function': [
      ERROR,
      {
        allow: ['functions', 'arrowFunctions', 'generatorFunctions', 'methods', 'generatorMethods', 'getters', 'setters', 'constructors']
      }
    ],
    'no-shadow': [ERROR, { builtinGlobals: false, hoist: 'functions', allow: [] }],
    'react/no-array-index-key': [OFF],
    'jsx-a11y/anchor-is-valid': OFF,
    'jsx-a11y/anchor-has-content': OFF,
    'comma-dangle': [ERROR, 'never'],
    'consistent-return': OFF,
    'no-param-reassign': OFF,
    'react/react-in-jsx-scope': OFF,
    'func-names': OFF,
    'react/require-default-props': OFF
  },
  globals: {
    page: true,
    axios: true
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', path.resolve(__dirname, 'src')],
          ['services', path.resolve(__dirname, 'src/services')],
          ['models', path.resolve(__dirname, 'src/models')],
          ['utils', path.resolve(__dirname, 'src/utils')],
          ['config', path.resolve(__dirname, 'src/config')],
          ['pages', path.resolve(__dirname, 'src/pages')],
          ['components', path.resolve(__dirname, 'src/components')],
          ['assets', path.resolve(__dirname, 'src/assets')],
          ['APP_ROOT', path.resolve(__dirname)]
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  }
}
