module.exports = {
  parserOptions: {
    ecmaVersion: 2021
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly'
  },
  extends: [
    'standard',
    'standard-jsx',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'import/no-absolute-path': 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': ['error', 'never'],
    'vue/script-setup-uses-vars': 'off',
    'vue/no-v-html': 'off'
  }
};
