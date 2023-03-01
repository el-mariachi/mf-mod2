module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
  },
  ignorePatterns: ["**/dist/*", "**/dist-ssr/*"]
}
