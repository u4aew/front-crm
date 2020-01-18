module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
    ecmaVersion: 2019
  },
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/require-v-for-key': 1,
    'indent': 0,
    'no-extend-native': ['error', { exceptions: ['Array'] }]
  }
}
