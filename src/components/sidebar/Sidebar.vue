<template>
  <div class="flex">
    <div
      class="fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden"
      :class="isOpen ? 'block' : 'hidden'"
      @click="isOpen = false"
    />
    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed z-30 inset-y-0 left-0 w-64 transition duration-300 transform bg-gray-900 overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
    >
      <slot />
    </div>
  </div>
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
