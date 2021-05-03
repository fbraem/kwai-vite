<template>
  <div class="flex h-screen bg-gray-200">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <Toolbar />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <slot />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from '/@theme/components/Sidebar.vue';
import Toolbar from '/@theme/components/Toolbar.vue';

export default {
  components: { Sidebar, Toolbar }
};
</script>
