<template>
  <button
    v-bind="$attrs"
    class="text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
    type="submit"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  emits: ['click']
};
</script>
