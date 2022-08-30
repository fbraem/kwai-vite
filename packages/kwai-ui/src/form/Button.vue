<template>
  <a
      v-bind="$attrs"
      class="hover:cursor-pointer text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
      tabindex="0"
      @click="$emit('click')"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
const emits = defineEmits(['click'])
</script>
