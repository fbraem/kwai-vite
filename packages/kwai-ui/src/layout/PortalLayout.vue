<template>
  <div class="flex h-screen">
    <router-view name="sidebar" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <router-view name="toolbar" />
      <main
        id="main"
        class="flex-1 overflow-x-hidden overflow-y-auto"
      >
        <router-view name="main" />
        <router-view name="footer" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
