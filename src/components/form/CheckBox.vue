<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        class="focus:ring-blue-600 h-4 w-4 rounded"
        :value="value"
        v-bind="$attrs"
        :class="color"
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
import { computed } from 'vue';

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
    },
    // eslint-disable-next-line vue/require-prop-types
    value: {
      default: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    });

    return {
      model
    };
  }
};
</script>
