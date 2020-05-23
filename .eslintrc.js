module.exports = {
  env: {
    jest: true,
    browser: true,
  },
  extends: ['plugin:@typescript-eslint/eslint-recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      experimentalObjectRestSpread: true,
    },
    allowImportExportEverywhere: true,
  },
};
