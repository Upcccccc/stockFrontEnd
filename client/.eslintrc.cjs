module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/no-unknown-property': ['error', {
      ignore: [
        'position',
        'rotation',
        'intensity',
        'object',
        'scale',
        'position-y',
        'rotation-y',
        'args',
        'dispose',
        'frustumCulled',
        'sizeAttenuation',
        'depthWrite',
      ]
    }]
  },
}