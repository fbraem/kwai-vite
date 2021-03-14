<template>
  <div class="bg-gray-200 rounded-lg mt-5 py-2">
    <div class="flex flex-row flex-wrap">
      <div
          v-for="coach in coaches"
          class="px-2 py-2 w-full xl:w-1/2 flex flex-row items-center"
      >
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" src="/assets/no_avatar.png" alt="">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ coach.name }}
          </div>
          <div class="text-sm text-gray-500">
            {{ coach.diploma }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useCoaches from '/src/apps/portal/composables/useCoaches.js';

export default {
  setup() {
    return {
      ...useCoaches()
    };
  }
}
</script>
