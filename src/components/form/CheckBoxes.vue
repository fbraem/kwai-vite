<template>
  <div :id="id">
    <div
      v-for="item in items"
      :key="item.key"
      class="flex items-center p-2"
    >
      <input
        :id="`${id}_${item.key}`"
        v-model="model"
        type="checkbox"
        :value="item.key"
        :class="color"
      >
      <slot :item="item">
        <div class="ml-3 text-sm text-gray-700">
          {{ item.value }}
        </div>
      </slot>
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
    items: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: 'text-blue-500'
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, { emit }) {
    const model = computed({
      get: () => {
        return props.modelValue;
      },
      set: (value) => {
        emit('update:modelValue', value);
      }
    });

    return {
      model
    };
  }
};
</script>
