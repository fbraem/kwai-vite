<template>
  <MainSidebar>
    <div
      class="flex flex-col items-center justify-center mt-8 hover:cursor-pointer"
    >
      <a href="/">
        <div class="flex flex-col items-center border-b border-gray-700 pb-2">
          <img
            src="/assets/portal/logo2.png"
            class="mb-2"
            style="width:72px;"
            alt="logo"
          >
          <div class="text-white text-center text-3xl mx-2 font-semibold mt-4">
            Judokwai Kemzeke
          </div>
        </div>
      </a>
    </div>

    <div class="px-3">
      <SidebarNavigation :routes="linkedApplications" />
    </div>
  </MainSidebar>
</template>

<script>
import MainSidebar from '/src/components/sidebar/Sidebar.vue';
import useApplications from '/src/apps/portal/composables/useApplications.js';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { MainSidebar, SidebarNavigation },
  setup() {
    const { applications } = useApplications();

    const router = useRouter();
    const linkedApplications = computed(() => {
      /* Only add application routes to the sidebar */
      const routes = [];
      if (applications.value) {
        applications.value.forEach((application) => {
          const route = router.getRoutes().find((route) => route.name === 'portal.' + application.name);
          if (route) routes.push(route);
        });
      }
      return routes;
    });

    return {
      applications,
      linkedApplications
    };
  }
};
</script>
