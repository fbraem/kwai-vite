<template>
  <div>
    <input
      :id="id"
      ref="input"
      v-model="text"
      type="text"
      autocomplete="no"
      class="rounded w-full"
      @keydown.enter.prevent="click"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @keydown.esc.prevent="reset"
    >
    <ul
      v-if="filteredOptions.length"
      class="autocomplete-results"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        class="autocomplete-result"
        @mouseenter="select(index)"
        @click="click"
        v-text="option.label"
      />
    </ul>
  </div>
</template>

<script>
/* eslint-disable max-len */

import { computed, ref, watch } from 'vue';

export default {
  props: {
    // eslint-disable-next-line vue/require-prop-types
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const selectedIndex = ref(0);

    const text = ref(props.modelValue);

    const filteredOptions = computed(() => {
      if (Array.isArray(props.options) && text.value) {
        const isAlreadySelected = props.options.find(option => option.label === text.value);
        if (!isAlreadySelected) {
          return props.options
            .filter(option => option.label.toLowerCase().includes(text.value.toLowerCase()));
        }
      }
      return [];
    });
    const selection = computed(() => {
      if (filteredOptions.value[selectedIndex.value]) {
        return filteredOptions.value[selectedIndex.value];
      }
      return false;
    });

    function increment() {
      const length = filteredOptions.value.length;
      if (selectedIndex.value + 1 < length) {
        selectedIndex.value++;
      } else {
        selectedIndex.value = 0;
      }
    }

    function decrement() {
      const length = filteredOptions.value.length;
      if (selectedIndex.value - 1 >= 0) {
        selectedIndex.value--;
      } else {
        selectedIndex.value = length - 1;
      }
    }

    function select(index) {
      selectedIndex.value = index;
    }

    function click() {
      if (selection.value) {
        emit('update:modelValue', selection.value);
        text.value = selection.value.label;
      }
    }

    function reset() {
      emit('update:modelValue', null);
      text.value = '';
      selectedIndex.value = 0;
    }

    watch(text, () => {
      selectedIndex.value = 0;
    });

    return {
      selectedIndex,
      text,
      filteredOptions,
      selection,
      increment,
      decrement,
      select,
      click,
      reset
    };
  }
};
</script>

<style>
.autocomplete-results {
  @apply p-0 m-0 overflow-auto;
  border: 1px solid #eeeeee;
  height: 120px;
}

.autocomplete-result {
  @apply text-left cursor-pointer;
  padding: 4px 2px;
}

.autocomplete-result[data-is-selected],
.autocomplete-result:hover {
  background-color: #4AAE9B;
  color: white;
}
</style>
