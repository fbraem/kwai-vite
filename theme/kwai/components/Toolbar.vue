<template>
  <header
    class="flex justify-between items-center py-4 px-6 bg-red-700"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <i class="fas fa-bars" />
      </button>
    </div>

    <div class="flex items-center space-x-2">
      <button
        class="block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-white text-red-700"
      >
        <i class="fab fa-facebook" />
      </button>
      <div class="relative">
        <button
          class="relative z-10 block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none bg-white text-red-700"
          @click="dropdownOpen = !dropdownOpen"
        >
          <i class="fas fa-lock" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { useSidebar } from '/src/apps/portal/composables/useSidebar.js';

export default {
  setup() {
    const { isOpen } = useSidebar();

    return {
      isOpen
    };
  }
};
</script>
