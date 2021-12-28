module.exports = {
  env: {
    node: true
  },
  plugins: [
    'testcafe'
  ],
  parserOptions: {
    ecmaVersion: 2021
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:testcafe/recommended'
  ],
  rules: {
    'import/no-absolute-path': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'vue/no-v-html': 'off'
  }
};
