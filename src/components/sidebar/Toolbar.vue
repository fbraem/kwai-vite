<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-red-700"
  >
    <div class="flex items-center">
      <button
        class="text-white focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <i class="fas fa-bars" />
      </button>
    </div>

    <div class="flex items-center space-x-2">
      <slot></slot>
    </div>
  </header>
</template>

<script>
import { useSidebar } from '/src/components/sidebar/useSidebar.js';

export default {
  setup() {
    const { isOpen } = useSidebar();

    return {
      isOpen
    };
  }
};
</script>
