<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <div class="mt-1">
      <select
        :id="id"
        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        :value="modelValue"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <p
      v-if="error"
      class="mt-2 text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    error: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue']
};
</script>
