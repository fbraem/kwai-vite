<template>
  <div class="mb-3">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <!--suppress HtmlFormInputWithoutLabel -->
    <textarea
      :id="id"
      :placeholder="placeholder"
      class="rounded w-full rounded-md block mt-1 sm:text-sm shadow-sm"
      :class="{ 'border-red-600': error }"
      :value="modelValue"
      :rows="rows"
      @input="$emit('update:modelValue', $event.target.value)"
    />
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
    rows: {
      type: Number,
      default: 5
    }
  },
  emits: ['update:modelValue']
};
</script>
