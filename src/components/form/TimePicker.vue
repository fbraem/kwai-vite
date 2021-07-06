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
          class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i
            class="fa fa-minus hover:cursor-pointer"
            @click="subHour"
          />
        </span>
        <input
          :id="id"
          v-model="hour"
          type="number"
          placeholder="HH"
          class="px-10 rounded text-center w-32"
          :class="{ 'border-red-600': error }"
          min="0"
          max="23"
        >
        <span
          class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
        >
          <i
            class="fa fa-plus hover:cursor-pointer"
            @click="addHour"
          />
        </span>
      </div>
      <div class="relative">
        <span
          class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i
            class="fa fa-minus hover:cursor-pointer"
            @click="subMinute"
          />
        </span>
        <input
          :id="id"
          v-model="minute"
          type="number"
          placeholder="MM"
          class="px-10 rounded text-center w-32"
          :class="{ 'border-red-600': error }"
          min="0"
          max="59"
        >
        <span
          class="h-full leading-snug font-normal absolute text-center bg-transparent rounded text-base items-center justify-center w-8 pr-3 py-3 right-0"
        >
          <i
            class="fa fa-plus hover:cursor-pointer"
            @click="addMinute"
          />
        </span>
      </div>
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
          const parts = props.modelValue.split(':', 2);
          return parseInt(parts[0]);
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
          const parts = props.modelValue.split(':', 2);
          return parseInt(parts[1]);
        }
        return 0;
      },
      set: (v) => {
        emit('update:modelValue', `${hour.value}:${v}`);
      }
    });

    const subHour = () => {
      if (hour.value > 0) {
        hour.value -= 1;
      } else {
        hour.value = 23;
      }
    };

    const addHour = () => {
      if (hour.value === 23) {
        hour.value = 0;
      } else {
        hour.value += 1;
      }
    };

    const subMinute = () => {
      if (minute.value > 0) {
        minute.value -= 1;
      } else {
        minute.value = 59;
      }
    };

    const addMinute = () => {
      if (minute.value === 59) {
        minute.value = 0;
      } else {
        minute.value += 1;
      }
    };

    return {
      hour,
      minute,
      subHour,
      addHour,
      subMinute,
      addMinute
    };
  }
};
</script>

<style scoped>
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
