<template>
  <div class="flex h-screen bg-gray-200">
    <router-view name="sidebar" />
    <div class="flex-1 flex flex-col overflow-hidden">
      <router-view name="toolbar" />
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 pb-8">
        <slot />
        <router-view name="footer" />
      </main>
    </div>
  </div>
</template>
