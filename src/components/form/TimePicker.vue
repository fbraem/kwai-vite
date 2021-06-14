<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
    </label>
    <div class="flex flex-row space-x-2">
      <div class="relative">
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i class="fa fa-minus" />
        </span>
        <input
          :id="id"
          v-model="hour"
          type="number"
          placeholder="HH"
          class="px-10 rounded text-center"
          :class="{ 'border-red-600': error }"
          min="0"
          max="23"
        >
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
        >
          <i class="fa fa-plus" />
        </span>
      </div>
      <div class="relative">
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i class="fa fa-minus" />
        </span>
        <input
          :id="id"
          v-model="minute"
          type="number"
          placeholder="MM"
          class="px-10 rounded text-center"
          :class="{ 'border-red-600': error }"
          min="0"
          max="59"
        >
        <span
          class="z-10 h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
        >
          <i class="fa fa-plus" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>

<script>
import { computed } from 'vue';

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {
      required: true
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const hour = computed({
      get: () => {
        if (props.modelValue) {
          return props.modelValue.substr(0, 2);
        }
        return 0;
      },
      set: (v) => {
        emit('update:modelValue', `${v}:${minute.value}`);
      }
    });

    const minute = computed({
      get: () => {
        if (props.modelValue) {
          return props.modelValue.substr(3, 2);
        }
        return 0;
      },
      set: (v) => {
        emit('update:modelValue', `${hour.value}:${v}`);
      }
    });

    return {
      hour,
      minute
    };
  }
};
</script>
