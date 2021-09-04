<template>
  <div class="flex flex-col rounded bg-white overflow-hidden shadow-lg">
    <div class="p-3">
      <div class="text-gray-900 font-bold text-lg mb-2">
        {{ title }}
      </div>
      <p
        v-if="shortDescription"
        class="text-sm text-gray-500"
      >
        {{ shortDescription }}
      </p>
    </div>
    <div class="flex-grow border-t border-gray-200 p-3">
      <slot />
    </div>
    <div class="flex justify-between items-center p-3">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    default: null
  }
});
</script>
