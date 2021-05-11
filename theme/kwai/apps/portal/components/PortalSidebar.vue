<template>
  <Sidebar>
    <SidebarLogo />
    <SidebarNavigation :routes="linkedApplications" />
  </Sidebar>
</template>

<script>
import Sidebar from '/src/components/sidebar/Sidebar.vue';
import useApplications from '/src/apps/portal/composables/useApplications.js';
import SidebarNavigation from '/@theme/components/SidebarNavigation.vue';
import SidebarLogo from '/@theme/components/SidebarLogo.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  components: { SidebarLogo, Sidebar, SidebarNavigation },
  setup() {
    const { applications } = useApplications();

    const router = useRouter();
    const linkedApplications = computed(() => {
      /* Only add application routes to the sidebar */
      const routes = [];
      if (applications.value) {
        applications.value.forEach((application) => {
          const route = router.getRoutes().find((route) => route.name === 'portal.' + application.name);
          if (route) {
            routes.push(route.name);
          }
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
