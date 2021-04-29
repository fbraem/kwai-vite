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
      <div class="relative flex w-full flex-wrap items-stretch mb-3">
        <span
          v-if="leftIcon"
          class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i :class="leftIcon" />
        </span>
        <!--suppress HtmlFormInputWithoutLabel -->
        <input
          :id="id"
          :type="type"
          :placeholder="placeholder"
          class="rounded w-full"
          :class="{ 'border-red-600': error, 'pl-10': leftIcon, 'pr-10': rightIcon }"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        >
        <span
          v-if="rightIcon"
          class="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
        >
          <i :class="rightIcon" />
        </span>
      </div>
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
    error: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    leftIcon: {
      type: String,
      default: null
    },
    rightIcon: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue']
};
</script>
