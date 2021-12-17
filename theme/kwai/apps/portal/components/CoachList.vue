<template>
  <div class="py-2">
    <div class="flex flex-row flex-wrap">
      <div
        v-for="coach in coaches"
        :key="coach.id"
        class="px-2 py-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-row items-center"
      >
        <div class="flex-shrink-0 h-10 w-10">
          <img
            class="h-10 w-10 rounded-full"
            src="/assets/portal/no_avatar.png"
            alt="no image"
          >
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
import { useCoachStore } from '/src/apps/portal/stores/coachStore.js';
import { computed } from 'vue';

export default {
  setup() {
    const store = useCoachStore();
    store.load();

    const coaches = computed(() => store.coaches);

    return {
      coaches
    };
  }
};
</script>
