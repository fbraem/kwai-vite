<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        type="checkbox"
        class="focus:ring-blue-600 h-4 w-4 rounded"
        :class="color"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
    </div>
    <div class="ml-3 text-sm text-gray-700">
      <label
        :for="id"
        class="font-medium"
      >
        {{ label }}
      </label>
      <slot />
    </div>
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
    label: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'text-blue-500'
    }
  },
  emits: ['update:modelValue']
};
</script>
