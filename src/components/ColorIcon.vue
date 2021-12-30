<template>
  <div class="inline-flex items-center justify-center h-6 w-6 rounded">
    <slot>
      <i :class="icon" />
    </slot>
  </div>
</template>

<script setup>
  defineProps({
    icon: {
      type: String,
      required: false,
      default: null
    }
  });
</script>
