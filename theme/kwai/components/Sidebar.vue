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
      <div
        class="flex flex-col items-center justify-center mt-8 hover:cursor-pointer"
        @click="goHome"
      >
        <div class="flex flex-col items-center border-b border-gray-700 pb-2">
          <img
            src="/assets/portal/logo2.png"
            class="mb-2"
            style="width:72px;"
          >
          <div class="text-white text-center text-3xl mx-2 font-semibold mt-4">
            JudoKwai Kemzeke
          </div>
        </div>
      </div>

      <div class="px-3">
        <SitebarNavigation :application-routes="linkedApplications" />
      </div>

    </div>
  </div>
</template>

<script>
import { useSidebar } from '/src/apps/portal/composables/useSidebar.js';
import useApplications from '/src/apps/portal/composables/useApplications.js';
import SitebarNavigation from '/@theme/components/SitebarNavigation.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { SitebarNavigation },
  setup() {
    const { isOpen } = useSidebar();

    const { applications } = useApplications();

    const router = useRouter();
    const linkedApplications = computed(() => {
      const routes = [];
      if (applications.value) {
        applications.value.forEach((application) => {
          const route = router.getRoutes().find((route) => route.name === application.name);
          if (route) routes.push(route);
        });
      }
      return routes;
    });

    const goHome = () => {
      router.push({ name: 'home' });
    };

    return {
      isOpen,
      applications,
      linkedApplications,
      goHome
    };
  }
};
</script>
