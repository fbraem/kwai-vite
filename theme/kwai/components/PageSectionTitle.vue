<template>
  <PageSection class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <slot />
        </h1>
      </div>
    </div>
  </PageSection>
</template>

<script setup>
import PageSection from './PageSection.vue';
</script>
