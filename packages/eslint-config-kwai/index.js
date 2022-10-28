module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['standard', 'plugin:vue/vue3-recommended'],
  rules: {
    semi: [2, 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': [2, 'never'],
  },
};
