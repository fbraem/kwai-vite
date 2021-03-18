module.exports = {
  extends: [
    'standard',
    'standard-jsx',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'import/no-absolute-path': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never']
  }
};
