module.exports = {
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
    'vue/script-setup-uses-vars': 'off'
  }
};
