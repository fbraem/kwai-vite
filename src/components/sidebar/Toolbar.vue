<template>
  <header
    class="flex justify-between items-center py-4 px-6"
  >
    <div class="flex items-center">
      <button
        class="text-white focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <i class="fas fa-bars" />
      </button>
    </div>
    <slot />
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
